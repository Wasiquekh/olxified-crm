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

const axiosProvider = new AxiosProvider();

interface Tab {
  label: string;
  content: JSX.Element;
}
interface TotalLeads {
  id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  primary_address_street: string;
  primary_address_city: string;
  primary_address_country: string;
  primary_address_postalcode: string;
  phone_mobile: string;
  description: string;
  assigned_user_id: string;
  assigned_user_name: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

export default function Home() {
  const [data, setData] = useState<TotalLeads[]>([]);
  //console.log("total accounts data 000000000000 ", data);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const fetchData = async () => {
    setIsLoading(true);
    // setIsFilter(false);
    try {
      const response = await axiosProvider.get(
        `/gettotalleads?page=${page}&limit=${limit}`
      );
      //console.log("total accounts data", response.data.data.accounts);
      setTotalPages(response.data.data.totalPages);
      const result = response.data.data.leads;
      //console.log("total leads", result);
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
      label: "Total Leads",
      content: (
        <>
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
                      <div className="font-medium text-firstBlack text-base leading-normal whitespace-nowrap">
                        Primary address street
                      </div>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-0 border border-tableBorder hidden md:table-cell"
                  >
                    <div className="flex items-center gap-2">
                      <div className="font-medium text-firstBlack text-base leading-normal whitespace-nowrap">
                        Primary address city
                      </div>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-0 border border-tableBorder hidden md:table-cell"
                  >
                    <div className="flex items-center gap-2">
                      <div className="font-medium text-firstBlack text-base leading-normal whitespace-nowrap">
                        Primary address country
                      </div>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-0 border border-tableBorder hidden md:table-cell"
                  >
                    <div className="flex items-center gap-2">
                      <div className="font-medium text-firstBlack text-base leading-normal whitespace-nowrap">
                        Primary address postalcod
                      </div>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-0 border border-tableBorder hidden md:table-cell"
                  >
                    <div className="flex items-center gap-2">
                      <div className="font-medium text-firstBlack text-base leading-normal whitespace-nowrap">
                        Primary address postalcod
                      </div>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-0 border border-tableBorder hidden md:table-cell"
                  >
                    <div className="flex items-center gap-2">
                      <div className="font-medium text-firstBlack text-base leading-normal whitespace-nowrap">
                        Phone mobile
                      </div>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-0 border border-tableBorder hidden md:table-cell"
                  >
                    <div className="flex items-center gap-2">
                      <div className="font-medium text-firstBlack text-base leading-normal">
                        Description
                      </div>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-0 border border-tableBorder hidden md:table-cell"
                  >
                    <div className="flex items-center gap-2">
                      <div className="font-medium text-firstBlack text-base leading-normal whitespace-nowrap">
                        Assigned user id
                      </div>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-0 border border-tableBorder hidden md:table-cell"
                  >
                    <div className="flex items-center gap-2">
                      <div className="font-medium text-firstBlack text-base leading-normal whitespace-nowrap">
                        Assigned user name
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
                                    <strong>Card:</strong> ${item.primary_address_street}<br/>
                                   <strong>Date:</strong> ${item.primary_address_city}<br/>
                                    <strong>Date:</strong> ${item.primary_address_country}<br/>
                                     <strong>Date:</strong> ${item.primary_address_postalcode}<br/>
                                      <strong>Date:</strong> ${item.phone_mobile}<br/>
                                       <strong>Date:</strong> ${item.description}<br/>
                                        <strong>Date:</strong> ${item.assigned_user_id}<br/>
                                         <strong>Date:</strong> ${item.assigned_user_name}<br/>
                                    
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
                            {item.primary_address_street}
                          </p>
                        </div>
                      </td>
                      <td className="px-2 py-0 border border-tableBorder hidden md:table-cell">
                        <div className="flex gap-1.5">
                          <p className="text-[#232323] text-base leading-normal">
                            {item.primary_address_city}
                          </p>
                        </div>
                      </td>
                      <td className="px-2 py-0 border border-tableBorder hidden md:table-cell">
                        <div className="flex gap-1.5">
                          <p className="text-[#232323] text-base leading-normal">
                            {item.primary_address_country}
                          </p>
                        </div>
                      </td>
                      <td className="px-2 py-0 border border-tableBorder hidden md:table-cell">
                        <div className="flex gap-1.5">
                          <p className="text-[#232323] text-base leading-normal">
                            {item.primary_address_postalcode}
                          </p>
                        </div>
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
                            {item.description}
                          </p>
                        </div>
                      </td>

                      <td className="px-2 py-0 border border-tableBorder hidden md:table-cell">
                        <div className="flex gap-1.5">
                          <p className="text-[#232323] text-base leading-normal">
                            {item.assigned_user_id}
                          </p>
                        </div>
                      </td>
                      <td className="px-2 py-0 border border-tableBorder hidden md:table-cell">
                        <div className="flex gap-1.5">
                          <p className="text-[#232323] text-base leading-normal">
                            {item.assigned_user_id}
                          </p>
                        </div>
                      </td>
                      <td className="px-2 py-0 border border-tableBorder hidden md:table-cell">
                        <div className="flex gap-1.5">
                          <p className="text-[#232323] text-base leading-normal">
                            {item.assigned_user_name}
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
        </>
      ),
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
          <div className="w-full min-h-[600px] bg-white rounded-3xl shadow-lastTransaction z-10">
            <div className="p-1 md:p-6">
              <Tabs tabs={tabs} />
            </div>
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
      </div>
    </div>
  );
}
