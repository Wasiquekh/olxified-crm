'use client';

import Image from "next/image";
import appleImage from '../images/apple.png'
import { CiFolderOn } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { AiOutlinePlus } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
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



export default function Home() {

    const [isFlyoutOpen, setFlyoutOpen] = useState(false);
    const toggleFlyout = () => {
        setFlyoutOpen(!isFlyoutOpen);
    };

    return (
        <>
            <div className=" bg-[#F1F1F1] p-4">
                <div className=" flex mb-4">
                    <div className=" w-[15%]">
                        <div className=" flex items-center gap-1">
                            <div className="">
                                <Image src={appleImage}
                                    alt=""
                                    width={20} height={20} />
                            </div>
                            <div>Orizon</div>
                        </div>
                    </div>
                    <div className=" w-[85%]">
                        <div className=" flex justify-between">
                            <div className=" flex items-center gap-1">
                                <CiFolderOn />
                                <p>Customers</p>
                            </div>
                            <div className=" flex gap-2">
                                <div className="flex items-center p-1.5 border border-customGray">
                                    <CiHeart />
                                </div>
                                <div className="flex items-center p-1.5 border border-customGray">
                                    <AiOutlinePlus />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" flex">
                    <div className=" w-[15%] flex flex-col justify-between">
                        <div>
                            <div className=" flex  items-center gap-2 mb-2">
                                <div className="">
                                    <IoIosSearch />
                                </div>
                                <div className=" text-sm">Search</div>
                            </div>
                            <div className=" flex items-center gap-2 mb-2">
                                <div className="">
                                    <CiSettings />
                                </div>
                                <div className=" text-sm">Setting</div>
                            </div>
                        </div>
                        <div className=" flex gap-2">
                            <div><IoIosInformationCircleOutline /></div>
                            <div className=" text-xs text-[#999999]">
                                Support
                            </div>
                        </div>
                    </div>
                    <div className=" w-[85%] bg-white min-h-[500px] p-2 rounded">
                        <div className=" flex justify-between">
                            <div className=" flex items-center gap-1">
                                <IoIosList />
                                <p>All Customers</p>
                            </div>
                            <div className=" flex gap-4">
                                <p className=" text-sm text-[#666666]">Filter</p>
                                <p className=" text-sm text-[#666666]">Sort</p>
                                <p className=" text-sm text-[#666666]">Options</p>

                            </div>
                        </div>
                        {/* ----------------Table----------------------- */}
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-[#999999] uppercase">
                                    <tr className=" border border-tableBorder">
                                        <th scope="col" className="p-4 border border-tableBorder">
                                            <div className="flex items-center">
                                                <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label for="checkbox-all-search" className="sr-only">checkbox</label>
                                            </div>
                                        </th>
                                        <th scope="col" className="px-2 py-0 border border-tableBorder">
                                            <div className=" flex items-center gap-1">
                                                <RxAvatar />
                                                <div className="font-medium">Name</div>
                                            </div>
                                        </th>
                                        <th scope="col" className="px-2 py-0 border border-tableBorder">
                                            <div className=" flex items-center gap-1">
                                                <CiCalendar />
                                                <div className="font-medium">Birth Date</div>
                                            </div>
                                        </th>
                                        <th scope="col" className="px-2 py-0 border border-tableBorder">
                                            <div className=" flex items-center gap-1">
                                                <TbGenderDemiboy />
                                                <div className="font-medium">Gender</div>
                                            </div>
                                        </th>
                                        <th scope="col" className="px-2 py-0 border border-tableBorder">
                                            <div className=" flex items-center gap-1">
                                                <CiFlag1 />
                                                <div className="font-medium">Country of Birth</div>
                                            </div>
                                        </th>
                                        <th scope="col" className="px-2 py-0 border border-tableBorder">
                                            <div className=" flex items-center gap-1">
                                                <TfiHome />
                                                <div className="font-medium">Country of Recidence</div>
                                            </div>
                                        </th>
                                        <th scope="col" className="px-2 py-0 border border-tableBorder">
                                            <div className=" flex items-center gap-1">
                                                <PiCityThin />
                                                <div className="font-medium">City</div>
                                            </div>
                                        </th>
                                        <th scope="col" className="px-2 py-0 border border-tableBorder">
                                            <div className=" flex items-center gap-1">
                                                <CiMobile4 />
                                                <div className="font-medium">Mobile Num</div>
                                            </div>
                                        </th>
                                        <th scope="col" className="px-2 py-0 border border-tableBorder">
                                            <div className=" flex items-center gap-1">
                                                <CiCalendar />
                                                <div className="font-medium">Action</div>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border border-tableBorder">
                                        <td className="w-4  px-4 py-0 border border-tableBorder">
                                            <div className="flex items-center">
                                                <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                                            </div>
                                        </td>
                                        <td className=" px-2 py-0 border border-tableBorder">
                                            Alexandre Prot
                                        </td>
                                        <td className=" px-2 py-0 border border-tableBorder">
                                            Jul 28, 2023 6:55 pm
                                        </td>
                                        <td className="px-2 py-0 border border-tableBorder">
                                            Male
                                        </td>
                                        <td className="px-2 py-0 border border-tableBorder">
                                            France
                                        </td>
                                        <td className="px-2 py-0 border border-tableBorder">
                                            Paric
                                        </td>
                                        <td className="px-2 py-0 border border-tableBorder">
                                            060000000
                                        </td>
                                        <td className="px-2 py-0 border border-tableBorder">
                                            3.0 lb.
                                        </td>
                                        <td className="flex gap-1 items-center px-2 py-3 cursor-pointer" onClick={toggleFlyout}>
                                            <FiEye className=" text-[#009A00]" />
                                            <div className=" text-[#009A00]">View</div>
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border border-tableBorder">
                                        <td className="w-4  px-4 py-0 border border-tableBorder">
                                            <div className="flex items-center">
                                                <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                                            </div>
                                        </td>
                                        <td className=" px-2 py-0 border border-tableBorder">
                                            Alexandre Prot
                                        </td>
                                        <td className=" px-2 py-0 border border-tableBorder">
                                            Jul 28, 2023 6:55 pm
                                        </td>
                                        <td className="px-2 py-0 border border-tableBorder">
                                            Male
                                        </td>
                                        <td className="px-2 py-0 border border-tableBorder">
                                            France
                                        </td>
                                        <td className="px-2 py-0 border border-tableBorder">
                                            Paric
                                        </td>
                                        <td className="px-2 py-0 border border-tableBorder">
                                            060000000
                                        </td>
                                        <td className="px-2 py-0 border border-tableBorder">
                                            3.0 lb.
                                        </td>
                                        <td className="flex gap-1 items-center px-2 py-3 cursor-pointer" onClick={toggleFlyout}>
                                            <FiEye className=" text-[#009A00]" />
                                            <div className=" text-[#009A00]">View</div>
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border border-tableBorder">
                                        <td className="w-4  px-4 py-0 border border-tableBorder">
                                            <div className="flex items-center">
                                                <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                                            </div>
                                        </td>
                                        <td className=" px-2 py-0 border border-tableBorder">
                                            Alexandre Prot
                                        </td>
                                        <td className=" px-2 py-0 border border-tableBorder">
                                            Jul 28, 2023 6:55 pm
                                        </td>
                                        <td className="px-2 py-0 border border-tableBorder">
                                            Male
                                        </td>
                                        <td className="px-2 py-0 border border-tableBorder">
                                            France
                                        </td>
                                        <td className="px-2 py-0 border border-tableBorder">
                                            Paric
                                        </td>
                                        <td className="px-2 py-0 border border-tableBorder">
                                            060000000
                                        </td>
                                        <td className="px-2 py-0 border border-tableBorder">
                                            3.0 lb.
                                        </td>
                                        <td className="flex gap-1 items-center px-2 py-3 cursor-pointer" onClick={toggleFlyout}>
                                            <FiEye className=" text-[#009A00]" />
                                            <div className=" text-[#009A00]">View</div>
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border border-tableBorder">
                                        <td className="w-4  px-4 py-0 border border-tableBorder">
                                            <div className="flex items-center">
                                                <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                                            </div>
                                        </td>
                                        <td className=" px-2 py-0 border border-tableBorder">
                                            Alexandre Prot
                                        </td>
                                        <td className=" px-2 py-0 border border-tableBorder">
                                            Jul 28, 2023 6:55 pm
                                        </td>
                                        <td className="px-2 py-0 border border-tableBorder">
                                            Male
                                        </td>
                                        <td className="px-2 py-0 border border-tableBorder">
                                            France
                                        </td>
                                        <td className="px-2 py-0 border border-tableBorder">
                                            Paric
                                        </td>
                                        <td className="px-2 py-0 border border-tableBorder">
                                            060000000
                                        </td>
                                        <td className="px-2 py-0 border border-tableBorder">
                                            3.0 lb.
                                        </td>
                                        <td className="flex gap-1 items-center px-2 py-3 cursor-pointer" onClick={toggleFlyout}>
                                            <FiEye className=" text-[#009A00]" />
                                            <div className=" text-[#009A00]">View</div>
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border border-tableBorder">
                                        <td className="w-4  px-4 py-0 border border-tableBorder">
                                            <div className="flex items-center">
                                                <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                                            </div>
                                        </td>
                                        <td className=" px-2 py-0 border border-tableBorder">
                                            Alexandre Prot
                                        </td>
                                        <td className=" px-2 py-0 border border-tableBorder">
                                            Jul 28, 2023 6:55 pm
                                        </td>
                                        <td className="px-2 py-0 border border-tableBorder">
                                            Male
                                        </td>
                                        <td className="px-2 py-0 border border-tableBorder">
                                            France
                                        </td>
                                        <td className="px-2 py-0 border border-tableBorder">
                                            Paric
                                        </td>
                                        <td className="px-2 py-0 border border-tableBorder">
                                            060000000
                                        </td>
                                        <td className="px-2 py-0 border border-tableBorder">
                                            3.0 lb.
                                        </td>
                                        <td className="flex gap-1 items-center px-2 py-3 cursor-pointer" onClick={toggleFlyout}>
                                            <FiEye className=" text-[#009A00]" />
                                            <div className=" text-[#009A00]">View</div>
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border border-tableBorder">
                                        <td className="w-4  px-4 py-0 border border-tableBorder">
                                            <div className="flex items-center">
                                                <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                                            </div>
                                        </td>
                                        <td className=" px-2 py-0 border border-tableBorder">
                                            Alexandre Prot
                                        </td>
                                        <td className=" px-2 py-0 border border-tableBorder">
                                            Jul 28, 2023 6:55 pm
                                        </td>
                                        <td className="px-2 py-0 border border-tableBorder">
                                            Male
                                        </td>
                                        <td className="px-2 py-0 border border-tableBorder">
                                            France
                                        </td>
                                        <td className="px-2 py-0 border border-tableBorder">
                                            Paric
                                        </td>
                                        <td className="px-2 py-0 border border-tableBorder">
                                            060000000
                                        </td>
                                        <td className="px-2 py-0 border border-tableBorder">
                                            3.0 lb.
                                        </td>
                                        <td className="flex gap-1 items-center px-2 py-3 cursor-pointer" onClick={toggleFlyout}>
                                            <FiEye className=" text-[#009A00]" />
                                            <div className=" text-[#009A00]">View</div>
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border border-tableBorder">
                                        <td className="w-4  px-4 py-0 border border-tableBorder">
                                            <div className="flex items-center">
                                                <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                                            </div>
                                        </td>
                                        <td className=" px-2 py-0 border border-tableBorder">
                                            Alexandre Prot
                                        </td>
                                        <td className=" px-2 py-0 border border-tableBorder">
                                            Jul 28, 2023 6:55 pm
                                        </td>
                                        <td className="px-2 py-0 border border-tableBorder">
                                            Male
                                        </td>
                                        <td className="px-2 py-0 border border-tableBorder">
                                            France
                                        </td>
                                        <td className="px-2 py-0 border border-tableBorder">
                                            Paric
                                        </td>
                                        <td className="px-2 py-0 border border-tableBorder">
                                            060000000
                                        </td>
                                        <td className="px-2 py-0 border border-tableBorder">
                                            3.0 lb.
                                        </td>
                                        <td className="flex gap-1 items-center px-2 py-3 cursor-pointer" onClick={toggleFlyout}>
                                            <FiEye className=" text-[#009A00]" />
                                            <div className=" text-[#009A00]">View</div>
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border border-tableBorder">
                                        <td className="w-4  px-4 py-0 border border-tableBorder">
                                            <div className="flex items-center">
                                                <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                                            </div>
                                        </td>
                                        <td className=" px-2 py-0 border border-tableBorder">
                                            Alexandre Prot
                                        </td>
                                        <td className=" px-2 py-0 border border-tableBorder">
                                            Jul 28, 2023 6:55 pm
                                        </td>
                                        <td className="px-2 py-0 border border-tableBorder">
                                            Male
                                        </td>
                                        <td className="px-2 py-0 border border-tableBorder">
                                            France
                                        </td>
                                        <td className="px-2 py-0 border border-tableBorder">
                                            Paric
                                        </td>
                                        <td className="px-2 py-0 border border-tableBorder">
                                            060000000
                                        </td>
                                        <td className="px-2 py-0 border border-tableBorder">
                                            3.0 lb.
                                        </td>
                                        <td className="flex gap-1 items-center px-2 py-3 cursor-pointer" onClick={toggleFlyout}>
                                            <FiEye className=" text-[#009A00]" />
                                            <div className=" text-[#009A00]">View</div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        {/* ----------------End table--------------------------- */}
                    </div>
                </div>
            </div>

            {isFlyoutOpen && (
                <div className={`flyout ${isFlyoutOpen ? 'open' : ''}`}>
                    {/* Flyout content here */}
                    <h1>This is my flyout</h1>
                    <h2>Its working</h2>
                    <h3>And workign</h3>
                    <button onClick={toggleFlyout}>Close Flyout</button>
                </div>
            )}
        </>
    );
}
