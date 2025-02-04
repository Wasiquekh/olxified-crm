"use client";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { CiSettings } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaGreaterThan } from "react-icons/fa6";
import { FiFilter } from "react-icons/fi";
import { HiOutlineBookOpen } from "react-icons/hi2";
import { IoCloseOutline } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import { appCheck } from "../firebase-config";
import { getToken } from "firebase/app-check";
import AxiosProvider from "../../provider/AxiosProvider";
import StorageManager from "../../provider/StorageManager";
import LeftSideBar from "../component/LeftSideBar";
import { useRouter } from "next/navigation";
import { HiChevronDoubleLeft } from "react-icons/hi";
import { HiChevronDoubleRight } from "react-icons/hi";
import { number, setLocale } from "yup";
import { RiFilterFill } from "react-icons/ri";
import { toast } from "react-toastify";
import { RiAccountCircleLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import Select from "react-select";
import DesktopHeader from "../component/DesktopHeader";

const axiosProvider = new AxiosProvider();

interface FilterData {
  uuId?: string;
  userActivity?: string;
  startDate: string | Date; // Allow both string and Date
  endDate?: string;
  module?: string;
  type?: string;
  name?: string;
}

interface Customer {
  id: string;
  user_activity?: string;
  uuid?: string;
  activity_timestamp?: string;
  module?: string;
  type?: string;
  name?: string;
}
interface AllUserName {
  name?: string;
  uuid?: string;
}
interface Option {
  value: string;
  label: string;
}
interface OptionType {
  value: string;
  label: string;
}

const moduleOptions: OptionType[] = [
  { value: "System", label: "System" },
  { value: "User Management", label: "User Management" },
  { value: "Customer", label: "Customer" },
];

const typeOptions: OptionType[] = [
  { value: "Login", label: "Login" },
  { value: "Update", label: "Update" },
  { value: "Delete", label: "Delete" },
  { value: "Approved", label: "Approved" },
  { value: "Rejected", label: "Rejected" },
];

export default function Home() {
  const [isFlyoutOpen, setFlyoutOpen] = useState<boolean>(false);
  const [isFlyoutFilterOpen, setFlyoutFilterOpen] = useState<boolean>(false);
  const [data, setData] = useState<Customer[]>([]);
  const [dataUserName, setDataUserName] = useState<AllUserName[]>([]);
  const [page, setPage] = useState<number>(1);
  const [filterPage, setFilterPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalPagesFilter, setTotalPagesFilter] = useState<number>(1);
  const [filterData, setFilterData] = useState<FilterData>({
    uuId: "",
    userActivity: "",
    startDate: "",
    endDate: "",
    module: "",
    type: "",
    name: "",
  });
  console.log("+++++++++++++++", filterData);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [appliedFilters, setAppliedFilters] = useState<string[]>([]);
  const storage = new StorageManager();
  //console.log("Get all user Data", data);
  const router = useRouter();

  // Assuming `dataUserName` is an array of users
  const userOptions = dataUserName.map((user) => ({
    value: user.uuid,
    label: user.name,
  }));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // Handle change for both startDate and endDate
  const handleDateChange = (
    date: Date | null,
    field: "startDate" | "endDate"
  ) => {
    const formattedDate = date ? format(date, "yyyy-MM-dd") : ""; // Format date to 'yyyy-MM-dd'
    setFilterData((prevData) => ({
      ...prevData,
      [field]: formattedDate, // Store formatted date
    }));
  };

  const getAllUserName = async () => {
    // setIsLoading(true);
    try {
      const response = await axiosProvider.get("/getallusername"); //for name drop down
      setDataUserName(response.data.data.users);
      // console.log('GET USER DATA',response.data.data.users)
    } catch (error: any) {
      setIsError(true);
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getAllUserName();
  }, []);

  const filterDataValue = () => {
    const filters: string[] = [];
    if (filterData.uuId) filters.push(`uuid: ${filterData.uuId}`);
    if (filterData.userActivity)
      filters.push(`User Activity: ${filterData.name}`);
    if (filterData.startDate)
      filters.push(`Start Date: ${filterData.startDate}`);
    if (filterData.endDate) filters.push(`End Date: ${filterData.endDate}`);
    if (filterData.module) filters.push(`Module: ${filterData.module}`);
    if (filterData.type) filters.push(`Type: ${filterData.type}`);
    setAppliedFilters(filters);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setIsFilter(true);
    e.preventDefault();
    filterDataValue();
    toggleFilterFlyout();
    const filteredData = Object.fromEntries(
      Object.entries(filterData).filter(([_, value]) => value !== "")
    );
    console.log("FILTERED DATA", filteredData);
    if (Object.keys(filteredData).length === 0) {
      setIsFilter(false);
      setPage(1);
      fetchData(page);
    } else {
      setIsFilter(true);
      setFilterPage(1);
      fetchFilteredUserActivities(filteredData, filterPage);
    }
  };

  const fetchFilteredUserActivities = async (data: any, page: number) => {
    setIsLoading(true);
    try {
      const response = await axiosProvider.post(
        `/filteruseractivites?page=${page}&limit=${limit}`, // Use passed page value
        data
      );
      const result = response.data.data.filteredActivities;
      setData(result);
      setTotalPagesFilter(response.data.data.totalPages);
    } catch (error: any) {
    } finally {
      setIsLoading(false);
    }
  };
  const toggleFlyout = () => setFlyoutOpen(!isFlyoutOpen);
  const toggleFilterFlyout = () => setFlyoutFilterOpen(!isFlyoutFilterOpen);

  const fetchData = async (currentPage: number) => {
    console.log("fetch data call hua");
    setIsFilter(false);
    setIsLoading(true);
    try {
      const response = await axiosProvider.get(
        `/getallactivites?page=${currentPage}&limit=${limit}`
      );
      console.log("888888888888888888", response);
      const result = response.data.data.activities;
      setData(result);
      setTotalPages(response.data.data.totalPages);
      setIsError(false);
    } catch (error: any) {
      setIsError(true);
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData(page);
  }, [page]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };
  const handlePageChangeFilter = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPagesFilter) {
      setFilterPage(newPage);
      const filteredData = Object.fromEntries(
        Object.entries(filterData).filter(([_, value]) => value !== "")
      );
      fetchFilteredUserActivities(filteredData, newPage);
    }
  };

  const hadleClear = () => {
    setFilterData({
      ...filterData,
      uuId: "",
      userActivity: "",
      startDate: "",
      endDate: "",
      module: "",
      type: "",
      name: "",
    });
  };
  const removeFilter = async (filter: string) => {
    setAppliedFilters((prevFilters) => prevFilters.filter((f) => f !== filter));

    if (filter.startsWith("uuid")) {
      filterData.uuId = "";
    }
    if (filter.startsWith("Start Date")) {
      filterData.startDate = "";
    }
    if (filter.startsWith("End Date")) {
      filterData.endDate = "";
    }
    if (filter.startsWith("Module")) {
      filterData.module = "";
    }
    if (filter.startsWith("Type")) {
      filterData.type = "";
    }

    if (appliedFilters.length === 0) {
      fetchFilteredUserActivities(filterData, filterPage);
    } else {
      setPage(1);
      fetchData(page);
    }
  };
  const clearAllFilteredData = () => {
    setAppliedFilters([]);
    setPage(1);
    fetchData(page);
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
        <LeftSideBar />
        {/* Main content right section */}
        <div className=" w-[85%] bg-white min-h-[500px]  rounded p-4 mt-2">
          {/* left section top row */}
          <div className=" w-full flex justify-end items-center gap-7 mb-8">
            <DesktopHeader />
          </div>
          {/* Main content middle section */}
          <div className="w-full flex justify-between items-center h-[74px] mt-3 mb-8">
            <div>
              <p className=" text-[#0A0A0A] text-[32px] font-semibold leading-[41.6px]">
                User Activity
              </p>
              <div className=" flex gap-2 ml-[1px] items-center">
                <p className=" text-[#717171] text-xl ">User Activity</p>
                <FaGreaterThan className=" text-[#717171]" />
                <p className=" text-[#0A0A0A] text-xl font-semibold ">
                  Recently added
                </p>
              </div>
            </div>
            <div></div>
          </div>
          {/* ----------------Table----------------------- */}
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {/* Search and filter table row */}
            <div className=" flex justify-end items-center mb-6  w-[98%] mx-auto">
              <div className=" flex justify-center items-center gap-4">
                <div
                  className=" flex gap-2 py-3 px-4 rounded-[16px] border border-[#E7E7E7] cursor-pointer"
                  onClick={toggleFilterFlyout}
                >
                  <FiFilter className=" w-6 h-6" />
                  <p className=" text-[#0A0A0A] text-base font-medium">
                    Filter
                  </p>
                </div>
              </div>
            </div>
            {/* Show Applied Filters */}
            <div className="w-[99%] mx-auto mb-3">
              {appliedFilters.length > 0 && (
                <div className="flex gap-3">
                  <ul>
                    {" "}
                    {/* Add gap for spacing between items */}
                    {appliedFilters.map((filter, index) => (
                      <li
                        className=" items-center text-[#1814F3] bg-[#EDF2FE] inline-flex  p-2 rounded gap-1 text-xs ml-2"
                        key={index}
                      >
                        <RiAccountCircleLine className="text-[#1814F3]" />
                        {filter}
                        <RxCross2
                          onClick={() => {
                            removeFilter(filter);
                          }}
                          className="text-[#1814F3] cursor-pointer"
                        />
                      </li>
                    ))}
                  </ul>
                  <span className="items-center text-[#1814F3] bg-[#EDF2FE] inline-flex  p-2 rounded gap-1 text-xs ml-2">
                    Clear All
                    <RxCross2
                      className="text-[#1814F3] cursor-pointer"
                      onClick={clearAllFilteredData}
                    ></RxCross2>
                  </span>
                </div>
              )}
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-[#999999]">
                <tr className=" border border-tableBorder">
                  <th scope="col" className="p-4 border border-tableBorder">
                    <div className=" flex items-center gap-2">
                      <RxAvatar className=" w-6 h-6" />
                      <div className="font-medium text-[#717171] text-base leading-normal">
                        Name and User Activity{" "}
                      </div>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-0 border border-tableBorder"
                  >
                    <div className=" flex items-center gap-2">
                      <HiOutlineBookOpen className=" w-6 h-6" />
                      <div className="font-medium text-[#717171] text-base leading-normal">
                        User&apos;s Name
                      </div>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-0 border border-tableBorder"
                  >
                    <div className=" flex items-center gap-2">
                      <HiOutlineBookOpen className=" w-6 h-6" />
                      <div className="font-medium text-[#717171] text-base leading-normal">
                        User&apos;s uuid
                      </div>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-0 border border-tableBorder"
                  >
                    <div className=" flex items-center gap-2">
                      <HiOutlineBookOpen className=" w-6 h-6" />
                      <div className="font-medium text-[#717171] text-base leading-normal">
                        Date
                      </div>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-0 border border-tableBorder"
                  >
                    <div className=" flex items-center gap-2">
                      <HiOutlineBookOpen className=" w-6 h-6" />
                      <div className="font-medium text-[#717171] text-base leading-normal">
                        Module
                      </div>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-0 border border-tableBorder"
                  >
                    <div className=" flex items-center gap-2">
                      <HiOutlineBookOpen className=" w-6 h-6" />
                      <div className="font-medium text-[#717171] text-base leading-normal">
                        Type
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr className="">
                    <td colSpan={8} className="text-center text-xl mt-5">
                      <div className=" mt-5">Data not found</div>
                    </td>
                  </tr>
                ) : (
                  data.map((item, index) => (
                    <tr
                      className=" border border-tableBorder bg-white"
                      key={index}
                    >
                      <td className=" px-2 py-2 border border-tableBorder flex items-center gap-2">
                        <div>
                          <p className=" text-[#232323] text-base  leading-normal">
                            {item.user_activity}
                          </p>
                        </div>
                      </td>
                      <td className=" px-2 py-2 border border-tableBorder">
                        <p className=" text-[#232323] text-base leading-normal">
                          {item.name}
                        </p>
                      </td>
                      <td className=" px-2 py-2 border border-tableBorder">
                        <p className=" text-[#232323] text-base leading-normal">
                          {item.uuid}
                        </p>
                      </td>
                      <td className=" px-2 py-2 border border-tableBorder">
                        <p className=" text-[#232323] text-base leading-normal">
                          {item.activity_timestamp}
                        </p>
                      </td>
                      <td className=" px-2 py-2 border border-tableBorder">
                        <p className=" text-[#232323] text-base leading-normal">
                          {item.module}
                        </p>
                      </td>
                      <td className=" px-2 py-2 border border-tableBorder">
                        <p className=" text-[#232323] text-base leading-normal">
                          {item.type}
                        </p>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {/* Pagination Controls */}
            {isFilter ? (
              <div className="flex justify-center items-center my-6">
                <button
                  onClick={() => handlePageChangeFilter(filterPage - 1)}
                  disabled={filterPage === 1}
                  className="px-2 py-2 mx-2 border rounded bg-customBlue text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <HiChevronDoubleLeft className=" w-6 h-auto" />
                </button>
                <span className="text-[#717171] text-sm">
                  Page {filterPage} of {totalPagesFilter}
                </span>
                <button
                  onClick={() => handlePageChangeFilter(filterPage + 1)}
                  disabled={filterPage === totalPagesFilter}
                  className="px-2 py-2 mx-2 border rounded bg-customBlue text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <HiChevronDoubleRight className=" w-6 h-auto" />
                </button>
              </div>
            ) : (
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
            )}
            {/* ------------------- */}
          </div>
          {/* ----------------End table--------------------------- */}
        </div>
      </div>
      {/* FITLER FLYOUT */}
      {isFlyoutFilterOpen && (
        <>
          <div
            className=" min-h-screen w-full bg-[#1f1d1d80] fixed top-0 left-0 right-0 z-[999]"
            onClick={() => {
              setFlyoutFilterOpen(!isFlyoutFilterOpen);
            }}
          ></div>
          <div
            className={`filterflyout ${isFlyoutFilterOpen ? "filteropen" : ""}`}
          >
            <div className=" w-full min-h-auto">
              {/* Flyout content here */}
              <div className=" flex justify-between mb-8">
                <p className=" text-[#333B69] text-[26px] font-bold leading-9">
                  User Filter
                </p>
                <IoCloseOutline
                  onClick={toggleFilterFlyout}
                  className=" h-8 w-8 border border-[#E7E7E7] text-[#0A0A0A] rounded cursor-pointer"
                />
              </div>
              <div className=" w-full border-b border-[#E7E7E7] mb-4"></div>
              {/* FORM */}
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className=" w-full">
                  <div className=" w-full flex gap-4 mb-4">
                    <div className=" w-full">
                      <p className=" text-[#0A0A0A] font-medium text-base leading-6 mb-2">
                        User Name
                      </p>
                      <Select
                        value={
                          userOptions.find(
                            (option) => option.value === filterData.uuId
                          ) || null
                        }
                        onChange={(selectedOption) =>
                          setFilterData((prev) => ({
                            ...prev,
                            uuId: selectedOption ? selectedOption.value : "",
                          }))
                        }
                        options={userOptions}
                        placeholder="Select User ID"
                        isClearable
                        classNames={{
                          control: () =>
                            "!focus:outline-none !w-full !border !border-[#DFEAF2] !rounded-[12px] !text-sm !leading-4 !font-medium !py-1.5 !px-1 !bg-white !shadow-sm",
                          placeholder: () => "text-[#717171]",
                          singleValue: () => "text-black",
                          input: () => "text-black",
                          menu: () =>
                            "mt-1 bg-white border border-[#DFEAF2] rounded-[12px] shadow-lg w-full",
                          option: ({ isFocused, isSelected }) =>
                            `px-4 py-2 cursor-pointer rounded-[8px] ${
                              isSelected
                                ? "bg-blue-500 text-white"
                                : isFocused
                                ? "bg-gray-100"
                                : "text-black"
                            }`,
                          noOptionsMessage: () => "px-4 py-2 text-gray-500",
                        }}
                      />
                    </div>
                  </div>

                  <div className=" w-full flex gap-4 mb-4">
                    <div className=" w-full">
                      <p className=" text-[#0A0A0A] font-medium text-base leading-6 mb-2">
                        Start Date
                      </p>
                      <DatePicker
                        selected={
                          filterData.startDate
                            ? new Date(filterData.startDate)
                            : null
                        }
                        onChange={(date: Date | null) =>
                          handleDateChange(date, "startDate")
                        } // Fix: Ensure `date` is a single Date
                        name="startDate"
                        dateFormat="yyyy-MM-dd"
                        placeholderText="yyyy-mm-dd"
                        className=" focus:outline-none !w-full  border border-[#DFEAF2] rounded-[12px] text-sm leading-4 font-medium placeholder-[#717171] py-4 px-4"
                      />
                    </div>
                    <div className=" w-full">
                      <p className=" text-[#0A0A0A] font-medium text-base leading-6 mb-2">
                        End Date
                      </p>
                      <DatePicker
                        selected={
                          filterData.endDate
                            ? new Date(filterData.endDate)
                            : null
                        }
                        onChange={(date: Date | null) =>
                          handleDateChange(date, "endDate")
                        }
                        name="endDate"
                        dateFormat="yyyy-MM-dd"
                        placeholderText="yyyy-mm-dd"
                        className="focus:outline-none w-full border border-[#DFEAF2] rounded-[12px] text-sm leading-4 font-medium placeholder-[#717171] py-4 px-4"
                      />
                    </div>
                  </div>
                  <div className=" w-full flex gap-4 mb-4">
                    <div className=" w-full">
                      <p className=" text-[#0A0A0A] font-medium text-base leading-6 mb-2">
                        Module
                      </p>
                      <Select
                        value={
                          moduleOptions.find(
                            (option) => option.value === filterData.module
                          ) || null
                        }
                        onChange={(selectedOption: OptionType | null) =>
                          setFilterData((prev) => ({
                            ...prev,
                            module: selectedOption ? selectedOption.value : "",
                          }))
                        }
                        options={moduleOptions}
                        placeholder="Select Module"
                        isClearable
                        classNames={{
                          control: () =>
                            "!focus:outline-none !w-full !border !border-[#DFEAF2] !rounded-[12px] !text-sm !leading-4 !font-medium !py-1.5 !px-1 !bg-white !shadow-sm",
                          placeholder: () => "text-[#717171]",
                          singleValue: () => "text-black",
                          input: () => "text-black",
                          menu: () =>
                            "mt-1 bg-white border border-[#DFEAF2] rounded-[12px] shadow-lg w-full",
                          option: ({ isFocused, isSelected }) =>
                            `px-4 py-2 cursor-pointer rounded-[8px] ${
                              isSelected
                                ? "bg-blue-500 text-white"
                                : isFocused
                                ? "bg-gray-100"
                                : "text-black"
                            }`,
                          noOptionsMessage: () => "px-4 py-2 text-gray-500",
                        }}
                      />
                    </div>
                    <div className="w-full">
                      <p className="text-[#0A0A0A] font-medium text-base leading-6 mb-2">
                        Type
                      </p>
                      <Select
                        value={
                          typeOptions.find(
                            (option) => option.value === filterData.type
                          ) || null
                        }
                        onChange={(selectedOption: OptionType | null) =>
                          setFilterData((prev) => ({
                            ...prev,
                            type: selectedOption ? selectedOption.value : "",
                          }))
                        }
                        options={typeOptions}
                        placeholder="Select Type"
                        isClearable
                        classNames={{
                          control: () =>
                            "!focus:outline-none !w-full !border !border-[#DFEAF2] !rounded-[12px] !text-sm !leading-4 !font-medium !py-1.5 !px-1 !bg-white !shadow-sm",
                          placeholder: () => "text-[#717171]",
                          singleValue: () => "text-black",
                          input: () => "text-black",
                          menu: () =>
                            "mt-1 bg-white border border-[#DFEAF2] rounded-[12px] shadow-lg w-full",
                          option: ({ isFocused, isSelected }) =>
                            `px-4 py-2 cursor-pointer rounded-[8px] ${
                              isSelected
                                ? "bg-blue-500 text-white"
                                : isFocused
                                ? "bg-gray-100"
                                : "text-black"
                            }`,
                          noOptionsMessage: () => "px-4 py-2 text-gray-500",
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* END FORM */}

                <div className="mt-10 w-full flex justify-end items-center gap-5">
                  <button
                    onClick={toggleFilterFlyout}
                    className=" py-[13px] px-[26px] border border-[#E7E7E7] rounded-2xl text-[#0A0A0A] text-base font-medium leading-6"
                  >
                    Cancel
                  </button>
                  <div
                    onClick={hadleClear}
                    className=" py-[13px] px-[26px] bg-customBlue rounded-2xl text-base font-medium leading-6 text-white cursor-pointer "
                  >
                    Clear Data
                  </div>
                  <button
                    type="submit"
                    className=" py-[13px] px-[26px] bg-customBlue rounded-2xl text-base font-medium leading-6 text-white "
                  >
                    Filter Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
      {/* FITLER FLYOUT END */}
    </>
  );
}
