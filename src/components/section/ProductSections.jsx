import { useContext, useState } from "react";
import CardProduct from "../blocks/CardProduct";
import Container from "../layout/Container";
import { ProductsContext } from "../contexts/products";

export default function ProductSections() {
    const { products, loading, loadMoreProducts } = useContext(ProductsContext);
    const [hasMore, setHasMore] = useState(true);
    const [firstLoad, setFirstLoad] = useState(true);

    const handleLoadMore = async () => {
        setFirstLoad(false);
        const newProductsCount = await loadMoreProducts();
        if (newProductsCount === 0) {
            setHasMore(false);
        }
    };

    return (
        <Container>
            <section className="my-8">
                <h3 className="font-serif font-bold text-3xl flex justify-center items-center">
                    Produk Kami
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6 my-8 items-center">

                    {products && products.length > 0 ? (
                        products.map((product) => (
                            <CardProduct
                                key={product.id}
                                product={product}
                            />
                        ))
                    ) : loading && firstLoad ? (

                        <>
                            <CardProduct />
                            <CardProduct />
                            <CardProduct />
                            <CardProduct />
                        </>
                    ) : (
                        <p className="col-span-full text-center text-gray-600 font-medium">
                            Tidak Ada Data
                        </p>
                    )}
                </div>


                {hasMore && (
                    <div className="text-center mb-10">
                        {loading && !firstLoad ? (
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
    );
}
