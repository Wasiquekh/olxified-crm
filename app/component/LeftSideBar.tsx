"use client";
import Link from "next/link";
import Image from "next/image";
import { BiSolidHome } from "react-icons/bi";
import { MdOutlineBarChart } from "react-icons/md";
import { TbDeviceMobileDollar } from "react-icons/tb";
import { HiWrenchScrewdriver } from "react-icons/hi2";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { BsCreditCard2Back } from "react-icons/bs";
import { BiSolidUser } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { usePathname } from "next/navigation";

const LeftSideBar: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className=" w-[15%]  flex flex-col justify-between py-4 px-4 border-r-2 border-customBorder shadow-borderShadow mt-2">
      {/* SIDE LEFT BAR TOP SECTION */}
      <div>
        <Link href="/customer">
          <div className=" flex gap-2 mb-12">
            <Image
              src="/images/orizonDashboardIcon.svg"
              alt="Description of image"
              width={0}
              height={0}
              className=" w-11 h-auto"
            />
            <p className=" text-[25px] leading-normal font-black text-customBlue">
              Orizon
            </p>
          </div>
        </Link>
        {/* SEARCH INPUT WITH ICON */}
        <input
          type="text"
          placeholder="Search..."
          className=" w-full rounded-lg border border-[#E7E7E7] p-[10px] focus:outline-none placeholder-[#717171] mb-12"
        />
        {/* MENU WITH ICONS */}
        <Link href="/customer">
          <div className=" mb-9 flex gap-6 items-center  cursor-pointer group">
            <BiSolidHome className=" w-6 h-6 text-[#B1B1B1] group-hover:text-customBlue" />
            <p className=" text-[#B1B1B1] text-base leading-normal font-medium group-hover:text-customBlue">
              Dashboard
            </p>
          </div>
        </Link>
        <Link href="/customer">
          {pathname === "/customer" ? (
            <div className=" mb-9 flex gap-6 items-center group">
              <MdOutlineBarChart className=" w-6 h-6 text-customBlue group-hover:text-customBlue " />
              <p className=" text-customBlue text-base leading-normal font-medium group-hover:text-customBlue">
                Customers
              </p>
            </div>
          ) : (
            <div className=" mb-9 flex gap-6 items-center group">
              <MdOutlineBarChart className=" w-6 h-6 text-[#B1B1B1] group-hover:text-customBlue " />
              <p className=" text-[#B1B1B1] text-base leading-normal font-medium group-hover:text-customBlue">
                Customers
              </p>
            </div>
          )}
        </Link>
        <Link href="/transaction">
          {pathname === "/transaction" ? (
            <div className=" mb-9 flex gap-6 items-center group">
              <TbDeviceMobileDollar className=" w-6 h-6 text-customBlue group-hover:text-customBlue" />
              <p className=" text-customBlue text-base leading-normal font-medium group-hover:text-customBlue">
                Transaction
              </p>
            </div>
          ) : (
            <div className=" mb-9 flex gap-6 items-center group">
              <TbDeviceMobileDollar className=" w-6 h-6 text-[#B1B1B1] group-hover:text-customBlue" />
              <p className=" text-[#B1B1B1] text-base leading-normal font-medium group-hover:text-customBlue">
                Transaction
              </p>
            </div>
          )}
        </Link>
        <Link href="/customer">
          <div className=" mb-9 flex gap-6 items-center group">
            <HiWrenchScrewdriver className=" w-6 h-6 text-[#B1B1B1] group-hover:text-customBlue" />
            <p className=" text-[#B1B1B1] text-base leading-normal font-medium group-hover:text-customBlue">
              Point of Services
            </p>
          </div>
        </Link>
        <Link href="/customer">
          <div className=" mb-9 flex gap-6 items-center group">
            <FaMoneyCheckDollar className=" w-6 h-6 text-[#B1B1B1] group-hover:text-customBlue" />
            <p className=" text-[#B1B1B1] text-base leading-normal font-medium group-hover:text-customBlue">
              Payment Terminal
            </p>
          </div>
        </Link>
        <Link href="/cards">
          {pathname === "/cards" ? (
            <div className=" mb-9 flex gap-6 items-center group">
              <BsCreditCard2Back className=" w-6 h-6 text-customBlue group-hover:text-customBlue" />
              <p className=" text-customBlue text-base leading-normal font-medium group-hover:text-customBlue">
                Credit Cards
              </p>
            </div>
          ) : (
            <div className=" mb-9 flex gap-6 items-center group">
              <BsCreditCard2Back className=" w-6 h-6 text-[#B1B1B1] group-hover:text-customBlue" />
              <p className=" text-[#B1B1B1] text-base leading-normal font-medium group-hover:text-customBlue">
                Credit Cards
              </p>
            </div>
          )}
        </Link>
        <Link href="/user">
          {(pathname === '/user' || pathname === '/usermanagement') ? (
            <div className=" mb-9 flex gap-6 items-center group">
              <BiSolidUser className=" w-6 h-6 text-customBlue group-hover:text-customBlue" />
              <p className=" text-customBlue text-base leading-normal font-medium group-hover:text-customBlue">
                User Management
              </p>
            </div>
          ) : (
            <div className=" mb-9 flex gap-6 items-center group">
              <BiSolidUser className=" w-6 h-6 text-[#B1B1B1] group-hover:text-customBlue" />
              <p className=" text-[#B1B1B1] text-base leading-normal font-medium group-hover:text-customBlue">
                User Management
              </p>
            </div>
          )}
        </Link>
        <Link href="/user">
          <div className=" mb-9 flex gap-6 items-center group">
            <BiSolidUser className=" w-6 h-6 text-[#B1B1B1] group-hover:text-customBlue" />
            <p className=" text-[#B1B1B1] text-base leading-normal font-medium group-hover:text-customBlue">
              User Activity
            </p>
          </div>
        </Link>
        <div className=" mb-9 flex gap-6 items-center group">
          <IoMdSettings className=" w-6 h-6 text-[#B1B1B1] group-hover:text-customBlue" />
          <p className=" text-[#B1B1B1] text-base leading-normal font-medium group-hover:text-customBlue">
            Settings
          </p>
        </div>
      </div>
      {/* END SIDE LEFT BAR TOP SECTION */}

      {/*  SIDE LEFT BAR BOTTOM SECTION */}
      <div className=" flex gap-2 items-center">
        <div>
          <Image
            src="/images/logoutIcon.svg"
            alt="logout Icon"
            width={24}
            height={24}
          />
        </div>
        <div className=" text-base font-semibold leading-normal text-[#EB5757]">
          Logout
        </div>
      </div>
      {/*  END SIDE LEFT BAR BOTTOM SECTION */}
    </div>
  );
};

export default LeftSideBar;
