import { useContext } from "react";
import Search from "../icons/Search";
import Container from "../layout/Container";
import Input from "../ui/Input";
import { ProductsContext } from "../contexts/products";

export default function Navbar() {
    const { setProducts, setLoading } = useContext(ProductsContext)


    function searchProduct() {
        const inputValue = document.querySelector("input").value;
        if (!inputValue.trim()) return;

        setLoading(true)
        setProducts([])
        fetch("https://script.google.com/macros/s/AKfycbzo0OKX6fVOe16ndna0_x1yg4i0KShekL4HxKuFWbVqTE2_C_j7tEilcW6Emk35Qt2OPw/exec?path=products&search=" + encodeURIComponent(inputValue))
            .then((res) => res.json())
            .then((data) => {
                console.log("data", data);
                setProducts(data.data);
                setLoading(false);
            })
            .catch((err) => console.error("Error:", err));
    }



    return (
        <nav className="bg-white shadow sticky top-0 py-2 px-4 z-50">
            <Container className={"flex flex-col gap-3 sm:flex-row sm:gap-0 sm:justify-between sm:items-center px-0 sm:px-4 py-2 w-full"}>
                {/* Logo */}
                <a href="/" className="text-3xl font-serif text-red-900 font-bold hover:opacity-50 transition-all mb-2 sm:mb-0 text-center sm:text-left w-full sm:w-auto">Flash.Print</a>

                {/* Search Bar */}
                <div className="relative flex items-center w-full sm:w-2/3 md:w-1/2 lg:w-[600px] font-serif mx-auto sm:mx-0">
                    <Input
                        type="text"
                        placeholder="Anda Ingin Cetak Apa ?"
                        className="w-full px-4 py-1" />
                    <button
                        onClick={searchProduct}
                        className="absolute right-0 top-0 h-full px-4 text-white bg-red-900 hover:bg-white hover:text-red-900 border-4 border-red-900 rounded-r-md flex items-center justify-center">
                        <span className="flex items-center gap-1">
                            <Search />
                            Cari</span>
                    </button>
                </div>
            </Container>
        </nav>
    )
} 
