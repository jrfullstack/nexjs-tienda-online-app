import { NextPage, GetServerSideProps } from 'next';
import { Box, Button, Chip, Grid, Typography } from '@mui/material';

import { ShopLayout } from '../../components/layouts';
import { ProductSlideshow } from '../../components/products';
import { SizeSelector } from '../../components/products/SizeSelector';
import { ItemCounter } from '../../components/ui';
import 'react-slideshow-image/dist/styles.css';

import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces';


interface Props {
  product: IProduct
}


const ProductPage: NextPage<Props> = ({product}) => {

  // const router = useRouter();

  // const {products: Product, isLoading} = useProducts(`/prodcuts/${ router.query.slug }`);

  // if(isLoading){
  //   return <h1>Cargando</h1>
  // }

  // if(!product){
  //   return <h1>No existe</h1>
  // }

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

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({params}) => {

  const { slug = '' } = params as {slug: string};
  const product = await dbProducts.getProductBySlug(slug);

  if(!product){
    return{
      redirect:{
        destination: '/',
        permanent: false
      }
    }
  }

  return {
      props: {
          product,
      },
  };
}

export default ProductPage
