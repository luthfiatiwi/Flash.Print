import { useEffect, useState } from "react";
import ProductSection from "../section/ProductSections"
import MainLayout from "../layout/MainLayout"
import { ProductsContext } from "../contexts/products"

export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetch("https://script.google.com/macros/s/AKfycbzo0OKX6fVOe16ndna0_x1yg4i0KShekL4HxKuFWbVqTE2_C_j7tEilcW6Emk35Qt2OPw/exec")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data.products);
            });
    }, []);

    return (
        <ProductsContext.Provider value={{ products, setProducts, loading, setLoading }}>
            <MainLayout>
                <ProductSection />
            </MainLayout>
        </ProductsContext.Provider>



    )
}