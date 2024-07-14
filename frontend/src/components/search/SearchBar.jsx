import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from 'react-icons/io'

const SearchBar = ({ value, onChange, handleSearch, handleClearSearch, className }) => {
    return (
        <div className={`w-80 flex items-center px-4 bg-slate-100 rounded-md ${className}`}>
            <input type="text"
                placeholder="Search Scribs"
                className="w-full text-xs bg-transparent py-[11px] outline-none"
                value={value}
                onChange={onChange}
            />
            {
                value &&
                <IoMdClose
                className="text-xl text-slate-500 cursor-pointer m-3 hover:text-black"
                onClick={handleClearSearch}/>
            }
            <FaMagnifyingGlass
                className="text-slate-400 cursor-pointer hover:text-black"
                onClick={handleSearch}
            />
        </div>
    )
}

export default SearchBar