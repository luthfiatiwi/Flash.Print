import Container from "../layout/Container";

export default function Navbar() {
    return (
        <nav className="bg-white shadow">
            <Container className={"flex justify-between items-center px-4 py-2"}>

                {/* Logo */}
                <h5 className="text-3xl font-serif text-red-900">Flash.Print</h5>

                {/* Search Bar */}
                <div className="relative flex items-center w-[900px]">
                    <input type="text"
                        placeholder="Anda Ingin Cetak Apa ?"
                        className="w-full px-4 py-1 text-white bg-red-800 rounded-md focus:outline-none placeholder-white " />
                    <button className="absolute right-0 top-0 h-full px-4 text-white bg-red-950 rounded-r-md flex items-center justify-center hover:bg-red-700">
                        <span className="flex items-center gap-1">
                            <img src="/search.svg" />
                            Cari</span>
                    </button>
                </div>


            </Container>
        </nav >
    )
}