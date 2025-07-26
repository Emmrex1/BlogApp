
import { useEffect, useState } from "react";
import logo from "../../assets/logo/Screenshot_2024-11-02_105649-removebg-preview.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { IoClose, IoSearchSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import avaterImg from "../../assets/logo/commentIcon.png";
import { useLogoutUserMutation } from "@/redux/features/auth/AuthApi";
import { logout } from "@/redux/features/auth/AuthSlice";
import { toast } from "sonner";
import { FaBell, FaUserCircle, FaCog, FaSignOutAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const NavList = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about-us" },
  { name: "Blogs", path: "/blogs" },
  { name: "Contact", path: "/contact-us" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [LogoutUser] = useLogoutUserMutation();

  const [sticky, setSticky] = useState(false);

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
      setIsUserMenuOpen(false);
    } catch (error) {
      toast.error("Logout failed");
      console.error("Logout error:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full h-[72px] flex items-center z-50 py-3 ${
        sticky
          ? "shadow-md bg-white backdrop-blur-sm bg-opacity-95"
          : "bg-transparent"
      } transition-all duration-300`}
    >
      <nav className="container mx-auto flex justify-between items-center px-4 sm:px-6">
        <Link to="/" className="flex items-center">
          <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
            {/* <img src={logo} alt="Site Logo" className="h-9" /> */}
            EmmrexBlogApp
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-7">
          {NavList.map((item, i) => (
            <li key={i}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                    : "text-gray-700 hover:text-blue-600 transition-colors"
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          {/* Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Search"
          >
            <IoSearchSharp className="text-gray-600 text-xl" />
          </button>

          {/* Notification */}
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
            aria-label="Notifications"
          >
            <FaBell className="text-gray-600 text-xl" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* CTA Button */}
          <Link
            to="/donate"
            className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 py-2 rounded-md font-medium hover:opacity-90 transition-opacity shadow-md"
          >
            Donate
          </Link>

          {/* User Dropdown */}
          {user?.role === "user" ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 focus:outline-none"
              >
                <img
                  src={user?.avatar || avaterImg}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full border-2 border-blue-500 object-cover"
                />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  <div className="px-4 py-3 border-b">
                    <p className="text-sm font-medium text-gray-900">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>
                  <Link
                    to="/dashboard"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <MdDashboard className="mr-3" />
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <FaUserCircle className="mr-3" />
                    My Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <FaCog className="mr-3" />
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FaSignOutAlt className="mr-3" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-2">
              <NavLink
                to="/login"
                className="text-blue-600 font-medium hover:underline"
              >
                Login
              </NavLink>
              <span className="text-gray-300">|</span>
              <NavLink
                to="/register"
                className="text-gray-700 font-medium hover:underline"
              >
                Register
              </NavLink>
            </div>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2"
            aria-label="Search"
          >
            <IoSearchSharp className="text-gray-600 text-xl" />
          </button>
          <button
            onClick={toggleMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMenuOpen}
            className="p-2"
          >
            {isMenuOpen ? (
              <IoClose className="text-2xl" />
            ) : (
              <IoMdMenu className="text-2xl" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-[72px] left-0 w-full bg-white z-40 shadow-lg p-6 transition-all duration-300 h-[calc(100vh-72px)]">
          <ul className="space-y-4 mb-8">
            {NavList.map((item, i) => (
              <li key={i}>
                <NavLink
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "block py-2 text-blue-600 font-semibold"
                      : "block py-2 text-gray-700 hover:text-blue-600"
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {user?.role === "user" ? (
            <div className="pt-4 border-t">
              <Link
                to="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 text-gray-700"
              >
                Dashboard
              </Link>
              <Link
                to="/profile"
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 text-gray-700"
              >
                My Profile
              </Link>
              <Link
                to="/settings"
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 text-gray-700"
              >
                Settings
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="w-full text-left py-2 text-red-600 flex items-center"
              >
                <FaSignOutAlt className="mr-3" />
                Sign out
              </button>
            </div>
          ) : (
            <div className="flex gap-4 pt-4 border-t">
              <NavLink
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="flex-1 text-center py-2 text-blue-600 font-medium border border-blue-600 rounded-md"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                onClick={() => setIsMenuOpen(false)}
                className="flex-1 text-center py-2 bg-blue-600 text-white font-medium rounded-md"
              >
                Register
              </NavLink>
            </div>
          )}
        </div>
      )}

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl p-4 shadow-xl">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search content..."
                autoFocus
                className="w-full p-4 pl-12 pr-20 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <IoSearchSharp className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
              >
                Search
              </button>
            </form>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <IoClose className="text-2xl" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;