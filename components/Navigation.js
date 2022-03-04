import { useState, useEffect, useContext } from "react";
import Link from "next/link";

import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

export default function NavigationComponent() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-column">
      <nav className="fixed w-full bg-slate-100 border-b-gray-200 border-b-2 flex justify-center items-center ">
        <div
          className={
            "container mx-auto  w-full top-0 py-6 px-5  flex flex-row justify-between items-center h-16 sm:px-6 lg:px-8"
          }
        >
          <div className=" text-slate-600 flex justify-between items-stretch">
            <div className="font-mono font-extrabold text-justify text-4xl">
              <Link href="/">
                <a>ArxivOne</a>
              </Link>
            </div>
          </div>
          <div className="hidden md:flex w-2/12 justify-around items-center text-slate-600 space-x-4 z-1">
            <div className="font-serif font-medium text-justify text-lg md:text-xl">
              <Link href="/features">
                <a>
                  <div>Features</div>
                </a>
              </Link>
            </div>
          </div>
          <div className={"-mr-2 flex flex-col md:hidden"}>
            <button
              type="button"
              className=" bg-slate-100 inline-flex items-center justify-center p-2 rounded-md text-slate-700 font-extrabold text-2xl hover:text-white hover:bg-gray-800  ring focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => {
                setMenuOpen(!menuOpen);
              }}
            >
              {menuOpen ? (
                <Icon icon={<AiOutlineClose size={22} />} />
              ) : (
                <Icon icon={<AiOutlineMenu />} size={22} />
              )}
            </button>
          </div>
        </div>
      </nav>
      <div>
        {menuOpen ? (
          <div
            className={"md:hidden fixed mt-20 w-full mx-auto"}
            id="mobile-menu"
          >
            <div
              className={
                "flex flex-col mx-auto items-center justify-center px-2 pt-2 pb-3 space-y-1 sm:px-3"
              }
            >
              <Link href="/features">
                <a
                  className={
                    "text-black  block px-3 py-2 rounded-md text-base font-medium"
                  }
                >
                  Features
                </a>
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export const Icon = ({ icon }) => <div>{icon}</div>;
