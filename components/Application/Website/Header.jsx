"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSelector } from "react-redux"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { HiMenuAlt3 } from "react-icons/hi"
import { IoCloseSharp } from "react-icons/io5"
import { IoSearchOutline } from "react-icons/io5"
import { VscAccount } from "react-icons/vsc";
import Logo from "@/public/assets/images/logo-black.png"
import UserIcon from "@/public/assets/images/user.png"
import { USER_DASHBOARD, WEBSITE_HOME, WEBSITE_LOGIN, WEBSITE_SHOP } from "@/routes/WebsiteRoute"
import Cart from "./Cart"
import UserDropdown from "./UserDropdown"

export default function Header() {
  const [isMobileMenu, setIsMobileMenu] = useState(false)
  const auth = useSelector((store) => store.auth.auth)

  return (
    <div className="bg-white border-b lg:px-32 px-4">
      <div className="flex justify-between items-center lg:py-5 py-3">
        <Link href="/">
          <Image 
            src={Logo} 
            width={383} 
            height={146} 
            alt="logo" 
            className="lg:w-32 w-24" 
          />
        </Link>

        <div className="flex justify-between gap-20">
          <nav className={`lg:relative lg:w-auto lg:top-0 lg:left-0 lg:p-0 bg-white lg:h-auto fixed top-0 w-full h-screen z-50 transition-all ${isMobileMenu ? 'left-0' : '-left-full'}`}>
            <div className="lg:hidden flex justify-between items-center bg-gray-50 py-3 border-b px-3">
              <Image 
                src={Logo} 
                width={383} 
                height={146} 
                alt="logo" 
                className="lg:w-32 w-24" 
              />
              <button 
                type="button"
                onClick={() => setIsMobileMenu(false)}
              >
                <IoCloseSharp size={25} className="text-gray-500 hover:text-primary" />
              </button>
            </div>

            <ul className="lg:flex justify-between items-center gap-10 px-3 block">
              <li className="text-gray-600 hover:text-primary hover:font-semibold ">
                <Link href={WEBSITE_HOME} className="block py-2">
                  Home
                </Link>
              </li>
              <li className="text-gray-600 hover:text-primary hover:font-semibold ">
                <Link href={WEBSITE_SHOP} className="block py-2">
                  Shop
                </Link>
              </li>
              <li className="text-gray-600 hover:text-primary hover:font-semibold ">
                <Link href="#" className="block py-2">
                  About
                </Link>
              </li>
              {/* <li className="text-gray-600 hover:text-primary hover:font-semibold ">
                <Link href="#" className="block py-2">
                  T-shirt
                </Link>
              </li>
              <li className="text-gray-600 hover:text-primary hover:font-semibold ">
                <Link href="#" className="block py-2">
                  Hoodies
                </Link>
              </li>
              <li className="text-gray-600 hover:text-primary hover:font-semibold ">
                <Link href="#" className="block py-2">
                  Oversized
                </Link>
              </li> */}
            </ul>
          </nav>

          <div className="flex justify-between items-center gap-8">
            <button 
              type="button"
              className="text-gray-500 hover:text-primary cursor-pointer"
            >
              <IoSearchOutline size={25} />
            </button>

            <Cart/>

            {/* {!auth ? (
              <Link href={WEBSITE_LOGIN}>
                <VscAccount size={25} className="text-gray-500 hover:text-primary cursor-pointer" />
              </Link>
            ) : (
              <Link href={USER_DASHBOARD}>
                <Avatar>
                  <AvatarImage src={auth?.avatar?.url || UserIcon.src} />
                  <AvatarImage src={UserIcon} />
                </Avatar>
              </Link>
            )} */}

            <UserDropdown />

            <button 
              type="button"
              className="lg:hidden block text-gray-500 hover:text-primary"
              onClick={() => setIsMobileMenu(true)}
            >
              <HiMenuAlt3 size={25} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
