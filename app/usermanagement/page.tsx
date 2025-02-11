"use client";
import Image from "next/image";
import { RxAvatar } from "react-icons/rx";
import { CiSettings } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineCall } from "react-icons/md";
import { LiaArrowCircleDownSolid } from "react-icons/lia";
import { MdRemoveRedEye, MdModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoCloseOutline } from "react-icons/io5";
import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import AxiosProvider from "../../provider/AxiosProvider";
import { AppContext } from "../AppContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import SidebarUserUpdateForm from "../component/SidebarUserUpdateForm";
import StorageManager from "../../provider/StorageManager";
import React from "react";
import LeftSideBar from "../component/LeftSideBar";
import UserActivityLogger from "../../provider/UserActivityLogger";
import { useRouter } from "next/navigation";
import { HiChevronDoubleLeft } from "react-icons/hi";
import { HiChevronDoubleRight } from "react-icons/hi";
import DesktopHeader from "../component/DesktopHeader";
import { Tooltip } from "react-tooltip";
import { FaEllipsisVertical } from "react-icons/fa6";

interface User {
  id: string;
  name: string;
  mobile_number: string;
  email: string;
  role: string; // Add the role property
}
interface CurrentUserData {
  id: string;
  name: string;
  mobile_number: string;
  email: string;
  role: string;
}
const axiosProvider = new AxiosProvider();
const storage = new StorageManager();
const activityLogger = new UserActivityLogger();

