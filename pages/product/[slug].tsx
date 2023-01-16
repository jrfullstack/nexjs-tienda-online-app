import { useState, useContext } from 'react';

import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from 'next/router';

import { Box, Button, Chip, Grid, Typography } from '@mui/material';

import { CartContext } from '../../context';
import { ShopLayout } from "../../components/layouts";
import { ProductSlideshow } from "../../components/products";
import { SizeSelector } from "../../components/products/SizeSelector";
import { ItemCounter } from "../../components/ui";
import "react-slideshow-image/dist/styles.css";

import { dbProducts } from "../../database";
import { ICartProduct, IProduct } from "../../interfaces";
import { ISize } from "../../interfaces/products";

interface Props {
    product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {

  const router = useRouter();
  const {addProductToCart} = useContext(CartContext);

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
      _id: product._id,
      image: product.images[0],
      price: product.price,
      size: undefined,
      slug: product.slug,
      title: product.title,
      gender: product.gender,
      quantity: 1,
  });

  const selectedSize = (size: ISize) => {
      setTempCartProduct((currentProduct) => ({
          ...currentProduct,
          size,
      }));
  };

  const onUpdateQuantity = (quantity: number) => {
      setTempCartProduct((currentProduct) => ({
          ...currentProduct,
          quantity,
      }));
  };

  const onAddProduct = () => {
      if (!tempCartProduct.size) {
          return;
      }

      addProductToCart(tempCartProduct);
      console.log(tempCartProduct);
      router.push('/cart');
  };

  return (
      <ShopLayout title={product.title} pageDescription={product.description}>
          <Grid container spacing={3}>
              <Grid item xs={12} sm={7}>
                  {/* slideshow */}
                  <ProductSlideshow images={product.images} />
              </Grid>

              <Grid item xs={12} sm={5}>
                  <Box display="flex" flexDirection="column">
                      {/* titulo */}
                      <Typography variant="h1" component="h1">
                          {product.title}
                      </Typography>
                      <Typography variant="subtitle1" component="h2">
                          ${product.price}
                      </Typography>

                      {/* cantidad */}
                      <Box sx={{ my: 2 }}>
                          <Typography variant="subtitle2">
                              Cantidad
                          </Typography>

                          {/* ItemCounter */}
                          <ItemCounter
                              currentValue={tempCartProduct.quantity}
                              updateQuantity={onUpdateQuantity}
                              maxValue={
                                  product.inStock > 10 ? 10 : product.inStock
                              }
                          />

                          {/* Selector de size */}
                          <SizeSelector
                              //selectedSize={product.sizes[0]}
                              sizes={product.sizes}
                              selectedSize={tempCartProduct.size}
                              onSelectedSize={(size) => selectedSize(size)}
                          />
                      </Box>

                      {/* Agregar al carrito */}
                      {product.inStock > 0 ? (
                          <Button
                              color="secondary"
                              className="circular-btn"
                              onClick={onAddProduct}>
                              {tempCartProduct.size
                                  ? "Agregar al carrito"
                                  : "Seleccione una talla"}
                          </Button>
                      ) : (
                          <Chip
                              label="No hay disponibles"
                              color="error"
                              variant="outlined"
                          />
                      )}

                      {/* Descripcion */}
                      <Box sx={{ mt: 3 }}>
                          <Typography variant="subtitle2">
                              Descripción
                          </Typography>
                          <Typography variant="body2">
                              {product.description}
                          </Typography>
                      </Box>
                  </Box>
              </Grid>
          </Grid>
      </ShopLayout>
  );
};

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths: GetStaticPaths = async () => {
    const productSlugs = await dbProducts.getAllProductSlugs();

    return {
        paths: productSlugs.map(({ slug }) => ({
            params: {
                slug,
            },
        })),
        fallback: "blocking",
    };
};

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { slug = "" } = params as { slug: string };
    const product = await dbProducts.getProductBySlug(slug);

    if (!product) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    return {
        props: {
            product,
        },
        // para volver a generar la parte estatica ej diario
        revalidate: 86400, // 60 * 60 * 24
    };
};

export default ProductPage;
