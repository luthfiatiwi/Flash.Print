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
    const [selectedColorOption, setSelectedColorOption] = useState("Merah");
    const [selectedPolaroid, setSelectedPolaroid] = useState("Polaroid");
    const [notes, setNotes] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [name, setName] = useState("");

    const [lengthCm, setLengthCm] = useState("");
    const [widthCm, setWidthCm] = useState("");
    const [color, setColor] = useState("");
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

    const isCustomSize =
        product && [38, 39, 40, 41, 42, 43].includes(Number(product.id));
    const isCalculatedSize = product && [38, 39, 40].includes(Number(product.id));
    const isColorRequired = product && [41, 42, 43].includes(Number(product.id));
    const isColorOptionProduct =
        product && [26, 27, 28].includes(Number(product.id));
    const isPolaroidProduct = product && [29, 30, 31, 32].includes(Number(product.id));

    // ❌ Produk yang tidak menampilkan harga
    const hidePriceProduct =
        product &&
        ((Number(product.id) >= 1 && Number(product.id) <= 20) ||
            (Number(product.id) >= 26 && Number(product.id) <= 37));

    useEffect(() => {
        if (isCalculatedSize && lengthCm && widthCm && product?.price) {
            const panjang = parseFloat(lengthCm);
            const lebar = parseFloat(widthCm);
            const hargaDasar = parseFloat(product.price);

            if (!isNaN(panjang) && !isNaN(lebar) && !isNaN(hargaDasar)) {
                const luasMeter = (panjang * lebar) / 10000;
                const total = luasMeter * hargaDasar * quantity;
                setTotalPrice(total < hargaDasar ? hargaDasar : total);
            } else {
                setTotalPrice(0);
            }
        } else {
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

    const whatsappNumber = "62895421837105";
    const handleOrderNow = () => {
        if (!name.trim()) {
            alert("Harap isi nama terlebih dahulu!");
            return;
        }

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
            ? `\n*Ukuran:* ${lengthCm || "-"} cm x ${widthCm || "-"} cm`
            : "";

        const colorText =
            isColorRequired || isColorOptionProduct
                ? `*Warna:* ${isColorOptionProduct ? selectedColorOption : color || "-"}\n`
                : "";

        const polaroidText = isPolaroidProduct
            ? `*Polaroid:* ${selectedPolaroid}\n`
            : "";

        const message =
            `Halo, saya ingin order cetak dengan detail berikut:\n\n` +
            `*Atas Nama:* ${name}\n` +
            `*Produk:* ${productName}\n` +
            (!hidePriceProduct
                ? `*Harga Satuan:* ${price}\n`
                : "") +
            (isCustomSize ? sizeText + "\n" : "") +
            colorText +
            polaroidText +
            (!isCustomSize && !isColorOptionProduct && !isPolaroidProduct
                ? `*Cetak Sisi:* ${selectedSide}\n`
                : "") +
            `*Jumlah Cetak:* ${qty} kali\n` +
            (!hidePriceProduct
                ? `*Total Harga:* ${totalHargaStr}\n`
                : "") +
            `*Catatan:* ${notesValue}\n\n` +
            `Mohon diproses, terima kasih.`;

        const encoded = encodeURIComponent(message);
        window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, "_blank");
    };

    return (
        <MainLayout>
            <Container>
                <section className="my-8">
                    <h2 className="text-2xl font-serif font-bold text-center mb-10">
                        {product.title}
                    </h2>

                    <div className="flex flex-col md:flex-row md:gap-8 gap-6 items-stretch">
                        {/* Gambar */}
                        <div className="w-full md:w-1/2 rounded-lg overflow-hidden border-4 border-red-800 bg-gray-100 flex-shrink-0 h-64 sm:h-80 md:h-auto">
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
                        <div className="w-full md:w-1/2 border-4 border-red-800 rounded-lg p-4 sm:p-6 bg-white shadow-lg font-serif flex flex-col justify-between">
                            <h2 className="text-2xl md:text-3xl font-bold mb-2">
                                {product.title}
                            </h2>

                            {/* ✅ Hanya tampilkan harga kalau bukan id 1–20, 26–37 */}
                            {!hidePriceProduct && (
                                <p className="text-lg font-bold text-red-800 mb-2">
                                    Harga Satuan:{" "}
                                    {new Intl.NumberFormat("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                    }).format(product.price || 0)}
                                </p>
                            )}

                            <p className="text-lg text-gray-600 mb-4">
                                {product.description || "Tidak ada deskripsi produk tersedia."}
                            </p>

                            {/* 🔴 Pilihan Warna */}
                            {isColorOptionProduct && (
                                <div className="mb-6">
                                    <h3 className="text-xl font-semibold mb-2">Pilih Warna</h3>
                                    <div className="flex space-x-4">
                                        {["Merah", "Biru", "Lainnya"].map((colorOpt) => (
                                            <button
                                                key={colorOpt}
                                                onClick={() => setSelectedColorOption(colorOpt)}
                                                className={`flex-1 py-2 px-4 rounded-lg font-bold transition duration-200 h-10 border-4
                                                ${selectedColorOption === colorOpt
                                                        ? "bg-red-800 text-white border-red-800"
                                                        : "bg-white text-red-800 border-red-800 hover:bg-red-50"
                                                    }`}
                                            >
                                                {colorOpt}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* ✅ Tombol Polaroid */}
                            {isPolaroidProduct && (
                                <div className="mb-6">
                                    <h3 className="text-xl font-semibold mb-2">Polaroid</h3>
                                    <div className="flex space-x-4">
                                        {["Polaroid", "Tidak Polaroid"].map((option) => (
                                            <button
                                                key={option}
                                                onClick={() => setSelectedPolaroid(option)}
                                                className={`flex-1 py-2 px-4 rounded-lg font-bold transition duration-200 h-10 border-4
                                                ${selectedPolaroid === option
                                                        ? "bg-red-800 text-white border-red-800"
                                                        : "bg-white text-red-800 border-red-800 hover:bg-red-50"
                                                    }`}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Cetak Sisi */}
                            {!isCustomSize && !isColorOptionProduct && !isPolaroidProduct && (
                                <div className="mb-6">
                                    <h3 className="text-xl font-semibold mb-2">Cetak Sisi</h3>
                                    <div className="flex space-x-4">
                                        {(() => {
                                            let sides = ["1 Sisi", "2 Sisi"];
                                            if (["21", "24"].includes(String(product.id))) {
                                                sides = ["1 Sisi"];
                                                if (selectedSide !== "1 Sisi") setSelectedSide("1 Sisi");
                                            }
                                            if (["22", "23", "25"].includes(String(product.id))) {
                                                sides = ["2 Sisi"];
                                                if (selectedSide !== "2 Sisi") setSelectedSide("2 Sisi");
                                            }
                                            return sides.map((side) => (
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
                                            ));
                                        })()}
                                    </div>
                                </div>
                            )}

                            {/* Ukuran */}
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

                            {/* Warna Input */}
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

                            {/* ✅ Total Harga hanya tampil jika tidak disembunyikan */}
                            {!hidePriceProduct && (
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
                            )}

                            {/* Catatan */}
                            <div className="mb-6">
                                <h3 className="font-semibold text-black text-xl mb-2">Catatan</h3>
                                <input
                                    type="text"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    className="w-full p-3 border-4 border-red-900 rounded-lg h-10"
                                    placeholder="Tulis Catatan Anda di sini..."
                                />
                            </div>

                            {/* Nama */}
                            <div className="mb-6">
                                <h3 className="font-semibold text-black text-xl mb-2">Atas Nama</h3>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full p-3 border-4 border-red-900 rounded-lg h-10"
                                    placeholder="Tulis Nama Anda di sini..."
                                />
                            </div>

                            {/* Jumlah */}
                            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                <h3 className="text-xl font-semibold">Jumlah (Cetak Berapa Kali)</h3>
                                <div className="flex justify-end space-x-2">
                                    <Counter onClick={handleQuantityDecrease} className="h-9 w-16">
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
                                    <Counter onClick={handleQuantityIncrease} className="h-9 w-16">
                                        +
                                    </Counter>
                                </div>
                            </div>

                            <ButtonOrder
                                onClick={handleOrderNow}
                                className="w-full h-10">
                                Order Sekarang
                            </ButtonOrder>
                        </div>
                    </div>
                </section>
            </Container>
        </MainLayout>
    );
}
