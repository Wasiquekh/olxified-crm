import React from 'react'
import Image from "next/image";
import { CiSettings } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";

const DesktopHeader = () => {
  return (
        <div>
          <div className=" w-full flex justify-end items-center gap-7 mb-0">
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
                src="/images/dummy-image.jpg"
                alt="Orizon profile"
                width={50}
                height={50}
                className="rounded-full border-2 border-[#17C653]"
              />
            </div>
          </div>
        </div>
      );
}

export default DesktopHeader


