"use client";
import Image from "next/image";
import Tabs from "../../component/Tabs";
import { CiSettings } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { PiArrowCircleUp } from "react-icons/pi";
import LeftSideBar from "../../component/LeftSideBar";
import AxiosProvider from "../../../provider/AxiosProvider";
import { useEffect, useState } from "react";
import { HiChevronDoubleLeft } from "react-icons/hi";
import { HiChevronDoubleRight } from "react-icons/hi";
import DesktopHeader from "../../component/DesktopHeader";
import { Tooltip } from "react-tooltip";
import { FaEllipsisVertical } from "react-icons/fa6";
import { FiFilter } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";

const axiosProvider = new AxiosProvider();

interface Tab {
  label: string;
  content: JSX.Element;
}
interface TotalContacts {
  id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  phone_mobile: string;
  created_by: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

export default function Home() {
  const [data, setData] = useState<TotalContacts[]>([]);
  //console.log("total accounts data 000000000000 ", data);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isFlyoutOpen, setFlyoutOpen] = useState<boolean>(false);
  const toggleFilterFlyout = () => setFlyoutOpen(!isFlyoutOpen);
  const fetchData = async () => {
    setIsLoading(true);
    // setIsFilter(false);
    try {
      const response = await axiosProvider.get(
        `/gettotalcontacts?page=${page}&limit=${limit}`
      );
      //console.log("total accounts data", response.data.data.accounts);
      setTotalPages(response.data.data.totalPages);
      const result = response.data.data.contacts;
      setData(result);
    } catch (error: any) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [page]);
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };
  if (isLoading) {
    return (
      <div className="h-screen flex flex-col gap-5 justify-center items-center">
        <Image
          src="/images/orizonIcon.svg"
          alt="Table image"
          width={500}
          height={500}
          style={{ width: "150px", height: "auto" }}
          className="animate-pulse rounded"
        />
      </div>
    );
  }
  const tabs: Tab[] = [
    {
      label: "Total Contacts",
      content: <></>,
    },
  ];

