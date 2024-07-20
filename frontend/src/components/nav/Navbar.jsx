import { useNavigate } from 'react-router-dom'
import ProfileInfo from "../cards/ProfileInfo"
import SearchBar from "../search/SearchBar"
import { useState } from 'react'
import { FaBars } from 'react-icons/fa6'

const Navbar = ({ userInfo }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navigate = useNavigate();
  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpen);
  };
  const onLogout = () => {
    localStorage.clear();
    navigate('/login');
  }
  const handleSearch = () => {

  }
  const handleClearSearch = () => {
    setSearchQuery('');
  }
  return (
    <nav className="relative flex flex-wrap items-center px-2 py-3 mb-3 bg-white drop-shadow-lg">
      <div className="container px-4 mx-auto flex flex-col md:flex-row items-center">
        <div className="w-full relative flex flex-1 justify-between md:justify-normal md:w-auto md:static md:block">
          <a
            className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-black"
            href="/dashboard"
          >
            Scribble-Nest
          </a>
          <button
            className="text-black cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block md:hidden outline-none focus:outline-none"
            type="button"
            onClick={toggleNavbar}
          >
            <FaBars />
          </button>
        </div>

        {/* Menu Items */}
        <div className={"w-full md:w-fit md:flex" + (navbarOpen ? " flex" : " hidden")}>
          <ul className="w-full md:w-fit flex flex-wrap md:items-center flex-col-reverse md:flex-row">
            <li className="nav-item my-2 md:my-0 md:mr-10">
              <SearchBar
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
                handleSearch={handleSearch}
                handleClearSearch={handleClearSearch}
              />

            </li>
            {
              userInfo && <li className="nav-item">
              <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
            </li>
            }
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar