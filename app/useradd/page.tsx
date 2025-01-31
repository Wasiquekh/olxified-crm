"use client";
import Image from "next/image";
import Tabs from "../component/Tabs";
import { CiSettings } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
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
import LeftSideBar from "../component/LeftSideBar";
import UserActivityLogger from "../../provider/UserActivityLogger";

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
      const res = await axiosProvider.post("/register", values);

      if (res.status === 200) {
        toast.success("Form submitted successfully!");
        resetForm();
       // window.location.reload();
      }
      //console.log('user register',res.data.data.userId)
      // Create instance and log activity
      const activityLogger = new UserActivityLogger();
      await activityLogger.userRegister(res.data.data.userId);
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
                          <option value="3">Sub-Admin</option>
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
    // {
    //   label: "Preferences",
    //   content: (
    //     <>
    //       {/* //   Tab 2 content */}
    //       <div className=" flex gap-8 pt-8">
    //         <div className=" w-full">
    //           <div className=" w-full flex gap-6">
    //             <div className=" w-full">
    //               <p className=" text-[#232323] text-base leading-normal mb-2">
    //                 Currency
    //               </p>
    //               <input
    //                 type="text"
    //                 placeholder="USD"
    //                 className=" focus:outline-none w-full h-[50px] border border-[#DFEAF2] rounded-[15px] text-[15px] placeholder-[#718EBF] pl-4 mb-6"
    //               />
    //             </div>
    //             <div className=" w-full">
    //               <p className=" text-[#232323] text-base leading-normal mb-2">
    //                 Time Zone
    //               </p>
    //               <input
    //                 type="text"
    //                 placeholder="(GMT-12:00) International Date Line West"
    //                 className=" focus:outline-none w-full h-[50px] border border-[#DFEAF2] rounded-[15px] text-[15px] placeholder-[#718EBF] pl-4 mb-6"
    //               />
    //             </div>
    //           </div>
    //           <div className=" w-full flex gap-6">
    //             <div className=" w-full">
    //               <p className=" text-[#333B69] text-[17px] font-medium leading-normal mb-2">
    //                 Controlls
    //               </p>
    //               <label className="inline-flex items-center cursor-pointer mt-4">
    //                 <input
    //                   type="checkbox"
    //                   value=""
    //                   className="sr-only peer"
    //                   readOnly
    //                 />
    //                 <div className="relative w-14 h-[30.71px] bg-gray-200 peer-focus:outline-none   rounded-full peer dark:bg-[#DFEAF2] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:start-[4px] after:bg-white   after:rounded-full after:h-6 after:w-6 after:transition-all  peer-checked:bg-[#16DBCC]"></div>
    //                 <span className="ms-3 text-base  text-[#232323] leading-normal">
    //                   Lorem ipsum dolor sit amet, consectetur adipiscing elit
    //                 </span>
    //               </label>
    //               <label className="inline-flex items-center cursor-pointer mt-4">
    //                 <input type="checkbox" value="" className="sr-only peer" />
    //                 <div className="relative w-14 h-[30.71px] bg-gray-200 peer-focus:outline-none   rounded-full peer dark:bg-[#DFEAF2] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:start-[4px] after:bg-white   after:rounded-full after:h-6 after:w-6 after:transition-all  peer-checked:bg-[#16DBCC]"></div>
    //                 <span className="ms-3 text-base  text-[#232323] leading-normal">
    //                   Delete User Detais
    //                 </span>
    //               </label>
    //               <label className="inline-flex items-center cursor-pointer mt-4">
    //                 <input
    //                   type="checkbox"
    //                   value=""
    //                   className="sr-only peer"
    //                   readOnly
    //                 />
    //                 <div className="relative w-14 h-[30.71px] bg-gray-200 peer-focus:outline-none   rounded-full peer dark:bg-[#DFEAF2] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:start-[4px] after:bg-white   after:rounded-full after:h-6 after:w-6 after:transition-all  peer-checked:bg-[#16DBCC]"></div>
    //                 <span className="ms-3 text-base  text-[#232323] leading-normal">
    //                   Lorem ipsum dolor sit amet, consectetur adipiscing elit
    //                 </span>
    //               </label>
    //             </div>
    //             <div className=" w-full"></div>
    //           </div>
    //           <div className=" w-full flex gap-6">
    //             <div className=" w-full"></div>
    //             <div className=" w-full flex justify-end">
    //               <button className=" w-[190px] h-[50px] bg-customBlue rounded-[15px] text-white text-lg leading-normal font-medium">
    //                 Save
    //               </button>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </>
    //   ),
    //   // End Tab content 2
    // },
    // {
    //   label: "Security",
    //   content: (
    //     <>
    //       {/* Tab content 3 */}
    //       <div className=" w-full flex gap-6">
    //         <div className=" w-full">
    //           <p className=" text-[#333B69] text-[17px] font-medium leading-normal mb-2">
    //             Controlls
    //           </p>
    //           <label className="inline-flex items-center cursor-pointer mt-4">
    //             <input
    //               type="checkbox"
    //               value=""
    //               className="sr-only peer"
    //               readOnly
    //             />
    //             <div className="relative w-14 h-[30.71px] bg-gray-200 peer-focus:outline-none   rounded-full peer dark:bg-[#DFEAF2] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:start-[4px] after:bg-white   after:rounded-full after:h-6 after:w-6 after:transition-all  peer-checked:bg-[#16DBCC]"></div>
    //             <span className="ms-3 text-base  text-[#232323] leading-normal">
    //               Lorem ipsum dolor sit amet, consectetur adipiscing elit
    //             </span>
    //           </label>
    //         </div>
    //         <div className=" w-full"></div>
    //       </div>
    //       <p className=" text-[#333B69] text-[17px] font-medium leading-normal mb-2 mt-4">
    //         Change Password
    //       </p>
    //       <div className=" w-full">
    //         <div className=" w-full flex gap-6">
    //           <div className=" w-full">
    //             <p className=" text-[#232323] text-base leading-normal mb-2">
    //               Current Password
    //             </p>
    //             <input
    //               type="password"
    //               placeholder="********"
    //               className=" focus:outline-none w-full h-[50px] border border-[#DFEAF2] rounded-[15px] text-[15px] placeholder-[#718EBF] pl-4 mb-6"
    //             />
    //           </div>
    //           <div className=" w-full"></div>
    //         </div>
    //         <div className=" w-full flex gap-6">
    //           <div className=" w-full">
    //             <p className=" text-[#232323] text-base leading-normal mb-2">
    //               New Password
    //             </p>
    //             <input
    //               type="password"
    //               placeholder="********"
    //               className=" focus:outline-none w-full h-[50px] border border-[#DFEAF2] rounded-[15px] text-[15px] placeholder-[#718EBF] pl-4 mb-6"
    //             />
    //           </div>
    //           <div className=" w-full"></div>
    //         </div>
    //       </div>

    //       {/* End Tab content 3 */}
    //     </>
    //   ),
    // },
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
                src="/images/dummy-image.jpg"
                alt="Orizon profile"
                width={50}
                height={50}
                className="rounded-full border-2 border-[#17C653]"
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
