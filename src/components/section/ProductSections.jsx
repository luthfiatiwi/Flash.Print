import { useEffect, useState } from "react"
import CardProduct from "../blocks/CardProduct";
import Container from "../layout/Container";

export default function ProductSections() {
    const [products, setProducts] = useState(null)
    const [isLoading, setLoading] = useState(false)
    // mounting
    useEffect(function () {
        fetch('https://script.google.com/macros/s/AKfycbwDJX3N7vGYiroTEMCVREu9Rmv5i53SAuYN0hyJrw8mTMlkT4H-7PY0WnsvfMaVmua93g/exec')
            .then(function (response) {
                console.log(response)
                return response.json()
            })
            .then(function (response) {
                console.log("data", response)
                setProducts(response)
                setLoading(false)
            })
    }, [])



    return (
        <Container>
            <section className="my-8">
                <h3 className="font-serif font-bold text-3xl flex justify-center items-center">Produk Kami</h3>

                <div className="grid grid-cols-4 gap-6 my-8">


                    {
                        products !== null ?
                            products.map(function (product) {
                                return (
                                    <CardProduct
                                        key={product.id}
                                        image={product.image}
                                        title={product.title}
                                        price={product.price}
                                    />
                                )
                            }) :
                            products && !isLoading ? (
                                <CardProduct

                                />
                            ) : (
                                <CardProduct />
                            )



                    }
                </div>
            </section>
        </Container>
    )
}