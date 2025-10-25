export default function Button({ children, className, onClick }) {
    return (
        <button onClick={onClick} className={`border-4 border-red-900 rounded-md px-4 py-4 text-white bg-red-900 hover:bg-white  hover:text-red-900 font-semibold transition-all duration-400 flex justify-center items-center active:opacity-20 cursor-pointer ${className}`}>
            {children}
        </button>
    )
}