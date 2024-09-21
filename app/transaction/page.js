"use client";
import Image from "next/image";
import Tabs from "../component/Tabs";
import appleImage from "../images/apple.png";
import { CiFolderOn } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { AiOutlinePlus } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoIosList } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import { CiCalendar } from "react-icons/ci";
import { TbGenderDemiboy } from "react-icons/tb";
import { CiFlag1 } from "react-icons/ci";
import { TfiHome } from "react-icons/tfi";
import { PiCityThin } from "react-icons/pi";
import { CiMobile4 } from "react-icons/ci";
import { FiEye } from "react-icons/fi";
import { useState } from "react";
import { BiSolidHome } from "react-icons/bi";
import { MdOutlineBarChart } from "react-icons/md";
import { TbDeviceMobileDollar } from "react-icons/tb";
import { HiWrenchScrewdriver } from "react-icons/hi2";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { BsCreditCard2Back } from "react-icons/bs";
import { BiSolidUser } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaGreaterThan } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { FiFilter } from "react-icons/fi";
import { LuPencilLine } from "react-icons/lu";
import { HiOutlineBookOpen } from "react-icons/hi2";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { MdOutlineCall } from "react-icons/md";
import { LiaArrowCircleDownSolid } from "react-icons/lia";
import { MdRemoveRedEye } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiArrowCircleUp } from "react-icons/pi";

