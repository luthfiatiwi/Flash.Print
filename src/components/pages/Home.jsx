import { useEffect, useState } from "react";
import ProductSection from "../section/ProductSections"
import MainLayout from "../layout/MainLayout"
import { ProductsContext } from "../contexts/products"

export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false)



    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const res = await fetch("https://script.google.com/macros/s/AKfycbzo0OKX6fVOe16ndna0_x1yg4i0KShekL4HxKuFWbVqTE2_C_j7tEilcW6Emk35Qt2OPw/exec");
                const data = await res.json();
                const productList = Array.isArray(data) ? data : data.products || [];
                setProducts(productList);
            } catch (err) {
                console.error("Gagal mengambil produk:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);


    const loadMoreProducts = async () => {
        setLoading(true);
        try {
            const res = await fetch("https://script.google.com/macros/s/AKfycbzo0OKX6fVOe16ndna0_x1yg4i0KShekL4HxKuFWbVqTE2_C_j7tEilcW6Emk35Qt2OPw/exec");
            const data = await res.json();

            const newProducts = Array.isArray(data) ? data : data.products || [];

            // Tambahkan produk baru ke state
            setProducts(prev => [...prev, ...newProducts]);

            return newProducts.length; // penting untuk logika setHasMore
        } catch (error) {
            console.error("Gagal load produk:", error);
            return 0;
        } finally {
            setLoading(false);
        }
    };


    return (
        <ProductsContext.Provider value={{ products, setProducts, loading, setLoading, loadMoreProducts }}>
            <MainLayout>
                <ProductSection />
            </MainLayout>
        </ProductsContext.Provider>



    )
}