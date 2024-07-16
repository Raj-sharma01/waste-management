import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import icon from '../assets/cleanCampusLogo-modified.png';
import userIcon from '../assets/userIcon.png'
import SignUpAndLogin from "./SignUpAndLogin";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";

function Navbar() {
  const [ProfileDropDown, setProfileDropDown] = useState(false)
  const [hamMenu, setHamMenu] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  const [reRender, setReRender] = useState(false);
  useEffect(() => {
    setReRender((prev) => !prev)
  }, [])

  const { id, role, setRole, setId, setUsername, username, email, setEmail } = useContext(UserContext);  // Add role context

  console.log("username ", username)

  // const location = useLocation();
  const navigate = useNavigate();
  // console.log(location.pathname.split("/")[1])
  // const role = location.pathname.split("/")[1];

  const changeProfileDropDown = () => {
    setProfileDropDown((prev) => !prev);
  }

  const handleSignOut = async () => {
    try {
      await axios.get('/api/auth/logout');
      setUsername(null);
      setEmail(null)
      setRole(null)
      navigate('/')
    } catch (error) {
      console.log("error --> ", error)
    }

  }

  const changeHamMenu = () => {
    setHamMenu((prev) => !prev);
  }

  const toggleLoginForm = () => {
    setShowLogin((prev) => !prev);
  }

  let options = [];
  console.log("role= ", role)

  // very important
  // https://reactrouter.com/en/main/components/nav-link#end
  if (role === "user" || role === null) {
    options = [
      { label: "Dashboard", path: "/" ,exact:true},
      { label: "Complaints", path: "/complaints" },
      { label: "Guide", path: "/guide" },
      { label: "Events", path: "/events" },
    ];
  }
  else if (role === "admin") {
    options = [
      { label: "Dashboard", path: "/admin", exact:true },
      { label: "Complaints", path: "/admin/complaints" },
      { label: "Officers", path: "/admin/officers" },
      { label: "Events", path: "/admin/events" },
      { label: "Info", path: "/admin/info" },
      { label: "Create Officer", path: "/admin/createofficer" }
    ];
  }
  else if (role === 'officer') {
    options = [
      { label: "Dashboard", path: "/officer",exact:true },
      { label: "Complaints", path: "/officer/complaints" },
      { label: "Events", path: "/officer/events" },
      { label: "Facilities", path: "/officer/facitities" }
    ];
  }

  return (

    <>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => changeHamMenu()} aria-controls="mobile-menu" aria-expanded="false">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                {/*
            Icon when menu is closed.
  
            Menu open: "hidden", Menu closed: "block"*/}
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>

                <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <img className="h-8 w-auto" src={icon} alt="Clean Campus" />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                  {options.map((option, index) => {
                    return (
                      <NavLink
                        key={index}
                        to={option.path}
                        end={option.exact}
                        className={({ isActive }) => (
                          isActive
                            ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium")}
                      >
                        {option.label}
                      </NavLink>)
                  })}

                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

              {!email && <button className="relative rounded-md bg-gray-800 px-3 py-2 text-sm font-medium text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 hover:bg-green-800"
                onClick={() => { navigate('/login') }}>Login</button>}
              {/* Profile dropdown */}
              <div className="relative ml-3" onClick={() => changeProfileDropDown()}>
                <div>
                  <button type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img className="h-8 w-8 rounded-full" src={userIcon} alt />
                  </button>
                </div>
                {username &&
                  <div className={"absolute right-0 z-[5000] mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none " + (ProfileDropDown ? '' : 'hidden')}
                    role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex={-1}
                  >
                    {/* Active: "bg-gray-100", Not Active: "" */}
                    <span className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="user-menu-item-0">{username}</span>
                    <span className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="user-menu-item-1">{email}</span>
                    <button onClick={handleSignOut} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="user-menu-item-2">Sign out</button>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
        {/* Mobile menu, show/hide based on menu state. */}
        {hamMenu && <div className="sm:hidden" id="mobile-menu" >
          <div className="space-y-1 px-2 pb-3 pt-2">
            {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
            {options.map((option, index) => {
              return (
                <NavLink
                  key={index}
                  to={option.path}
                  end={option.exact}
                  className={({ isActive }) => (
                    isActive
                      ? "bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium")}
                >
                  {option.label}
                </NavLink>)
            })}
          </div>
        </div>}

      </nav>
      {/* Modal */}
      {/* {
      showLogin && <div className="overflow-y-auto overflow-x-hidden fixed z-[10000] flex justify-center items-center w-full md:inset-0 h-[calc(100%)] pb-4 max-h-full backdrop-blur-sm ">
        <div className="mt-5 relative w-full max-w-md max-h-full">
          <SignUpAndLogin showLogin={showLogin} setShowLogin={setShowLogin} />
        </div>
      </div>
      } */}
    </>
  )
}

export default Navbar
