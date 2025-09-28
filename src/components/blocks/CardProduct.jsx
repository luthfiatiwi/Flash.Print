import Busket from "../icons/Busket"
import ButtonOrder from "../ui/ButtonOrder";
import { Link } from "react-router";

export default function CardProduct({ price, image, title, }) {

    // cek data
    if (!price && !image && !title) {
        return (<CardProductSkeleton />)


    }


    return (
        <div className="card bg-base-100 w-full shadow-sm border-red-800 border-4 rounded-2xl">
            {/* gambar */}
            <figure className="px-7 pt-7">
                <img
                    src={image}
                    alt="gambar product"
                    className="rounded-xl h-48 bg-gray-500 w-full" />
            </figure>


            <div className="card-body">
                {/* tittle */}
                <h3 className="text-2xl font-serif font-bold ">{title}</h3>

                {/* price */}
                <p className="font-serif text-[20px] font-bold">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(price)}</p>

                {/* button keranjang */}
                <div className="card-actions flex justify-center">
                    <Link className="w-full" to="/checkout">
                        <ButtonOrder className="w-full h-10">
                            <Busket className="h-6 w-8 " />
                        </ButtonOrder>
                    </Link>
                </div>
            </div>

        </div>

    )
}
function CardProductSkeleton() {
    return (
        <div className="card bg-base-100 w-full shadow-sm border-red-800 border-4 rounded-2xl animate-pulse">

            {/* gambar skeleton */}
            <figure className="px-7 pt-7">
                <div className="w-full h-48 bg-gray-300 rounded-xl dark:bg-gray-700"></div>
            </figure>

            <div className="card-body">

                {/* tittle skeleton */}
                <h3 className="h-6 w-3/4 bg-gray-300 rounded-lg dark:bg-gray-700 mb-2"></h3>

                {/* price skeleton */}
                <p className="h-5 w-1/2 bg-gray-300 rounded-lg dark:bg-gray-700 mb-6"></p>

                {/* button keranjang skeleton */}
                <div className="card-actions flex justify-center">
                    <div className="w-full">
                        <div className="w-full h-10 bg-gray-300 rounded-lg dark:bg-gray-700"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

