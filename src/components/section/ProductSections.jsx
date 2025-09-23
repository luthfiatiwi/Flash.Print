import Container from "../layout/Container";

export default function CardProduct() {
    const [product, setProducts] = useState(null)

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
    })



    return (
        <Container>
            <section className="my-8">
                <h4 className="text-3xl flex item-center justify-center font-bold font-serif">Produk Kami</h4>

                <div className="grid grid-cols-4 gap-5 mt-12">

                    {
                        products !== null ?
                            products.products.map(function (product) {
                                return (
                                    <CardProduct
                                        key={product.id}
                                        image={product.images[0]}
                                        title={product.title}
                                        price={product.price}
                                    />)
                            }) : <p>tidak ada</p>
                    }

                </div>

            </section>
        </Container>

    )
}