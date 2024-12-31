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
import { HiOutlineWallet } from "react-icons/hi2";
import { RxAvatar } from "react-icons/rx";
import { appCheck } from "../firebase-config";
import { getToken } from "firebase/app-check";
import AxiosProvider from "../../provider/AxiosProvider";
import { RiAccountCircleLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import StorageManager from "../../provider/StorageManager";
import { AppContext } from "../AppContext";
import CustomerViewDetails from "../component/CustomerViewDetails";
import LeftSideBar from '../component/LeftSideBar'
import { useRouter } from 'next/navigation'


const axiosProvider = new AxiosProvider();

interface FilterData {
  firstname: string;
  lastname: string;
  mobilephonenumber?: string;
  birthdate?: string;
}

interface Customer {
  id: string; // Updated to string as per the API response
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
  user_activity?: string;
  uuid?: string;
  activity_timestamp? : string;
  module? : string;
  type? :string;
}

export default function Home() {
  const [isFlyoutOpen, setFlyoutOpen] = useState<boolean>(false);
  const [isFlyoutFilterOpen, setFlyoutFilterOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const itemsPerPage = 10; // Customize this as needed
  const [paginatedData, setPaginatedData] = useState<Customer[]>([]);
  const [data, setData] = useState<Customer[]>([]);
  const [filterData, setFilterData] = useState<FilterData>({
    firstname: "",
    lastname: "",
  });
  const [isError, setIsError] = useState<boolean>(false);
  const [appliedFilters, setAppliedFilters] = useState<string[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const storage = new StorageManager();
  const { accessToken } = useContext(AppContext);
  //console.log("Get all user Data", data);
  const router = useRouter();
  useEffect(() => {
    const permissions = storage.getUserPermissions();
    const hasUserActivityView = permissions?.some(perm => perm.name === 'useractivity.view');
    if (!hasUserActivityView) {
      router.push('/customer');
    }
  }, []);
  const handleViewDetails = (customer: Customer) => {
    setSelectedCustomer(customer); // Set the selected customer when the button is clicked
    toggleFlyout();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const filters: string[] = [];
    if (filterData.firstname)
      filters.push(`First Name: ${filterData.firstname}`);
    if (filterData.lastname) filters.push(`Last Name: ${filterData.lastname}`);
    setAppliedFilters(filters);
  }, [filterData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toggleFilterFlyout();

    try {
      const tokenResponse = await getToken(appCheck, true);
      const appCheckToken = tokenResponse.token;
      const accessToken = storage.getAccessToken();

      const response = await axiosProvider.post("/filter", filterData);

      const result = response.data;
      if (result.success && result.data && result.data.customers) {
        setData(result.data.customers);
      }
    } catch (error: any) {
      handleError(error);
    }
  };

  const toggleFlyout = () => setFlyoutOpen(!isFlyoutOpen);
  const toggleFilterFlyout = () => setFlyoutFilterOpen(!isFlyoutFilterOpen);

  const fetchData = async () => {
    try {
      const tokenResponse = await getToken(appCheck, true);
      const appCheckToken = tokenResponse.token;
      //console.log(appCheckToken)
      const response = await axiosProvider.get("/getallactivites");
      const result = response.data.data.activities;
      console.log('@@@@@@@@@',result)
      setData(result);
    } catch (error: any) {
      handleError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      setTotalPages(Math.ceil(data.length / itemsPerPage));
      const startIndex = (currentPage - 1) * itemsPerPage;
      setPaginatedData(data.slice(startIndex, startIndex + itemsPerPage));
    } else {
      setPaginatedData([]);
      setTotalPages(0);
    }
  }, [currentPage, data]);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleError = (error: any) => {
    if (error.response && error.response.status === 404) {
      setIsError(true);
      //console.log("Data not found");
    }
    console.error("Error fetching data:", error);
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized: Check App Check token and Bearer token.");
    }
  };

  const removeFilter = async (filter: string) => {
    setAppliedFilters((prevFilters) => prevFilters.filter((f) => f !== filter));

    setFilterData((prev) => {
      const newFilterData = { ...prev };

      if (filter.startsWith("First Name")) {
        newFilterData.firstname = "";
      } else if (filter.startsWith("Last Name")) {
        newFilterData.lastname = "";
      }

      callApiWithUpdatedFilters(newFilterData);
      return newFilterData;
    });
  };

  const callApiWithUpdatedFilters = async (updatedFilterData: FilterData) => {
    try {
      const tokenResponse = await getToken(appCheck, true);
      const appCheckToken = tokenResponse.token;

const response = await axiosProvider.post("/filter", updatedFilterData);

      const result = response.data;
      if (result.success && result.data && result.data.customers) {
        setData(result.data.customers);
      }
    } catch (error: any) {
      handleError(error);
    }
  };

  if (data.length === 0) {
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
                User Activity
              </p>
              <div className=" flex gap-2 ml-[1px] items-center">
                <p className=" text-[#717171] text-xl ">Customers</p>
                <FaGreaterThan className=" text-[#717171]" />
                <p className=" text-[#0A0A0A] text-xl font-semibold ">
                  Recently added
                </p>
              </div>
            </div>
            <div>
              {/* <button className=" flex items-center gap-[10px] bg-[#fff]  h-12 px-3 py-[6px] rounded-2xl  border border-[#E7E7E7] shadow-borderShadow">
                <FaPlus className=" h-[20px] w-[20px] text-customBlue" />
                <p className=" text-customBlue text-base leading-normal">
                  Add New Customer
                </p>
              </button> */}
            </div>
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
                {/* <div className=" flex gap-2 py-3 px-4 rounded-[16px] border border-[#E7E7E7]">
                  <LuPencilLine className=" w-6 h-6" />
                  <p className=" text-[#0A0A0A] text-base font-medium">
                    Filter
                  </p>
                </div> */}
              </div>
            </div>
            {/* End search and filter row */}
            {/* Show Applied Filters */}
            <div className="w-[99%] mx-auto mb-3">
              {appliedFilters.length > 0 && (
                <div>
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
                </div>
              )}
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-[#999999]">
                <tr className=" border border-tableBorder">
                  <th
                    scope="col"
                    className="p-4 border border-tableBorder"
                  >
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
                {isError ? (
                  <tr className="">
                    <td colSpan={8} className="text-center text-xl mt-5">
                      <div className=" mt-5">Data not found</div>
                    </td>
                  </tr>
                ) : (
                  paginatedData &&
                  paginatedData.map((item, index) => (
                    <tr
                      className=" border border-tableBorder bg-white"
                      key={index}
                    >
                      <td className=" px-2 py-2 border border-tableBorder flex items-center gap-2">
                        <div>
                          <p className=" text-[#0A0A0A] text-base font-semibold leading-normal">
                            {item.user_activity} 
                            </p>
                        </div>
                      </td>
                      <td className=" px-2 py-2 border border-tableBorder">
                        <p className=" text-[#717171] text-base leading-normal">
                          {item.uuid}
                        </p>
                      </td>
                      <td className=" px-2 py-2 border border-tableBorder">
                        <p className=" text-[#717171] text-base leading-normal">
                          {item.activity_timestamp}
                        </p>
                      </td>
                      <td className=" px-2 py-2 border border-tableBorder">
                        <p className=" text-[#717171] text-base leading-normal">
                          {item.module}
                        </p>
                      </td>
                      <td className=" px-2 py-2 border border-tableBorder">
                        <p className=" text-[#717171] text-base leading-normal">
                          {item.type}
                        </p>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {/* Pagination Controls */}
            <div className="flex justify-center gap-5 items-center my-8">
              <button
                className="px-1 py-1 bg-customBlue text-white rounded disabled:opacity-50"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                <Image
                  src="/images/pre.svg"
                  alt="Table image"
                  width={32}
                  height={32}
                  style={{ width: "32px", height: "auto" }} // Maintain aspect ratio
                />
              </button>
              <span className="text-[#717171] text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="px-1 py-1 bg-customBlue text-white rounded disabled:opacity-50"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                <Image
                  src="/images/next.svg"
                  alt="Table image"
                  width={32}
                  height={32}
                  style={{ width: "32px", height: "auto" }} // Maintain aspect ratio
                />
              </button>
            </div>
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
                        value={filterData.firstname}
                        name="firstname"
                        onChange={handleChange}
                        placeholder="Alexandre"
                        className=" focus:outline-none w-full  border border-[#DFEAF2] rounded-[12px] text-sm leading-4 font-medium placeholder-[#717171] py-4 px-4"
                      />
                    </div>
                    <div className=" w-full">
                      <p className=" text-[#0A0A0A] font-medium text-base leading-6 mb-2">
                        Last Name
                      </p>
                      <input
                        type="text"
                        value={filterData.lastname}
                        onChange={handleChange}
                        name="lastname"
                        placeholder="Prot"
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
                        name="birthdate"
                        placeholder=""
                        className=" focus:outline-none w-full  border border-[#DFEAF2] rounded-[12px] text-sm leading-4 font-medium placeholder-[#717171] py-4 px-4"
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
      <CustomerViewDetails
        isFlyoutOpen={isFlyoutOpen}
        toggleFlyout={toggleFlyout}
        setFlyoutOpen={setFlyoutOpen}
        customer={selectedCustomer}
      />
    </>
  );
}
