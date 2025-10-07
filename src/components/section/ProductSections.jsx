import { useEffect, useState } from "react"
import CardProduct from "../blocks/CardProduct";
import Container from "../layout/Container";

export default function ProductSections() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // untuk pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    // untuk searching

    const fetchProducts = () => {
        setLoading(true);
        // SOLUSI: Tambahkan parameter 'page=' dan pastikan pemisah '&' ada sebelum 'limit'
        let url =
            "https://script.google.com/macros/s/AKfycbwyATRhlwyNorgWg5HTxp_IRlMQeLbkrXh9aMAn8wXt7AOywyza-jDJJgcZud3ANFDG_A/exec?path=products" +
            "&page=" + // Parameter untuk halaman
            currentPage +
            "&limit=12";


        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                if (currentPage === 1) {
                    setProducts(data.data || []);
                } else {
                    // Gabungkan produk lama dengan produk baru
                    const oldProducts = products;
                    const newProducts = data.data || [];
                    setProducts(oldProducts.concat(newProducts));
                }
                setHasMore((data.data || []).length === 12);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error:", error);
                setProducts([]);
                setLoading(false);
            });
    };

    useEffect(() => {
        // Dipanggil saat komponen mount dan setiap kali currentPage berubah
        fetchProducts();
    }, [currentPage]); // Tambahkan currentPage sebagai dependency

    const handleLoadMore = () => {
        // Cukup update currentPage, fetch akan otomatis dipanggil oleh useEffect
        setCurrentPage(prevPage => prevPage + 1);
    };

    return (
        <Container>
            <section className="my-8">
                <h3 className="font-serif font-bold text-3xl flex justify-center items-center">Produk Kami</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6 my-8 items-center">


                    {
                        products !== null && products.length > 0 ? (
                            products.map(function (product) {
                                return (
                                    <CardProduct
                                        key={product.id}
                                        image={product.image}
                                        title={product.title}
                                        price={product.price}
                                    />
                                )
                            })
                        ) : loading ? (
                            <>
                                <CardProduct />
                                <CardProduct />
                                <CardProduct />
                                <CardProduct />
                            </>
                        ) : (
                            <p>Tidak Ada Data</p>
                        )
                    }

                </div>
                {/* Load More Button */}
                {hasMore && (
                    <div className="text-center mb-10">
                        {loading ? (
                            <div className="inline-flex items-center gap-2 px-8 py-3 bg-gray-100 text-gray-600 rounded-xl">
                                <div className="animate-spin rounded-full h-5 w-5 border-2 border-solid border-blue-600 border-r-transparent"></div>
                                Loading...
                            </div>
                        ) : (
                            <button
                                onClick={handleLoadMore}
                                className="px-8 py-3 border-4 border-red-900 bg-red-900 hover:bg-white hover:border-red-900 hover:text-red-900 text-white rounded-xl transition-all duration-300 font-semibold transform"
                            >
                                Load More Products
                            </button>
                        )}
                    </div>
                )}
            </section>
        </Container>
    )
}

