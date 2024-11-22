"use client";
import Image from "next/image";
import Tabs from "../component/Tabs";
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
import Link from "next/link";
import { useEffect, useState } from "react";
import { appCheck } from "../firebase-config";
import { getToken } from "firebase/app-check";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import AxiosProvider from "../../provider/AxiosProvider";
import { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { AppContext } from "../AppContext";

const axiosProvider = new AxiosProvider();

interface FormValues {
  name: string;
  mobile_number: string;
  email: string;
  password: string;
  roleLevel: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Your name is required"),
  mobile_number: Yup.string()
    .matches(
      /^\+\d{1,4}\d{10}$/,
      "Enter a valid mobile number with country code"
    ) // Regex for valid mobile number format
    .required("Mobile number is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Home() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { accessToken } = useContext(AppContext);
  //console.log('access token############',accessToken)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    console.log(values);
    try {
      const appCheckToken = await getToken(appCheck, true);
      const res = await axiosProvider.post("/register", values, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-Firebase-AppCheck": appCheckToken.token,
        },
      });

      if (res.status === 200) {
        toast.success("Form submitted successfully!");
        resetForm();
        window.location.reload();
      }
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        toast.error(error.response.data.msg || "Conflict error occurred.");
      } else {
        console.error("Error during registration:", error);
        toast.error("Failed to submit the form.");
      }
    }
  };

  const tabs = [
    {
      label: "Create New User",
      content: (
        <>
          <div className="flex gap-8 pt-8">
            <div>
              <Image
                src="/images/user.png"
                alt="Orizon profile"
                width={150}
                height={150}
                className="rounded-full"
              />
            </div>
            <Formik
              initialValues={{
                name: "",
                mobile_number: "",
                email: "",
                password: "",
                roleLevel: "1",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue, isSubmitting, values }) => (
                <Form className="w-9/12">
                  <div className="w-full">
                    <div className="w-full flex gap-6">
                      <div className="w-full relative">
                        <p className="text-[#232323] text-base leading-normal mb-2">
                          Your Name
                        </p>
                        <Field
                          type="text"
                          name="name"
                          placeholder="Charlene Reed"
                          className="focus:outline-none w-full h-[50px] border border-[#DFEAF2] rounded-[15px] text-[15px] placeholder-[#718EBF] pl-4 mb-6 text-[#718EBF]"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-red-500 absolute top-[90px] text-xs"
                        />
                      </div>

                      {/* Mobile Number Field */}
                      <div className="w-full relative mb-6">
                        <div className="w-full relative mb-6">
                          <p className="text-[#232323] text-base leading-normal mb-2">
                            Mobile Number
                          </p>
                          <PhoneInput
                            country={"in"}
                            value={values.mobile_number}
                            onChange={(phone: string) => {
                              const formattedPhone = phone
                                ? phone.startsWith("+")
                                  ? phone
                                  : `+${phone}`
                                : "";
                              setFieldValue("mobile_number", formattedPhone);
                            }}
                            placeholder="Mobile Number"
                          />
                          <ErrorMessage
                            name="mobile_number"
                            component="div"
                            className="text-red-500 absolute top-[90px] text-xs"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="w-full flex gap-6">
                      <div className="w-full relative">
                        <p className="text-[#232323] text-base leading-normal mb-2">
                          Email
                        </p>
                        <Field
                          type="email"
                          name="email"
                          placeholder="Janedoe@gmail.com"
                          className="focus:outline-none w-full h-[50px] border border-[#DFEAF2] rounded-[15px] text-[15px] placeholder-[#718EBF] pl-4 mb-6 text-[#718EBF]"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-500 absolute top-[90px] text-xs"
                        />
                      </div>

                      <div className="w-full relative">
                        <p className="text-[#232323] text-base leading-normal mb-2">
                          Password
                        </p>
                        <Field
                          type={showPassword ? "text" : "password"}
                          name="password"
                          placeholder="********"
                          className="focus:outline-none w-full h-[50px] border border-[#DFEAF2] rounded-[15px] text-[15px] placeholder-[#718EBF] pl-4 mb-6 text-[#718EBF]"
                        />
                        {showPassword ? (
                          <FaRegEye
                            onClick={togglePasswordVisibility}
                            className="absolute top-12 right-4 text-[#718EBF] text-[15px] cursor-pointer"
                          />
                        ) : (
                          <FaRegEyeSlash
                            onClick={togglePasswordVisibility}
                            className="absolute top-12 right-4 text-[#718EBF] text-[15px] cursor-pointer"
                          />
                        )}
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-red-500 absolute top-[90px] text-xs"
                        />
                      </div>
                    </div>

                    <div className="w-full flex gap-6">
                      <div className="w-full">
                        <p className="text-[#232323] text-base leading-normal mb-2">
                          Role
                        </p>
                        <Field
                          as="select"
                          name="roleLevel"
                          className="focus:outline-none w-full h-[50px] border border-[#DFEAF2] rounded-[15px] text-[15px] placeholder-[#718EBF] pl-4 mb-6 text-[#718EBF]"
                        >
                          <option value="1">Admin</option>
                          <option value="2">Non-Admin</option>
                        </Field>
                      </div>
                    </div>

                    <div className="w-full flex gap-6">
                      <div className="w-full">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-[190px] h-[50px] bg-customBlue rounded-[15px] text-white text-lg leading-normal font-medium"
                        >
                          {isSubmitting ? "Submitting..." : "Submit"}
                        </button>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
            <ToastContainer />
          </div>
        </>
      ),
    },
    {
      label: "Preferences",
      content: (
        <>
          {/* //   Tab 2 content */}
          <div className=" flex gap-8 pt-8">
            <div className=" w-full">
              <div className=" w-full flex gap-6">
                <div className=" w-full">
                  <p className=" text-[#232323] text-base leading-normal mb-2">
                    Currency
                  </p>
                  <input
                    type="text"
                    placeholder="USD"
                    className=" focus:outline-none w-full h-[50px] border border-[#DFEAF2] rounded-[15px] text-[15px] placeholder-[#718EBF] pl-4 mb-6"
                  />
                </div>
                <div className=" w-full">
                  <p className=" text-[#232323] text-base leading-normal mb-2">
                    Time Zone
                  </p>
                  <input
                    type="text"
                    placeholder="(GMT-12:00) International Date Line West"
                    className=" focus:outline-none w-full h-[50px] border border-[#DFEAF2] rounded-[15px] text-[15px] placeholder-[#718EBF] pl-4 mb-6"
                  />
                </div>
              </div>
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
                  <label className="inline-flex items-center cursor-pointer mt-4">
                    <input type="checkbox" value="" className="sr-only peer" />
                    <div className="relative w-14 h-[30.71px] bg-gray-200 peer-focus:outline-none   rounded-full peer dark:bg-[#DFEAF2] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:start-[4px] after:bg-white   after:rounded-full after:h-6 after:w-6 after:transition-all  peer-checked:bg-[#16DBCC]"></div>
                    <span className="ms-3 text-base  text-[#232323] leading-normal">
                      Delete User Detais
                    </span>
                  </label>
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
              <div className=" w-full flex gap-6">
                <div className=" w-full"></div>
                <div className=" w-full flex justify-end">
                  <button className=" w-[190px] h-[50px] bg-customBlue rounded-[15px] text-white text-lg leading-normal font-medium">
                    Save
                  </button>
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
        <div className=" w-[15%]  flex flex-col justify-between py-4 px-4 border-r-2 border-customBorder shadow-borderShadow mt-2">
          {/* SIDE LEFT BAR TOP SECTION */}
          <div>
            <Link href="/customer">
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
            <Link href="/customer">
              <div className=" mb-9 flex gap-6 items-center  cursor-pointer group">
                <BiSolidHome className=" w-6 h-6 text-[#B1B1B1] group-hover:text-customBlue" />
                <p className=" text-[#B1B1B1] text-base leading-normal font-medium group-hover:text-customBlue">
                  Dashboard
                </p>
              </div>
            </Link>
            <Link href="/customer">
              <div className=" mb-9 flex gap-6 items-center group">
                <MdOutlineBarChart className=" w-6 h-6 text-[#B1B1B1] group-hover:text-customBlue" />
                <p className=" text-[#B1B1B1] text-base leading-normal  font-medium group-hover:text-customBlue">
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
            <Link href="/customer">
              <div className=" mb-9 flex gap-6 items-center group">
                <HiWrenchScrewdriver className=" w-6 h-6 text-[#B1B1B1] group-hover:text-customBlue" />
                <p className=" text-[#B1B1B1] text-base leading-normal font-medium group-hover:text-customBlue">
                  Point of Services
                </p>
              </div>
            </Link>
            <Link href="/customer">
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
                <Tabs tabs={tabs} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
