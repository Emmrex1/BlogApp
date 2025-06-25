import { useEffect, useState } from "react";
import logo from "../../assets/logo/Screenshot_2024-11-02_105649-removebg-preview.png";
import { Link, NavLink } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import avaterImg from "../../assets/logo/commentIcon.png";
import { useLogoutUserMutation } from "@/redux/features/auth/AuthApi";
import { logout } from "@/redux/features/auth/AuthSlice";
import { toast } from "sonner";
import { Moon, Sun } from "lucide-react";

const NavList = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about-us" },
  { name: "Blogs", path: "/blogs" },
  { name: "Contact", path: "/contact-us" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [LogoutUser] = useLogoutUserMutation();

  const [sticky, setSticky] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme) {
      setTheme(savedTheme);
    } else if (prefersDark) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await LogoutUser().unwrap();
      dispatch(logout());
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed");
      console.error("Logout error:", error);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full h-[72px] flex items-center z-40 py-3 ${
        sticky ? "shadow-md" : ""
      } bg-white dark:bg-gray-900 transition-all duration-300`}
    >
      <nav className="container mx-auto flex justify-between items-center px-6">
        <Link to="/">
          <img src={logo} alt="Site Logo" className="h-9" />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden sm:flex items-center gap-7">
          {NavList.map((item, i) => (
            <li key={i}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-600"
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}

          {/* Search */}
          <label className="px-3 py-2 border rounded-md flex items-center gap-2 dark:border-gray-700">
            <input
              type="text"
              placeholder="Search"
              aria-label="Search"
              className="grow outline-none rounded-md px-1 dark:bg-slate-900 dark:text-white"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70 dark:text-white"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="focus:outline-none"
          >
            {theme === "dark" ? (
              <Sun className="text-yellow-400 w-5 h-5" />
            ) : (
              <Moon className="text-gray-700 w-5 h-5" />
            )}
          </button>

          {/* Auth */}
          {user?.role === "user" ? (
            <div className="flex items-center gap-3">
              <img
                src={avaterImg}
                alt="Avatar"
                className="w-8 h-8 rounded-full"
              />
              <button
                onClick={handleLogout}
                className="bg-[#1E73BE] px-4 py-1.5 text-white rounded-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <NavLink to="/login" className="text-blue-500 font-semibold">
              Login
            </NavLink>
          )}
        </ul>

        {/* Mobile Menu Icon */}
        <div className="sm:hidden">
          <button
            onClick={toggleMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMenuOpen}
            className="px-3 py-3 bg-gray-100 dark:bg-slate-800 rounded"
          >
            {isMenuOpen ? (
              <IoClose className="text-xl" />
            ) : (
              <IoMdMenu className="text-xl" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <ul className="sm:hidden fixed top-[72px] left-0 w-full bg-white dark:bg-gray-800 z-30 shadow-md p-6 space-y-4 transition-all duration-300">
          {NavList.map((item, i) => (
            <li key={i}>
              <NavLink
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-semibold"
                    : "text-gray-700 dark:text-gray-300"
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}

          <li>
            <button onClick={toggleTheme} className="flex items-center gap-2">
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>
          </li>

          <li>
            {user?.role === "user" ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="text-red-500"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="text-blue-500"
              >
                Login
              </NavLink>
            )}
          </li>
        </ul>
      )}
    </header>
  );
};

export default Navbar;
