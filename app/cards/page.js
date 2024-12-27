"use client";
import Image from "next/image";
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
import Link from "next/link";
import { GoDotFill } from "react-icons/go";
import { HiOutlineWallet } from "react-icons/hi2";
import LeftSideBar from "../component/LeftSideBar";

export default function Home() {
  return (
    <>
      <div className=" flex  min-h-screen">
        {/* Left sidebar */}
        <LeftSideBar />
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
            <div className=" w-full min-h-[600px] bg-[#F5F7FA] rounded-[25px]">
              <div className="p-6">
                <p className="text-[#333B69] text-2xl font-semibold leading-normal mb-5">
                  My Cards
                </p>
                <div className=" flex gap-6 justify-between items-center">
                  {/* CARD */}
                  <div className=" w-full h-[225px] bg-cardBg rounded-2xl p-4 relative mb-8">
                    <div className=" flex justify-between items-center mb-5">
                      <div>
                        <p className=" text-white text-[11px] leading-normal">
                          Balance
                        </p>
                        <p className=" text-white text-base font-semibold leading-normal">
                          $5,756
                        </p>
                      </div>
                      <div>
                        <Image
                          src="/images/Chip_Card.svg"
                          width={0}
                          height={0}
                          alt="Picture of the author"
                          className=" w-[29px] h-full"
                        />
                      </div>
                    </div>

                    <div className=" flex justify-between items-center w-full">
                      <div>
                        <p className=" text-white opacity-70 text-[10px] leading-normal">
                          CARD HOLDER
                        </p>
                        <p className=" text-white text-[13px] font-semibold leading-normal">
                          Eddy Cusuma
                        </p>
                      </div>
                      <div>
                        <p className=" text-white opacity-70 text-[10px] leading-normal">
                          VALID THRU
                        </p>
                        <p className=" text-white text-[13px] font-semibold leading-normal">
                          12/22
                        </p>
                      </div>
                    </div>
                    <div className=" flex justify-between items-center bg-cardFooter absolute bottom-0 left-0 right-0 w-full h-[70px] mx-auto p-4">
                      <p className=" text-[15pox] font-semibold text-white">
                        3778 **** **** 1234
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="44"
                        height="30"
                        viewBox="0 0 44 30"
                        fill="none"
                      >
                        <circle
                          cx="15"
                          cy="15"
                          r="15"
                          fill="white"
                          fillOpacity="0.5"
                        />
                        <circle
                          cx="29"
                          cy="15"
                          r="15"
                          fill="white"
                          fillOpacity="0.5"
                        />
                      </svg>
                    </div>
                  </div>
                  {/* END  CARD */}
                  {/* CARD */}
                  <div className=" w-full h-[225px] bg-card rounded-2xl p-4 relative mb-8">
                    <div className=" flex justify-between items-center mb-5">
                      <div>
                        <p className=" text-white text-[11px] leading-normal">
                          Balance
                        </p>
                        <p className=" text-white text-base font-semibold leading-normal">
                          $5,756
                        </p>
                      </div>
                      <div>
                        <Image
                          src="/images/Chip_Card.svg"
                          width={0}
                          height={0}
                          alt="Picture of the author"
                          className=" w-[29px] h-full"
                        />
                      </div>
                    </div>

                    <div className=" flex justify-between items-center w-full">
                      <div>
                        <p className=" text-white opacity-70 text-[10px] leading-normal">
                          CARD HOLDER
                        </p>
                        <p className=" text-white text-[13px] font-semibold leading-normal">
                          Eddy Cusuma
                        </p>
                      </div>
                      <div>
                        <p className=" text-white opacity-70 text-[10px] leading-normal">
                          VALID THRU
                        </p>
                        <p className=" text-white text-[13px] font-semibold leading-normal">
                          12/22
                        </p>
                      </div>
                    </div>
                    <div className=" flex justify-between items-center bg-cardFooter absolute bottom-0 left-0 right-0 w-full h-[70px] mx-auto p-4">
                      <p className=" text-[15pox] font-semibold text-white">
                        3778 **** **** 1234
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="44"
                        height="30"
                        viewBox="0 0 44 30"
                        fill="none"
                      >
                        <circle
                          cx="15"
                          cy="15"
                          r="15"
                          fill="white"
                          fillOpacity="0.5"
                        />
                        <circle
                          cx="29"
                          cy="15"
                          r="15"
                          fill="white"
                          fillOpacity="0.5"
                        />
                      </svg>
                    </div>
                  </div>
                  {/* END  CARD */}
                  {/* CARD */}
                  <div className=" w-full h-[225px] border bg-white border-[#DFEAF2] rounded-2xl p-4 relative mb-8">
                    <div className=" flex justify-between items-center mb-5">
                      <div>
                        <p className=" text-[#718EBF] text-[11px] leading-normal">
                          Balance
                        </p>
                        <p className=" text-[#343C6A] text-base font-semibold leading-normal">
                          $5,756
                        </p>
                      </div>
                      <div>
                        <Image
                          src="/images/white-card.svg"
                          width={0}
                          height={0}
                          alt="Picture of the author"
                          className=" w-[29px] h-full"
                        />
                      </div>
                    </div>

                    <div className=" flex justify-between items-center w-full">
                      <div>
                        <p className=" text-[#718EBF] opacity-70 text-[10px] leading-normal">
                          CARD HOLDER
                        </p>
                        <p className=" text-[#343C6A] text-[13px] font-semibold leading-normal">
                          Eddy Cusuma
                        </p>
                      </div>
                      <div>
                        <p className=" text-[#718EBF] opacity-70 text-[10px] leading-normal">
                          VALID THRU
                        </p>
                        <p className=" text-[#343C6A] text-[13px] font-semibold leading-normal">
                          12/22
                        </p>
                      </div>
                    </div>
                    <div className=" flex justify-between items-center bg-cardFooter absolute bottom-0 left-0 right-0 w-full h-[70px] mx-auto p-4 border-t border-[#DFEAF2]">
                      <p className=" text-[15pox] font-semibold text-[#343C6A] ">
                        3778 **** **** 1234
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="44"
                        height="30"
                        viewBox="0 0 44 30"
                        fill="none"
                      >
                        <circle
                          cx="15"
                          cy="15"
                          r="15"
                          fill="#9199AF"
                          fillOpacity="0.5"
                        />
                        <circle
                          cx="29"
                          cy="15"
                          r="15"
                          fill="#9199AF"
                          fillOpacity="0.5"
                        />
                      </svg>
                    </div>
                  </div>
                  {/* END  CARD */}
                </div>
                {/* CARD EXPENSE */}
                <div className="flex justify-between">
                  <div className=" w-[34%]">
                    <p className="text-[#333B69] text-2xl font-semibold leading-normal  mb-5">
                      Card Expense Statistics
                    </p>
                  </div>
                  <div className=" w-[64%]">
                    <p className="text-[#333B69] text-2xl font-semibold leading-normal  mb-5">
                      Card List
                    </p>
                  </div>
                </div>
                <div className="flex justify-between mb-8">
                  <div className=" w-[34%] h-[310] bg-white flex justify-center items-center rounded-[25px]">
                    <div className=" flex flex-col justify-center items-center p-[25px]">
                      <Image
                        src="/images/cardStatic.svg"
                        alt="Orizon profile"
                        width={0}
                        height={0}
                        className=" h-[169px] w-[173px]"
                      />
                      <div className=" flex gap-8 mb-4">
                        <div className=" flex gap-3 justify-center items-center">
                          <GoDotFill className="text-[#4C78FF] text-[28px]" />
                          <p className="text-[#718EBF] text-[15px] font-medium leading-normal">
                            DBL Bank
                          </p>
                        </div>
                        <div className=" flex gap-3 justify-center items-center">
                          <GoDotFill className="text-[#FF82AC] text-[28px]" />
                          <p className="text-[#718EBF] text-[15px] font-medium leading-normal">
                            DBL Bank
                          </p>
                        </div>
                      </div>
                      <div className=" flex gap-8">
                        <div className=" flex gap-3 justify-center items-center relative left-[4.8px]">
                          <GoDotFill className="text-[#16DBCC] text-[28px]" />
                          <p className="text-[#718EBF] text-[15px] font-medium leading-normal">
                            ABM Bank
                          </p>
                        </div>
                        <div className=" flex gap-3 justify-center items-center">
                          <GoDotFill className="text-[#FFBB38] text-[28px]" />
                          <p className="text-[#718EBF] text-[15px] font-medium leading-normal">
                            MCP Bank
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="  w-[64%]">
                    <div className=" p-[20px] h-[90px] rounded-[20px] bg-white flex justify-between items-center mb-5">
                      <div className=" flex items-center w-full">
                        <div className="bg-[#E7EDFF] rounded-[12px] h-[45px] w-[45px] flex justify-center items-center mr-5">
                          <HiOutlineWallet className=" h-5 w-5 text-[#396AFF]" />
                        </div>
                        <div className="flex items-center justify-between w-full">
                          <div className="">
                            <p className="text-[#232323] text-base font-medium leading-normal">
                              Card Type
                            </p>
                            <p className="text-[#718EBF] text-[15px] leading-normal">
                              Secondary
                            </p>
                          </div>
                          <div className="">
                            <p className="text-[#232323] text-base font-medium leading-normal">
                              Bank
                            </p>
                            <p className="text-[#718EBF] text-[15px] leading-normal">
                              BRC Bank
                            </p>
                          </div>
                          <div className="">
                            <p className="text-[#232323] text-base font-medium leading-normal">
                              Card Number
                            </p>
                            <p className="text-[#718EBF] text-[15px] leading-normal">
                              **** **** 5600
                            </p>
                          </div>
                          <div className="">
                            <p className="text-[#232323] text-base font-medium leading-normal">
                              Namain Card
                            </p>
                            <p className="text-[#718EBF] text-[15px] leading-normal">
                              William
                            </p>
                          </div>
                          <div className="text-[#1814F3] text-[15px] font-medium leading-normal">
                            View Details
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className=" p-[20px] h-[90px] rounded-[20px] bg-white flex justify-between items-center mb-5">
                      <div className=" flex items-center w-full">
                        <div className="bg-[#FFE0EB] rounded-[12px] h-[45px] w-[45px] flex justify-center items-center mr-5">
                          <HiOutlineWallet className=" h-5 w-5 text-[#FF82AC]" />
                        </div>
                        <div className="flex items-center justify-between w-full">
                          <div className="">
                            <p className="text-[#232323] text-base font-medium leading-normal">
                              Card Type
                            </p>
                            <p className="text-[#718EBF] text-[15px] leading-normal">
                              Secondary
                            </p>
                          </div>
                          <div className="">
                            <p className="text-[#232323] text-base font-medium leading-normal">
                              Bank
                            </p>
                            <p className="text-[#718EBF] text-[15px] leading-normal">
                              BRC Bank
                            </p>
                          </div>
                          <div className="">
                            <p className="text-[#232323] text-base font-medium leading-normal">
                              Card Number
                            </p>
                            <p className="text-[#718EBF] text-[15px] leading-normal">
                              **** **** 5600
                            </p>
                          </div>
                          <div className="">
                            <p className="text-[#232323] text-base font-medium leading-normal">
                              Namain Card
                            </p>
                            <p className="text-[#718EBF] text-[15px] leading-normal">
                              William
                            </p>
                          </div>
                          <div className="text-[#1814F3] text-[15px] font-medium leading-normal">
                            View Details
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className=" p-[20px] h-[90px] rounded-[20px] bg-white flex justify-between items-center mb-5">
                      <div className=" flex items-center w-full">
                        <div className="bg-[#FFF5D9] rounded-[12px] h-[45px] w-[45px] flex justify-center items-center mr-5">
                          <HiOutlineWallet className=" h-5 w-5 text-[#FFBB38]" />
                        </div>
                        <div className="flex items-center justify-between w-full">
                          <div className="">
                            <p className="text-[#232323] text-base font-medium leading-normal">
                              Card Type
                            </p>
                            <p className="text-[#718EBF] text-[15px] leading-normal">
                              Secondary
                            </p>
                          </div>
                          <div className="">
                            <p className="text-[#232323] text-base font-medium leading-normal">
                              Bank
                            </p>
                            <p className="text-[#718EBF] text-[15px] leading-normal">
                              BRC Bank
                            </p>
                          </div>
                          <div className="">
                            <p className="text-[#232323] text-base font-medium leading-normal">
                              Card Number
                            </p>
                            <p className="text-[#718EBF] text-[15px] leading-normal">
                              **** **** 5600
                            </p>
                          </div>
                          <div className="">
                            <p className="text-[#232323] text-base font-medium leading-normal">
                              Namain Card
                            </p>
                            <p className="text-[#718EBF] text-[15px] leading-normal">
                              William
                            </p>
                          </div>
                          <div className="text-[#1814F3] text-[15px] font-medium leading-normal">
                            View Details
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* ADD NEW CARD */}
                <div className="flex justify-between">
                  <div className=" w-[75%]">
                    <p className="text-[#333B69] text-2xl font-semibold leading-normal  mb-5">
                      Card Expense Statistics
                    </p>
                  </div>
                  <div className=" w-[25%]">
                    <p className="text-[#333B69] text-2xl font-semibold leading-normal  mb-5">
                      Card List
                    </p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className=" w-[69%] h-[310] bg-white p-[25px] rounded-[25px]">
                    <p className="text-[#718EBF] text-base leading-7 mb-8">
                      Credit Card generally means a plastic card issued by
                      Scheduled Commercial Banks assigned to a Cardholder, with
                      a credit limit, that can be used to purchase goods and
                      services on credit or obtain cash advances.
                    </p>
                    <div className=" w-full flex gap-4 mb-4">
                      <div className=" w-full">
                        <p className=" text-[#232323]  text-base leading-normal mb-2">
                          Card Type
                        </p>
                        <input
                          type="text"
                          placeholder="Diners Club"
                          className=" focus:outline-none w-full  border border-[#DFEAF2] rounded-[12px] text-[15px] leading-4  placeholder-[#718EBF] py-4 px-4"
                        />
                      </div>
                      <div className=" w-full">
                        <p className=" text-[#232323]  text-base leading-normal mb-2">
                          Name On Card
                        </p>
                        <input
                          type="text"
                          placeholder="My Cards"
                          className=" focus:outline-none w-full  border border-[#DFEAF2] rounded-[12px] text-[15px] leading-4  placeholder-[#718EBF] py-4 px-4"
                        />
                      </div>
                    </div>
                    <div className=" w-full flex gap-4 mb-4">
                      <div className=" w-full">
                        <p className="text-[#232323]  text-base leading-normal mb-2 ">
                          Card Number
                        </p>
                        <input
                          type="text"
                          placeholder="**** **** **** ****"
                          className="focus:outline-none w-full  border border-[#DFEAF2] rounded-[12px] text-[15px] leading-4  placeholder-[#718EBF] py-4 px-4"
                        />
                      </div>
                      <div className=" w-full">
                        <p className=" text-[#232323]  text-base leading-normal mb-2">
                          Expiration Date
                        </p>
                        <input
                          type="text"
                          placeholder="25 January 2025"
                          className=" focus:outline-none w-full  border border-[#DFEAF2] rounded-[12px] text-[15px] leading-4  placeholder-[#718EBF] py-4 px-4"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="  w-[29%]  p-[25px] bg-white rounded-[25px]">
                    <div className=" w-full flex flex-col gap-2 justify-between items-center mb-4">
                      <div className=" flex items-center gap-2 mb-4">
                        <div className=" bg-[#FFF5D9] rounded-[20px] w-[60px] h-[60px] flex items-center justify-center mr-2">
                          <HiOutlineWallet className=" h-[25px] w-[25px] text-[#FFBB38]" />
                        </div>
                        <div className="flex flex-col  gap-1">
                          <p className=" text-[#232323] text-base font-medium leading-normal">
                            Block Card
                          </p>
                          <p className=" text-[#718EBF] text-[15px] leading-normal">
                            Instantly block your card
                          </p>
                        </div>
                      </div>
                      <div className=" flex items-center gap-2 mb-4">
                        <div className=" bg-[#E7EDFF] rounded-[20px] w-[60px] h-[60px] flex items-center justify-center mr-2">
                          <HiOutlineWallet className=" h-[25px] w-[25px] text-[#396AFF]" />
                        </div>
                        <div className="flex flex-col  gap-1">
                          <p className=" text-[#232323] text-base font-medium leading-normal">
                            Block Card
                          </p>
                          <p className=" text-[#718EBF] text-[15px] leading-normal">
                            Instantly block your card
                          </p>
                        </div>
                      </div>
                      <div className=" flex items-center gap-2 mb-4">
                        <div className=" bg-[#FFE0EB] rounded-[20px] w-[60px] h-[60px] flex items-center justify-center mr-2">
                          <HiOutlineWallet className=" h-[25px] w-[25px] text-[#FF82AC]" />
                        </div>
                        <div className="flex flex-col  gap-1">
                          <p className=" text-[#232323] text-base font-medium leading-normal">
                            Block Card
                          </p>
                          <p className=" text-[#718EBF] text-[15px] leading-normal">
                            Instantly block your card
                          </p>
                        </div>
                      </div>
                      <div className=" flex items-center gap-2 mb-4">
                        <div className=" bg-[#DCFAF8] rounded-[20px] w-[60px] h-[60px] flex items-center justify-center mr-2">
                          <HiOutlineWallet className=" h-[25px] w-[25px] text-[#16DBCC]" />
                        </div>
                        <div className="flex flex-col  gap-1">
                          <p className=" text-[#232323] text-base font-medium leading-normal">
                            Block Card
                          </p>
                          <p className=" text-[#718EBF] text-[15px] leading-normal">
                            Instantly block your card
                          </p>
                        </div>
                      </div>
                      <div className=" flex items-center gap-2 mb-4">
                        <div className=" bg-[#DCFAF8] rounded-[20px] w-[60px] h-[60px] flex items-center justify-center mr-2">
                          <HiOutlineWallet className=" h-[25px] w-[25px] text-[#16DBCC]" />
                        </div>
                        <div className="flex flex-col  gap-1">
                          <p className=" text-[#232323] text-base font-medium leading-normal">
                            Block Card
                          </p>
                          <p className=" text-[#718EBF] text-[15px] leading-normal">
                            Instantly block your card
                          </p>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
