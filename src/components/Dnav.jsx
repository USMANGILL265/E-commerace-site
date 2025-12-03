"use client";
import { Search, Bell, LogOut } from "lucide-react";
import { useAuth } from "@/Context/Auth";
import { useState } from "react";

export default function AdminNavbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  // 🟢 Get display name
  const getDisplayName = (userObj) => {
    if (!userObj) return "Admin";
    if (userObj.username && userObj.username.trim() !== "") {
      return userObj.username;
    }
    if (userObj.email) {
      const atIndex = userObj.email.indexOf("@");
      return atIndex > 0 ? userObj.email.slice(0, atIndex) : userObj.email;
    }
    return "Admin";
  };

  const displayName = getDisplayName(user);

  // 🟢 Get first initial for avatar
  const getInitial = (name) => {
    if (!name || typeof name !== "string") return "A";
    return name.charAt(0).toUpperCase();
  };

  return (
    <nav className="w-full bg-theme backdrop-blur-md shadow-lg px-6 py-3 flex items-center justify-between sticky top-0 z-50 border-b border-white/10">
      {/* 🔍 Search Bar */}
      <div className="hidden md:flex flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search products, orders..."
            className="w-full pl-10 pr-4 py-2 border border-white/20 rounded-full bg-white/10 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6B8E23]"
          />
          <Search className="absolute left-3 top-2.5 text-gray-300 h-5 w-5" />
        </div>
      </div>

      {/* 🔔 Right Side */}
      <div className="flex items-center gap-5 relative">
        {/* Notification Bell */}
        <button className="relative p-2 rounded-full hover:bg-white/20 transition duration-300 ease-in-out">
          <Bell className="h-6 w-6 text-white" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
            3
          </span>
        </button>

        {/* 🧑 User Avatar + Dropdown */}
        <div className="relative">
          <div
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 cursor-pointer bg-white/10 px-3 py-2 rounded-full hover:bg-white/20 transition duration-300 ease-in-out"
          >
            <div className="w-9 h-9 rounded-full bg-[#A4DE02] flex items-center justify-center font-bold text-theme text-lg">
              {getInitial(displayName)}
            </div>
            <span className="hidden sm:inline text-sm font-semibold text-white">
              {displayName}
            </span>
          </div>

          {/* Dropdown Menu */}
          {open && (
            <div className="absolute right-0 mt-2 w-44 bg-white shadow-xl rounded-xl overflow-hidden z-50 border border-green-200">
              <button
                onClick={logout}
                className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-100 transition"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
