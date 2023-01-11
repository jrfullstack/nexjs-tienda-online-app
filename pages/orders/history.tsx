import NextLink from 'next/link';

import { ShopLayout } from '../../components/layouts/ShopLayout';
import { Typography, Grid, Chip, Link } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid/models';

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
                <NextLink href={`/orders/${params.row.id}`} passHref legacyBehavior>
                    <Link underline='always'>
                        Ver orden
                    </Link>
                </NextLink>
            )
        }
    }
];

const rows = [
    { id: 1, paid: true, fullname: 'Jimmy Reyes' },
    { id: 2, paid: false, fullname: 'Jayleen Reyes' },
    { id: 3, paid: true, fullname: 'Jared Reyes' },
    { id: 4, paid: false, fullname: 'Yolaynne Reyes' },
    { id: 5, paid: true, fullname: 'Solangel Reyes' },
    { id: 6, paid: true, fullname: 'Jimmy Reyes' },
]

const history = () => {
  return (
    <ShopLayout title={'Historial de ordenes'} pageDescription={'Historial de ordenes del cliente'}>
        <Typography variant='h1' component='h1'>Historial de ordenes</Typography>

        <Grid container>
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

export default history