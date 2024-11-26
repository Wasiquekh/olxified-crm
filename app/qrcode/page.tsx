"use client";
import Image from "next/image";
import { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { appCheck } from "../firebase-config";
import { getToken } from "firebase/app-check";
import { toast } from "react-toastify";
import AxiosProvider from "../../provider/AxiosProvider";
import StorageManager from "../../provider/StorageManager";
import { useContext } from "react";
import { AppContext } from "../AppContext";

const axiosProvider = new AxiosProvider();


export default function OtpHome() {
  const storage = new StorageManager();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const [code, setCode] = useState<string[]>(new Array(6).fill(""));
  const [loading, setLoading] = useState<boolean>(false);
  const [qrCode, setQrCode] = useState<string | undefined>();
  const [secretKey, setSecretKey] = useState<string | null>(
    storage.getDecryptedUserSecretKey()
  );
  const [userId, setuserId] = useState<string | undefined>(
    storage.getUserId()
  );

  const { setAccessToken } = useContext(AppContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/^\d{0,1}$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Move focus to the next input
      if (value && index < 5 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && code[index] === "") {
      // Move focus to the previous input on backspace
      if (index > 0 && inputRefs.current[index - 1]) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log("Secret key:", secretKey);
  }, [secretKey]);

  const fetchData = async () => {
    try {
      if (!secretKey) {
        // Getting App Check token
        const appCheckToken = await getToken(appCheck, true);
        const res = await axiosProvider.post(
          "/generateqrcode",
          {},
          {
            headers: {
              "X-Firebase-AppCheck": appCheckToken.token,
            },
          }
        );
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
      const appCheckToken = await getToken(appCheck, true);
      const res = await axiosProvider.post(
        "/verifytotp",
        {
          token: codeValue,
          secretKey: secretKey,
          userId:userId,
        },
        {
          headers: {
            "X-Firebase-AppCheck": appCheckToken.token,
          }
        }
      );
      setAccessToken(res.data.data.token);
      storage.saveAccessToken(res.data.data.token);
      router.push("/customer");
    } catch (error) {
      console.error("Network error:", error);
      toast.error("Invalid Code. Please try again.");
      setCode(new Array(6).fill(""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-[#F5F5F5]">
        <Image
          src="/images/orizon-login-bg.svg"
          alt="Orizon iconLogo bg"
          width={100}
          height={100}
          className="w-full h-[100vh]"
        />
        {/* Other images */}
      </div>
      <div className="absolute top-0 bottom-0 left-0 right-0 mx-auto my-auto w-[500px] h-[587px] shadow-loginBoxShadow bg-white px-12 py-16">
        <Image
          src="/images/loginicon.svg"
          alt="OrizonIcon"
          width={82}
          height={52}
          className="mx-auto mb-5"
        />
        <p className="font-bold text-base leading-normal text-center text-black mb-2">
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
        <p className="text-[#232323] text-base leading-[26px] text-center mb-14">
          Please confirm your account by entering the authentication number sent
          to your authenticator app
        </p>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-[10px] justify-center mb-14 w-[90%] mx-auto">
            {code.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => {
                  inputRefs.current[index] = el; // Assign the element to the ref array
                }}                
                className="w-[54px] h-14 py-4 px-5 border-b border-[#BDD1E0] text-black text-xl font-semibold leading-normal focus:outline-none focus:border-b-2 focus-within:border-[#0E6874]"
              />
            ))}
          </div>
          <div className="w-full">
            <button
              type="submit"
              className="bg-[#1814F3] border rounded-[15px] w-full h-[50px] text-center text-white text-lg font-medium leading-normal mb-3"
              disabled={loading}
            >
              {loading ? "Code Verifying..." : "Verify Code"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
