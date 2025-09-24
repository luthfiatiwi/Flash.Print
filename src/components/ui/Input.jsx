export default function Input({ type, placeholder, className }) {
    return (
        <input className={`w-full border-4 border-red-900 text-black rounded-md focus:outline-none placeholder-gray-600  ${className}`}
            type={type}
            placeholder={placeholder} />
    )
}