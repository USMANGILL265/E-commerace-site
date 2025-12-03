"use client"
import {
  ChartColumnStacked,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  ListOrdered,
  SquareKanban,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const Sidebar = () => {
  const links = [
    {
      link: "/admin",
      lable: "Dashboard",
      icon: <LayoutDashboard className="size-6" />,
    },
    {
      link: "/admin/users",
      lable: "User",
      icon: <Users className="size-6" />,
    },
    {
      link: "/admin/product",
      lable: "Products",
      icon: <SquareKanban className="size-6" />,
    },
    {
      link: "/admin/category",
      lable: "Category",
      icon: <ChartColumnStacked className="size-6" />,
    },
    {
      link: "/admin/orders",
      lable: "Orders",
      icon: <ListOrdered className="size-6" />,
    },
  ];
  const [sideOpen,setSideOpen] = useState(true)
  const toggle = ()=>{
    setSideOpen(!sideOpen)
  }
  const pathname = usePathname()
  return(
     <div className={`h-screen ${sideOpen ?"w-56":"w-20"} transition-all duration-700   bg-theme text-white relative`}>

      <h1 className={` ${sideOpen ? "text-3xl p-[13px] font-bold":"text-lg p-[12px] mt-[7px] "} `}>GillMart</h1>
<div className=" flex flex-col p-3 gap-5">
      {links.map((v,i)=>(
        <Link key={i} href={v.link} className={`border flex items-center rounded-lg ${pathname === v.link ?"bg-white text-theme":""}   ${sideOpen ?"gap-3 p-2":"justify-center p-1.5"}`}> 
        {v.icon}
        <p className={`${sideOpen ?"block text-xl":"hidden"}`}>{v.lable} </p>
        </Link>
      ))}
</div>

      <button className="border absolute bottom-2 right-2 p-2 rounded-lg bg-white text-theme" onClick={toggle}>{sideOpen ?<ChevronLeft/>:<ChevronRight/>}</button>
  </div>
  )
};

export default Sidebar;
