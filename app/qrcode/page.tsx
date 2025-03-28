"use client";
import Image from "next/image";
import { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import AxiosProvider from "../../provider/AxiosProvider";
import StorageManager from "../../provider/StorageManager";
import { useContext } from "react";
import { AppContext } from "../AppContext";
import UserActivityLogger from "../../provider/UserActivityLogger";

const axiosProvider = new AxiosProvider();

export default function OtpHome() {
  const storage = new StorageManager();
  const router = useRouter();
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [qrCode, setQrCode] = useState<string | undefined>();
  const [secretKey, setSecretKey] = useState<string | null>(
    storage.getDecryptedUserSecretKey()
  );
  const [userId, setuserId] = useState<string | undefined>(storage.getUserId());

  const { setAccessToken } = useContext(AppContext);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;

    if (/^\d?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Move to the next input if a digit is entered
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && code[index] === "") {
      moveFocusBack(index);
    }
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>, index: number) => {
    const input = e.currentTarget;

    // Detect backspace manually for mobile when input gets cleared
    if (!input.value) {
      moveFocusBack(index);
    }
  };

  const moveFocusBack = (index: number) => {
    if (index > 0) {
      const newCode = [...code];
      newCode[index - 1] = ""; // Clear previous input
      setCode(newCode);

      const prevInput = inputRefs.current[index - 1];
      if (prevInput) {
        prevInput.focus();

        // ✅ Force cursor to the right (end of input)
        requestAnimationFrame(() => {
          prevInput.setSelectionRange(1, 1);
        });
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim();

    if (/^\d+$/.test(pasteData)) {
      const pastedNumbers = pasteData.slice(0, 6).split("");
      const newCode = [...code];

      pastedNumbers.forEach((num, i) => {
        if (i < 6) newCode[i] = num;
      });

      setCode(newCode);

      // Move focus to the last filled input
      const lastIndex = pastedNumbers.length < 6 ? pastedNumbers.length : 5;
      inputRefs.current[lastIndex]?.focus();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // console.log("Secret key:", secretKey);
  }, [secretKey]);

  const fetchData = async () => {
    try {
      if (!secretKey) {
        // Getting App Check token
        // const appCheckToken = await getToken(appCheck, true);
        const res = await axiosProvider.post("/generateqrcode", {});
        if (res.status === 200) {
          setQrCode(res.data.data.qrCodeDataURL);

          setSecretKey(res.data.data.secret);
          storage.saveUserSecretKey(res.data.data.secret);
        }
      }
    } catch (error) {
      console.error("Network error:", error);
      toast.error("Invalid TOTP");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const codeValue = code.join("");
    if (codeValue.length !== 6) {
      toast.error("Please enter a valid 6-digit code.");
      setLoading(false);
      return;
    }

    try {
      // First API call - Verify TOTP
      const res = await axiosProvider.post("/verifytotp", {
        token: codeValue,
        secretKey: secretKey,
        userId: userId,
      });

      // Store token and navigate
      setAccessToken(res.data.data.token);
      storage.saveAccessToken(res.data.data.token);
      const userID = storage.getUserId();
      router.push("/dashboard");

      // Create instance and log activity
      const activityLogger = new UserActivityLogger();
      await activityLogger.userLogin();
    } catch (error) {
      console.error("Network error:", error);
      toast.error("Invalid Code. Please try again.");
      setCode(new Array(6).fill(""));
    } finally {
      setLoading(false);
    }
  };
  // Focus on the first input when the component is loaded
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []); // Empty dependency array ensures it runs only once when the component is mounted
  return (
    <>
      <div className="bg-[#F5F5F5] hidden md:block">
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

      <div className="absolute top-0 bottom-0 left-0 right-0 mx-auto my-auto w-[90%] max-w-[500px] h-[587px] shadow-loginBoxShadow bg-white px-6 sm:px-12 py-10 sm:py-16 rounded-lg">
        <Image
          src="/images/orizonIcon.svg"
          alt="OrizonIcon"
          width={82}
          height={52}
          className="mx-auto mb-5"
        />
        <p className="font-bold text-lg sm:text-base leading-normal text-center text-black mb-2">
          Authenticate your Account
        </p>
        {qrCode && (
          <Image
            src={qrCode}
            alt="QR Code"
            width={100}
            height={100}
            className="mx-auto"
          />
        )}
        <p className="text-[#232323] text-base leading-[26px] text-center mb-10 sm:mb-14">
          Please confirm your account by entering the authentication number sent
          to your authenticator app
        </p>
        <form onSubmit={handleSubmit} className="w-full">
          <div>
            <div className="flex items-center justify-between mb-10 sm:mb-14 w-[96%] mx-auto">
              {code.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  pattern="\d*"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onInput={(e) => handleInput(e, index)} // Ensures backspace works on mobile
                  onPaste={handlePaste}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  className="w-[14%] sm:w-[14%] h-12 sm:h-14 py-3 sm:py-4 text-center sm:px-5 border-b border-[#BDD1E0] text-black text-lg sm:text-xl font-semibold leading-normal focus:outline-none focus:border-b-2 focus-within:border-primary-500"
                />
              ))}
            </div>
            <div className="w-full">
              <button
                type="submit"
                className="bg-primary-600 border rounded-[4px] w-full h-[50px] text-center text-white text-lg font-medium leading-normal mb-3 hover:bg-primary-500 active:bg-primary-700"
                disabled={loading}
              >
                {loading ? "Code Verifying..." : "Verify Code"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
