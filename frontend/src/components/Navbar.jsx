import React, { useState, useRef, useEffect } from "react";
import {
  Camera,
  Slack,
  MoonStar,
  SunMoon,
  CircleUser,
  UserCog,
  Plus, 
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const menuref = useRef(null);
  const [dark, setDark] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [userName, setUserName] = useState("user");
  const [userEmail, setUserEmail] = useState("user@gmail.com");

  // handle menubar
  const handleMenuToggle = () => setMenuOpen((prev) => !prev);


  // handle dark mode
  const handleDarkMode = () => {
    dark == "dark" ? setDark("") : setDark("dark");
  };

  // closes menu when clicked anywhere
  useEffect(() => {
    const handler = (e) => {
      if (menuref.current && !menuref.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

    // handle logout
  const handleLogout = ()=>{
    toast.success("Logged Out!")
    setMenuOpen(false);
    localStorage.removeItem("token")
    navigate("/login")
  }

  useEffect(() => {
    try {
      const name = localStorage.getItem("name");
      const email = localStorage.getItem("email");
  
      setUserName(name);
      setUserEmail(email)
    
    } catch (error) {
      setUserName("user");
      setUserEmail("user@gamil.com")
    }
  }, [])
  

  return (
    <div className="text-white sticky top-0 w-[100%] z-30">
      <nav className="flex justify-around bg-blue-700 py-2.5">
        <div>
          <NavLink to="/layout/allTasks">
            <Slack className="text-white inline-block"/> <span className="font-semibold">TaskManager</span>
          </NavLink>
        </div>

        <div>
          <ul className="flex justify-center items-center flex-row space-x-5">
            {/* dark mode button */}
            <li>
              <button onClick={handleDarkMode}>
                {dark == "dark" ? <MoonStar /> : <SunMoon />}
              </button>
            </li>

            {/* profile button */}
            <li
              ref={menuref}
              className="relative hover:text-purple-300 transition-colors duration-300"
            >
              <button onClick={handleMenuToggle}>
                <CircleUser size={30} />
              </button>

              {/* Dropdown of profile button */}
              {menuOpen && (
                <ul className="absolute top-10 right-0 w-56 bg-white rounded-2xl text-black shadow-lg px-2">
                  <li className="p-3 border-b">
                    <p className="text-sm font-medium">{userName}</p>
                    <p className="text-xs text-gray-500">{userEmail}</p>
                  </li>
                  <li className="p-2 my-2 hover:bg-gray-100 rounded-b-xl">
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        navigate("/profile");
                      }}
                      className="w-full flex items-center gap-2"
                      role="menuitem"
                      title="profile setting"
                    >
                      <UserCog /> Profile
                    </button>
                  </li>
                  <li className="p-2 my-1 hover:bg-gray-100 rounded-b-xl">
                    <button onClick={handleLogout} className="">
                      <LogOut className="text-red-800 inline text-center size-4.5 text-sm" />
                      &nbsp; Log Out
                    </button>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
