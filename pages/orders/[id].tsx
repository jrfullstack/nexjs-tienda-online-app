import NextLink from 'next/link';
import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react';


import { Card, CardContent, Divider, Grid, Typography, Box, Link, Chip } from '@mui/material';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';

import { ShopLayout } from '../../components/layouts/ShopLayout';
import { CartList, OrderSummay } from "../../components/cart/";
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';


interface Props {
    order: IOrder;
}

const OrderPage: NextPage<Props> = ({order}) => {
    console.log(order)


    return (
        <ShopLayout title="Resumen de la orden 123564" pageDescription="Resumen de la orden" >
            <Typography variant='h1' component='h1'>Orden: 123ABC</Typography>

            {/* <Chip
                sx={{my: 2}}
                label="Pendiente de pago"
                variant='outlined'
                color='error'
                icon={<CreditCardOffOutlined/>}
            /> */}

            <Chip
                sx={{ my: 2 }}
                label="Orden ya pagada"
                variant='outlined'
                color='success'
                icon={<CreditScoreOutlined />}
            />

            <Grid container>
                <Grid item xs={12} sm={7}>
                    {/* CarList */}
                    <CartList />
                </Grid>

                <Grid item xs={12} sm={5}>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2'>Resumen (3 productos)</Typography>
                            <Divider sx={{ my: 1 }} />

                            <Box display='flex' justifyContent='space-between'>
                                <Typography variant='subtitle1'>Dirección de entrega</Typography>
                                <NextLink href='/checkout/address' passHref legacyBehavior>
                                    <Link underline='always'>
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>

                            <Typography>Jimmy Reyes</Typography>
                            <Typography>234 xxx lugar</Typography>
                            <Typography>Zurich 8080</Typography>
                            <Typography>Suiza</Typography>
                            <Typography>+122487466</Typography>

                            <Divider sx={{ my: 1 }} />

                            <Box display='flex' justifyContent='end'>
                                <NextLink href='/cart' passHref legacyBehavior>
                                    <Link underline='always'>
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>

                            {/* orden summary */}
                            <OrderSummay />

                            <Box sx={{ mt: 3 }}>
                                <h1>Pagar</h1>
                                <Chip
                                    sx={{ my: 2 }}
                                    label="Orden ya pagada"
                                    variant='outlined'
                                    color='success'
                                    icon={<CreditScoreOutlined />}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>

        </ShopLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({req, query}) => {

    const { id = '' } = query;

    const session:any = await getSession({req});

    // validar si no hay una session
    if(!session){
        return {
            redirect: {
                destination: `/auth/login?p=/orders/${id}`,
                permanent: false,
            }
        }
    }

    // obtener la orden
    const order = await dbOrders.getOrdersById(id.toString());
    
    // validar si la orden existe
    if(!order){
        return {
            redirect: {
                destination: '/orders/history',
                permanent: false,
            },
        };

    }

    // validar si la orden es del usuario
    // TODO resivisar los id de login normal 
    if(order.user !== session.user._id){
        return {
            redirect: {
                destination: "/orders/history",
                permanent: false,
            },
        };
    }

    return {
        props: {
            order
        }
    }
}

export default OrderPage