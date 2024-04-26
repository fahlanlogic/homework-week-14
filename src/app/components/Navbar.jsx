"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PiBooksFill } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

export default function Navbar() {
  const [isLogin, setIsLogin] = useState(false);
  const [cookies, setCookies, removeCookie] = useCookies(["access_token"]);
  const route = useRouter();

  useEffect(() => {
    if (cookies.access_token) {
      setIsLogin(true);
    }
  }, [cookies]);

  const handleLogOut = () => {
    location.reload();
    removeCookie("access_token");
    setIsLogin(false);
    route.push("/");
  };

  return (
    <nav className="bg-black fixed w-full z-20 top-0 start-0">
      <div className="max-w-6xl mx-auto xl:px-0 flex flex-wrap items-center justify-between py-2 px-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse">
          <PiBooksFill
            size={24}
            color="rgb(250 204 21)"
          />
          <span className="hidden dark:text-white md:block self-center text-2xl font-semibold whitespace-nowrap ">
            Pustaka Buku
          </span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {isLogin && (
            <Link href="/newbook">
              <button
                type="button"
                className="text-white mr-4 border border-slate-400 hover:bg-yellow-400 hover:border-black hover:text-black duration-300 font-medium rounded-md text-sm px-3 py-1 shadow-md text-center ">
                Add New Book
              </button>
            </Link>
          )}
          {!isLogin ? (
            <Link href="/sign-in">
              <button
                type="button"
                className="text-white border border-slate-400 hover:bg-yellow-400 hover:border-black hover:text-black duration-300 font-medium rounded-md text-sm px-3 py-1 shadow-md text-center ">
                Sign In
              </button>
            </Link>
          ) : (
            <Link href="/">
              <button
                type="button"
                className="text-white border border-slate-400 hover:bg-yellow-400 hover:border-black hover:text-black duration-300 font-medium rounded-md text-sm px-3 py-1 shadow-md text-center"
                onClick={handleLogOut}>
                Sign Out
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
