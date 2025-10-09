import { useEffect, useState } from "react";
import ProductSections from "../section/ProductSections";
import MainLayout from "../layout/MainLayout";
import { ProductsContext } from "../contexts/products";

export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const limit = 8;

    useEffect(() => {
        fetchProducts(1);
    }, []);

    const fetchProducts = async (pageNumber) => {
        setLoading(true);
        try {
            const res = await fetch(
                `https://script.google.com/macros/s/AKfycbxw6xBzeVctTEeU7iaKjFwcHHVA1O7TG7QK7hO4NPVhxwFpzQBXXHgeaYod8kfTPYNbNw/exec?path=products&page=${pageNumber}&limit=${limit}`,
                { method: "GET", redirect: "follow", mode: "cors" }
            );

            const data = await res.json();

            const newProducts = Array.isArray(data.data) ? data.data : [];

            if (pageNumber === 1) {
                setProducts(newProducts);
            } else {
                setProducts((prev) => [...prev, ...newProducts]);
            }

            return newProducts.length;
        } catch (err) {
            console.error("Gagal mengambil produk:", err);
            return 0;
        } finally {
            setLoading(false);
        }
    };

    const loadMoreProducts = async () => {
        const nextPage = page + 1;
        const newCount = await fetchProducts(nextPage);

        if (newCount > 0) {
            setPage(nextPage);
        }

        return newCount;
    };

    return (
        <ProductsContext.Provider
            value={{
                products,
                setProducts,
                loading,
                setLoading,
                loadMoreProducts,
                selectedProduct,
                setSelectedProduct,
            }}
        >
            <MainLayout>
                <ProductSections />
            </MainLayout>
        </ProductsContext.Provider>
    );
}
