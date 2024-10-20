"use client";
import Image from "next/image";
import { RxAvatar } from "react-icons/rx";
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
import { FaPlus } from "react-icons/fa6";
import { MdOutlineCall } from "react-icons/md";
import { LiaArrowCircleDownSolid } from "react-icons/lia";
import { MdRemoveRedEye } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import Link from "next/link";
import { appCheck } from "../firebase-config";
import { getToken } from "firebase/app-check";
import { useEffect } from "react";
import { useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the Firebase App Check token
        const tokenResponse = await getToken(appCheck, true);
        const appCheckToken = tokenResponse.token;
        // Bearer token - assuming it is stored or retrieved (e.g., from local storage, an API, or auth context)
        const accessToken = localStorage.getItem("accessToken");

        // Make API request with App Check token in the headers
        const response = await fetch(
          "https://orizon-crm-api-uat.yliqo.com/api/v1/Orizonapigateway/getalluser",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`, // Bearer token
              "Content-Type": "application/x-www-form-urlencoded",
              "x-firebase-appcheck": appCheckToken, // Firebase App Check token
            },
          }
        );

        const result = await response.json();
        console.log(result.data); // Check the data in the console
        setData(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Fetch data when the page loads


  }, []); // Empty dependency array ensures it runs only once


  useEffect(() => {
    const addData = async () => {
      const userName = 'noor';
      const userMobile = '9172758731';
      const userEmail = 'noor@gmail.com';
      const userPassword = 'noor@123';
      const userRole = '1';
  
      try {
        // Get Firebase App Check token
        const appCheckTokenn = await getToken();
  
        // Prepare URL-encoded body data
        const bodyData = new URLSearchParams();
        bodyData.append('name', userName);
        bodyData.append('mobileNumber', userMobile);
        bodyData.append('email', userEmail);
        bodyData.append('password', userPassword);
        bodyData.append('roleLevel', userRole);
  
        // Submit the form data
        const res = await fetch(
          "https://orizon-crm-api-uat.yliqo.com/api/v1/Orizonapigateway/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "X-Firebase-AppCheck": appCheckTokenn.token, // Include App Check token
            },
            body: bodyData.toString(), // Use the URLSearchParams formatted string
          }
        );
  
        if (!res.ok) {
          console.log('data nahi ja raha hai')
          const errorData = await res.json();
          console.error("Login failed", res.status, errorData);
          throw new Error(`Error: ${res.status} - ${errorData.message}`);
        }
  
        const data = await res.json();
        console.log("Response Added data:", data);
      } catch (error) {
        console.error("Login error:", error);
        console.log('data nahi ja raha hai error ki wajah se')
      }
    };
  
    addData();
  }, []);
  






  console.log("%%%%%%%%%%%%", data);
  return (
    <>
      <div className=" flex  min-h-screen">
        {/* Left sidebar */}
        <div className=" w-[15%]  flex flex-col justify-between py-4 px-4 border-r-2 border-customBorder shadow-borderShadow mt-2">
          {/* SIDE LEFT BAR TOP SECTION */}
          <div>
            <Link href="/dashboard">
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
            <Link href="/dashboard">
              <div className=" mb-9 flex gap-6 items-center  cursor-pointer group">
                <BiSolidHome className=" w-6 h-6 text-[#B1B1B1] group-hover:text-customBlue" />
                <p className=" text-[#B1B1B1] text-base leading-normal font-medium group-hover:text-customBlue">
                  Dashboard
                </p>
              </div>
            </Link>
            <Link href="/dashboard">
              <div className=" mb-9 flex gap-6 items-center">
                <MdOutlineBarChart className=" w-6 h-6 text-[#B1B1B1] " />
                <p className=" text-[#B1B1B1] text-base leading-normal font-medium">
                  Customers
                </p>
              </div>
            </Link>
            <Link href="/transaction">
              <div className=" mb-9 flex gap-6 items-center group">
                <TbDeviceMobileDollar className=" w-6 h-6 text-[#B1B1B1] group-hover:text-customBlue" />
                <p className=" text-[#B1B1B1] text-base leading-normal font-medium group-hover:text-customBlue">
                  Transaction
                </p>
              </div>
            </Link>
            <Link href="/dashboard">
              <div className=" mb-9 flex gap-6 items-center group">
                <HiWrenchScrewdriver className=" w-6 h-6 text-[#B1B1B1] group-hover:text-customBlue" />
                <p className=" text-[#B1B1B1] text-base leading-normal font-medium group-hover:text-customBlue">
                  Point of Services
                </p>
              </div>
            </Link>
            <Link href="/dashboard">
              <div className=" mb-9 flex gap-6 items-center group">
                <FaMoneyCheckDollar className=" w-6 h-6 text-[#B1B1B1] group-hover:text-customBlue" />
                <p className=" text-[#B1B1B1] text-base leading-normal font-medium group-hover:text-customBlue">
                  Payment Terminal
                </p>
              </div>
            </Link>
            <Link href="/cards">
              <div className=" mb-9 flex gap-6 items-center group">
                <BsCreditCard2Back className=" w-6 h-6 text-[#B1B1B1] group-hover:text-customBlue" />
                <p className=" text-[#B1B1B1] text-base leading-normal font-medium group-hover:text-customBlue">
                  Credit Cards
                </p>
              </div>
            </Link>
            <Link href="/user">
              <div className=" mb-9 flex gap-6 items-center group">
                <BiSolidUser className=" w-6 h-6 text-customBlue group-hover:text-customBlue" />
                <p className=" text-customBlue text-base leading-normal font-medium group-hover:text-customBlue">
                  User Management
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
        {/* Main content right section */}
        <div className=" w-[85%] bg-white min-h-[500px]  rounded p-4 mt-2">
          {/* {data && data.map((item) => (
            <li key={item.email}>{item.name}</li>
          ))} */}

          {/* right section top row */}
          <div className=" w-full flex justify-end items-center gap-7 mb-8">
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
          {/* Main content middle section */}
          <div className="w-full flex justify-between items-center h-[74px] mt-3 mb-8">
            <div>
              <p className=" text-[#0A0A0A] text-[26px] font-semibold leading-normal">
                User Management
              </p>
              <div className=" flex gap-2 ml-[1px] items-center">
                <p className=" text-[#717171] text-base leading-normal">
                  2+ New User added today, sorted by name
                </p>
              </div>
            </div>
            <div>
              <Link href="/usermanagement">
                <button className=" flex items-center gap-[10px] bg-[#fff]  h-12 px-3 py-[6px] rounded-2xl  border border-[#E7E7E7] shadow-borderShadow">
                  <FaPlus className=" h-[20px] w-[20px] text-[#0A0A0A]" />
                  <p className=" text-[#0A0A0A] text-base leading-normal">
                    Create User
                  </p>
                </button>
              </Link>
            </div>
          </div>

          {/* ----------------Table----------------------- */}
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-[#999999]">
                <tr className=" border border-tableBorder">
                  <th scope="col" className="p-4 border border-tableBorder">
                    <div className="flex items-center">
                      <input
                        id="checkbox-all-search"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label htmlFor="checkbox-all-search" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-0 border border-tableBorder"
                  >
                    <div className=" flex items-center gap-2">
                      <RxAvatar className=" w-5 h-5" />
                      <div className="font-semibold text-[#717171] text-base leading-normal">
                        Name - Mail{" "}
                      </div>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-0 border border-tableBorder"
                  >
                    <div className=" flex items-center gap-2">
                      <MdOutlineCall className=" w-5 h-5" />
                      <div className="font-semibold text-[#717171] text-base leading-normal">
                        Phone
                      </div>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-0 border border-tableBorder"
                  >
                    <div className=" flex items-center gap-2">
                      <LiaArrowCircleDownSolid className="w-5 h-5" />
                      <div className="font-semibold text-[#717171] text-base leading-normal">
                        Role
                      </div>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-0 border border-tableBorder"
                  >
                    <div className=" flex items-center gap-2">
                      <LiaArrowCircleDownSolid className="w-5 h-5" />
                      <div className="font-semibold text-[#717171] text-base leading-normal">
                        Action
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
              {data && data.map((item) => (
            
         
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
                      <Image
                        src="/images/tableImage.png"
                        alt="Table image"
                        width={44}
                        height={44}
                      />
                    </div>
                    <div>
                      <p className=" text-[#0A0A0A] text-base font-semibold leading-normal mb-[6px]">
                        {item.name}
                      </p>
                      <p key={item.email} className=" text-[#717171] text-sm leading-normal">
                      {item.email} 
                      </p>
                    </div>
                  </td>
                  <td className="px-2 py-0 border border-tableBorder">
                    <p className=" text-[#717171] text-base leading-normal">
                    {item.mobile_number}
                    </p>
                  </td>
                  <td className="px-2 py-0 border border-tableBorder">
                    <button className=" py-[6px] px-8 bg-[#DCF8DC]    rounded-[16px]">
                      <p className=" text-sm leading-normal text-[#0C390C]">
                      {item.role}
                      </p>
                    </button>
                  </td>
                  <td className="px-2 py-0 border border-tableBorder">
                    <div className=" flex gap-1.5">
                      <button className=" py-[6px] px-4 bg-[#C6F7FE]  flex gap-1.5 items-center rounded-full">
                        <MdRemoveRedEye className=" text-customBlue w-4 h-4" />
                        <p className=" text-sm leading-normal text-customBlue">
                          View
                        </p>
                      </button>
                      <button className=" py-[6px] px-4 bg-[#F9E3FB]  flex gap-1.5 items-center rounded-full">
                        <MdModeEdit className=" text-[#6D1473] w-4 h-4" />
                        <p className=" text-sm leading-normal text-[#6D1473]">
                          Edit
                        </p>
                      </button>
                      <button className=" py-[6px] px-4 bg-[#FFD0D1]  flex gap-1.5 items-center rounded-full">
                        <RiDeleteBin6Line className=" text-[#FF1C1F] w-4 h-4" />
                        <p className=" text-sm leading-normal text-[#FF1C1F]">
                          Delete
                        </p>
                      </button>
                    </div>
                  </td>
                </tr>
                 ))}
              </tbody>
            </table>
          </div>
          {/* ----------------End table--------------------------- */}
        </div>
      </div>
    </>
  );
}
