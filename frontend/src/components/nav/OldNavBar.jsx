import { useNavigate } from 'react-router-dom'
import ProfileInfo from "../cards/ProfileInfo"
import SearchBar from "../search/SearchBar"
import { useState } from 'react'

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  const onLogout = () => {
    navigate('/login');
  }
  const handleSearch = () => {

  }
  const handleClearSearch = () => {
    setSearchQuery('');
  }
  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow-lg">
      <h2 className="text-xl font-medium text-black py-2">ScribbleNest</h2>
      <SearchBar
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        handleSearch={handleSearch}
        handleClearSearch={handleClearSearch}
      />
      <ProfileInfo onLogout={onLogout} />
    </div>
  )
}

export default Navbar