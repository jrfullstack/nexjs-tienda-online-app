import NextLink from 'next/link';
import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react';

import { ShopLayout } from '../../components/layouts/ShopLayout';
import { Typography, Grid, Chip, Link } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid/models';
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';


const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 100},
    {field: 'fullname', headerName: 'Nombre Completo', width: 300},

    {
        field: 'paid',
        headerName: 'Pagada',
        description: 'Muestra informacion si esta pagada o no',
        width: 200,
        renderCell: (params: GridRenderCellParams) => {
            return (
                params.row.paid
                    ? <Chip color='success' label='Pagada' variant='outlined'/>
                    : <Chip color='error' label='No Pagada' variant='outlined' />

            )
        }
    },
    {
        field: 'orden',
        headerName: 'Ver Orden',        
        width: 200,
        sortable: false,
        renderCell: (params: GridRenderCellParams) => {
            return (
                <NextLink href={`/orders/${params.row.orderId}`} passHref legacyBehavior>
                    <Link underline='always'>
                        Ver orden
                    </Link>
                </NextLink>
            )
        }
    }
];

// const rows = [
//     { id: 1, paid: true, fullname: 'Jimmy Reyes' },
//     { id: 2, paid: false, fullname: 'Jayleen Reyes' },
//     { id: 3, paid: true, fullname: 'Jared Reyes' },
//     { id: 4, paid: false, fullname: 'Yolaynne Reyes' },
//     { id: 5, paid: true, fullname: 'Solangel Reyes' },
//     { id: 6, paid: true, fullname: 'Jimmy Reyes' },
// ]

interface Props {
    orders: IOrder[]
}

const history: NextPage<Props> = ({orders}) => {
    // console.log(props);

    const rows = orders.map((order, idx) => ({
        id: idx + 1,
        paid: order.isPaid,
        fullname: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
        orderId: order._id
    }))

    return (
        <ShopLayout title={'Historial de ordenes'} pageDescription={'Historial de ordenes del cliente'}>
            <Typography variant='h1' component='h1'>Historial de ordenes</Typography>

            <Grid container className='fadeIn'>
                <Grid item xs={12} sx={{height: 650, width: '100%' }}>
                    <DataGrid 
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />

                </Grid>

            </Grid>
        </ShopLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({req}) => {
    const session: any = await getSession({req});

    if(!session){
        return{
            redirect:{
                destination: '/auth/login?p=/orders/history',
                permanent: false
            }
        }
    }

    const orders = await dbOrders.getOrdersByUser(session.user._id || session.user.id);

    return {
        props: {
            orders,
        },
    };
}

export default history