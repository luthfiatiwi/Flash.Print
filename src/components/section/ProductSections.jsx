import { useEffect, useState } from "react"
import CardProduct from "../blocks/CardProduct";
import Container from "../layout/Container";

export default function ProductSections() {
    const [products, setProducts] = useState(null)

    // mounting
    useEffect(function () {
        fetch('https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLiaq0vtiqC5lUbp5QISKsCNKo78IlthRwKORMlZm4ARcdBW_mq-kBQBQ0TumD7ZK7AyvpSwWU7Zu6X9W1K0HonSQq9W9KIPckCzH7O0q8b0Y7CPbPRp6ApfVOeD2wVJuyREx7qUaApc2IGoEMH_XxW00mpuAaT1H9WWcOI-M_TkzY8o_ZKL9ra1EweE9f1McffhD2WiMjL8-yYj32hEJlpIaBF3Rg5KuO84Lud3EduRBmchX6GM7HwX6awzVscdpYcEe5_73KOoTDn1nUSqaHiXMslrcbRHAGCQoahy&lib=MRwva2RODuoJKcY1OrnynVx_6vdbiN_37')
            .then(function (response) {
                console.log(response)
                return response.json()
            })
            .then(function (response) {
                console.log("data", response)
                setProducts(response)
            })
    }, [])



    return (
        <Container>
            <section className="my-8">
                <h3 className="font-serif font-bold text-3xl flex justify-center items-center">Produk Kami</h3>

                <div className="grid grid-cols-4 gap-4">
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
                            }) : <p>Tidak Ada</p>
                    }
                </div>
            </section>
        </Container>
    )
}