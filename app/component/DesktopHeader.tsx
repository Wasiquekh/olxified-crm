import React, { useState } from "react";
import Image from "next/image";
import { CiSettings } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { RiMenu2Line } from "react-icons/ri";
import { IoCloseOutline } from "react-icons/io5";
import LeftSideBarMobile from "./LeftSideBarMobile";

const DesktopHeader = () => {
  const [isFlyoutFilterOpen, setFlyoutFilterOpen] = useState<boolean>(false);
  const toggleFilterFlyout = () => setFlyoutFilterOpen(!isFlyoutFilterOpen);
  return (
    <>
      <div className=" w-full flex justify-between items-center gap-7 mb-0">
        {/* SEARCH INPUT WITH ICON */}
        <div className=" hidden md:w-full md:flex md:justify-end md:items-center md:gap-7">
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
        </div>
        <RiMenu2Line
          onClick={toggleFilterFlyout}
          className="text-black text-xl cursor-pointer md:hidden"
        />
        <div className=" w-[50px] h-[50px]  rounded-full flex justify-center items-center">
          <Image
            src="/images/dummy-image.jpg"
            alt="Orizon profile"
            width={50}
            height={50}
            className="rounded-full border-2 border-[#17C653]"
          />
        </div>
      </div>
      {/* LEFT SIDEBAR MENU */}
      {isFlyoutFilterOpen && (
        <>
          <div
            className=" min-h-screen w-full bg-[#1f1d1d80] fixed top-0 left-0 right-0 z-[999]"
            onClick={() => {
              setFlyoutFilterOpen(!isFlyoutFilterOpen);
            }}
          ></div>
          <div
            className={`leftSideBar ${
              isFlyoutFilterOpen ? "leftSideBarOpen" : ""
            }`}
          >
            <div className=" w-full flex min-h-auto">
              {/* Flyout content here */}
              <LeftSideBarMobile />
              <IoCloseOutline
                onClick={toggleFilterFlyout}
                className=" h-8 w-8 border border-[#E7E7E7] text-[#0A0A0A] rounded cursor-pointer absolute top-[62px] right-4"
              />
            </div>
          </div>
        </>
      )}
      {/*  LEFT SIDEBAR MENU END */}
    </>
  );
};

export default DesktopHeader;
