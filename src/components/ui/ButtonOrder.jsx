export default function Button({ children, className, onClick }) {
    return (
        <button onClick={onClick} className={`px-4 py-4 bg-red-900 hover:bg-red-700 ${className}`}>
            {children}
        </button>
    )
}