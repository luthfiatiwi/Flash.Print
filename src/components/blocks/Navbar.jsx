import Search from "../icons/Search";
import Container from "../layout/Container";
import Input from "../ui/Input";

export default function Navbar() {
    return (
        <nav className="bg-white shadow sticky top-0 py-2 px-4 z-50">
            <Container className={"flex flex-col gap-3 sm:flex-row sm:gap-0 sm:justify-between sm:items-center px-0 sm:px-4 py-2 w-full"}>
                {/* Logo */}
                <a href="/" className="text-3xl font-serif text-red-900 font-bold hover:opacity-50 transition-all mb-2 sm:mb-0 text-center sm:text-left w-full sm:w-auto">Flash.Print</a>

                {/* Search Bar */}
                <div className="relative flex items-center w-full sm:w-2/3 md:w-1/2 lg:w-[600px] font-serif mx-auto sm:mx-0">
                    <Input type="text"
                        placeholder="Anda Ingin Cetak Apa ?"
                        className="w-full px-4 py-1" />
                    <button className="absolute right-0 top-0 h-full px-4 text-white bg-red-900 hover:bg-white hover:text-red-900 border-4 border-red-900 rounded-r-md flex items-center justify-center">
                        <span className="flex items-center gap-1">
                            <Search />
                            Cari</span>
                    </button>
                </div>
            </Container>
        </nav>
    )
} 