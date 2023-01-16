
import { Card, CardContent, Divider, Grid, Typography, Box, Button } from '@mui/material';

import { ShopLayout } from '../../components/layouts/ShopLayout';
import { CartList } from '../../components/cart/CartList';
import { OrderSummay } from '../../components/cart/OrderSummay';

const CartPage = () => {    

  return (
    <ShopLayout title="Carrito - " pageDescription ="Carrito de compra de la tienda" >
      <Typography variant='h1' component='h1'>Carrito</Typography>

      <Grid container>
        <Grid item xs={12} sm={7}>
          {/* CarList */}
          <CartList editable/>
        </Grid>

        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2'>Orden</Typography>
              <Divider sx={{my: 1}}/>

              {/* orden summary */}
              <OrderSummay/>

              <Box sx={{mt: 3}}>
                <Button color='secondary' className='circular-btn' fullWidth>
                  Checkout
                </Button>

              </Box>
            </CardContent>
          </Card>
        </Grid>

      </Grid>

    </ShopLayout>
  )
}

export default CartPage