import Container from "../layout/Container";
import ButtonOrder from "../ui/ButtonOrder";
import { Link } from "react-router";

export default function CardProduct({ price }) {
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
                    <div className="card bg-base-100 w-full shadow-sm border-red-800 border-4 rounded-2xl">
                        <figure className="px-7 pt-7">
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                                alt="Shoes"
                                className="rounded-xl" />
                        </figure>
                        <div className="card-body">
                            <h2 className="text-2xl font-serif font-bold ">Card Title</h2>
                            <p>{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(price)}</p>
                            <div className="card-actions flex justify-center">
                                <Link className="w-full" to="/checkout">
                                    <ButtonOrder className=" border-2 border-white font-bold rounded w-full h-10 flex justify-center items-center px-2 py-1">
                                        <img className="w-6 h-6" src="/keranjang.svg" />
                                    </ButtonOrder>
                                </Link>
                            </div>
                        </div>

                    </div>

                </div>

            </section>
        </Container>

    )
}