export default function Home() {
  const [data, setData] = useState<User[] | null>(null);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [isEditFlyoutOpen, setIsEditFlyoutOpen] = useState<boolean>(false);
  const [currentUserData, setCurrentUserData] = useState<User | null>(null);
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { accessToken } = useContext(AppContext);
  const router = useRouter();
  const permissions = storage.getUserPermissions();
  const hasSystemUserView = permissions?.some(
    (perm) => perm.name === "systemuser.view"
  );
  const hasSystemUserDelete = permissions?.some(
    (perm) => perm.name === "systemuser.delete"
  );
  const hasSystemUserAdd = permissions?.some(
    (perm) => perm.name === "systemuser.add"
  );
  useEffect(() => {
    const hasSystemUserView = permissions?.some(
      (perm) => perm.name === "systemuser.view"
    );
    if (!hasSystemUserView) {
      router.push("/customer");
    }
  }, []);

  const toggleEditFlyout = () => {
    setIsEditFlyoutOpen(!isEditFlyoutOpen);
  };

  const deleteUserData = async (item: User) => {
    const userID = item.id;

    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosProvider.post("/deleteuser", { id: userID });

          toast.success("Successfully Deleted");
          setShouldRefetch((prev) => !prev);
          await activityLogger.userDelete(userID);
        } catch (error) {
          console.error("Error deleting user:", error);
          toast.error("Failed to delete user");
        }
      }
    });
  };

  const changeCurrentUserData = (item: User) => {
    setCurrentUserData(item);
    toggleEditFlyout();
  };

  const fetchData = async (currentPage: number) => {
    setIsLoading(true);
    try {
      const response = await axiosProvider.get(
        `/getalluser?page=${currentPage}&limit=${limit}`
      );
      // console.log('get all user',response.data.data.users);
      const result = response.data.data.users;
      // console.log('BBBBBBBBBBBBBBBB',result)
      setTotalPages(response.data.data.totalPages);
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData(page);
  }, [shouldRefetch, page]);

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
        <p className="text-black text-xl font-medium">Data Loading...</p>
      </div>
    );
  }
  return (
    <>
      <div className=" flex  min-h-screen">
        {/* Left sidebar */}
        <LeftSideBar />
        {/* Main content right section */}
        <div className="w-full md:w-[85%] bg-white min-h-[500px]  rounded p-4 mt-2">
          {/* {data && data.map((item) => (
            <li key={item.email}>{item.name}</li>
          ))} */}

          {/* right section top row */}
          <div className=" w-full flex justify-end items-center gap-7 mb-8">
            <DesktopHeader />
          </div>
          {/* Main content middle section */}
          <div className="w-full flex justify-between items-center h-[74px] mt-3 mb-8 flex-wrap sm:flex-nowrap">
            <div className="w-full sm:w-auto mb-2 sm:mb-0">
              <p className=" text-[#0A0A0A] text-[26px] font-semibold leading-normal">
                User Management
              </p>
            </div>
            <div className="w-full sm:w-auto">
              {hasSystemUserAdd ? (
                <Link href="/useradd">
                  <button className="flex items-center gap-[10px] bg-[#fff] h-12 px-3 py-[6px] rounded-2xl border border-[#E7E7E7] shadow-borderShadow w-full sm:w-auto">
                    <FaPlus className="h-[20px] w-[20px] text-[#0A0A0A]" />
                    <p className="text-[#0A0A0A] text-base leading-normal">
                      Create User
                    </p>
                  </button>
                </Link>
              ) : (
                <button className="flex items-center gap-[10px] bg-[#fff] h-12 px-3 py-[6px] rounded-2xl border border-[#E7E7E7] shadow-borderShadow cursor-not-allowed w-full sm:w-auto">
                  <FaPlus className="h-[20px] w-[20px] text-[#0A0A0A]" />
                  <p className="text-[#0A0A0A] text-base leading-normal">
                    Not Access
                  </p>
                </button>
              )}
            </div>
          </div>

          {/* ----------------Table----------------------- */}
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full table-fixed text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-[#999999]">
                <tr className="border border-tableBorder">
                  <th
                    scope="col"
                    className="p-3 border border-tableBorder w-[85%]"
                  >
                    <div className="flex items-center gap-2">
                      <RxAvatar className="w-5 h-5" />
                      <div className="font-semibold text-[#717171] text-base leading-normal">
                        Name - Mail
                      </div>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-1 border border-tableBorder hidden md:table-cell"
                  >
                    <div className="flex items-center gap-2">
                      <MdOutlineCall className="w-5 h-5" />
                      <div className="font-semibold text-[#717171] text-base leading-normal">
                        Phone
                      </div>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-1 border border-tableBorder hidden md:table-cell"
                  >
                    <div className="flex items-center gap-2">
                      <LiaArrowCircleDownSolid className="w-5 h-5" />
                      <div className="font-semibold text-[#717171] text-base leading-normal">
                        Role
                      </div>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-1 border border-tableBorder w-[15%]"
                  >
                    <div className="flex items-center gap-2">
                      <LiaArrowCircleDownSolid className="w-5 h-5" />
                      <div className="font-semibold text-[#717171] text-base leading-normal">
                        Action
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {isError ? (
                  <tr>
                    <td colSpan={4} className="text-center text-xl py-4">
                      Data not found
                    </td>
                  </tr>
                ) : (
                  data &&
                  data.map((item, index) => (
                    <tr
                      className="border border-tableBorder bg-white"
                      key={index}
                    >
                      <td className="px-3 py-2 border border-tableBorder flex gap-2 text-xs md:text-sm truncate w-[85%]">
                        <div className="md:hidden flex">
                          <FaEllipsisVertical
                            data-tooltip-id="my-tooltip"
                            data-tooltip-html={`<div>
                    <strong>Name:</strong> <span style="text-transform: capitalize;">${item.name}</span><br/>
                    <strong>Email:</strong> ${item.email}<br/>
                    <strong>Mobile:</strong> ${item.mobile_number}<br/>
                    <strong>Role:</strong> ${item.role}<br/>
                  </div>`}
                            className="text-black leading-normal capitalize relative top-1"
                          />
                          <Tooltip id="my-tooltip" place="right" float />
                        </div>
                        <div>
                          <p className="text-[#232323] text-sm font-semibold leading-normal mb-[4px]">
                            {item.name}
                          </p>
                          <p className="text-[#232323] text-xs md:text-sm leading-normal truncate">
                            {item.email}
                          </p>
                        </div>
                      </td>
                      <td className="px-2 py-1 border border-tableBorder hidden md:table-cell">
                        <p className="text-[#232323] text-sm leading-normal truncate">
                          {item.mobile_number}
                        </p>
                      </td>
                      <td className="px-2 py-1 border border-tableBorder hidden md:table-cell">
                        <button className="py-[4px] px-6 bg-[#DCF8DC] rounded-[16px] w-28 text-xs md:text-sm">
                          <p className="text-[#0C390C]">{item.role}</p>
                        </button>
                      </td>
                      <td className="px-2 py-1 border border-tableBorder w-[15%]">
                        <div className="flex gap-1">
                          {hasSystemUserView ? (
                            <button
                              onClick={() => changeCurrentUserData(item)}
                              className="py-[4px] px-3 bg-[#C6F7FE] flex gap-1 items-center rounded-full text-xs md:text-sm"
                            >
                              <MdRemoveRedEye className="text-customBlue w-4 h-4" />
                            </button>
                          ) : (
                            <button
                              disabled
                              className="py-[4px] px-3 bg-[#C6F7FE] flex gap-1 items-center rounded-full cursor-not-allowed text-xs md:text-sm"
                            >
                              <MdRemoveRedEye className="text-customBlue w-4 h-4" />
                            </button>
                          )}
                          {hasSystemUserDelete ? (
                            <button
                              onClick={() => deleteUserData(item)}
                              className="py-[4px] px-3 bg-[#FFD0D1] flex gap-1 items-center rounded-full text-xs md:text-sm"
                            >
                              <RiDeleteBin6Line className="text-[#FF1C1F] w-4 h-4" />
                            </button>
                          ) : (
                            <button
                              disabled
                              className="py-[4px] px-3 bg-[#FFD0D1] flex gap-1 items-center rounded-full cursor-not-allowed text-xs md:text-sm"
                            >
                              <RiDeleteBin6Line className="text-[#FF1C1F] w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center my-6">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="px-2 py-2 mx-2 border rounded bg-customBlue text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <HiChevronDoubleLeft className=" w-6 h-auto" />
              </button>
              <span className="text-[#717171] text-sm">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className="px-2 py-2 mx-2 border rounded bg-customBlue text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <HiChevronDoubleRight className=" w-6 h-auto" />
              </button>
            </div>
          </div>
          {/* ----------------End table--------------------------- */}
        </div>
      </div>

      <SidebarUserUpdateForm
        isEditFlyoutOpen={isEditFlyoutOpen}
        setIsEditFlyoutOpen={setIsEditFlyoutOpen}
        currentUserData={currentUserData}
        setShouldRefetch={setShouldRefetch}
      />
    </>
  );
}
