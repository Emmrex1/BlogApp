import React, { useState } from "react";
import logo from "../../assets/logo/Screenshot_2024-11-02_105649-removebg-preview.png";
import { Link, NavLink } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import {useDispatch, useSelector } from "react-redux";
import avaterImg from "../../assets/logo/commentIcon.png";
import { useLogoutUserMutation } from "@/redux/features/auth/AuthApi";
import { logout } from "@/redux/features/auth/AuthSlice";

const NavList = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about-us" },
  { name: "Privacy policy", path: "/Privacy-policy" },
  { name: "Contact Us", path: "/contact-us" },
];

const Navbar = () => {
    const [isMenuOpen, setIsMenOpen] = useState(false)
    const toggleMenu = () => setIsMenOpen(!isMenuOpen);
    const {user} = useSelector((state) => state.auth)
     console.log(user)
     const dispatch = useDispatch()
     const [LogoutUser] = useLogoutUserMutation()

     const handleLogout = async () => {
      try {
         await LogoutUser().unwrap();
         dispatch(logout())
      } catch (error) {
        
      }
     }
  
     return (
    <header className="bg-white py-5  shadow-2xs">
      <nav className="container mx-auto flex justify-between px-8">
        <a href="">
          <img src={logo} alt="Logo" className="h-9" />
        </a>
        <ul className="sm:flex hidden items-center gap-7">
          {NavList.map((list, index) => (
            <li key={index}>
              <NavLink
                to={list.path}
                className={({ isActive }) =>
                  isActive ? "text-blue-500 font-semibold" : "text-gray-700"
                }
              >
                {list.name}
              </NavLink>
            </li>
          ))}
          
          {
            user && user.role === "user" ? ( <li className="flex items-center gap-3">
              <img src={avaterImg} alt=""  className="size-8"/>
              <button onClick={handleLogout} className="bg-[#1E73BE] px-4 py-1.5 text-white rounded-sm">Logout</button>
            </li> ) : (<li>
              <NavLink to="/login">Login</NavLink>
            </li>)
          }        

          {
            user && user.role === "admin" && ( <li className="flex items-center gap-3">
              <img src={avaterImg} alt=""  className="size-8"/>
              <Link to="/dashboard"><button className="bg-[#1E73BE] px-4 py-1.5 text-white rounded-sm">Dashboard</button></Link> 
            </li>)
          }
         
        </ul>
        <div className="flex items-center sm:hidden">
          <button onClick={toggleMenu } className="flex items-center px-3 py-4 bg-[#fafafa]  rounded text-sm text-gray-500 hover:text-gray-900">
            {isMenuOpen ? <IoClose className=" size-6"/> : <IoMdMenu  className=" size-6"/>}
          </button>
        </div>
      </nav>
          {
            isMenuOpen && (
                <ul className="fixed top-[108px] left-0 w-full h-auto pb-8 border-b bg-white shadow-sm z-50">
                {NavList.map((list, index) => (
                  <li key={index} className="mt-5 px-4">
                    <NavLink
                    onClick={() => setIsMenOpen(false)}
                      to={list.path}
                      className={({ isActive }) =>
                        isActive ? "text-blue-500 font-semibold" : "text-gray-700"
                      }
                    >
                      {list.name}
                    </NavLink>
                  </li>
                ))}
                <li className="px-4 mt-5">
                  <NavLink to="/login">Login</NavLink>
                </li>
              </ul>
            )
          }
    </header>
  );
};

export default Navbar;
