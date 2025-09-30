import Container from "../layout/Container"
import MainLayout from "../layout/MainLayout"
import ButtonOrder from "../ui/ButtonOrder"
import Counter from "../ui/Counter"
import Input from "../ui/Input"
import { useState } from "react"



export default function CheckOut() {

    // State untuk menyimpan pilihan sisi cetak (default: '1 Sisi')
    const [selectedSide, setSelectedSide] = useState('1 Sisi');

    // State untuk menyimpan catatan dari input
    const [notes, setNotes] = useState('');

    // State untuk menyimpan jumlah cetak (default: 1)
    const [quantity, setQuantity] = useState(1);


    // Fungsi untuk menangani penambahan jumlah
    const handleQuantityIncrease = () => {
        // Pastikan quantity saat ini adalah angka valid sebelum menambah
        setQuantity(prevQty => {
            const currentQty = parseInt(prevQty, 10) || 0;
            return currentQty + 1;
        });
    };

    // Fungsi untuk menangani pengurangan jumlah
    const handleQuantityDecrease = () => {
        setQuantity(prevQty => {
            const currentQty = parseInt(prevQty, 10) || 0;
            // Minimal 1
            return currentQty > 1 ? currentQty - 1 : 1;
        });
    };

    // FUNGSI: Menangani input manual pada jumlah cetak
    const handleQuantityChange = (e) => {
        const value = e.target.value;

        // Izinkan input string kosong sementara saat pengguna menghapus angka
        if (value === '') {
            setQuantity('');
        } else {
            let num = parseInt(value, 10);

            // Hanya izinkan input yang merupakan angka
            if (!isNaN(num)) {
                // Pastikan nilainya tidak kurang dari 1, walaupun pengguna mengetik 0 atau negatif
                setQuantity(num < 1 ? 1 : num);
            }
            // Jika input bukan angka (misalnya 'a'), abaikan perubahan state
        }
    };

    // FUNGSI: Menangani saat input kehilangan fokus (untuk memastikan nilai minimal 1)
    const handleQuantityBlur = () => {
        // Jika quantity adalah string kosong (setelah dihapus), kembalikan ke 1
        if (quantity === '' || parseInt(quantity, 10) < 1 || isNaN(parseInt(quantity, 10))) {
            setQuantity(1);
        }
    };

    // Nomor WhatsApp tujuan (GANTI DENGAN NOMOR ANDA)
    const whatsappNumber = '6281234567890'; // Contoh: Ganti dengan nomor WhatsApp aktif Anda


    // Fungsi untuk membuat dan membuka link WhatsApp
    const handleOrderNow = () => {
        const productName = 'A4 HVS Hitam Putih';
        const printSide = selectedSide;
        // Gunakan nilai state quantity, pastikan itu angka (atau minimal 1 jika state-nya string kosong)
        const quantityValue = parseInt(quantity, 10) || 1;
        const notesValue = notes.trim() || 'Tidak ada catatan khusus.';

        // Pesan yang akan dikirim ke WhatsApp
        const message =
            `Halo, saya ingin order cetak dengan detail berikut:\n\n` +
            `*Produk:* ${productName}\n` +
            `*Cetak Sisi:* ${printSide}\n` +
            `*Jumlah Cetak:* ${quantityValue} kali\n` +
            `*Catatan:* ${notesValue}\n\n` +
            `Mohon diproses, terima kasih.`;

        // Encode pesan agar aman untuk URL
        const encodedMessage = encodeURIComponent(message);

        // Buat URL WhatsApp
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        // Buka link WhatsApp di tab baru
        window.open(whatsappURL, '_blank');
    };



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

                            {/* button 1 sisi */}
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold mb-2">Cetak Sisi</h3>
                                <div className="flex space-x-4">
                                    <button
                                        onClick={() => setSelectedSide('1 Sisi')}
                                        className={`flex-1 py-2 px-4 rounded-lg font-bold transition duration-200 h-10
                                        ${selectedSide === '1 Sisi'
                                                ? 'bg-red-800 text-white h-10' // Selected Style
                                                : 'bg-white text-red-800 border-4 border-red-800 hover:bg-red-50 h-10' // Default Style
                                            }`
                                        }
                                    >
                                        1 Sisi
                                    </button>

                                    {/* button 2 Sisi */}
                                    <button
                                        onClick={() => setSelectedSide('2 Sisi')}
                                        className={`flex-1 py-2 px-4 rounded-lg font-bold transition duration-200 h-10
                                        ${selectedSide === '2 Sisi'
                                                ? 'bg-red-800 text-white h-10' // Selected Style
                                                : 'bg-white text-red-800 border-4 border-red-800 hover:bg-red-50 h-10' // Default Style
                                            }`
                                        }
                                    >
                                        2 Sisi
                                    </button>
                                </div>
                            </div>

                            {/* Bagian Catatan */}
                            <div className="mb-6">
                                <h3 className="font-semibold text-black text-xl mb-2">Catatan</h3>
                                <input
                                    type="text"
                                    id="notes-input"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    className="w-full p-3 border-4 border-red-900 rounded-lg"
                                    placeholder="Tulis catatan Anda di sini..."
                                />
                            </div>

                            {/* input jumlah cetak */}
                            <div className="mb-6 flex justify-between">
                                <h3 className="text-xl font-semibold mb-2">Jumlah (Cetak Berapa Kali)</h3>
                                <div className="flex justify-end space-x-2">
                                    {/* tombol kurang */}
                                    <Counter
                                        onClick={handleQuantityDecrease}
                                        className=" h-9">
                                        -
                                    </Counter>

                                    {/* input jumlah - dapat di edit dan divalidasi */}
                                    <input
                                        type="number"
                                        value={quantity}
                                        onChange={handleQuantityChange}
                                        onBlur={handleQuantityBlur} // Tambahkan ini untuk validasi saat fokus hilang
                                        className="w-full text-center py-2 border-4 border-red-900 font-semibold rounded-md text-black text-lg h-9"
                                        min="1"
                                    />
                                    <Counter
                                        onClick={handleQuantityIncrease}
                                        className=" h-9">
                                        +
                                    </Counter>
                                </div>
                            </div>

                            {/* button ke whatsaap */}
                            <ButtonOrder
                                onClick={handleOrderNow}
                                className=" w-full h-10">
                                Order Sekarang
                            </ButtonOrder>

                        </div>
                    </div>
                </section>
            </Container>
        </MainLayout >
    );
};