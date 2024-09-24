"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollasped } from "@/app/state";

import {
  Archive,
  CircleDollarSign,
  Clipboard,
  Hammer,
  Icon,
  Layout,
  LucideIcon,
  Menu,
  Pencil,
  Settings,
  SlidersHorizontal,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { isatty } from "tty";

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
}: SidebarLinkProps) => {
  const pathName = usePathname();
  const isActive =
    pathName === href || (pathName === "/" && href === "/dashboard");
  return (
    <Link href={href}>
      <div
        className={`cursor-pointer flex items-center ${
          isCollapsed ? "justify-center py-4" : "justify-start py-4 px-8"
        } 
hover: text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${
          isActive ? "bg-blue-200 text-white" : ""
        }`}
      >
        <Icon className="w-6 h-6 !text-gray-700" />
        <span
          className={`${isCollapsed ? "hidden" : "block"}
     font-medium text-gray-700`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};
const Sidebar = () => {
  const disptach = useAppDispatch();
  const isSideBarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollasped
  );

  const toggleSidebar = () => {
    disptach(setIsSidebarCollasped(!isSideBarCollapsed));
  };

  const sidebarClassNames = `fixed flex flex-col 
  ${isSideBarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"} 
  bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

  return (
    <div className={sidebarClassNames}>
      {/*top logo*/}
      <div
        className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${
          isSideBarCollapsed ? "px-5" : "px-8"
        }`}
      >
        <div>logo</div>
        <h1
          className={`${
            isSideBarCollapsed ? "hidden" : "block"
          } font-extrabold text-2xl`}
        >
          VungStock
        </h1>

        <button
          className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={toggleSidebar}
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/*Links*/}
      <div className="flex-grow mt-8">
        <SidebarLink
          href="/dashboard"
          icon={Layout}
          label="Dashboard"
          isCollapsed={isSideBarCollapsed}
        />
        <SidebarLink
          href="/inventory"
          icon={Archive}
          label="Inventory"
          isCollapsed={isSideBarCollapsed}
        />
        <SidebarLink
          href="/products"
          icon={Clipboard}
          label="Products"
          isCollapsed={isSideBarCollapsed}
        />
        <SidebarLink
          href="/users"
          icon={User}
          label="Users"
          isCollapsed={isSideBarCollapsed}
        />
        <SidebarLink
          href="/settings"
          icon={Settings}
          label="Settings"
          isCollapsed={isSideBarCollapsed}
        />
        <SidebarLink
          href="/expenses"
          icon={CircleDollarSign}
          label="Expenses"
          isCollapsed={isSideBarCollapsed}
        />
      </div>

      {/*FOOTER*/}
      <div className={`${isSideBarCollapsed ? "hidden" : "block"} mb-10}`}>
        <p className="text-gray-500 text-center text-xs">
          &copy; 2024 VungStock
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
