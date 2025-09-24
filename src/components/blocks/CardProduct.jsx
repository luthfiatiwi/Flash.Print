import Busket from "../icons/Busket"
import ButtonOrder from "../ui/ButtonOrder";
import { Link } from "react-router";

export default function CardProduct({ price, image, title, }) {
    return (
        <div className="card bg-base-100 w-full shadow-sm border-red-800 border-4 rounded-2xl">
            {/* gambar */}
            <figure className="px-7 pt-7">
                <img
                    src={image}
                    alt="gambar product"
                    className="rounded-xl" />
            </figure>


            <div className="card-body">
                {/* tittle */}
                <h3 className="text-2xl font-serif font-bold ">{title}</h3>

                {/* price */}
                <p className="font-serif text-[20px] font-bold">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(price)}</p>

                {/* button keranjang */}
                <div className="card-actions flex justify-center">
                    <Link className="w-full" to="/checkout">
                        <ButtonOrder className="w-full h-10 flex justify-center items-center px-2 py-1">
                            <Busket className="h-7 w-8 " />
                        </ButtonOrder>
                    </Link>
                </div>
            </div>

        </div>

    )
}