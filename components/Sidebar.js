import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { Icon } from "./Navigation";

//utils
import { classNames } from "../lib/utils";

// react-icons
import { AiFillHome, AiFillStar } from "react-icons/ai";
import { MdOutlineAccountBox } from "react-icons/md";
import { BsNewspaper } from "react-icons/bs";
import { RiLogoutBoxFill, RiMenu5Line } from "react-icons/ri";

export default function SideBar({ selected = "HOME" }) {
  return (
    <>
      <div className="duration-1500 fixed left-0 top-0 hidden h-screen min-h-screen bg-gray-200 transition-all sm:flex sm:w-16 sm:flex-col sm:items-center sm:justify-center sm:border-r-2 sm:border-r-slate-300 lg:w-48">
        <div className=" h-full w-full flex-col items-center justify-center py-10 px-2">
          <div className="h-5/6 flex-grow flex-col items-center justify-center space-y-8 px-2">
            <SideButton
              isSelected={selected === "HOME" ? true : false}
              href="/dashboard"
              icon={<AiFillHome size={22} />}
            >
              Home
            </SideButton>
            <SideButton
              isSelected={selected === "PAPERS" ? true : false}
              href="/papers"
              icon={<BsNewspaper size={22} />}
            >
              Papers
            </SideButton>
            <SideButton
              isSelected={selected === "FAVOURITES" ? true : false}
              href="/favourites"
              icon={<AiFillStar size={22} />}
            >
              Favourites
            </SideButton>
            <SideButton
              isSelected={selected === "ACCOUNT" ? true : false}
              href="/account"
              icon={<MdOutlineAccountBox size={22} />}
            >
              Account
            </SideButton>
          </div>
          <div className="px-2">
            <SideButton href="/account" icon={<RiLogoutBoxFill size={22} />}>
              Logout
            </SideButton>
          </div>
        </div>
      </div>
      <div className={"bg-gray-900 px-1 py-2 font-Work text-white sm:hidden"}>
        <div className="flex items-center justify-between rounded-md bg-gray-800 px-4 py-3 text-xl font-bold">
          <div>
            <h1>ArxivOne</h1>
          </div>
          <div>
            <Icon icon={<RiMenu5Line />} size={24} />
          </div>
        </div>
      </div>
    </>
  );
}

export const SideButton = ({ isSelected, href, icon, children }) => {
  return (
    <Link href={href}>
      <a>
        <div
          className={classNames(
            "mb-2 flex h-10 items-center justify-center rounded-md p-1 font-Work text-lg font-bold hover:bg-slate-300 lg:justify-between",
            isSelected ? "text-sky-600" : "text-black"
          )}
        >
          <div className="hidden lg:block">{children}</div>
          <div>
            <Icon icon={icon} />
          </div>
        </div>
      </a>
    </Link>
  );
};