  return (
    <div className=" flex justify-end  min-h-screen">
      {/* Left sidebar */}
      <LeftSideBar />
      {/* Main content right section */}
      <div className="w-full md:w-[83%] bg-[#F5F7FA] min-h-[500px] rounded p-4 mt-0 relative">
        <div className="absolute bottom-0 right-0">
          <Image
            src="/images/sideDesign.svg"
            alt="side desgin"
            width={100}
            height={100}
            className=" w-full h-full"
          />
        </div>
        {/* Right section top row */}
        {/* <div className="w-full flex justify-end items-center  p-4"> */}
        <DesktopHeader />
        {/* </div> */}
        <div className="w-full bg-[#F5F7FA] flex justify-center p-0 md:p-0">
          <div className="rounded-3xl shadow-lastTransaction bg-white px-1 py-6 md:p-6 relative min-h-[600px] z-10 w-full">
            <div className="relative overflow-x-auto  sm:rounded-lg">
              {/* Search and filter table row */}
              <div className=" flex justify-end items-center mb-6  w-full mx-auto">
                <div className=" flex justify-center items-center gap-4">
                  <div
                    className=" flex items-center gap-2 py-3 px-6 rounded-[4px] border border-[#E7E7E7] cursor-pointer bg-primary-600 group hover:bg-primary-600"
                    onClick={toggleFilterFlyout}
                  >
                    <FiFilter className=" w-4 h-4 text-white group-hover:text-white" />
                    <p className=" text-white  text-base font-medium group-hover:text-white">
                      Add Accounts
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* ----------------Table----------------------- */}
            <div className="relative overflow-x-auto  sm:rounded-[12px]">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-[#999999]">
                  <tr className="border border-tableBorder">
                    <th
                      scope="col"
                      className="p-2 py-0 border border-tableBorder"
                    >
                      <div className="flex items-center gap-2 p-3">
                        <div className="font-medium text-firstBlack text-base leading-normal">
                          First Name
                        </div>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-0 border border-tableBorder hidden md:table-cell"
                    >
                      <div className="flex items-center gap-2">
                        <div className="font-medium text-firstBlack text-base leading-normal">
                          Last Name
                        </div>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-0 border border-tableBorder hidden md:table-cell"
                    >
                      <div className="flex items-center gap-2">
                        <div className="font-medium text-firstBlack text-base leading-normal">
                          Full Name
                        </div>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-0 border border-tableBorder hidden md:table-cell"
                    >
                      <div className="flex items-center gap-2">
                        <div className="font-medium text-firstBlack text-base leading-normal">
                          Phone Mobile
                        </div>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-0 border border-tableBorder hidden md:table-cell"
                    >
                      <div className="flex items-center gap-2">
                        <div className="font-medium text-firstBlack text-base leading-normal">
                          Created by
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isError ? (
                    <tr>
                      <td colSpan={6} className="text-center text-xl mt-5">
                        <div className="mt-5">Data not found</div>
                      </td>
                    </tr>
                  ) : (
                    data.map((item, index) => (
                      <tr
                        className="border border-tableBorder bg-white hover:bg-primary-100"
                        key={index}
                      >
                        <td className="p-4  flex items-center gap-2">
                          <div className="md:hidden">
                            <FaEllipsisVertical
                              data-tooltip-id="my-tooltip"
                              data-tooltip-html={`<div>
                                  <strong>Description:</strong> <span style="text-transform: capitalize;">${item.first_name}</span><br/>
                                  <strong>Transaction id:</strong> ${item.last_name}<br/>
                                   <strong>Type:</strong> ${item.full_name}<br/>
                                    <strong>Card:</strong> ${item.phone_mobile}<br/>
                                   <strong>Date:</strong> ${item.created_by}<br/>
                                </div>`}
                              className="text-black leading-normal capitalize"
                            />
                            <Tooltip id="my-tooltip" place="right" float />
                          </div>
                          <div>
                            <p className="text-[#232323] text-base leading-normal">
                              {item.first_name}
                            </p>
                          </div>
                        </td>
                        <td className="px-2 py-0 border border-tableBorder hidden md:table-cell">
                          <p className="text-[#232323] text-base leading-normal">
                            {item.last_name}
                          </p>
                        </td>
                        <td className="px-2 py-0 border border-tableBorder hidden md:table-cell">
                          <p className="text-[#232323] text-base leading-normal">
                            {item.full_name}
                          </p>
                        </td>
                        <td className="px-2 py-0 border border-tableBorder hidden md:table-cell">
                          <div className="flex gap-1.5">
                            <p className="text-[#232323] text-base leading-normal">
                              {item.phone_mobile}
                            </p>
                          </div>
                        </td>
                        <td className="px-2 py-0 border border-tableBorder hidden md:table-cell">
                          <div className="flex gap-1.5">
                            <p className="text-[#232323] text-base leading-normal">
                              {item.created_by}
                            </p>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {/* ----------------End table--------------------------- */}
          </div>
        </div>
        {/* PAGINATION */}
        <div className="flex justify-center items-center my-10 relative">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="px-2 py-2 mx-2 border rounded bg-primary-500 hover:bg-primary-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <HiChevronDoubleLeft className=" w-6 h-auto" />
          </button>
          <span className="text-[#717171] text-sm">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="px-2 py-2 mx-2 border rounded bg-primary-500 hover:bg-primary-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <HiChevronDoubleRight className=" w-6 h-auto" />
          </button>
        </div>
        {/* END PAGINATION */}
        {/* FITLER FLYOUT */}
        {isFlyoutOpen && (
          <>
            {/* DARK BG SCREEN */}
            <div
              className="min-h-screen w-full bg-[#1f1d1d80] fixed top-0 left-0 right-0 z-[999]"
              onClick={() => setFlyoutOpen(!isFlyoutOpen)}
            ></div>
            {/* NOW MY FLYOUT */}
            <div className={`filterflyout ${isFlyoutOpen ? "filteropen" : ""}`}>
              <div className="w-full min-h-auto">
                {/* Header */}
                <div className="flex justify-between mb-4 sm:mb-6 md:mb-8">
                  <p className="text-primary-600 text-[22px] sm:text-[24px] md:text-[26px] font-bold leading-8 sm:leading-9">
                    Add Accounts
                  </p>
                  <IoCloseOutline
                    onClick={toggleFilterFlyout}
                    className="h-7 sm:h-8 w-7 sm:w-8 border border-[#E7E7E7] text-[#0A0A0A] rounded cursor-pointer"
                  />
                </div>
                <div className="w-full border-b border-[#E7E7E7] mb-4 sm:mb-6"></div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
