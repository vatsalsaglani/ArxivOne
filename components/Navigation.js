import { useState, useEffect, useContext } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";

import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

import { classNames } from "../lib/utils";

export default function NavigationComponent() {
  const { theme, setTheme } = useTheme();

  const [menuOpen, setMenuOpen] = useState(false);

  const onThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex flex-column">
      <nav className="fixed w-full bg-slate-100 border-b-gray-200 dark:bg-[#0F1629] dark:border-b-gray-700 border-b-2 flex justify-center items-center ">
        <div
          className={
            "container mx-auto  w-full top-0 py-6 px-5  flex flex-row justify-between items-center h-16 sm:px-6 lg:px-8"
          }
        >
          <div className=" text-slate-600 dark:text-slate-100 flex justify-between items-stretch">
            <div className="font-mono font-extrabold text-justify text-4xl">
              <Link href="/">
                <a>ArxivOne</a>
              </Link>
            </div>
          </div>
          <div className="hidden md:flex w-2/12 justify-around items-center text-slate-600 dark:text-slate-100 space-x-4 z-1">
            <div className="font-serif font-medium text-justify text-lg md:text-xl">
              <Link href="/features">
                <a>
                  <div>Features</div>
                </a>
              </Link>
            </div>
            <div>
              <button
                className={classNames(
                  "p-4 rounded-full font-bold text-base md:text-lg",
                  theme === "dark"
                    ? "bg-[#0F1629]  text-yellow-500 font-extrabold text-2xl ring-sky-600 hover:ring-2"
                    : "bg-slate-100 text-gray-900 font-extrabold text-2xl ring-gray-400 hover:ring-2"
                )}
                onClick={onThemeToggle}
              >
                {theme === "dark" ? (
                  <Icon icon={<BsFillSunFill size={18} />} />
                ) : (
                  <Icon icon={<BsFillMoonFill size={18} />} />
                )}
              </button>
            </div>
          </div>
          <div className={"-mr-2 flex flex-col md:hidden"}>
            <button
              type="button"
              className="dark:bg-gray-900 bg-slate-100 inline-flex items-center justify-center p-2 rounded-md dark:text-gray-400 text-slate-700 font-extrabold text-2xl hover:text-white hover:bg-gray-800 dark:hover:bg-gray-300 dark:hover:text-gray-800 ring focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
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
                    "text-black dark:text-white block px-3 py-2 rounded-md text-base font-medium"
                  }
                >
                  Features
                </a>
              </Link>
              <div>
                <button
                  className={classNames(
                    "p-4 rounded-full font-bold text-base md:text-lg text-center align-middle object-center ",
                    theme === "dark"
                      ? "bg-[#0F1629]  text-yellow-500 font-extrabold text-2xl ring-sky-600 hover:ring-2"
                      : "bg-slate-100 text-gray-900 font-extrabold text-2xl ring-gray-400 hover:ring-2"
                  )}
                  onClick={onThemeToggle}
                >
                  {theme === "dark" ? (
                    <Icon icon={<BsFillSunFill size={18} />} />
                  ) : (
                    <Icon icon={<BsFillMoonFill size={18} />} />
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export const Icon = ({ icon }) => <div>{icon}</div>;
