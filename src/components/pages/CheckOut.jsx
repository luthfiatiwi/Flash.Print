import Container from "../layout/Container"
import MainLayout from "../layout/MainLayout"
import ButtonOrder from "../ui/ButtonOrder"
import Counter from "../ui/Counter"
import Input from "../ui/Input";



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

                            {/* nama produk */}
                            <h2 className="text-2xl md:text-3xl font-bold mb-2">A4 HVS Hitam Putih</h2>

                            {/* deskripsi produk */}
                            <p className="text-lg text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit, facilis. Ipsam omnis illum consequuntur iste ex rerum ratione eligendi corporis.</p>

                            {/* opsi */}
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold mb-2">Cetak Sisi</h3>
                                <div className="flex space-x-4">
                                    <ButtonOrder className="w-full h-3 p-2">
                                        1 Sisi
                                    </ButtonOrder>
                                    <ButtonOrder className=" w-full  h-3 p-2">
                                        2 Sisi
                                    </ButtonOrder>
                                </div>
                            </div>

                            {/* input catatan */}
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold mb-2">Catatan</h3>
                                <Input
                                    className="p-2 h-12"
                                    placeholder="Tulis catatan Anda di sini..."
                                />
                            </div>

                            {/* input jumlah cetak */}
                            <div className="mb-6 flex justify-between">
                                <h3 className="text-xl font-semibold mb-2">Jumlah ( Cetak Berapa Kali )</h3>
                                <div className="flex justify-end space-x-2">
                                    <Counter className="w-16 h-10">
                                        -
                                    </Counter>
                                    <div className="border-2 border-red-900 rounded-md w-16 h-10 flex items-center justify-center text-xl font-semibold">
                                        1
                                    </div>
                                    <Counter className="w-16 h-10">
                                        +
                                    </Counter>
                                </div>
                            </div>

                            {/* button ke whatsaap */}
                            <ButtonOrder className=" w-full h-10">
                                Order Sekarang
                            </ButtonOrder>

                        </div>
                    </div>
                </section>
            </Container>
        </MainLayout >
    );
};