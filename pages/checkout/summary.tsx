import NextLink from 'next/link';
import { Card, CardContent, Divider, Grid, Typography, Box, Button, Link } from '@mui/material';

import { ShopLayout } from '../../components/layouts/ShopLayout';
import { CartList } from '../../components/cart/CartList';
import { OrderSummay } from '../../components/cart/OrderSummay';

const SummaryPage = () => {

    return (
        <ShopLayout title="Resumen de orden" pageDescription="Resumen de la orden" >
            <Typography variant='h1' component='h1'>Resumen de la orden</Typography>

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
                                <Button color='secondary' className='circular-btn' fullWidth>
                                    Confirmar Orden
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>

        </ShopLayout>
    )
}

export default SummaryPage