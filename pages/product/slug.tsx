import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { ProductSlideshow } from '../../components/products';
import 'react-slideshow-image/dist/styles.css';

import { initialData } from '../../database/products';
import { ItemCounter } from '../../components/ui';
import { SizeSelector } from '../../components/products/SizeSelector';

const product = initialData.products[0];

const ProductPage = () => {
  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>

        <Grid item xs={12} sm={7}>
          {/* slideshow */}
          <ProductSlideshow
            images={product.images}
          />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Box display='flex' flexDirection='column'>

            {/* titulo */}
            <Typography variant='h1' component='h1'>{product.title}</Typography>
            <Typography variant='subtitle1' component='h2'>${product.price}</Typography>

            {/* cantidad */}
            <Box sx={{my: 2}}>
              <Typography variant='subtitle2'>Cantidad</Typography>
              {/* ItemCounter */}
              <ItemCounter/>
              {/* Slector de size */}
              <SizeSelector 
                //selectedSize={product.sizes[0]} 
                sizes={product.sizes}
              />
            </Box>

            {/* Agregar al carrito */}
            <Button color='secondary' className='circular-btn'>
              Agregar al carrito
            </Button>

            {/* <Chip label='No hay disponibles' color='error' variant='outlined' /> */}

            {/* Descripcion */}
            <Box sx={{mt:3}}>
              <Typography variant='subtitle2'>Descripción</Typography>
              <Typography variant='body2'>{product.description}</Typography>
            </Box>

          </Box>
        </Grid>



      </Grid>
    </ShopLayout>
  )
}

export default ProductPage
