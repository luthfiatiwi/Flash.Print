import Container from "../layout/Container";

export default function Navbar() {
    return (
        <nav className="bg-white shadow">
            <Container className={"flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center px-4 py-2"}>
                {/* Logo */}
                <h5 className="text-3xl font-serif text-red-900 mb-2 sm:mb-0 text-center sm:text-left">Flash.Print</h5>
                {/* Search Bar */}
                <div className="relative flex items-center w-full max-w-full sm:max-w-xl">
                    <input type="text"
                        placeholder="Anda Ingin Cetak Apa ?"
                        className="w-full sm:w-80 px-4 py-1 text-white bg-red-800 rounded-md focus:outline-none placeholder-white " />
                    <button className="absolute right-0 top-0 h-full px-4 text-white bg-red-950 rounded-r-md flex items-center justify-center hover:bg-red-700">
                        <span className="ml-2 hidden sm:inline">Cari</span>
                    </button>
                </div>
            </Container>
        </nav>
    );
}