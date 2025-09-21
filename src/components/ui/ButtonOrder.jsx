export default function Button({ children, className, onClick }) {
    return (
        <button onClick={onClick} className={`px-4 py-4 bg-white hover:bg-red-800 ${className}`}>
            {children}
        </button>
    )
}