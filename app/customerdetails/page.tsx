"use client";
import Image from "next/image";
import Tabs from "../component/Tabs";
import { CiSettings } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import { appCheck } from "../firebase-config";
import { getToken } from "firebase/app-check";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import AxiosProvider from "../../provider/AxiosProvider";
import { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { AppContext } from "../AppContext";
import LeftSideBar from "../component/LeftSideBar";
import UserActivityLogger from "../../provider/UserActivityLogger";
import { MdVerified } from "react-icons/md";
import { TbTopologyStarRing2 } from "react-icons/tb";
import { PiMapPinLight } from "react-icons/pi";
import { HiOutlineEnvelope } from "react-icons/hi2";

export default function Home() {
  const tabs = [
    {
      label: "User Home",
      content: (
        <>
          <div className="flex gap-8 pt-8 w-full">
            <div className="w-1/2">
              {/* PERSONAL INFO */}
              <div className="border border-[#F1F1F4] rounded-[12px] w-full mb-4">
                <div className="py-4 px-4 border-b border-[#F1F1F4]">
                  <p className="text-base font-semibold leading-4">
                    Personal Info
                  </p>
                </div>
                <table className="w-full pl-8">
                  <thead className=" h-[88px]">
                    <tr className="border-b border-[#F1F1F4]">
                      <th className="w-[20%]  text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        Photo
                      </th>
                      <th className="w-[60%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        {" "}
                        150x150px JPEG, PNG Image
                      </th>
                      <th className="w-[20%]">
                        {" "}
                        <Image
                          src="/images/Component 6.png"
                          alt="Orizon profile"
                          width={60}
                          height={60}
                          className="rounded-full m-auto border-2 border-[#17C653]"
                        />
                      </th>
                    </tr>
                  </thead>
                  <thead className="h-[57px]">
                    <tr className="border-b border-[#F1F1F4]">
                      <th className="w-[20%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        Name
                      </th>
                      <th className="w-[60%] text-sm font-medium leading-5 text-[#252F4A] text-left pl-[20px]">
                        Alexandre Prot
                      </th>
                      <th className="w-[20%] text-[#1B84FF] text-xs font-medium leading-3 cursor-pointer">
                        Edit
                      </th>
                    </tr>
                  </thead>
                  <thead className="h-[57px]">
                    <tr className="border-b border-[#F1F1F4]">
                      <th className="w-[20%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        Availability
                      </th>
                      <th className="w-[60%] text-[11px] font-medium leading-5 text-[#17C653] text-left pl-[20px]">
                        {" "}
                        <span className="bg-[#EAFFF1] py-[6px] px-[7px] rounded border border-[#17C653]">
                          Available now
                        </span>
                      </th>
                      <th className="w-[20%] text-[#1B84FF] text-xs font-medium leading-3 cursor-pointer">
                        Edit
                      </th>
                    </tr>
                  </thead>
                  <thead className="h-[57px]">
                    <tr className="border-b border-[#F1F1F4]">
                      <th className="w-[20%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        Birthday
                      </th>
                      <th className="w-[60%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        {" "}
                        28 May 1996
                      </th>
                      <th className="w-[20%] text-[#1B84FF] text-xs font-medium leading-3 cursor-pointer">
                        Edit
                      </th>
                    </tr>
                  </thead>
                  <thead className="h-[57px]">
                    <tr className="border-b border-[#F1F1F4]">
                      <th className="w-[20%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        Gender
                      </th>
                      <th className="w-[60%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        {" "}
                        Male
                      </th>
                      <th className="w-[20%] text-[#1B84FF] text-xs font-medium leading-3 cursor-pointer">
                        Edit
                      </th>
                    </tr>
                  </thead>
                  <thead className="h-[57px]">
                    <tr className="border-b border-[#F1F1F4]">
                      <th className="w-[20%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        Address
                      </th>
                      <th className="w-[60%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        {" "}
                        USA
                      </th>
                      <th className="w-[20%] text-[#1B84FF] text-xs font-medium leading-3 cursor-pointer">
                        Edit
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>
              {/* BASIC SETTING */}
              <div className="border border-[#F1F1F4] rounded-[12px] w-full mb-4">
                <div className="py-4 px-4 border-b border-[#F1F1F4]">
                  <p className="text-base font-semibold leading-4">
                    Basic Settings
                  </p>
                </div>
                <table className="w-full pl-8">
                  <thead className=" h-[57px]">
                    <tr className="border-b border-[#F1F1F4]">
                      <th className="w-[20%]  text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        Email
                      </th>
                      <th className="w-[60%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        {" "}
                        jasontt@studio.co
                      </th>
                    </tr>
                  </thead>
                  <thead className="h-[57px]">
                    <tr className="border-b border-[#F1F1F4]">
                      <th className="w-[20%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        Password
                      </th>
                      <th className="w-[60%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        Password last changed 2 months ago
                      </th>
                    </tr>
                  </thead>
                  <thead className="h-[57px]">
                    <tr className="border-b border-[#F1F1F4]">
                      <th className="w-[20%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        2FA
                      </th>
                      <th className="w-[60%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        To be set
                      </th>
                      <th className="w-[20%] text-[#1B84FF] text-xs font-medium leading-3 cursor-pointer">
                        Edit
                      </th>
                    </tr>
                  </thead>
                  <thead className="h-[57px]">
                    <tr className="border-b border-[#F1F1F4]">
                      <th className="w-[20%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        Sign-in with
                      </th>
                      <th className="w-[60%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        <div className=" flex items-center gap-3">
                          <Image
                            src="/images/apple.png"
                            alt="Orizon profile"
                            width={32}
                            height={32}
                          />
                          <Image
                            src="/images/fb.png"
                            alt="Orizon profile"
                            width={32}
                            height={32}
                          />
                          <Image
                            src="/images/google.png"
                            alt="Orizon profile"
                            width={32}
                            height={32}
                          />
                        </div>
                      </th>
                      <th className="w-[20%] text-[#1B84FF] text-xs font-medium leading-3 cursor-pointer">
                        Setup
                      </th>
                    </tr>
                  </thead>
                  <thead className="h-[57px]">
                    <tr className="border-b border-[#F1F1F4]">
                      <th className="w-[20%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        Team Account
                      </th>
                      <th className="w-[60%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        To be set
                      </th>
                      <th className="w-[20%] text-[#1B84FF] text-xs font-medium leading-3 cursor-pointer">
                        Setup
                      </th>
                    </tr>
                  </thead>
                  <thead className="h-[57px]">
                    <tr className="border-b border-[#F1F1F4]">
                      <th className="w-[20%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        Social Profiles
                      </th>
                      <th className="w-[60%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        <div className=" flex items-center gap-3">
                          <Image
                            src="/images/a.png"
                            alt="Orizon profile"
                            width={32}
                            height={32}
                          />
                          <Image
                            src="/images/b.png"
                            alt="Orizon profile"
                            width={32}
                            height={32}
                          />
                          <Image
                            src="/images/c.png"
                            alt="Orizon profile"
                            width={32}
                            height={32}
                          />
                          <Image
                            src="/images/d.png"
                            alt="Orizon profile"
                            width={32}
                            height={32}
                          />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <thead className="h-[57px]">
                    <tr className="border-b border-[#F1F1F4]">
                      <th className="w-[20%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        Referral Link
                      </th>
                      <th className="w-[60%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        https://studio.co/W3gvQOI35dt
                      </th>
                      <th className="w-[20%] text-[#1B84FF] text-xs font-medium leading-3 cursor-pointer">
                        Re Create
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>
              {/* COMMUNITY */}
              <div className="border border-[#F1F1F4] rounded-[12px] w-full">
                <div className="py-4 px-4 border-b border-[#F1F1F4]">
                  <p className="text-base font-semibold leading-4">
                    Community Badges
                  </p>
                </div>
                <table className="w-full pl-8">
                  <thead className=" h-[100px]">
                    <tr className="border-b border-[#F1F1F4]">
                      <th className="w-[60%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        <div className=" flex items-center gap-3">
                          <Image
                            src="/images/1.png"
                            alt="Orizon profile"
                            width={50}
                            height={50}
                          />
                          <Image
                            src="/images/2.png"
                            alt="Orizon profile"
                            width={50}
                            height={50}
                          />
                          <Image
                            src="/images/3.png"
                            alt="Orizon profile"
                            width={50}
                            height={50}
                          />
                          <Image
                            src="/images/4.png"
                            alt="Orizon profile"
                            width={50}
                            height={50}
                          />
                        </div>
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
            <div className="w-1/2">
            <div className="border border-[#F1F1F4] rounded-[12px] w-full">
                <div className="py-4 px-4 border-b border-[#F1F1F4]">
                  <p className="text-base font-semibold leading-4">
                    Community Badges
                  </p>
                </div>
                <table className="w-full pl-8">
                  <thead className=" h-[100px]">
                    <tr className="border-b border-[#F1F1F4]">
                      <th className="w-[60%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        <div className=" flex items-center gap-3">
                          <Image
                            src="/images/1.png"
                            alt="Orizon profile"
                            width={50}
                            height={50}
                          />
                          <Image
                            src="/images/2.png"
                            alt="Orizon profile"
                            width={50}
                            height={50}
                          />
                          <Image
                            src="/images/3.png"
                            alt="Orizon profile"
                            width={50}
                            height={50}
                          />
                          <Image
                            src="/images/4.png"
                            alt="Orizon profile"
                            width={50}
                            height={50}
                          />
                        </div>
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
            {/* ------------------------------- */}
          </div>
        </>
      ),
    },
    {
      label: "Preferences",
      content: (
        <>
          {/* //   Tab 2 content */}
          <div className=" flex gap-8 pt-8">
            <div className=" w-full">
              <div className=" w-full flex gap-6">
                <div className=" w-full">
                  <p className=" text-[#232323] text-base leading-normal mb-2">
                    Currency
                  </p>
                  <input
                    type="text"
                    placeholder="USD"
                    className=" focus:outline-none w-full h-[50px] border border-[#DFEAF2] rounded-[15px] text-[15px] placeholder-[#718EBF] pl-4 mb-6"
                  />
                </div>
                <div className=" w-full">
                  <p className=" text-[#232323] text-base leading-normal mb-2">
                    Time Zone
                  </p>
                  <input
                    type="text"
                    placeholder="(GMT-12:00) International Date Line West"
                    className=" focus:outline-none w-full h-[50px] border border-[#DFEAF2] rounded-[15px] text-[15px] placeholder-[#718EBF] pl-4 mb-6"
                  />
                </div>
              </div>
              <div className=" w-full flex gap-6">
                <div className=" w-full">
                  <p className=" text-[#333B69] text-[17px] font-medium leading-normal mb-2">
                    Controlls
                  </p>
                  <label className="inline-flex items-center cursor-pointer mt-4">
                    <input
                      type="checkbox"
                      value=""
                      className="sr-only peer"
                      readOnly
                    />
                    <div className="relative w-14 h-[30.71px] bg-gray-200 peer-focus:outline-none   rounded-full peer dark:bg-[#DFEAF2] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:start-[4px] after:bg-white   after:rounded-full after:h-6 after:w-6 after:transition-all  peer-checked:bg-[#16DBCC]"></div>
                    <span className="ms-3 text-base  text-[#232323] leading-normal">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit
                    </span>
                  </label>
                  <label className="inline-flex items-center cursor-pointer mt-4">
                    <input type="checkbox" value="" className="sr-only peer" />
                    <div className="relative w-14 h-[30.71px] bg-gray-200 peer-focus:outline-none   rounded-full peer dark:bg-[#DFEAF2] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:start-[4px] after:bg-white   after:rounded-full after:h-6 after:w-6 after:transition-all  peer-checked:bg-[#16DBCC]"></div>
                    <span className="ms-3 text-base  text-[#232323] leading-normal">
                      Delete User Detais
                    </span>
                  </label>
                  <label className="inline-flex items-center cursor-pointer mt-4">
                    <input
                      type="checkbox"
                      value=""
                      className="sr-only peer"
                      readOnly
                    />
                    <div className="relative w-14 h-[30.71px] bg-gray-200 peer-focus:outline-none   rounded-full peer dark:bg-[#DFEAF2] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:start-[4px] after:bg-white   after:rounded-full after:h-6 after:w-6 after:transition-all  peer-checked:bg-[#16DBCC]"></div>
                    <span className="ms-3 text-base  text-[#232323] leading-normal">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit
                    </span>
                  </label>
                </div>
                <div className=" w-full"></div>
              </div>
              <div className=" w-full flex gap-6">
                <div className=" w-full"></div>
                <div className=" w-full flex justify-end">
                  <button className=" w-[190px] h-[50px] bg-customBlue rounded-[15px] text-white text-lg leading-normal font-medium">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ),
      // End Tab content 2
    },
    {
      label: "Security",
      content: (
        <>
          {/* Tab content 3 */}
          <div className=" w-full flex gap-6">
            <div className=" w-full">
              <p className=" text-[#333B69] text-[17px] font-medium leading-normal mb-2">
                Controlls
              </p>
              <label className="inline-flex items-center cursor-pointer mt-4">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  readOnly
                />
                <div className="relative w-14 h-[30.71px] bg-gray-200 peer-focus:outline-none   rounded-full peer dark:bg-[#DFEAF2] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:start-[4px] after:bg-white   after:rounded-full after:h-6 after:w-6 after:transition-all  peer-checked:bg-[#16DBCC]"></div>
                <span className="ms-3 text-base  text-[#232323] leading-normal">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </span>
              </label>
            </div>
            <div className=" w-full"></div>
          </div>
          <p className=" text-[#333B69] text-[17px] font-medium leading-normal mb-2 mt-4">
            Change Password
          </p>
          <div className=" w-full">
            <div className=" w-full flex gap-6">
              <div className=" w-full">
                <p className=" text-[#232323] text-base leading-normal mb-2">
                  Current Password
                </p>
                <input
                  type="password"
                  placeholder="********"
                  className=" focus:outline-none w-full h-[50px] border border-[#DFEAF2] rounded-[15px] text-[15px] placeholder-[#718EBF] pl-4 mb-6"
                />
              </div>
              <div className=" w-full"></div>
            </div>
            <div className=" w-full flex gap-6">
              <div className=" w-full">
                <p className=" text-[#232323] text-base leading-normal mb-2">
                  New Password
                </p>
                <input
                  type="password"
                  placeholder="********"
                  className=" focus:outline-none w-full h-[50px] border border-[#DFEAF2] rounded-[15px] text-[15px] placeholder-[#718EBF] pl-4 mb-6"
                />
              </div>
              <div className=" w-full"></div>
            </div>
          </div>

          {/* End Tab content 3 */}
        </>
      ),
    },
  ];
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
            <div className=" w-[95%] min-h-[600px] bg-white rounded-[25px]">
              <div className="p-6">
                <div className="flex justify-center">
                  <Image
                    src="/images/300-1.png.png"
                    alt="Orizon profile"
                    width={100}
                    height={100}
                    className="rounded-full mb-4"
                  />
                </div>
                <div className="flex items-center justify-center gap-1 mb-4">
                  <p className="text-[#071437] text-lg font-semibold leading-5">
                    Jenny Klabber
                  </p>
                  <MdVerified className="w-4 h-4 text-[#1B84FF] relative top-[1.5px]" />
                </div>
                <div className="flex justify-center items-center gap-5">
                  <div className="flex items-center justify-center gap-1">
                    <TbTopologyStarRing2 className="w-[14px] h-[20px] text-[#99A1B7]" />
                    <p className="text-[#78829D] text-sm font-medium leading-5">
                      abc work
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <PiMapPinLight className="w-[14px] h-[20px] text-[#99A1B7]" />
                    <p className="text-[#78829D] text-sm font-medium leading-5">
                      Netherlands
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <HiOutlineEnvelope className="w-[14px] h-[20px] text-[#99A1B7]" />
                    <p className="text-[#78829D] text-sm font-medium leading-5">
                      abc@xyz.com
                    </p>
                  </div>
                </div>
                <Tabs tabs={tabs} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
