import { useState, useEffect, useContext } from "react";
import Link from "next/link";

import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

export default function NavigationComponent() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex-column flex">
      <nav className="fixed flex w-full items-center justify-center border-b-2 border-b-gray-100 bg-slate-50 ">
        <div
          className={
            "container top-0  mx-auto flex h-16 w-full  flex-row items-center justify-between py-6 px-5 sm:px-6 lg:px-8"
          }
        >
          <div className=" flex items-stretch justify-between text-sky-600">
            <div className="text-justify font-Work text-4xl font-extrabold">
              <Link href="/">
                <a>ArxivOne</a>
              </Link>
            </div>
          </div>
          <div className="z-1 hidden w-2/12 items-center justify-around space-x-4 text-sky-600 md:flex">
            <div className="text-justify font-Work text-lg font-medium md:text-xl">
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
              className="inline-flex items-center justify-center rounded-md p-2 text-2xl font-extrabold text-sky-600 hover:shadow-lg hover:transition hover:ease-in-out"
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
            className={"fixed mx-auto mt-20 w-full md:hidden"}
            id="mobile-menu"
          >
            <div
              className={
                "mx-auto flex flex-col items-center justify-center space-y-1 px-2 pt-2 pb-3 sm:px-3"
              }
            >
              <Link href="/features">
                <a
                  className={
                    "block  rounded-md px-3 py-2 text-base font-medium text-sky-600"
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
