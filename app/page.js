"use client";
import Image from "next/image";
import { appCheck } from "./firebase-config";
import { getToken } from "firebase/app-check";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "./AuthContext";
import AxiosProvider from "@provider/AxiosProvider";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import StorageManager from "../provider/StorageManager";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // Instantiate StorageManager
  const storage = new StorageManager();
  const axiosProvider = new AxiosProvider();
  const { saveAuthData } = useContext(AuthContext);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email or User ID is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const appCheckToken = await getToken(appCheck, true);
      console.log(appCheckToken);
      if (!appCheckToken) {
        console.error("Failed to retrieve App Check token");
        return;
      }

      const res = await axiosProvider.post(
        "/login",
        { email: values.email, password: values.password },
        {
          headers: {
            "X-Firebase-AppCheck": appCheckToken.token,
          },
        }
      );

      if (res.status !== 200) {
        console.error("Login failed", res.status, res.data);
        throw new Error(`Error: ${res.status} - ${res.data.message}`);
      }

      saveAuthData(values.email);
      await storage.saveUserEmail(values.email);
      await storage.saveUserMobile(res.data.data.mobile_number);
      router.push("/otp");
    } catch (error) {
      console.log(error);
      // Show toast for wrong credentials
      toast.error("Username or password is incorrect. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className=" bg-[#F5F5F5]">
        <Image
          src="/images/orizon-login-bg.svg"
          alt="Orizon iconLogo bg"
          width={100}
          height={100}
          className="w-full h-[100vh]"
        />
        <Image
          src="/images/orizonIcon.svg"
          alt="OrizonIcon"
          width={82}
          height={52}
          className=" absolute top-20 left-28"
        />
        <Image
          src="/images/orizonIcon.svg"
          alt="OrizonIcon"
          width={82}
          height={52}
          className=" absolute top-32 right-28"
        />
        <Image
          src="/images/orizonIcon.svg"
          alt="OrizonIcon"
          width={82}
          height={52}
          className=" absolute  top-1/2 left-[25%]"
        />
        <Image
          src="/images/orizonIcon.svg"
          alt="OrizonIcon"
          width={82}
          height={52}
          className=" absolute  top-[60%] right-[25%]"
        />
        <Image
          src="/images/orizonIcon.svg"
          alt="OrizonIcon"
          width={82}
          height={52}
          className=" absolute  top-[90%] right-0 left-0 mx-auto"
        />
      </div>
      <div className=" absolute top-0 bottom-0 left-0 right-0 mx-auto my-auto  w-[500px] h-[587px] shadow-loginBoxShadow bg-white px-12 py-16">
        <Image
          src="/images/loginicon.svg"
          alt="OrizonIcon"
          width={82}
          height={52}
          className=" mx-auto mb-5"
        />
        <p className=" font-bold text-base leading-normal text-center text-black mb-6">
          Login to Orizon
        </p>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="w-full">
              <div className="w-full">
                <p className="text-[#232323] text-base leading-normal mb-2">
                  Email or Userid
                </p>
                <div className="relative">
                  <Field
                    type="text"
                    name="email"
                    autoComplete="username"
                    placeholder="Enter your User ID/Email"
                    className="focus:outline-none w-full h-[50px] border border-[#DFEAF2] rounded-[15px] text-[15px] placeholder-[#718EBF] pl-4 mb-7 text-[#718EBF]"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mb-2 absolute top-14"
                  />
                </div>
                <p className="text-[#232323] text-base leading-normal mb-2">
                  Password
                </p>
                <div className="relative">
                  <Field
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="focus:outline-none w-full h-[50px] border border-[#DFEAF2] rounded-[15px] text-[15px] placeholder-[#718EBF] pl-4 mb-8 text-[#718EBF]"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mb-2 absolute top-14"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#1814F3] border rounded-[15px] w-full h-[50px] text-center text-white text-lg font-medium leading-normal mb-3"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>

                <div className="flex gap-4">
                  <p className="text-[#424955] text-[15px] leading-normal">
                    Forgot User ID or Password?
                  </p>
                  <p className="text-[#1814F3] text-[15px] font-semibold underline cursor-pointer">
                    Reset Now
                  </p>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
