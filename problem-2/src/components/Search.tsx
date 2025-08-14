interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

function Search({ value, onChange, placeholder }: SearchProps) {
  return (
    <>
        <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-gray-700 text-white px-4 py-3 rounded-xl border border-gray-600 focus:border-green-500 focus:outline-none"
        />
        <svg className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
    </>
  )
}

export default Search