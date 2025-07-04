import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { CircleCheckBig, TrendingUp, LayoutDashboard, Menu, X} from 'lucide-react';

const SideBar = () => {

  const[hamburger, setHamburger] = useState(false);
  const [user, setUser] = useState("user");

  //  fetch user name from local storage to display on sidebar
  useEffect(() => {
    const user = localStorage.getItem('name');
    setUser(user);
  }, [])
  

  return (
    <>
 {/* Hamburger Button - visible only on small screens */}
      <div className="lg:hidden fixed top-3 left-3 z-[50]">
        <button
          onClick={() => setHamburger((prev) => !prev)}
          className=" text-white p-1"
        >
          {hamburger? <X className="text-black"/> :<Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-md z-40 px-4 pt-20 flex-col gap-4 transition-transform duration-300 flex lg:z-10
        ${hamburger ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:flex`}
      >
      <h1 className="text-xl font-bold text-gray-700 mb-4 mt-20 ml-5">Hi, {user} 👋</h1>
       <NavLink
          to="/layout/allTasks"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md text-sm font-medium transition ${
              isActive
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`
          }
        >
           < LayoutDashboard className = "inline-block mx-1.5"/>  Dashboard
        </NavLink>

        <NavLink
          to="/layout/completedTasks"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md text-sm font-medium transition ${
              isActive
                ? "bg-green-600 text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`
          }
        >
        < CircleCheckBig className = "inline-block mx-1.5"/>Completed
        </NavLink>

        <NavLink
          to="/layout/pendingTasks"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md text-sm font-medium transition ${
              isActive
                ? "bg-yellow-500 text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`
          }
        >
         <TrendingUp  className = "inline-block mx-1.5"/> Pending
        </NavLink>
    </div>
    </>
  );
};

const NavItem = ({ to, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `text-sm px-3 py-2 rounded-md transition ${
        isActive
          ? "bg-green-100 text-green-800 font-semibold"
          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
      }`
    }
  >
    {label}
  </NavLink>
);

export default SideBar;
