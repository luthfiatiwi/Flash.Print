import Container from "../layout/Container";

export default function CardProduct({ price }) {
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
                                <button className=" bg-red-700 text-white font-bold rounded w-full h-10 flex justify-center px-2 py-1">
                                    <img src="/keranjang.svg" />
                                </button>
                            </div>
                        </div>

                    </div>

                </div>

            </section>
        </Container>

    )
}