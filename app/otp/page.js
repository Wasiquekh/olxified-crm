import Image from "next/image";
import Link from "next/link";

export default function Home() {
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
        Please confirm your account by entering the authentication number sent to your authenticator app</p>
        <div className="flex gap-[10px] justify-between mb-14 w-[90%] mx-auto">
            <p className="py-4 px-5 border-b border-[#BDD1E0] text-black text-xl font-semibold leading-normal">1</p>
            <p className="py-4 px-5 border-b border-[#BDD1E0] text-black text-xl font-semibold leading-normal">2</p>
            <p className="py-4 px-5 border-b border-[#BDD1E0] text-black text-xl font-semibold leading-normal">3</p>
            <p className="py-4 px-5 border-b border-[#BDD1E0] text-black text-xl font-semibold leading-normal">4</p>
            <p className="py-4 px-5 border-b border-[#BDD1E0] text-black text-xl font-semibold leading-normal">5</p>
            <p className="py-4 px-5 border-b border-[#BDD1E0] text-black text-xl font-semibold leading-normal">6</p>
        </div>
        <div className=" w-full">
        <Link href="/dashboard">
            <button
            className=" bg-[#1814F3] border rounded-[15px] w-full h-[50px] text-center text-white text-lg font-medium leading-normal mb-3"
            >
              Login
            </button>
            </Link>
            <div className=" flex gap-4"> 
              <p className=" text-[#424955] text-[15px] leading-normal">Haven&apos;t received the code?</p> 
              <p className=" text-[#1814F3] text-[15px] font-semibold underline cursor-pointer">Resend a New Code</p>
            </div>
          
        </div>
      </div>
    </>
  );
}
