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

    // 🆕 Panjang, Lebar, dan Warna
    const [lengthCm, setLengthCm] = useState("");
    const [widthCm, setWidthCm] = useState("");
    const [color, setColor] = useState("");

    // 🆕 Total harga hasil kalkulasi
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if (selectedProduct) {
            setProduct(selectedProduct);
        } else {
            const id = window.location.pathname.split("/").pop();
            fetch(
                `https://script.google.com/macros/s/AKfycbxw6xBzeVctTEeU7iaKjFwcHHVA1O7TG7QK7hO4NPVhxwFpzQBXXHgeaYod8kfTPYNbNw/exec?path=detail-product&id=${id}`
            )
                .then((res) => res.json())
                .then((data) => setProduct(data.data))
                .catch((err) => console.error("Error fetching product:", err));
        }
    }, [selectedProduct]);

    // Produk custom size → ID 38–43
    const isCustomSize =
        product && [38, 39, 40, 41, 42, 43].includes(Number(product.id));
    const isCalculatedSize = product && [38, 39, 40].includes(Number(product.id));
    const isColorRequired = product && [41, 42, 43].includes(Number(product.id));

    // 🧮 Kalkulasi otomatis hanya untuk ID 38–40
    useEffect(() => {
        if (isCalculatedSize && lengthCm && widthCm && product?.price) {
            const panjang = parseFloat(lengthCm);
            const lebar = parseFloat(widthCm);
            const hargaDasar = parseFloat(product.price);

            if (!isNaN(panjang) && !isNaN(lebar) && !isNaN(hargaDasar)) {
                const luasMeter = (panjang * lebar) / 10000; // cm → m²
                const total = luasMeter * hargaDasar * quantity;

                if (total < hargaDasar) {
                    setTotalPrice(hargaDasar);
                } else {
                    setTotalPrice(total);
                }
            } else {
                setTotalPrice(0);
            }
        } else {
            // produk biasa & 41–43 → harga dasar x qty
            setTotalPrice((product?.price || 0) * quantity);
        }
    }, [isCalculatedSize, lengthCm, widthCm, quantity, product]);

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

    // ===== COUNTER =====
    const handleQuantityIncrease = () =>
        setQuantity((prev) => (parseInt(prev, 10) || 0) + 1);
    const handleQuantityDecrease = () =>
        setQuantity((prev) => (parseInt(prev, 10) || 0) > 1 ? prev - 1 : 1);
    const handleQuantityChange = (e) => {
        const val = e.target.value;
        if (val === "") setQuantity("");
        else {
            const num = parseInt(val, 10);
            if (!isNaN(num)) setQuantity(num < 1 ? 1 : num);
        }
    };
    const handleQuantityBlur = () => {
        if (
            quantity === "" ||
            parseInt(quantity, 10) < 1 ||
            isNaN(parseInt(quantity, 10))
        ) {
            setQuantity(1);
        }
    };

    // ===== WHATSAPP =====
    const whatsappNumber = "+62895421837105"; // ganti nomor kamu
    const handleOrderNow = () => {
        const productName = product.title || "Produk Tidak Dikenal";
        const price = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(product.price || 0);

        const totalHargaStr = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(totalPrice || 0);

        const qty = parseInt(quantity, 10) || 1;
        const notesValue = notes.trim() || "Tidak ada catatan khusus.";

        const sizeText = isCustomSize
            ? `\n*Ukuran:* ${lengthCm || "-"} cm (Panjang) x ${widthCm || "-"} cm (Lebar)`
            : "";

        const colorText = isColorRequired ? `*Warna:* ${color || "-"}\n` : "";

        const message =
            `Halo, saya ingin order cetak dengan detail berikut:\n\n` +
            `*Produk:* ${productName}\n` +
            `*Harga Satuan:* ${price}\n` +
            (isCustomSize ? sizeText + "\n" : "") +
            colorText +
            `*Jumlah Cetak:* ${qty} kali\n` +
            (!isCustomSize ? `*Cetak Sisi:* ${selectedSide}\n` : "") +
            `*Total Harga:* ${totalHargaStr}\n` +
            `*Catatan:* ${notesValue}\n\n` +
            `Mohon diproses, terima kasih.`;

        const encoded = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encoded}`;
        window.open(whatsappURL, "_blank");
    };

    // ======================== RENDER ========================
    return (
        <MainLayout>
            <Container>
                <section className="my-8">
                    <h2 className="text-2xl font-serif font-bold text-center mb-10">
                        {product.title}
                    </h2>

                    <div className="flex flex-col md:flex-row md:gap-8 gap-6 items-stretch">
                        {/* Gambar */}
                        <div className="w-full md:w-1/2 rounded-lg overflow-hidden border-4 border-red-800 bg-gray-100 flex-shrink-0 
                            h-64 sm:h-80 md:h-auto">
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

                        {/* Detail */}
                        <div className="w-full md:w-1/2 border-4 border-red-800 rounded-lg p-4 sm:p-6 bg-white shadow-lg font-serif 
                            flex flex-col justify-between">
                            <h2 className="text-2xl md:text-3xl font-bold mb-2">
                                {product.title}
                            </h2>
                            <p className="text-lg font-bold text-red-800 mb-2">
                                Harga Satuan:{" "}
                                {new Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                }).format(product.price || 0)}
                            </p>
                            <p className="text-lg text-gray-600 mb-4">
                                {product.description || "Tidak ada deskripsi produk tersedia."}
                            </p>

                            {/* Cetak Sisi */}
                            {!isCustomSize && (
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
                            )}

                            {/* Panjang & Lebar */}
                            {isCustomSize && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                    <div>
                                        <label className="font-semibold text-black block mb-1">
                                            Panjang (Cm)
                                        </label>
                                        <input
                                            type="number"
                                            value={lengthCm}
                                            onChange={(e) => setLengthCm(e.target.value)}
                                            className="w-full p-3 border-4 border-red-900 rounded-lg"
                                            placeholder="Masukkan panjang..."
                                        />
                                    </div>
                                    <div>
                                        <label className="font-semibold text-black block mb-1">
                                            Lebar (Cm)
                                        </label>
                                        <input
                                            type="number"
                                            value={widthCm}
                                            onChange={(e) => setWidthCm(e.target.value)}
                                            className="w-full p-3 border-4 border-red-900 rounded-lg"
                                            placeholder="Masukkan lebar..."
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Warna */}
                            {isColorRequired && (
                                <div className="mb-6">
                                    <label className="font-semibold text-black block mb-1">
                                        Warna
                                    </label>
                                    <input
                                        type="text"
                                        value={color}
                                        onChange={(e) => setColor(e.target.value)}
                                        className="w-full p-3 border-4 border-red-900 rounded-lg"
                                        placeholder="Masukkan warna (misal: Merah, Biru, Hitam)"
                                    />
                                </div>
                            )}

                            {/* Total Harga */}
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold text-gray-800">
                                    Total Harga:{" "}
                                    <span className="text-red-800 font-bold">
                                        {new Intl.NumberFormat("id-ID", {
                                            style: "currency",
                                            currency: "IDR",
                                        }).format(totalPrice || 0)}
                                    </span>
                                </h3>
                            </div>

                            {/* Catatan */}
                            <div className="mb-6">
                                <h3 className="font-semibold text-black text-xl mb-2">
                                    Catatan
                                </h3>
                                <input
                                    type="text"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    className="w-full p-3 border-4 border-red-900 rounded-lg"
                                    placeholder="Tulis catatan Anda di sini..."
                                />
                            </div>

                            {/* Jumlah */}
                            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                <h3 className="text-xl font-semibold">
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
                                        className="w-20 text-center py-2 border-4 border-red-900 font-semibold rounded-md text-black text-lg h-9"
                                        min="1"
                                    />
                                    <Counter onClick={handleQuantityIncrease} className="h-9">
                                        +
                                    </Counter>
                                </div>
                            </div>

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
