import Container from "../layout/Container";
import MainLayout from "../layout/MainLayout";
import ButtonOrder from "../ui/ButtonOrder";
import Counter from "../ui/Counter";
import { useState, useContext, useEffect } from "react";
import { ProductsContext } from "../contexts/products";

export default function CheckOut() {
    const { selectedProduct } = useContext(ProductsContext);
    const [product, setProduct] = useState(null);

    const [selectedSide, setSelectedSide] = useState("1 Sisi");
    const [notes, setNotes] = useState("");
    const [quantity, setQuantity] = useState(1);

    // ✅ Ambil data produk dari context atau dari URL jika user reload halaman
    useEffect(() => {

        if (selectedProduct) {
            setProduct(selectedProduct);
        } else {
            // Ambil id dari URL (misal /product/123)
            const id = window.location.pathname.split("/").pop();
            fetch(
                `https://script.google.com/macros/s/AKfycbxw6xBzeVctTEeU7iaKjFwcHHVA1O7TG7QK7hO4NPVhxwFpzQBXXHgeaYod8kfTPYNbNw/exec?path=detail-product&id=${id}`
            )
                .then((res) => res.json())
                .then((data) => setProduct(data.data))
                .catch((err) => console.error("Error fetching product:", err));
        }
    }, [selectedProduct]);

    // Tampilkan loading jika belum ada data produk
    if (!product)
        return (
            <MainLayout>
                <Container>
                    <p className="text-center my-10 text-lg font-semibold text-gray-700">
                        Memuat produk...
                    </p>
                </Container>
            </MainLayout>
        );

    // ===== LOGIKA COUNTER =====
    const handleQuantityIncrease = () => setQuantity((prev) => (parseInt(prev, 10) || 0) + 1);
    const handleQuantityDecrease = () => setQuantity((prev) => (parseInt(prev, 10) || 0) > 1 ? prev - 1 : 1);
    const handleQuantityChange = (e) => {
        const val = e.target.value;
        if (val === "") setQuantity("");
        else {
            const num = parseInt(val, 10);
            if (!isNaN(num)) setQuantity(num < 1 ? 1 : num);
        }
    };
    const handleQuantityBlur = () => {
        if (quantity === "" || parseInt(quantity, 10) < 1 || isNaN(parseInt(quantity, 10))) {
            setQuantity(1);
        }
    };

    // ===== LOGIKA WHATSAPP =====
    const whatsappNumber = "0000000000"; // Ganti dengan nomor aktif kamu
    const handleOrderNow = () => {
        const productName = product.title || "Produk Tidak Dikenal";
        const price = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(product.price || 0);
        const printSide = selectedSide;
        const qty = parseInt(quantity, 10) || 1;
        const notesValue = notes.trim() || "Tidak ada catatan khusus.";

        const message =
            `Halo, saya ingin order cetak dengan detail berikut:\n\n` +
            `*Produk:* ${productName}\n` +
            `*Harga:* ${price}\n` +
            `*Cetak Sisi:* ${printSide}\n` +
            `*Jumlah Cetak:* ${qty} kali\n` +
            `*Catatan:* ${notesValue}\n\n` +
            `Mohon diproses, terima kasih.`;

        const encoded = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encoded}`;
        window.open(whatsappURL, "_blank");
    };

    return (
        <MainLayout>
            <Container>
                <section className="my-8">
                    <h2 className="text-2xl font-serif font-bold text-center mb-10">
                        {product.title}
                    </h2>

                    <div className="flex flex-col gap-6 md:flex-row md:gap-8 items-center md:items-start">
                        {/* Gambar Produk */}
                        <div className="w-full sm:w-3/4 md:w-1/2 rounded-lg h-56 sm:h-72 md:h-96 mx-auto md:mx-0 flex-shrink-0 overflow-hidden border-4 border-red-800 bg-gray-100">
                            {product.image ? (
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    Tidak ada gambar
                                </div>
                            )}
                        </div>

                        {/* Detail Produk */}
                        <div className="w-full sm:w-3/4 md:w-1/2 border-4 border-red-800 rounded-lg p-4 sm:p-6 bg-white shadow-lg font-serif mx-auto md:mx-0">
                            {/* Nama Produk */}
                            <h2 className="text-2xl md:text-3xl font-bold mb-2">
                                {product.title}
                            </h2>

                            {/* Harga */}
                            <p className="text-lg font-bold text-red-800 mb-2">
                                {new Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                }).format(product.price || 0)}
                            </p>

                            {/* Deskripsi */}
                            <p className="text-lg text-gray-600 mb-4">
                                {product.description ||
                                    "Tidak ada deskripsi produk tersedia."}
                            </p>

                            {/* Pilihan Cetak Sisi */}
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold mb-2">Cetak Sisi</h3>
                                <div className="flex space-x-4">
                                    {["1 Sisi", "2 Sisi"].map((side) => (
                                        <button
                                            key={side}
                                            onClick={() => setSelectedSide(side)}
                                            className={`flex-1 py-2 px-4 rounded-lg font-bold transition duration-200 h-10
                                            ${selectedSide === side
                                                    ? "bg-red-800 text-white"
                                                    : "bg-white text-red-800 border-4 border-red-800 hover:bg-red-50"
                                                }`}
                                        >
                                            {side}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Catatan */}
                            <div className="mb-6">
                                <h3 className="font-semibold text-black text-xl mb-2">Catatan</h3>
                                <input
                                    type="text"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    className="w-full p-3 border-4 border-red-900 rounded-lg"
                                    placeholder="Tulis catatan Anda di sini..."
                                />
                            </div>

                            {/* Jumlah */}
                            <div className="mb-6 flex justify-between">
                                <h3 className="text-xl font-semibold mb-2">
                                    Jumlah (Cetak Berapa Kali)
                                </h3>
                                <div className="flex justify-end space-x-2">
                                    <Counter onClick={handleQuantityDecrease} className="h-9">
                                        -
                                    </Counter>

                                    <input
                                        type="number"
                                        value={quantity}
                                        onChange={handleQuantityChange}
                                        onBlur={handleQuantityBlur}
                                        className="w-full text-center py-2 border-4 border-red-900 font-semibold rounded-md text-black text-lg h-9"
                                        min="1"
                                    />

                                    <Counter onClick={handleQuantityIncrease} className="h-9">
                                        +
                                    </Counter>
                                </div>
                            </div>

                            {/* Tombol WhatsApp */}
                            <ButtonOrder onClick={handleOrderNow} className="w-full h-10">
                                Order Sekarang
                            </ButtonOrder>
                        </div>
                    </div>
                </section>
            </Container>
        </MainLayout>
    );
}
