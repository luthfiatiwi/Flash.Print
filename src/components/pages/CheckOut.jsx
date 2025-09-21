import Container from "../layout/Container"
import MainLayout from "../layout/MainLayout"
import ButtonOrder from "../ui/ButtonOrder"
import Counter from "../ui/Counter"



export default function CheckOut() {

    return (
        <MainLayout>
            <Container>
                <section className="my-8">
                    <h2 className="text-2xl font-serif font-bold text-center mb-10">A4 HVS Hitam Putih</h2>

                    <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-8">

                        {/* Bagian untuk Gambar Produk */}
                        <div className="w-full md:w-1/2 bg-red-600 rounded-lg h-96">
                            {/* Placeholder untuk gambar produk */}
                        </div>

                        {/* Bagian untuk Detail Produk */}
                        <div className="w-full md:w-1/2 border-2 border-red-800 rounded-lg p-6 bg-white shadow-lg font-serif">
                            <h2 className="text-2xl md:text-3xl font-bold mb-2">A4 HVS Hitam Putih</h2>
                            <p className="text-lg text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit, facilis. Ipsam omnis illum consequuntur iste ex rerum ratione eligendi corporis.</p>

                            <div className="mb-6">
                                <h3 className="text-xl font-semibold mb-2">Cetak Sisi</h3>
                                <div className="flex space-x-4">
                                    <ButtonOrder className="border-2 border-red-800 w-full rounded-md text-red-800 font-semibold transition duration-300 hover:text-white h-3 flex justify-center items-center p-2">
                                        1 Sisi
                                    </ButtonOrder>
                                    <ButtonOrder className="border-2 border-red-800 w-full rounded-md text-red-800 font-semibold transition duration-300 hover:text-white flex justify-center items-center h-3 p-2">
                                        2 Sisi
                                    </ButtonOrder>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-xl font-semibold mb-2">Catatan</h3>
                                <textarea
                                    className="w-full border-2 border-red-800 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-800"
                                    placeholder="Tulis catatan Anda di sini..."
                                ></textarea>
                            </div>

                            <div className="mb-6 flex justify-between">
                                <h3 className="text-xl font-semibold mb-2">Jumlah ( Cetak Berapa Kali )</h3>
                                <div className="flex justify-end space-x-2">
                                    <Counter className="border-2 border-red-800 rounded-md w-10 h-10 flex items-center justify-center text-red-800  hover:text-white font-bold text-2xl">
                                        -
                                    </Counter>
                                    <div className="border-2 border-red-800 rounded-md w-16 h-10 flex items-center justify-center text-xl font-semibold">
                                        1
                                    </div>
                                    <button className="border-2 border-red-800 rounded-md w-10 h-10 flex items-center justify-center text-red-800 hover:bg-red-800  hover:text-white font-bold text-2xl">
                                        +
                                    </button>
                                </div>
                            </div>

                            <ButtonOrder className="border-2 border-red-800 w-full  text-red-800 hover:text-white font-bold py-3 rounded-md transition duration-300 h-10 flex justify-center items-center">
                                Order Sekarang
                            </ButtonOrder>
                        </div>
                    </div>
                </section>
            </Container>
        </MainLayout >
    );
};