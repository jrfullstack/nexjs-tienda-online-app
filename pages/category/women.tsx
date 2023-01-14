import { Typography } from "@mui/material";
import { ShopLayout } from "../../components/layouts";
import { ProductList } from "../../components/products";
import { FullScreenLoading } from "../../components/ui";
import { useProducts } from "../../hooks";

export default function WomenPage() {
    const { products, isLoading } = useProducts("/products?gender=women");

    return (
        <ShopLayout
            title={"Tienda Online - Women"}
            pageDescription={"Encuentra los mejores productos online para mujeres"}>
            <Typography variant="h1" component="h1">
                Mujeres
            </Typography>
            <Typography variant="h2" sx={{ mb: 1 }}>
                Productos para ellas
            </Typography>

            {isLoading ? (
                <FullScreenLoading />
            ) : (
                <ProductList products={products} />
            )}
        </ShopLayout>
    );
}
