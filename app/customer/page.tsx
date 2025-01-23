"use client";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { CiSettings } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaGreaterThan } from "react-icons/fa6";
import { FiFilter } from "react-icons/fi";
import { HiOutlineBookOpen } from "react-icons/hi2";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { MdOutlineCall } from "react-icons/md";
import { LiaArrowCircleDownSolid } from "react-icons/lia";
import { MdRemoveRedEye } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import AxiosProvider from "../../provider/AxiosProvider";
import { RiAccountCircleLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import StorageManager from "../../provider/StorageManager";
import { AppContext } from "../AppContext";
import CustomerViewDetails from "../component/CustomerViewDetails";
import LeftSideBar from "../component/LeftSideBar";
import { HiChevronDoubleLeft } from "react-icons/hi";
import { HiChevronDoubleRight } from "react-icons/hi";
import Link from "next/link";
import { useRouter } from "next/navigation";

const axiosProvider = new AxiosProvider();

interface FilterData {
  name: string;
  mobilephonenumber?: string;
  birthdate?: string;
}

interface Customer {
  customer_id: string; // Updated to string as per the API response
  firstname: string;
  lastname: string;
  mobilephonenumber?: string | null; // Changed to optional with possible null value
  mobilephonenumber_verified?: boolean | null;
  birthdate: string;
  countryofbirth?: string;
  gender?: string;
  countryofresidence?: string;
  city?: string;
  streetaddress?: string;
  iddoctype?: string;
  idcardrecto?: string | null;
  idcardverso?: string | null;
  password?: string;
  shortintrovideo?: string | null;
  fcmtoken?: string;
  usersignature?: string | null;
  created_at?: string;
  updated_at?: string;
  mainStatus?: string;
}

export default function Home() {
  const [isFlyoutOpen, setFlyoutOpen] = useState<boolean>(false);
  const [isFlyoutFilterOpen, setFlyoutFilterOpen] = useState<boolean>(false);
  const [data, setData] = useState<Customer[]>([]);
  const [page, setPage] = useState<number>(1);
  const [filterPage, setFilterPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalPagesFilter, setTotalPagesFilter] = useState<number>(1);
  const [filterData, setFilterData] = useState<FilterData>({
    name: "",
    mobilephonenumber: "",
  });
  //console.log("TTTTTTTTTTTTTTTTTTTTTTTT", filterData);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [appliedFilters, setAppliedFilters] = useState<string[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const storage = new StorageManager();
  //console.log("Get all user Data", data);
  const router = useRouter();

  const handleClick = async (customer: Customer) => {
    // console.log('Object customer data',customer.id)
    router.push(`/customerdetails?id=${customer.customer_id}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Directly set date input value, as it is already in YYYY-MM-DD format
    // const formattedValue = name === 'birthdate' ? value : value;

    setFilterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const filterDataValue = () => {
    const filters: string[] = [];
    if (filterData.name) filters.push(`Name: ${filterData.name}`);
    if (filterData.mobilephonenumber)
      filters.push(`Phone: ${filterData.mobilephonenumber}`);
    setAppliedFilters(filters);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    filterDataValue();
    setIsFilter(true);
    toggleFilterFlyout();
    const filteredData = Object.fromEntries(
      Object.entries(filterData).filter(([_, value]) => value !== "")
    );
    if (Object.keys(filteredData).length === 0) {
      setPage(1);
      fetchData(page);
    } else {
      userFilterData(filteredData, filterPage);
    }
  };
  const userFilterData = async (data: any, page: number) => {
    setIsFilter(true);
    setIsLoading(true);
    try {
      const response = await axiosProvider.post(
        `/filter?page=${page}&limit=${limit}`,
        data
      );
      console.log("VVVVVVVVVVVVVVVVV", response.data.data);
      const result = response.data.data;
      setData(result.customers);
      setTotalPagesFilter(result.totalPages);
    } catch (error: any) {
    } finally {
      setIsLoading(false);
    }
  };
  const toggleFlyout = () => setFlyoutOpen(!isFlyoutOpen);
  const toggleFilterFlyout = () => setFlyoutFilterOpen(!isFlyoutFilterOpen);

  const fetchData = async (currentPage: number) => {
    setIsLoading(true);
    setIsFilter(false);
    try {
      const response = await axiosProvider.get(
        `/getallcrmuser?page=${currentPage}&limit=${limit}`
      );
      console.log("PEGINATION", response);
      setTotalPages(response.data.data.pagination.totalPages);
      const result = response.data.data.customers;
      setData(result);
    } catch (error: any) {
      setIsError(true);
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

  const removeFilter = async (filter: string) => {
    setAppliedFilters((prevFilters) => prevFilters.filter((f) => f !== filter));

    if (filter.startsWith("Name")) {
      filterData.name = "";
    }
    if (filter.startsWith("Phone")) {
      filterData.mobilephonenumber = "";
    }

    if (appliedFilters.length === 0) {
      userFilterData(filterData, filterPage);
    } else {
      setPage(1);
      fetchData(page);
    }
  };
  const hadleClear = () => {
    setFilterData({ ...filterData, name: "", mobilephonenumber: "" });
  };
  const handlePageChangeFilter = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPagesFilter) {
      setFilterPage(newPage);
      userFilterData(newPage, filterPage);
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
              <p className=" text-[#0A0A0A] text-[32px] font-semibold leading-[41.6px]">
                Customers
              </p>
              <div className=" flex gap-2 ml-[1px] items-center">
                <p className=" text-[#717171] text-xl ">Customers</p>
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
            <div className=" flex justify-between items-center mb-6  w-[98%] mx-auto">
              <div>
                <input
                  type="text"
                  placeholder="Search..."
                  className=" w-[254px] px-4 py-3 rounded-2xl border border-[#E7E7E7]  focus:outline-none placeholder-[#717171] placeholder-font-weight-600 "
                />
              </div>
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
            {/* End search and filter row */}
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
                      <RxAvatar className=" w-6 h-6" />
                      <div className="font-medium text-[#717171] text-base leading-normal">
                        Name - Birth Date{" "}
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
                        Birth Country
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
                        Gender
                      </div>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-0 border border-tableBorder"
                  >
                    <div className=" flex items-center gap-2">
                      <SiHomeassistantcommunitystore className=" w-6 h-6" />
                      <div className="font-medium text-[#717171] text-base leading-normal">
                        Country of Residence
                      </div>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-0 border border-tableBorder"
                  >
                    <div className=" flex items-center gap-2">
                      <MdOutlineCall className=" w-6 h-6" />
                      <div className="font-medium text-[#717171] text-base leading-normal">
                        Phone
                      </div>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-0 border border-tableBorder"
                  >
                    <div className=" flex items-center gap-2">
                      <MdOutlineCall className=" w-6 h-6" />
                      <div className="font-medium text-[#717171] text-base leading-normal">
                        Status
                      </div>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-0 border border-tableBorder"
                  >
                    <div className=" flex items-center gap-2">
                      <LiaArrowCircleDownSolid className="w-6 h-6" />
                      <div className="font-medium text-[#717171] text-base leading-normal">
                        Action
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {isError ? (
                  <tr className="">
                    <td colSpan={8} className="text-center text-xl mt-5">
                      <div className=" mt-5">Data not found</div>
                    </td>
                  </tr>
                ) : (
                  data &&
                  data.map((item, index) => (
                    <tr
                      className=" border border-tableBorder bg-white"
                      key={index}
                    >
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
                        <div className="">
                          <Image
                            src="/images/tableImage.png"
                            alt="Table image"
                            sizes="100vw"
                            style={{
                              width: "100%",
                              height: "auto",
                            }}
                            width={44}
                            height={44}
                          />
                        </div>
                        <div>
                          <p className=" text-[#0A0A0A] text-base font-semibold leading-normal">
                            {item.firstname} {item.lastname}
                            {/* ({item.gender}) */}
                          </p>
                          <p className=" text-[#717171] text-sm leading-normal">
                            {item.birthdate}
                          </p>
                        </div>
                      </td>
                      <td className=" px-2 py-2 border border-tableBorder">
                        <p className=" text-[#717171] text-base leading-normal">
                          {item.countryofbirth}
                        </p>
                      </td>
                      <td className="px-2 py-0 border border-tableBorder">
                        <p className=" text-[#717171] text-base leading-normal">
                          {item.gender}
                        </p>
                      </td>
                      <td className="px-2 py-0 border border-tableBorder">
                        <p className=" text-[#717171] text-base leading-normal">
                          {item.countryofresidence}
                        </p>
                      </td>
                      <td className="px-2 py-0 border border-tableBorder">
                        <p className=" text-[#717171] text-base leading-normal">
                          {item.mobilephonenumber}
                        </p>
                      </td>
                      <td className="px-2 py-0 border border-tableBorder">
                        <p
                          className={`text-[#fff] text-sm leading-normal flex justify-center items-center p-1 rounded-full ${
                            item.mainStatus === "On Progress"
                              ? "bg-[#2DB3FF]"
                              : item.mainStatus === "Approved"
                              ? "bg-[#379941]"
                              : item.mainStatus === "Rejected"
                              ? "bg-[#E52020]"
                              : "bg-customBlue"
                          }`}
                        >
                          {item.mainStatus}
                        </p>
                      </td>
                      <td>
                        {/* <Link href="customerdetails"> */}
                        <button
                          // onClick={toggleFlyout}
                          onClick={() => handleClick(item)}
                          className=" py-[6px] px-4 bg-[#C6F7FE] m-2 flex gap-[10px] items-center rounded-full"
                        >
                          <MdRemoveRedEye className=" text-customBlue w-4 h-4" />
                          <p className=" text-sm leading-normal text-customBlue">
                            View Details
                          </p>
                        </button>
                        {/* </Link> */}
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
                  User Details
                </p>
                <IoCloseOutline
                  onClick={toggleFilterFlyout}
                  className=" h-8 w-8 border border-[#E7E7E7] text-[#0A0A0A] rounded cursor-pointer"
                />
              </div>
              <div className=" flex flex-col gap-3 mb-[10px]">
                <p className=" text-[#333] text-xl font-medium leading-6">
                  Alexandre Prot
                </p>
                <p className=" text-[#999] text-[13px] leading-5">
                  Edited 4hrs ago by Admin
                </p>
              </div>
              <div className=" w-full border-b border-[#E7E7E7] mb-4"></div>
              {/* FORM */}
              <form onSubmit={handleSubmit}>
                <div className=" w-full">
                  <div className=" w-full flex gap-4 mb-4">
                    <div className=" w-full">
                      <p className=" text-[#0A0A0A] font-medium text-base leading-6 mb-2">
                        First Name
                      </p>
                      <input
                        type="text"
                        value={filterData.name}
                        name="name"
                        onChange={handleChange}
                        placeholder="Alexandre"
                        className=" focus:outline-none w-full  border border-[#DFEAF2] rounded-[12px] text-sm leading-4 font-medium placeholder-[#717171] py-4 px-4"
                      />
                    </div>
                  </div>

                  <div className=" w-full flex gap-4 mb-4">
                    <div className=" w-full">
                      <p className=" text-[#0A0A0A] font-medium text-base leading-6 mb-2">
                        Phone
                      </p>
                      <input
                        type="number"
                        value={filterData.mobilephonenumber}
                        onChange={handleChange}
                        name="mobilephonenumber"
                        placeholder="1 (800) 667-6389"
                        className=" focus:outline-none w-full  border border-[#DFEAF2] rounded-[12px] text-sm leading-4 font-medium placeholder-[#717171] py-4 px-4"
                      />
                    </div>
                    <div className=" w-full">
                      <p className=" text-[#0A0A0A] font-medium text-base leading-6 mb-2">
                        Birth Date
                      </p>
                      <input
                        type="date"
                        value={filterData.birthdate}
                        onChange={handleChange}
                        disabled
                        name="birthdate"
                        placeholder=""
                        className=" focus:outline-none w-full  border border-[#DFEAF2] rounded-[12px] text-sm leading-4 font-medium placeholder-[#717171] py-4 px-4 cursor-not-allowed"
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
                    Update Details
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
      {/* FITLER FLYOUT END */}
      {/* <CustomerViewDetails
        isFlyoutOpen={isFlyoutOpen}
        toggleFlyout={toggleFlyout}
        setFlyoutOpen={setFlyoutOpen}
        customer={selectedCustomer}
      /> */}
    </>
  );
}
