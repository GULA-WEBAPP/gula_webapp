import { Bell, ShoppingCart } from "lucide-react";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import logo from "./images/logo.png";
import logo1 from "./images/single.png";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../../firebase";
import useCartStore from "../../../Store/Cart";

export default function Navbar() {
  const navigate = useNavigate();
  const { items } = useCartStore();

  const handlelogOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.error("failed to logout", err);
    }
  };
  return (
    <>
      {/* Sidebar on mobile, Navbar on desktop */}
      <nav className="fixed inset-y-0 left-0 w-24 md:w-auto md:static bg-white border-b md:border-b md:flex md:items-center md:justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex justify-center sm:justify-start p-4 sm:p-0">
          <img
            src={logo}
            className="hidden md:block h-10 w-auto"
            alt="Desktop Logo"
          />
          <img
            src={logo1}
            className="block md:hidden h-10 w-auto"
            alt="Mobile Logo"
          />
        </div>

        {/* Navigation Links and Buttons */}
        <div className="flex flex-col md:flex-row md:items-center md:space-x-8 space-y-6 md:space-y-0 items-center px-2 md:px-0">
          <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0 items-center">
            <a
              href="#"
              className="text-gray-900 font-medium text-sm sm:text-xl"
            >
              Dashboard
            </a>
            <a href="#" className="text-gray-500">
              Catalogs
            </a>
            <a href="#" className="text-gray-500">
              Orders
            </a>
            <a href="#" className="text-gray-500">
              Support
            </a>
          </div>

          {/* Right-side Buttons */}
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-6 md:space-y-0">
            <button
              name="notification"
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <Bell className="w-5 h-5" />
            </button>
            <button
              name="user"
              className="p-1 text-gray-500 hover:text-gray-700"
            >
              <FaUser className="w-6 h-6 md:w-8 md:h-8 rounded-full" />
            </button>
            <button
              onClick={handlelogOut}
              className=" border-1 border-black rounded-2xl flex items-center justify-center space-x-1 p-2 text-gray-500 hover:text-red-500 transition-colors cursor-pointer w-full md:w-auto"
              title="Logout"
            >
              <span className="md:inline">Logout</span>
            </button>
            <Link to="/cart" className="flex items-center gap-2">
              <ShoppingCart size={32} color="black" />
              <span className="text-black">{items.length}</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content overlap on mobile */}
      <div className="w-24 md:hidden"></div>
    </>
  );
}
