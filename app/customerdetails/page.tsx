"use client";
import Image from "next/image";
import Tabs from "../component/Tabs";
import { CiSettings } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { AppContext } from "../AppContext";
import LeftSideBar from "../component/LeftSideBar";
import UserActivityLogger from "../../provider/UserActivityLogger";
import { MdVerified } from "react-icons/md";
import { TbTopologyStarRing2 } from "react-icons/tb";
import { PiMapPinLight } from "react-icons/pi";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { useSearchParams } from "next/navigation";
import AxiosProvider from "../../provider/AxiosProvider";
import CustomerViewDetails from "../component/CustomerViewDetails";

interface Customer {
  id: string;
  firstname: string;
  lastname: string;
  birthdate: string;
  gender: string;
  mobilephonenumber: string;
  email: string; // Added email field
  streetaddress: string;
  countryofbirth: string;
  countryofresidence: string;
  updated_at: string;
  // Optional fields
  city?: string | null;
  created_at?: string | null;
  fcmtoken?: string | null;
  idcardrecto?: string | null;
  idcardverso?: string | null;
  iddoctype?: string | null;
  mobilephonenumber_verified?: boolean | null;
  password?: string | null;
  shortintrovideo?: string | null;
  usersignature?: string | null;
  [key: string]: any; // To allow additional unknown fields
}