export default function Home() {
  const tabs = [
    {
      label: "All Transactions",
      content: (
        <>{/* //   Tab 1 content */}
        {/* ----------------Table----------------------- */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-[#999999]">
                <tr className=" border border-tableBorder">
                  <th scope="col" className="p-4 border border-tableBorder">
                    <div className="flex items-center">
                      <input id="checkbox-all-search"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label htmlFor="checkbox-all-search" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </th>
                  <th
                    scope="col" className="px-2 py-0 border border-tableBorder">
                    <div className=" flex items-center gap-2">
                      <div className="font-medium text-[#718EBF] text-base leading-normal">
                      Description{" "}
                      </div>
                    </div>
                  </th>
                  <th scope="col" className="px-2 py-0 border border-tableBorder" >
                    <div className=" flex items-center gap-2">
                  <div className="font-medium text-[#718EBF] text-base leading-normal">
                      Transaction ID
                      </div>
                    </div>
                  </th>
                  <th scope="col"
                    className="px-2 py-0 border border-tableBorder" >
                    <div className=" flex items-center gap-2">
                    <div className="font-medium text-[#718EBF] text-base leading-normal">
                      Type
                      </div>
                    </div>
                  </th>
                  <th scope="col" className="px-2 py-0 border border-tableBorder" >
                    <div className=" flex items-center gap-2">
                   <div className="font-medium text-[#718EBF] text-base leading-normal">
                      Card
                      </div>
                    </div>
                  </th>
                  <th scope="col"
                    className="px-2 py-0 border border-tableBorder">
                    <div className=" flex items-center gap-2">
                     <div className="font-medium text-[#718EBF] text-base leading-normal">
                      Date
                      </div>
                    </div>
                  </th>
                  <th scope="col" className="px-2 py-0 border border-tableBorder">
                    <div className=" flex items-center gap-2">
                      <div className="font-medium text-[#718EBF] text-base leading-normal">
                      Amount
                      </div>
                    </div>
                  </th>
                  <th scope="col" className="px-2 py-0 border border-tableBorder">
                    <div className=" flex items-center gap-2"> 
                      <div className="font-medium text-[#718EBF] text-base leading-normal">
                      Receipt
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className=" border border-tableBorder bg-white">
                  <td className="w-4  px-4 py-0 border border-tableBorder">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="checkbox-table-search-1"
                        className="sr-only"
                      >
                        checkbox
                      </label>
                    </div>
                  </td>
                  <td className=" px-2 py-2 border border-tableBorder flex items-center gap-2">
                    <div>
                    <PiArrowCircleUp className=" w-[30px] h-[30px] text-[#718EBF] my-2" />
                    </div>
                    <div>
                      <p className=" text-[#232323] text-base  leading-normal">
                      Spotify Subscription
                      </p>

                    </div>
                  </td>
                  <td className="px-2 py-0 border border-tableBorder">
                  <p className=" text-[#232323] text-base  leading-normal">
                  #12548796
                      </p>
                  </td>
                  <td className="px-2 py-0 border border-tableBorder">
                  <p className=" text-[#232323] text-base  leading-normal">
                      Shopping
                      </p>
                  </td>
                  <td className="px-2 py-0 border border-tableBorder">
                    <div className=" flex gap-1.5">
                    <p className=" text-[#232323] text-base  leading-normal">
                      1234 ****
                      </p>
       
                    </div>
                  </td>
                  <td className="px-2 py-0 border border-tableBorder">
                    <div className=" flex gap-1.5">
                    <p className=" text-[#232323] text-base  leading-normal">
                    28 Jan, 12.30 AM
                      </p>
       
                    </div>
                  </td>
                  <td className="px-2 py-0 border border-tableBorder">
                    <div className=" flex gap-1.5">
                    <p className=" text-[#FE5C73] text-base font-medium  leading-normal">
                    -$2,500
                      </p>
       
                    </div>
                  </td>
                  <td className="px-2 py-0 border border-tableBorder">
                    <div className=" flex gap-1.5">
                <button className="text-[#123288] text-[15px] border border-[#123288] h-[35px] w-[100px] rounded-full">
                    Download
                </button>
       
                    </div>
                  </td>
                </tr>
                <tr className=" border border-tableBorder bg-white">
                  <td className="w-4  px-4 py-0 border border-tableBorder">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="checkbox-table-search-1"
                        className="sr-only"
                      >
                        checkbox
                      </label>
                    </div>
                  </td>
                  <td className=" px-2 py-2 border border-tableBorder flex items-center gap-2">
                    <div>
                    <PiArrowCircleUp className=" w-[30px] h-[30px] text-[#718EBF] my-2" />
                    </div>
                    <div>
                      <p className=" text-[#232323] text-base  leading-normal">
                      Spotify Subscription
                      </p>

                    </div>
                  </td>
                  <td className="px-2 py-0 border border-tableBorder">
                  <p className=" text-[#232323] text-base  leading-normal">
                  #12548796
                      </p>
                  </td>
                  <td className="px-2 py-0 border border-tableBorder">
                  <p className=" text-[#232323] text-base  leading-normal">
                      Shopping
                      </p>
                  </td>
                  <td className="px-2 py-0 border border-tableBorder">
                    <div className=" flex gap-1.5">
                    <p className=" text-[#232323] text-base  leading-normal">
                      1234 ****
                      </p>
       
                    </div>
                  </td>
                  <td className="px-2 py-0 border border-tableBorder">
                    <div className=" flex gap-1.5">
                    <p className=" text-[#232323] text-base  leading-normal">
                    28 Jan, 12.30 AM
                      </p>
       
                    </div>
                  </td>
                  <td className="px-2 py-0 border border-tableBorder">
                    <div className=" flex gap-1.5">
                    <p className=" text-[#FE5C73] text-base font-medium  leading-normal">
                    -$2,500
                      </p>
       
                    </div>
                  </td>
                  <td className="px-2 py-0 border border-tableBorder">
                    <div className=" flex gap-1.5">
                <button className="text-[#123288] text-[15px] border border-[#123288] h-[35px] w-[100px] rounded-full">
                    Download
                </button>
       
                    </div>
                  </td>
                </tr>
                <tr className=" border border-tableBorder bg-white">
                  <td className="w-4  px-4 py-0 border border-tableBorder">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="checkbox-table-search-1"
                        className="sr-only"
                      >
                        checkbox
                      </label>
                    </div>
                  </td>
                  <td className=" px-2 py-2 border border-tableBorder flex items-center gap-2">
                    <div>
                    <PiArrowCircleUp className=" w-[30px] h-[30px] text-[#718EBF] my-2" />
                    </div>
                    <div>
                      <p className=" text-[#232323] text-base  leading-normal">
                      Spotify Subscription
                      </p>

                    </div>
                  </td>
                  <td className="px-2 py-0 border border-tableBorder">
                  <p className=" text-[#232323] text-base  leading-normal">
                  #12548796
                      </p>
                  </td>
                  <td className="px-2 py-0 border border-tableBorder">
                  <p className=" text-[#232323] text-base  leading-normal">
                      Shopping
                      </p>
                  </td>
                  <td className="px-2 py-0 border border-tableBorder">
                    <div className=" flex gap-1.5">
                    <p className=" text-[#232323] text-base  leading-normal">
                      1234 ****
                      </p>
       
                    </div>
                  </td>
                  <td className="px-2 py-0 border border-tableBorder">
                    <div className=" flex gap-1.5">
                    <p className=" text-[#232323] text-base  leading-normal">
                    28 Jan, 12.30 AM
                      </p>
       
                    </div>
                  </td>
                  <td className="px-2 py-0 border border-tableBorder">
                    <div className=" flex gap-1.5">
                    <p className=" text-[#FE5C73] text-base font-medium  leading-normal">
                    -$2,500
                      </p>
       
                    </div>
                  </td>
                  <td className="px-2 py-0 border border-tableBorder">
                    <div className=" flex gap-1.5">
                <button className="text-[#123288] text-[15px] border border-[#123288] h-[35px] w-[100px] rounded-full">
                    Download
                </button>
       
                    </div>
                  </td>
                </tr>
                <tr className=" border border-tableBorder bg-white">
                  <td className="w-4  px-4 py-0 border border-tableBorder">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="checkbox-table-search-1"
                        className="sr-only"
                      >
                        checkbox
                      </label>
                    </div>
                  </td>
                  <td className=" px-2 py-2 border border-tableBorder flex items-center gap-2">
                    <div>
                    <PiArrowCircleUp className=" w-[30px] h-[30px] text-[#718EBF] my-2" />
                    </div>
                    <div>
                      <p className=" text-[#232323] text-base  leading-normal">
                      Spotify Subscription
                      </p>

                    </div>
                  </td>
                  <td className="px-2 py-0 border border-tableBorder">
                  <p className=" text-[#232323] text-base  leading-normal">
                  #12548796
                      </p>
                  </td>
                  <td className="px-2 py-0 border border-tableBorder">
                  <p className=" text-[#232323] text-base  leading-normal">
                      Shopping
                      </p>
                  </td>
                  <td className="px-2 py-0 border border-tableBorder">
                    <div className=" flex gap-1.5">
                    <p className=" text-[#232323] text-base  leading-normal">
                      1234 ****
                      </p>
       
                    </div>
                  </td>
                  <td className="px-2 py-0 border border-tableBorder">
                    <div className=" flex gap-1.5">
                    <p className=" text-[#232323] text-base  leading-normal">
                    28 Jan, 12.30 AM
                      </p>
       
                    </div>
                  </td>
                  <td className="px-2 py-0 border border-tableBorder">
                    <div className=" flex gap-1.5">
                    <p className=" text-[#FE5C73] text-base font-medium  leading-normal">
                    -$2,500
                      </p>
       
                    </div>
                  </td>
                  <td className="px-2 py-0 border border-tableBorder">
                    <div className=" flex gap-1.5">
                <button className="text-[#123288] text-[15px] border border-[#123288] h-[35px] w-[100px] rounded-full">
                    Download
                </button>
       
                    </div>
                  </td>
                </tr>
               
                
              </tbody>
            </table>
          </div>
          {/* ----------------End table--------------------------- */}
        </>
        // End Tab content 1
      ),
    },
    {
      label: "Income",
      content: (
        <>
          {/* //   Tab 2 content */}
          
        </>
      ),
      // End Tab content 2
    },
    {
      label: "Expense",
      content: (
        <>
          {/* Tab content 3 */}

          {/* End Tab content 3 */}
        </>
      ),
    },
  ];
  return (
    <>
      <div className=" flex  min-h-screen">
        {/* Left sidebar */}
        <div className=" w-[15%]  flex flex-col justify-between py-4 px-4 border-r-2 border-customBorder shadow-borderShadow mt-2">
          {/* SIDE LEFT BAR TOP SECTION */}
          <div>
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
            {/* SEARCH INPUT WITH ICON */}
            <input
              type="text"
              placeholder="Search..."
              className=" w-full rounded-lg border border-[#E7E7E7] p-[10px] focus:outline-none placeholder-[#717171] mb-12"
            />
            {/* MENU WITH ICONS */}
            <div className=" mb-9 flex gap-6 items-center">
              <BiSolidHome className=" w-6 h-6 text-[#B1B1B1]" />
              <p className=" text-[#B1B1B1] text-base leading-normal font-medium">
                Dashboard
              </p>
            </div>
            <div className=" mb-9 flex gap-6 items-center">
              <MdOutlineBarChart className=" w-6 h-6 text-[#B1B1B1] " />
              <p className=" text-[#B1B1B1] text-base leading-normal font-medium">
                Customers
              </p>
            </div>
            <div className=" mb-9 flex gap-6 items-center">
              <TbDeviceMobileDollar className=" w-6 h-6 text-customBlue" />
              <p className=" text-customBlue text-base leading-normal font-medium">
                Transaction
              </p>
            </div>
            <div className=" mb-9 flex gap-6 items-center">
              <HiWrenchScrewdriver className=" w-6 h-6 text-[#B1B1B1]" />
              <p className=" text-[#B1B1B1] text-base leading-normal font-medium">
                Point of Services
              </p>
            </div>
            <div className=" mb-9 flex gap-6 items-center">
              <FaMoneyCheckDollar className=" w-6 h-6 text-[#B1B1B1]" />
              <p className=" text-[#B1B1B1] text-base leading-normal font-medium">
                Payment Terminal
              </p>
            </div>
            <div className=" mb-9 flex gap-6 items-center">
              <BsCreditCard2Back className=" w-6 h-6 text-[#B1B1B1]" />
              <p className=" text-[#B1B1B1] text-base leading-normal font-medium">
                Credit Cards
              </p>
            </div>
            <div className=" mb-9 flex gap-6 items-center">
              <BiSolidUser className=" w-6 h-6 text-[#B1B1B1]" />
              <p className=" text-[#B1B1B1] text-base leading-normal font-medium">
                User Management
              </p>
            </div>
            <div className=" mb-9 flex gap-6 items-center">
              <IoMdSettings className=" w-6 h-6 text-[#B1B1B1]" />
              <p className=" text-[#B1B1B1] text-base leading-normal font-medium">
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
        {/* Main content right section */}
        <div className=" w-[85%] bg-white min-h-[500px]  rounded p-0 mt-2">
          {/* right section top row */}
          <div className=" w-full flex justify-end items-center gap-7 mb-3 p-4">
            {/* SEARCH INPUT WITH ICON */}
            <input
              type="text"
              placeholder="Search for something"
              className=" bg-[#F5F7FA] w-64 h-[50px] rounded-[40px] px-6 border border-[#E7E7E7]  focus:outline-none placeholder-[#8BA3CB] text-[15px] leading-normal"
            />
            <div className=" w-[50px] h-[50px] bg-[#F5F7FA] rounded-full flex justify-center items-center">
              <CiSettings className=" text-[#718EBF] w-[25px] h-[25px]" />
            </div>
            <div className=" w-[50px] h-[50px] bg-[#F5F7FA] rounded-full flex justify-center items-center">
              <IoIosNotificationsOutline className=" text-[#FE5C73] w-[25px] h-[25px]" />
            </div>
            <div className=" w-[50px] h-[50px]  rounded-full flex justify-center items-center">
              <Image
                src="/images/profile.png"
                alt="Orizon profile"
                width={50}
                height={50}
              />
            </div>
          </div>
          <div className=" w-full   bg-[#F5F7FA] flex justify-center p-8">
            <div className=" w-[95%] min-h-[600px] bg-white rounded-[25px]">
              <div className="p-6">
                <p className=" text-[#343C6A] text-[22px] font-medium leading-normal ml-2 mb-4">
                  Recent Transactions
                </p>
                <Tabs tabs={tabs} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
