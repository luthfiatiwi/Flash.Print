import Footer from "../blocks/Footer";
import Navbar from "../blocks/Navbar";

export default function Home({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main>{children}</main>
            <Footer className={"mt-auto"} />
        </div>


    )
}