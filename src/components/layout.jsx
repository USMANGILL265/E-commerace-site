"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Dnav from "./Dnav";



const Layout = ({ children }) => {
  const path = usePathname();

  return (
    <>
      {path.startsWith("/admin") ? (
        <>
          <div className="flex  h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 overflow-auto">
              <Dnav />
              {children}
            </div>
          </div>
        </>
      ) : (
        <>
          <Navbar />
         <div className="flex-1 overflow-auto">{children}</div>
          <Footer />
        </>
      )}
    </>
  );
};

export default Layout;
