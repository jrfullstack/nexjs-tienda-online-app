import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { db } from '../../../database';
import { IPaypal } from '../../../interfaces';
import { Order } from '../../../models';

type Data = {
    message: string
}

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'POST':
            return payOrder(req, res);
                
        default:
            return res.status(400).json({ message: 'Bad request' });
            
    }  

}


const getPaypalBearerToken = async(): Promise<string | null > => {

    const PAYPAL_CLIENT = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

    const basic64Token = Buffer.from(`${PAYPAL_CLIENT}:${PAYPAL_SECRET}`, 'utf-8').toString('base64');
    const body = new URLSearchParams('grant_type=client_credentials');

    try {
        const { data } = await axios.post(process.env.PAYPAL_OAUTH_URL || '', body, {
            headers: {
                'Authorization': `Basic ${basic64Token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        return data.access_token;

    } catch (error) {
        if(axios.isAxiosError(error)){
            console.log(error.response?.data);
        }else{
            console.log(error);
        }

        return null;
        
    }

}


const payOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    // validamos la session del usuario
    const session: any = await getSession({ req });
    if (!session) {
        return res.status(401).json({ message: 'Debe estar autenticado para hacer esto' });
    }    

    // Obtenemos el token de validacion de nuestro baken
    const paypalBearerToken = await getPaypalBearerToken();

    if(!paypalBearerToken){
        return res.status(400).json({ message: 'No se pudo confirmar el token de paypal' });
    }

    const {transactionId = '', orderId = ''} = req.body;

    // enviamos la peticion a paypal con el token
    const { data } = await axios.get<IPaypal.PaypalOrderStatusResponse>(`${process.env.PAYPAL_ORDERS_URL}/${transactionId}`, {        
        headers: {
            'Authorization': `Bearer ${paypalBearerToken}`
        }
    });

    // validamos si esta pagada
    if(data.status !== 'COMPLETED'){
        return res.status(401).json({message: 'Orden no reconocida'});
    }

    // buscamos en la base de datos la orden enviada
    await db.connect();
    const dbOrder = await Order.findById(orderId);

    // validad si existe la orden
    if(!dbOrder) {
        await db.disconnect();
        return res.status(400).json({message: 'Orden no existe en nuestra base de datos'});
    }

    // validar si los montos son iguales
    if(dbOrder.total !== Number(data.purchase_units[0].amount.value) ){
        await db.disconnect();
        return res.status(400).json({ message: 'Los montos de paypal y nuestra orden no son iguales' });
    }

    // marcamos como pagada la transaccion
    dbOrder.transactionId = transactionId;
    dbOrder.isPaid = true;
    dbOrder.save();

    await db.disconnect();


    return res.status(200).json({ message: 'Orden pagada' });
}
