export default function Button({ children, className, onClick }) {
    return (
        <button onClick={onClick} className={` w-full bg-red-900 border-4 border-red-900 rounded-md text-white hover:bg-white hover:text-red-900 font-bold transition-all duration-300 text-2xl flex justify-center items-center  ${className}`}>
            {children}
        </button>
    )
}