"use client";
import React, { useState } from "react";
import {
  ShoppingCart,
  X,
  Menu,
  Home,
  Info,
  Phone,
  ShoppingBasket,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/Context/Auth";
import { useSelector } from "react-redux";

const Navbar = () => {
  const links = [
    { link: "/", lable: "Home", icon: Home },
    { link: "/about", lable: "About", icon: Info },
    { link: "/shop", lable: "Shop", icon: ShoppingBasket },
    { link: "/contact", lable: "Contact", icon: Phone },
  ];

  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);
  const toggle = () => setNavOpen(!navOpen);
  const { user, logout } = useAuth();

  //redux cart count
  const cartCount = useSelector((state) => state.cart.items.length);

  //Display Name function
  const getDisplayName = (userObj) => {
    if (!userObj) return "";
    if (userObj.username?.trim()) return userObj.username.trim();
    if (userObj.email?.trim()) return userObj.email.split("@")[0];
    return "";
  };

  const displayName = getDisplayName(user);
  const safeDisplayName =
    typeof displayName === "string" ? displayName : "";
  const getInitial = (text) =>
    text && typeof text === "string" ? text.charAt(0).toUpperCase() : "U";

  return (
    <>
      <div className="bg-theme flex items-center justify-between px-6 md:px-10 text-white py-3">
        <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <ShoppingCart className="w-6 h-6 md:w-7 md:h-7 text-yellow-300" />
          <span className="text-white">GillMart</span>
        </h1>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((v, i) => (
            <Link
              key={i}
              href={v.link}
              className={`text-lg md:text-xl px-3 py-2 rounded-lg transition-all duration-300 ${
                pathname === v.link
                  ? "text-theme bg-white font-bold"
                  : "text-white hover:text-yellow-300"
              }`}
            >
              {v.lable}
            </Link>
          ))}

          {/* Admin Button */}
          {user?.isAdmin && (
            <Link
              href="/admin"
              className={`text-lg md:text-xl px-3 py-2 rounded-lg transition-all duration-300 ${
                pathname.startsWith("/admin")
                  ? "text-theme bg-white font-bold"
                  : "text-white hover:text-yellow-300"
              }`}
            >
              Admin
            </Link>
          )}
        </div>

        {/* Desktop User + Cart */}
        <div className="hidden md:flex gap-5 items-center">

          {/* 🛒 CART ICON */}
          <Link href="/cart" className="relative">
            <ShoppingCart className="w-7 h-7 text-white hover:text-yellow-300 transition" />

            {/* 🔥 Badge for count */}
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User Section */}
          {user ? (
            <>
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                <div className="w-9 h-9 rounded-full bg-yellow-400 text-theme flex items-center justify-center font-bold text-lg">
                  {getInitial(safeDisplayName)}
                </div>
                <span className="text-white font-medium truncate max-w-[150px]">
                  {safeDisplayName}
                </span>
              </div>
              <button
                onClick={logout}
                className="border bg-white text-theme py-2 px-5 rounded-xl hover:bg-[#a8ca72] hover:text-black transition-all duration-300 cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/register"
                className="border bg-white text-theme py-2 px-5 rounded-xl hover:bg-[#a8ca72] hover:text-black transition-all duration-300 cursor-pointer"
              >
                Register
              </Link>
              <Link
                href="/login"
                className="border bg-white text-theme py-2 px-5 rounded-xl hover:bg-[#a8ca72] hover:text-black transition-all duration-300 cursor-pointer"
              >
                Login
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggle}>
          {navOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>
    </>
  );
};

export default Navbar;