export default function Home() {
  const [customer, setCustomer] = useState<Customer | null>(null); // Initial state as null
  console.log("CUSTOMER", customer);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  //console.log("Got Id",id);
  const [isCustomerViewDetailOpen, setIsCustomerViewDetailOpen] = useState<boolean>(false);

  const axiosProvider = new AxiosProvider();

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const res = await axiosProvider.post("/viewcustomer", { id }); // Use POST and pass `id` in the body
          console.log("view customer details", res.data.data.customer);
          setCustomer(res.data.data.customer);
        } catch (error: any) {
          console.log("Error occurred:", error);
        }
      };

      fetchData();
    }
  }, [id]);

  const tabs = [
    {
      label: "User Home",
      content: (
        <>
          {/* //   Tab 1 content */}
          <div className="flex gap-8 pt-8 w-full">
            <div className="w-1/2">
              {/* PERSONAL INFO */}
              <div className="border border-[#F1F1F4] rounded-[12px] w-full mb-4">
                <div className="py-4 px-4 border-b border-[#F1F1F4]">
                  <p className="text-base font-semibold leading-4">
                    Personal Info
                  </p>
                </div>
                <table className="w-full pl-8">
                  <thead className=" h-[88px]">
                    <tr className="border-b border-[#F1F1F4]">
                      <th className="w-[20%]  text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        Photo
                      </th>
                      <th className="w-[60%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        {" "}
                        150x150px JPEG, PNG Image
                      </th>
                      <th className="w-[20%]">
                        {" "}
                        <Image
                          src="/images/Component 6.png"
                          alt="Orizon profile"
                          width={60}
                          height={60}
                          className="rounded-full m-auto border-2 border-[#17C653]"
                        />
                      </th>
                    </tr>
                  </thead>
                  <thead className="h-[57px]">
                    <tr className="border-b border-[#F1F1F4]">
                      <th className="w-[20%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        Name
                      </th>
                      <th className="w-[60%] text-sm font-medium leading-5 text-[#252F4A] text-left pl-[20px]">
                        {customer
                          ? `${customer.firstname} ${customer.lastname}`
                          : "Loading..."}
                      </th>
                      <th className="w-[20%] text-[#1B84FF] text-xs font-medium leading-3 cursor-pointer">
                        Edit
                      </th>
                    </tr>
                  </thead>
                  <thead className="h-[57px]">
                    <tr className="border-b border-[#F1F1F4]">
                      <th className="w-[20%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        Availability
                      </th>
                      <th className="w-[60%] text-[11px] font-medium leading-5 text-[#17C653] text-left pl-[20px]">
                        {" "}
                        <span className="bg-[#EAFFF1] py-[6px] px-[7px] rounded border border-[#17C653]">
                          Available now
                        </span>
                      </th>
                      <th className="w-[20%] text-[#1B84FF] text-xs font-medium leading-3 cursor-pointer">
                        Edit
                      </th>
                    </tr>
                  </thead>
                  <thead className="h-[57px]">
                    <tr className="border-b border-[#F1F1F4]">
                      <th className="w-[20%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        Birthday
                      </th>
                      <th className="w-[60%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        {customer ? `${customer.birthdate}` : "Loading..."}
                      </th>
                      <th className="w-[20%] text-[#1B84FF] text-xs font-medium leading-3 cursor-pointer">
                        Edit
                      </th>
                    </tr>
                  </thead>
                  <thead className="h-[57px]">
                    <tr className="border-b border-[#F1F1F4]">
                      <th className="w-[20%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        Gender
                      </th>
                      <th className="w-[60%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        {" "}
                        {customer ? `${customer.gender}` : "Loading..."}
                      </th>
                      <th className="w-[20%] text-[#1B84FF] text-xs font-medium leading-3 cursor-pointer">
                        Edit
                      </th>
                    </tr>
                  </thead>
                  <thead className="h-[57px]">
                    <tr className="border-b border-[#F1F1F4]">
                      <th className="w-[20%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        Address
                      </th>
                      <th className="w-[60%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        {" "}
                        {customer ? `${customer.streetaddress}` : "Loading..."}
                      </th>
                      <th className="w-[20%] text-[#1B84FF] text-xs font-medium leading-3 cursor-pointer">
                        Edit
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>
              {/* BASIC SETTING */}
              <div className="border border-[#F1F1F4] rounded-[12px] w-full mb-4">
                <div className="py-4 px-4 border-b border-[#F1F1F4]">
                  <p className="text-base font-semibold leading-4">
                    Basic Settings
                  </p>
                </div>
                <table className="w-full pl-8">
                  <thead className=" h-[57px]">
                    <tr className="border-b border-[#F1F1F4]">
                      <th className="w-[20%]  text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        Email
                      </th>
                      <th className="w-[60%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        {" "}
                        {customer ? `${customer.email}` : "Loading..."}
                      </th>
                    </tr>
                  </thead>
                  <thead className="h-[57px]">
                    <tr className="border-b border-[#F1F1F4]">
                      <th className="w-[20%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        Password
                      </th>
                      <th className="w-[60%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        Password last changed 2 months ago
                      </th>
                    </tr>
                  </thead>
                  <thead className="h-[57px]">
                    <tr className="border-b border-[#F1F1F4]">
                      <th className="w-[20%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        2FA
                      </th>
                      <th className="w-[60%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        To be set
                      </th>
                      <th className="w-[20%] text-[#1B84FF] text-xs font-medium leading-3 cursor-pointer">
                        Edit
                      </th>
                    </tr>
                  </thead>
                  <thead className="h-[57px]">
                    <tr className="border-b border-[#F1F1F4]">
                      <th className="w-[20%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        Sign-in with
                      </th>
                      <th className="w-[60%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        <div className=" flex items-center gap-3">
                          <Image
                            src="/images/apple.png"
                            alt="Orizon profile"
                            width={32}
                            height={32}
                          />
                          <Image
                            src="/images/fb.png"
                            alt="Orizon profile"
                            width={32}
                            height={32}
                          />
                          <Image
                            src="/images/google.png"
                            alt="Orizon profile"
                            width={32}
                            height={32}
                          />
                        </div>
                      </th>
                      <th className="w-[20%] text-[#1B84FF] text-xs font-medium leading-3 cursor-pointer">
                        Setup
                      </th>
                    </tr>
                  </thead>
                  <thead className="h-[57px]">
                    <tr className="border-b border-[#F1F1F4]">
                      <th className="w-[20%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        Team Account
                      </th>
                      <th className="w-[60%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        To be set
                      </th>
                      <th className="w-[20%] text-[#1B84FF] text-xs font-medium leading-3 cursor-pointer">
                        Setup
                      </th>
                    </tr>
                  </thead>
                  <thead className="h-[57px]">
                    <tr className="border-b border-[#F1F1F4]">
                      <th className="w-[20%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        Social Profiles
                      </th>
                      <th className="w-[60%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        <div className=" flex items-center gap-3">
                          <Image
                            src="/images/a.png"
                            alt="Orizon profile"
                            width={32}
                            height={32}
                          />
                          <Image
                            src="/images/b.png"
                            alt="Orizon profile"
                            width={32}
                            height={32}
                          />
                          <Image
                            src="/images/c.png"
                            alt="Orizon profile"
                            width={32}
                            height={32}
                          />
                          <Image
                            src="/images/d.png"
                            alt="Orizon profile"
                            width={32}
                            height={32}
                          />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <thead className="h-[57px]">
                    <tr className="border-b border-[#F1F1F4]">
                      <th className="w-[20%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        Referral Link
                      </th>
                      <th className="w-[60%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        https://studio.co/W3gvQOI35dt
                      </th>
                      <th className="w-[20%] text-[#1B84FF] text-xs font-medium leading-3 cursor-pointer">
                        Re Create
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>
              {/* COMMUNITY */}
              <div className="border border-[#F1F1F4] rounded-[12px] w-full">
                <div className="py-4 px-4 border-b border-[#F1F1F4]">
                  <p className="text-base font-semibold leading-4">
                    Community Badges
                  </p>
                </div>
                <table className="w-full pl-8">
                  <thead className=" h-[100px]">
                    <tr className="border-b border-[#F1F1F4]">
                      <th className="w-[60%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        <div className=" flex items-center gap-3">
                          <Image
                            src="/images/1.png"
                            alt="Orizon profile"
                            width={50}
                            height={50}
                          />
                          <Image
                            src="/images/2.png"
                            alt="Orizon profile"
                            width={50}
                            height={50}
                          />
                          <Image
                            src="/images/3.png"
                            alt="Orizon profile"
                            width={50}
                            height={50}
                          />
                          <Image
                            src="/images/4.png"
                            alt="Orizon profile"
                            width={50}
                            height={50}
                          />
                        </div>
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
            {/* SKILLS */}
            <div className="w-1/2">
              <div className="border border-[#F1F1F4] rounded-[12px] w-full mb-4">
                <div className="py-4 px-4 border-b border-[#F1F1F4] flex justify-between">
                  <p className="text-base font-semibold leading-4">Skills</p>
                  <p className="text-[13px] font-medium leading-4 text-[#1B84FF]">
                    Skills
                  </p>
                </div>
                <table className="w-full pl-8">
                  <thead className=" h-[100px]">
                    <tr className="border-b border-[#F1F1F4]">
                      <th className="w-[60%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        <div className="w-[80%] flex flex-wrap flex-row gap-2">
                          <div className=" bg-[#F1F1F4] px-[10px] py-[4px] rounded inline">
                            <span className="text-[11px] font-medium text-[#4B5675]">
                              web Design
                            </span>
                          </div>
                          <div className=" bg-[#F1F1F4] px-[10px] py-[4px] rounded inline">
                            <span className="text-[11px] font-medium text-[#4B5675]">
                              code Review
                            </span>
                          </div>
                          <div className=" bg-[#F1F1F4] px-[10px] py-[4px] rounded inline">
                            <span className="text-[11px] font-medium text-[#4B5675]">
                              Figma
                            </span>
                          </div>
                          <div className=" bg-[#F1F1F4] px-[10px] py-[4px] rounded inline">
                            <span className="text-[11px] font-medium text-[#4B5675]">
                              Product Development
                            </span>
                          </div>
                          <div className=" bg-[#F1F1F4] px-[10px] py-[4px] rounded inline">
                            <span className="text-[11px] font-medium text-[#4B5675]">
                              web flow
                            </span>
                          </div>
                          <div className=" bg-[#F1F1F4] px-[10px] py-[4px] rounded inline">
                            <span className="text-[11px] font-medium text-[#4B5675]">
                              AI
                            </span>
                          </div>
                        </div>
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>
              {/* MY FILES */}
              <div className="border border-[#F1F1F4] rounded-[12px] w-full mb-4">
                <div className="py-4 px-4 border-b border-[#F1F1F4] flex justify-between">
                  <p className="text-base font-semibold leading-4">My Files</p>
                </div>
                <table className="w-full pl-8">
                  <thead className=" h-[100px]">
                    <tr className="border-b border-[#F1F1F4]">
                      <th className="w-[60%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        <div className="flex flex-col gap-5 my-7">
                          <div className=" flex items-center gap-3">
                            <div>
                              <Image
                                src="/images/pdf.png"
                                alt="Orizon profile"
                                width={24}
                                height={24}
                              />
                            </div>
                            <div>
                              <p className="text-[#071437] text-sm font-medium leading-5">
                                Id Proof.pdf
                              </p>
                              <p className="text-[#4B5675] text-xs leading-4">
                                4.7 MB 26 Sep 2024 3:20 PM
                              </p>
                            </div>
                          </div>
                          <div className=" flex items-center gap-3">
                            <div>
                              <Image
                                src="/images/pdf.png"
                                alt="Orizon profile"
                                width={24}
                                height={24}
                              />
                            </div>
                            <div>
                              <p className="text-[#071437] text-sm font-medium leading-5">
                                Id Proof.pdf
                              </p>
                              <p className="text-[#4B5675] text-xs leading-4">
                                4.7 MB 26 Sep 2024 3:20 PM
                              </p>
                            </div>
                          </div>
                          <div className=" flex items-center gap-3">
                            <div>
                              <Image
                                src="/images/pdf.png"
                                alt="Orizon profile"
                                width={24}
                                height={24}
                              />
                            </div>
                            <div>
                              <p className="text-[#071437] text-sm font-medium leading-5">
                                Id Proof.pdf
                              </p>
                              <p className="text-[#4B5675] text-xs leading-4">
                                4.7 MB 26 Sep 2024 3:20 PM
                              </p>
                            </div>
                          </div>
                          <div className=" flex items-center gap-3">
                            <div>
                              <Image
                                src="/images/pdf.png"
                                alt="Orizon profile"
                                width={24}
                                height={24}
                              />
                            </div>
                            <div>
                              <p className="text-[#071437] text-sm font-medium leading-5">
                                Id Proof.pdf
                              </p>
                              <p className="text-[#4B5675] text-xs leading-4">
                                4.7 MB 26 Sep 2024 3:20 PM
                              </p>
                            </div>
                          </div>
                        </div>
                      </th>
                    </tr>
                  </thead>
                </table>
                <div className="py-4 px-4 border-b border-[#F1F1F4] flex justify-center">
                  <p className="text-[13px] font-medium leading-[13px] text-[#1B84FF]">
                    My Files
                  </p>
                </div>
              </div>
              <div className="border border-[#F1F1F4] rounded-[12px] w-full mb-4">
                <div className="py-4 px-4 border-b border-[#F1F1F4]">
                  <p className="text-base font-semibold leading-4">Work</p>
                </div>
                <table className="w-full pl-8">
                  <thead className=" h-[57px]">
                    <tr className="border-b border-[#F1F1F4]">
                      <th className="w-[20%]  text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        Language
                      </th>
                      <th className="w-[60%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        {" "}
                        English -Fluent
                      </th>
                    </tr>
                  </thead>
                  <thead className="h-[57px]">
                    <tr className="border-b border-[#F1F1F4]">
                      <th className="w-[20%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        Hourly Rate
                      </th>
                      <th className="w-[60%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        Hourly Rate
                      </th>
                    </tr>
                  </thead>
                  <thead className="h-[57px]">
                    <tr className="border-b border-[#F1F1F4]">
                      <th className="w-[20%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        Avaibilaty
                      </th>
                      <th className="w-[60%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        32 hours a week
                      </th>
                      <th className="w-[20%] text-[#1B84FF] text-xs font-medium leading-3 cursor-pointer"></th>
                    </tr>
                  </thead>
                  <thead className="">
                    <tr className="border-b border-[#F1F1F4]">
                      <th className="w-[20%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        Skills
                      </th>
                      <th className="w-[60%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        <div className="w-full flex flex-wrap flex-row gap-2 py-3">
                          <div className=" bg-[#F1F1F4] px-[10px] py-[4px] rounded inline">
                            <span className="text-[11px] font-medium text-[#4B5675]">
                              web Design
                            </span>
                          </div>
                          <div className=" bg-[#F1F1F4] px-[10px] py-[4px] rounded inline">
                            <span className="text-[11px] font-medium text-[#4B5675]">
                              code Review
                            </span>
                          </div>
                          <div className=" bg-[#F1F1F4] px-[10px] py-[4px] rounded inline">
                            <span className="text-[11px] font-medium text-[#4B5675]">
                              Figma
                            </span>
                          </div>
                          <div className=" bg-[#F1F1F4] px-[10px] py-[4px] rounded inline">
                            <span className="text-[11px] font-medium text-[#4B5675]">
                              Product Development
                            </span>
                          </div>
                          <div className=" bg-[#F1F1F4] px-[10px] py-[4px] rounded inline">
                            <span className="text-[11px] font-medium text-[#4B5675]">
                              web flow
                            </span>
                          </div>
                          <div className=" bg-[#F1F1F4] px-[10px] py-[4px] rounded inline">
                            <span className="text-[11px] font-medium text-[#4B5675]">
                              AI
                            </span>
                          </div>
                        </div>
                      </th>
                      <th className="w-[20%] text-[#1B84FF] text-xs font-medium leading-3 cursor-pointer"></th>
                    </tr>
                  </thead>

                  <thead className="">
                    <tr className="border-b border-[#F1F1F4]">
                      <th className="w-[20%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px]">
                        About
                      </th>
                      <th className="w-[60%] text-sm font-normal leading-5 text-[#78829D] text-left pl-[20px] py-3">
                        We&apos;re open to partnerships, guest posts, and more.
                        Join us to share your insights and grow your audience.
                      </th>
                      <th className="w-[20%] text-[#1B84FF] text-xs font-medium leading-3 cursor-pointer"></th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
            {/* ------------------------------- */}
          </div>
        </>
      ),
    },
    {
      label: "Preferences",
      content: (
        <>
          {/* //   Tab 2 content */}
          <div className="flex flex-wrap flex-row gap-2">
            <div className="w-[30%] h-[299px] p-6 bg-white rounded flex-col justify-start items-start gap-4 inline-flex border border-gray-400">
              <div className="self-stretch justify-between items-center inline-flex">
                <div className="h-[50px] relative">
                  <Image
                    src="/images/user.svg"
                    alt="Orizon profile"
                    width={50}
                    height={50}
                  />
                  <div className="w-[152px] h-[41px] px-3.5 py-2.5 left-[66px] top-[4.50px] absolute bg-[#2db3ff] rounded-xl justify-center items-center gap-2.5 inline-flex">
                    <div
                      className="text-white text-sm font-semibold cursor-pointer"
                      onClick={()=>setIsCustomerViewDetailOpen(!isCustomerViewDetailOpen)}
                    >
                      On Progress
                    </div>
                  </div>
                </div>
                <div className="w-6 h-6 relative  overflow-hidden">
                  <div className="w-[5px] h-6 left-[9.50px] top-0 absolute"></div>
                </div>
              </div>
              <div className="self-stretch text-[#0e0e0e] text-base font-medium">
                Liveness Detection
              </div>
              <div className="self-stretch h-[93px] rounded border border-[#232323] flex-col justify-start items-start gap-2.5 flex">
                <div className="self-stretch h-[72px] pl-4 py-1 rounded-tl rounded-tr justify-start items-start gap-1 inline-flex">
                  <div className="w-[258px] h-12 py-1 flex-col justify-start items-start inline-flex">
                    <div className="px-1 bg-[#ece6f0] justify-start items-center inline-flex relative bottom-[13px]">
                      <div className="text-[#2953e8] text-xs font-normal leading-none tracking-wide">
                        Admin Review
                      </div>
                    </div>
                    <div className="self-stretch justify-start items-center inline-flex">
                      <div className="w-[258px] h-12 text-[#414349] text-base font-normal leading-normal tracking-wide">
                        the face value of live dtection score is less{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch justify-between items-center inline-flex">
                <div className="w-[150px] h-9 relative">
                  <div className="left-[121px] top-0 absolute text-[#3f3f3f] text-sm font-semibold">
                    24%
                  </div>
                  <div className="left-0 top-0 absolute text-[#3f3f3f] text-sm font-medium">
                    Liveness Code
                  </div>
                  <div className="w-[149px] h-[7px] left-0 top-[29px] absolute">
                    <div className="w-[149px] h-[7px] left-0 top-0 absolute bg-[#e4e4e4] rounded-2xl" />
                    <div className="w-[45px] h-[7px] left-0 top-0 absolute bg-[#2953e8] rounded-2xl" />
                  </div>
                </div>
                <div className="px-2 py-1 bg-[#eef1ff] rounded-xl justify-center items-center gap-2.5 flex">
                  <div className="text-[#2953e8] text-sm font-bold">
                    Notify User
                  </div>
                  <div className="w-3 h-3 relative flex-col justify-start items-start inline-flex overflow-hidden" />
                </div>
              </div>
            </div>
            <div className="w-[30%] h-[299px] p-6 bg-white rounded flex-col justify-start items-start gap-4 inline-flex border border-gray-400">
              <div className="self-stretch justify-between items-center inline-flex">
                <div className="h-[50px] relative">
                  <Image
                    src="/images/user.svg"
                    alt="Orizon profile"
                    width={50}
                    height={50}
                  />
                  <div className="w-[152px] h-[41px] px-3.5 py-2.5 left-[66px] top-[4.50px] absolute bg-[#379941] rounded-xl justify-center items-center gap-2.5 inline-flex">
                    <div className="text-white text-sm font-semibold">
                      Approved
                    </div>
                  </div>
                </div>
                <div className="w-6 h-6 relative  overflow-hidden">
                  <div className="w-[5px] h-6 left-[9.50px] top-0 absolute"></div>
                </div>
              </div>
              <div className="self-stretch text-[#0e0e0e] text-base font-medium">
                Identity Matching
              </div>
              <div className="self-stretch h-[93px] rounded border border-[#232323] flex-col justify-start items-start gap-2.5 flex">
                <div className="self-stretch h-[72px] pl-4 py-1 rounded-tl rounded-tr justify-start items-start gap-1 inline-flex">
                  <div className="w-[258px] h-12 py-1 flex-col justify-start items-start inline-flex">
                    <div className="px-1 bg-[#ece6f0] justify-start items-center inline-flex relative bottom-[13px]">
                      <div className="text-[#2953e8] text-xs font-normal leading-none tracking-wide">
                        Admin Review
                      </div>
                    </div>
                    <div className="self-stretch justify-start items-center inline-flex">
                      <div className="w-[258px] h-12 text-[#414349] text-base font-normal leading-normal tracking-wide">
                        the face value of live dtection score is less{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch justify-between items-center inline-flex">
                <div className="w-[150px] h-9 relative">
                  <div className="left-[121px] top-0 absolute text-[#3f3f3f] text-sm font-semibold">
                    24%
                  </div>
                  <div className="left-0 top-0 absolute text-[#3f3f3f] text-sm font-medium">
                    Liveness Code
                  </div>
                  <div className="w-[149px] h-[7px] left-0 top-[29px] absolute">
                    <div className="w-[149px] h-[7px] left-0 top-0 absolute bg-[#e4e4e4] rounded-2xl" />
                    <div className="w-[45px] h-[7px] left-0 top-0 absolute bg-[#2953e8] rounded-2xl" />
                  </div>
                </div>
                <div className="px-2 py-1 bg-[#eef1ff] rounded-xl justify-center items-center gap-2.5 flex">
                  <div className="text-[#2953e8] text-sm font-bold">
                    Notify User
                  </div>
                  <div className="w-3 h-3 relative flex-col justify-start items-start inline-flex overflow-hidden" />
                </div>
              </div>
            </div>
            <div className="w-[30%] h-[299px] p-6 bg-white rounded flex-col justify-start items-start gap-4 inline-flex border border-gray-400">
              <div className="self-stretch justify-between items-center inline-flex">
                <div className="h-[50px] relative">
                  <Image
                    src="/images/user.svg"
                    alt="Orizon profile"
                    width={50}
                    height={50}
                  />
                  <div className="w-[152px] h-[41px] px-3.5 py-2.5 left-[66px] top-[4.50px] absolute bg-[#D2843C] rounded-xl justify-center items-center gap-2.5 inline-flex">
                    <div className="text-white text-sm font-semibold">
                      Under Review
                    </div>
                  </div>
                </div>
                <div className="w-6 h-6 relative  overflow-hidden">
                  <div className="w-[5px] h-6 left-[9.50px] top-0 absolute"></div>
                </div>
              </div>
              <div className="self-stretch text-[#0e0e0e] text-base font-medium">
                User Details Verification
              </div>
              <div className="self-stretch h-[93px] rounded border border-[#232323] flex-col justify-start items-start gap-2.5 flex">
                <div className="self-stretch h-[72px] pl-4 py-1 rounded-tl rounded-tr justify-start items-start gap-1 inline-flex">
                  <div className="w-[258px] h-12 py-1 flex-col justify-start items-start inline-flex">
                    <div className="px-1 bg-[#ece6f0] justify-start items-center inline-flex relative bottom-[13px]">
                      <div className="text-[#2953e8] text-xs font-normal leading-none tracking-wide">
                        Admin Review
                      </div>
                    </div>
                    <div className="self-stretch justify-start items-center inline-flex">
                      <div className="w-[258px] h-12 text-[#414349] text-base font-normal leading-normal tracking-wide">
                        the face value of live dtection score is less{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch justify-between items-center inline-flex">
                <div className="w-[150px] h-9 relative">
                  <div className="left-[121px] top-0 absolute text-[#3f3f3f] text-sm font-semibold">
                    24%
                  </div>
                  <div className="left-0 top-0 absolute text-[#3f3f3f] text-sm font-medium">
                    Liveness Code
                  </div>
                  <div className="w-[149px] h-[7px] left-0 top-[29px] absolute">
                    <div className="w-[149px] h-[7px] left-0 top-0 absolute bg-[#e4e4e4] rounded-2xl" />
                    <div className="w-[45px] h-[7px] left-0 top-0 absolute bg-[#2953e8] rounded-2xl" />
                  </div>
                </div>
                <div className="px-2 py-1 bg-[#eef1ff] rounded-xl justify-center items-center gap-2.5 flex">
                  <div className="text-[#2953e8] text-sm font-bold">
                    Notify User
                  </div>
                  <div className="w-3 h-3 relative flex-col justify-start items-start inline-flex overflow-hidden" />
                </div>
              </div>
            </div>
            <div className="w-[30%] h-[299px] p-6 bg-white rounded flex-col justify-start items-start gap-4 inline-flex border border-gray-400">
              <div className="self-stretch justify-between items-center inline-flex">
                <div className="h-[50px] relative">
                  <Image
                    src="/images/user.svg"
                    alt="Orizon profile"
                    width={50}
                    height={50}
                  />
                  <div className="w-[152px] h-[41px] px-3.5 py-2.5 left-[66px] top-[4.50px] absolute bg-[#D2843C] rounded-xl justify-center items-center gap-2.5 inline-flex">
                    <div className="text-white text-sm font-semibold">
                      Under Review
                    </div>
                  </div>
                </div>
                <div className="w-6 h-6 relative  overflow-hidden">
                  <div className="w-[5px] h-6 left-[9.50px] top-0 absolute"></div>
                </div>
              </div>
              <div className="self-stretch text-[#0e0e0e] text-base font-medium">
                Scanned ID Card Verification
              </div>
              <div className="self-stretch h-[93px] rounded border border-[#232323] flex-col justify-start items-start gap-2.5 flex">
                <div className="self-stretch h-[72px] pl-4 py-1 rounded-tl rounded-tr justify-start items-start gap-1 inline-flex">
                  <div className="w-[258px] h-12 py-1 flex-col justify-start items-start inline-flex">
                    <div className="px-1 bg-[#ece6f0] justify-start items-center inline-flex relative bottom-[13px]">
                      <div className="text-[#2953e8] text-xs font-normal leading-none tracking-wide">
                        Admin Review
                      </div>
                    </div>
                    <div className="self-stretch justify-start items-center inline-flex">
                      <div className="w-[258px] h-12 text-[#414349] text-base font-normal leading-normal tracking-wide">
                        the face value of live dtection score is less{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch justify-between items-center inline-flex">
                <div className="w-[150px] h-9 relative">
                  <div className="left-[121px] top-0 absolute text-[#3f3f3f] text-sm font-semibold">
                    24%
                  </div>
                  <div className="left-0 top-0 absolute text-[#3f3f3f] text-sm font-medium">
                    Liveness Code
                  </div>
                  <div className="w-[149px] h-[7px] left-0 top-[29px] absolute">
                    <div className="w-[149px] h-[7px] left-0 top-0 absolute bg-[#e4e4e4] rounded-2xl" />
                    <div className="w-[45px] h-[7px] left-0 top-0 absolute bg-[#2953e8] rounded-2xl" />
                  </div>
                </div>
                <div className="px-2 py-1 bg-[#eef1ff] rounded-xl justify-center items-center gap-2.5 flex">
                  <div className="text-[#2953e8] text-sm font-bold">
                    Notify User
                  </div>
                  <div className="w-3 h-3 relative flex-col justify-start items-start inline-flex overflow-hidden" />
                </div>
              </div>
            </div>
            <div className="w-[30%] h-[299px] p-6 bg-white rounded flex-col justify-start items-start gap-4 inline-flex border border-gray-400">
              <div className="self-stretch justify-between items-center inline-flex">
                <div className="h-[50px] relative">
                  <Image
                    src="/images/user.svg"
                    alt="Orizon profile"
                    width={50}
                    height={50}
                  />
                  <div className="w-[152px] h-[41px] px-3.5 py-2.5 left-[66px] top-[4.50px] absolute bg-[#D2843C] rounded-xl justify-center items-center gap-2.5 inline-flex">
                    <div className="text-white text-sm font-semibold">
                      Under Review
                    </div>
                  </div>
                </div>
                <div className="w-6 h-6 relative  overflow-hidden">
                  <div className="w-[5px] h-6 left-[9.50px] top-0 absolute"></div>
                </div>
              </div>
              <div className="self-stretch text-[#0e0e0e] text-base font-medium">
                5-Second Face Video Verification
              </div>
              <div className="self-stretch h-[93px] rounded border border-[#232323] flex-col justify-start items-start gap-2.5 flex">
                <div className="self-stretch h-[72px] pl-4 py-1 rounded-tl rounded-tr justify-start items-start gap-1 inline-flex">
                  <div className="w-[258px] h-12 py-1 flex-col justify-start items-start inline-flex">
                    <div className="px-1 bg-[#ece6f0] justify-start items-center inline-flex relative bottom-[13px]">
                      <div className="text-[#2953e8] text-xs font-normal leading-none tracking-wide">
                        Admin Review
                      </div>
                    </div>
                    <div className="self-stretch justify-start items-center inline-flex">
                      <div className="w-[258px] h-12 text-[#414349] text-base font-normal leading-normal tracking-wide">
                        the face value of live dtection score is less{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch justify-between items-center inline-flex">
                <div className="w-[150px] h-9 relative">
                  <div className="left-[121px] top-0 absolute text-[#3f3f3f] text-sm font-semibold">
                    24%
                  </div>
                  <div className="left-0 top-0 absolute text-[#3f3f3f] text-sm font-medium">
                    Liveness Code
                  </div>
                  <div className="w-[149px] h-[7px] left-0 top-[29px] absolute">
                    <div className="w-[149px] h-[7px] left-0 top-0 absolute bg-[#e4e4e4] rounded-2xl" />
                    <div className="w-[45px] h-[7px] left-0 top-0 absolute bg-[#2953e8] rounded-2xl" />
                  </div>
                </div>
                <div className="px-2 py-1 bg-[#eef1ff] rounded-xl justify-center items-center gap-2.5 flex">
                  <div className="text-[#2953e8] text-sm font-bold">
                    Notify User
                  </div>
                  <div className="w-3 h-3 relative flex-col justify-start items-start inline-flex overflow-hidden" />
                </div>
              </div>
            </div>
            <div className="w-[30%] h-[299px] p-6 bg-white rounded flex-col justify-start items-start gap-4 inline-flex border border-gray-400">
              <div className="self-stretch justify-between items-center inline-flex">
                <div className="h-[50px] relative">
                  <Image
                    src="/images/user.svg"
                    alt="Orizon profile"
                    width={50}
                    height={50}
                  />
                  <div className="w-[152px] h-[41px] px-3.5 py-2.5 left-[66px] top-[4.50px] absolute bg-[#D2843C] rounded-xl justify-center items-center gap-2.5 inline-flex">
                    <div className="text-white text-sm font-semibold">
                      Under Review
                    </div>
                  </div>
                </div>
                <div className="w-6 h-6 relative  overflow-hidden">
                  <div className="w-[5px] h-6 left-[9.50px] top-0 absolute"></div>
                </div>
              </div>
              <div className="self-stretch text-[#0e0e0e] text-base font-medium">
                Signature Verification
              </div>
              <div className="self-stretch h-[93px] rounded border border-[#232323] flex-col justify-start items-start gap-2.5 flex">
                <div className="self-stretch h-[72px] pl-4 py-1 rounded-tl rounded-tr justify-start items-start gap-1 inline-flex">
                  <div className="w-[258px] h-12 py-1 flex-col justify-start items-start inline-flex">
                    <div className="px-1 bg-[#ece6f0] justify-start items-center inline-flex relative bottom-[13px]">
                      <div className="text-[#2953e8] text-xs font-normal leading-none tracking-wide">
                        Admin Review
                      </div>
                    </div>
                    <div className="self-stretch justify-start items-center inline-flex">
                      <div className="w-[258px] h-12 text-[#414349] text-base font-normal leading-normal tracking-wide">
                        the face value of live dtection score is less{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch justify-between items-center inline-flex">
                <div className="w-[150px] h-9 relative">
                  <div className="left-[121px] top-0 absolute text-[#3f3f3f] text-sm font-semibold">
                    24%
                  </div>
                  <div className="left-0 top-0 absolute text-[#3f3f3f] text-sm font-medium">
                    Liveness Code
                  </div>
                  <div className="w-[149px] h-[7px] left-0 top-[29px] absolute">
                    <div className="w-[149px] h-[7px] left-0 top-0 absolute bg-[#e4e4e4] rounded-2xl" />
                    <div className="w-[45px] h-[7px] left-0 top-0 absolute bg-[#2953e8] rounded-2xl" />
                  </div>
                </div>
                <div className="px-2 py-1 bg-[#eef1ff] rounded-xl justify-center items-center gap-2.5 flex">
                  <div className="text-[#2953e8] text-sm font-bold">
                    Notify User
                  </div>
                  <div className="w-3 h-3 relative flex-col justify-start items-start inline-flex overflow-hidden" />
                </div>
              </div>
            </div>
            <div
              className="w-[30%] h-[299px] p-6 bg-white rounded flex-col justify-start items-start gap-4 inline-flex border border-gray-4
            00"
            >
              <div className="self-stretch justify-between items-center inline-flex">
                <div className="h-[50px] relative">
                  <Image
                    src="/images/user.svg"
                    alt="Orizon profile"
                    width={50}
                    height={50}
                  />
                  <div className="w-[152px] h-[41px] px-3.5 py-2.5 left-[66px] top-[4.50px] absolute bg-[#E52020] rounded-xl justify-center items-center gap-2.5 inline-flex">
                    <div className="text-white text-sm font-semibold">
                      Rejected
                    </div>
                  </div>
                </div>
                <div className="w-6 h-6 relative  overflow-hidden">
                  <div className="w-[5px] h-6 left-[9.50px] top-0 absolute"></div>
                </div>
              </div>
              <div className="self-stretch h-[93px] rounded border border-[#232323] flex-col justify-start items-start gap-2.5 flex">
                <div className="self-stretch h-[72px] pl-4 py-1 rounded-tl rounded-tr justify-start items-start gap-1 inline-flex">
                  <div className="w-[258px] h-12 py-1 flex-col justify-start items-start inline-flex">
                    <div className="px-1 bg-[#ece6f0] justify-start items-center inline-flex relative bottom-[13px]">
                      <div className="text-[#2953e8] text-xs font-normal leading-none tracking-wide">
                        Admin Review
                      </div>
                    </div>
                    <div className="self-stretch justify-start items-center inline-flex">
                      <div className="w-[258px] h-12 text-[#414349] text-base font-normal leading-normal tracking-wide">
                        the face value of live dtection score is less{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch justify-between items-center inline-flex">
                <div className="w-[150px] h-9 relative">
                  <div className="left-[121px] top-0 absolute text-[#3f3f3f] text-sm font-semibold">
                    24%
                  </div>
                  <div className="left-0 top-0 absolute text-[#3f3f3f] text-sm font-medium">
                    Liveness Code
                  </div>
                  <div className="w-[149px] h-[7px] left-0 top-[29px] absolute">
                    <div className="w-[149px] h-[7px] left-0 top-0 absolute bg-[#e4e4e4] rounded-2xl" />
                    <div className="w-[45px] h-[7px] left-0 top-0 absolute bg-[#2953e8] rounded-2xl" />
                  </div>
                </div>
                <div className="px-2 py-1 bg-[#eef1ff] rounded-xl justify-center items-center gap-2.5 flex">
                  <div className="text-[#2953e8] text-sm font-bold">
                    Notify User
                  </div>
                  <div className="w-3 h-3 relative flex-col justify-start items-start inline-flex overflow-hidden" />
                </div>
              </div>
            </div>
          </div>
        </>
      ),
      // End Tab content 2
    },
    {
      label: "Security",
      content: (
        <>
          {/* Tab content 3 */}
          <div className=" w-full flex gap-6">
            <div className=" w-full">
              <p className=" text-[#333B69] text-[17px] font-medium leading-normal mb-2">
                Controlls
              </p>
              <label className="inline-flex items-center cursor-pointer mt-4">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  readOnly
                />
                <div className="relative w-14 h-[30.71px] bg-gray-200 peer-focus:outline-none   rounded-full peer dark:bg-[#DFEAF2] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:start-[4px] after:bg-white   after:rounded-full after:h-6 after:w-6 after:transition-all  peer-checked:bg-[#16DBCC]"></div>
                <span className="ms-3 text-base  text-[#232323] leading-normal">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </span>
              </label>
            </div>
            <div className=" w-full"></div>
          </div>
          <p className=" text-[#333B69] text-[17px] font-medium leading-normal mb-2 mt-4">
            Change Password
          </p>
          <div className=" w-full">
            <div className=" w-full flex gap-6">
              <div className=" w-full">
                <p className=" text-[#232323] text-base leading-normal mb-2">
                  Current Password
                </p>
                <input
                  type="password"
                  placeholder="********"
                  className=" focus:outline-none w-full h-[50px] border border-[#DFEAF2] rounded-[15px] text-[15px] placeholder-[#718EBF] pl-4 mb-6"
                />
              </div>
              <div className=" w-full"></div>
            </div>
            <div className=" w-full flex gap-6">
              <div className=" w-full">
                <p className=" text-[#232323] text-base leading-normal mb-2">
                  New Password
                </p>
                <input
                  type="password"
                  placeholder="********"
                  className=" focus:outline-none w-full h-[50px] border border-[#DFEAF2] rounded-[15px] text-[15px] placeholder-[#718EBF] pl-4 mb-6"
                />
              </div>
              <div className=" w-full"></div>
            </div>
          </div>

          {/* End Tab content 3 */}
        </>
      ),
    },
  ];
  return (
    <>
      <div className=" flex  min-h-screen">
        {/* Left sidebar */}
        <LeftSideBar />
        {/* Main content right section */}
        <div className=" w-[85%] bg-white min-h-[500px]  rounded p-0 mt-2">
          {/* right section top row */}
          <div className=" w-full flex justify-end items-center gap-7 mb-3 p-4">
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
          <div className=" w-full   bg-[#F5F7FA] flex justify-center p-8">
            <div className=" w-[95%] min-h-[600px] bg-white rounded-[25px]">
              <div className="p-6">
                <div className="flex justify-center">
                  <Image
                    src="/images/300-1.png.png"
                    alt="Orizon profile"
                    width={100}
                    height={100}
                    className="rounded-full mb-4"
                  />
                </div>
                <div className="flex items-center justify-center gap-1 mb-4">
                  <p className="text-[#071437] text-lg font-semibold leading-5">
                    {customer
                      ? `${customer.firstname} ${customer.lastname}`
                      : "Loading..."}
                  </p>
                  <MdVerified className="w-4 h-4 text-[#1B84FF] relative top-[1.5px]" />
                </div>
                <div className="flex justify-center items-center gap-5">
                  <div className="flex items-center justify-center gap-1">
                    <TbTopologyStarRing2 className="w-[14px] h-[20px] text-[#99A1B7]" />
                    <p className="text-[#78829D] text-sm font-medium leading-5">
                      abc work
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <PiMapPinLight className="w-[14px] h-[20px] text-[#99A1B7]" />
                    <p className="text-[#78829D] text-sm font-medium leading-5">
                      Netherlands
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <HiOutlineEnvelope className="w-[14px] h-[20px] text-[#99A1B7]" />
                    <p className="text-[#78829D] text-sm font-medium leading-5">
                      abc@xyz.com
                    </p>
                  </div>
                </div>
                <Tabs tabs={tabs} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <CustomerViewDetails
        isEditFlyoutOpen={isCustomerViewDetailOpen}
        setIsEditFlyoutOpen={setIsCustomerViewDetailOpen}
      />
    </>
  );
}
