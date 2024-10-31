"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { appCheck } from "../firebase-config";
import { getToken } from "firebase/app-check";
import { toast } from "react-toastify";
import { AuthContext } from "../AuthContext";
import AxiosProvider from "@provider/AxiosProvider";

export default function Home() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);
  const router = useRouter();

  const axiosProvider = new AxiosProvider();


  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d{0,1}$/.test(value)) {
      // Only allow digits
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to the next input
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "") {
      // Move focus to the previous input on backspace
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // -------------
    const userEmail = localStorage.getItem("email");
    const userPassword = localStorage.getItem("password");
    const userMobile = localStorage.getItem("mobileNumber");
    // ----------------
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP.");
     // setError("Please enter a valid 6-digit OTP.");
      return;
    }
    console.log('otp email',userEmail)
    console.log('otp pass',userPassword)
    console.log('otp mobile',userMobile)
    console.log('otp code',otpValue)
    //console.log(otpValue)
    try {
      // Getting App Check token
      const appCheckToken = await getToken(appCheck, true);
      console.log("App Check Token:", appCheckToken);
    
      const res = await axiosProvider.post(
        "/otplogin",
        { 
          email: userEmail,
          password: userPassword,
          mobile_number: userMobile,
          code: otpValue,
        },
        {
          headers: {
            "X-Firebase-AppCheck": appCheckToken.token,
          },
        }
      );
    
      // Check response status and handle accordingly
      if (res.status === 200) {  // Axios responses don't have `ok`, so we use `status` instead
        const data = res.data; // Axios already parses JSON data, so you can access it directly
        console.log('OTP verification response:', data); // Log the entire response
        const accessToken = data.data.token; // Access the token correctly
        console.log('Access Token:', accessToken);
        localStorage.setItem('accessToken', accessToken);
        router.push("/dashboard");
      } else {
        setError(res.data.message || "Invalid OTP");
      }
    } catch (error) {
      console.error("Network error:", error);
      toast.error("Invalid OTP");
      //setError("Network error, please try again.");
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
        <p className=" font-bold text-base leading-normal text-center text-black mb-14">
          Authenticate your Account
        </p>
        <p className=" text-[#232323] text-base leading-[26px] text-center mb-14">
          Please confirm your account by entering the authentication number sent
          to your authenticator app
        </p>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-[10px] justify-center mb-14 w-[90%] mx-auto">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
                className="w-[54px] h-14 py-4 px-5 border-b border-[#BDD1E0] text-black text-xl font-semibold leading-normal focus:outline-none focus:border-b-2 focus-within:border-[#0E6874]"
              />
            ))}
          </div>
          {error && <div style={{ color: "red" }}>{error}</div>}
          <div className=" w-full">
            <button
              type="submit"
              className=" bg-[#1814F3] border rounded-[15px] w-full h-[50px] text-center text-white text-lg font-medium leading-normal mb-3"
            >
              
              {loading ? 'OTP Verifying...' : 'Verify OTP'}
            </button>
            <div className=" flex gap-4">
              <p className=" text-[#424955] text-[15px] leading-normal">
                Haven&apos;t received the code?
              </p>
              <p className=" text-[#1814F3] text-[15px] font-semibold underline cursor-pointer">
                Resend a New Code
              </p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
