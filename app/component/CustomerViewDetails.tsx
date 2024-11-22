import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import { HiOutlineWallet } from "react-icons/hi2";
import Image from "next/image";

// Define the prop types
interface CustomerViewDetailsProps {
  isFlyoutOpen: boolean;
  toggleFlyout: () => void;
  setFlyoutOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomerViewDetails: React.FC<CustomerViewDetailsProps> = ({
  isFlyoutOpen,
  toggleFlyout,
  setFlyoutOpen,
}) => {
  return (
    <div>
      {isFlyoutOpen && (
        <>
          <div
            className="bg-[#1f1d1d80] fixed h-full w-full top-0 left-0  z-[1000]"
            onClick={() => {
              setFlyoutOpen(!isFlyoutOpen);
            }}
          ></div>
          <div className={`flyout ${isFlyoutOpen ? "open" : ""}`}>
            <div className=" w-full min-h-auto">
              {/* Flyout content here */}
              <div className=" flex justify-between mb-8">
                <p className=" text-[#333B69] text-[26px] font-bold leading-9">
                  User Details
                </p>
                <IoCloseOutline
                  onClick={toggleFlyout}
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
              <div className=" w-full">
                <div className=" w-full flex gap-4 mb-4">
                  <div className=" w-full">
                    <p className=" text-[#0A0A0A] font-medium text-base leading-6 mb-2">
                      First Name
                      <span className=" text-[#EB5757] text-base font-medium">
                        {" "}
                        *
                      </span>
                    </p>
                    <input
                      type="text"
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
                      placeholder="1 (800) 667-6389"
                      className=" focus:outline-none w-full  border border-[#DFEAF2] rounded-[12px] text-sm leading-4 font-medium placeholder-[#717171] py-4 px-4"
                    />
                  </div>
                  <div className=" w-full">
                    <p className=" text-[#0A0A0A] font-medium text-base leading-6 mb-2">
                      Birth Date
                      <span className=" text-[#EB5757] text-base font-medium">
                        {" "}
                        *
                      </span>
                    </p>
                    <input
                      type="date"
                      placeholder=""
                      className=" focus:outline-none w-full  border border-[#DFEAF2] rounded-[12px] text-sm leading-4 font-medium placeholder-[#717171] py-4 px-4"
                    />
                  </div>
                </div>

                <div className=" w-full flex gap-4 mb-4">
                  <div className=" w-full">
                    <p className=" text-[#0A0A0A] font-medium text-base leading-6 mb-2">
                      Email ID
                    </p>
                    <input
                      type="email"
                      placeholder="email@example.com"
                      className=" focus:outline-none w-full  border border-[#DFEAF2] rounded-[12px] text-sm leading-4 font-medium placeholder-[#717171] py-4 px-4"
                    />
                  </div>
                </div>

                <div className=" w-full  border border-[#DFEAF2] rounded-2xl mb-2 flex flex-col justify-center items-center p-7">
                  <p className=" text-left w-full text-[#0A0A0A] text-[26px] font-semibold leading-8 mb-4">
                    Profile Photo
                  </p>
                  <input type="file" name="file" className=" hidden" />
                  <div className=" cursor-pointer p-6  w-full h-40 rounded-3xl border-2 border-dashed border-[#7A8699] flex flex-col gap-2 justify-center items-center">
                    <Image
                      src="/images/uploadBtn.svg"
                      width={0}
                      height={0}
                      alt="Picture of the author"
                      className=" w-[150px] h-auto"
                    />
                    <p>Or Drop Files</p>
                  </div>
                </div>

                <div className=" w-full flex gap-4 mb-9">
                  <div className=" w-full">
                    <p className=" text-[#0A0A0A] font-medium text-base leading-6 mb-2">
                      Gender
                    </p>
                    <select
                      name="gender"
                      id="gender"
                      className=" focus:outline-none w-full  border border-[#DFEAF2] rounded-[12px] text-sm leading-4 font-medium placeholder-[#717171] py-4 px-4"
                    >
                      <option value="volvo">Male</option>
                      <option value="saab">Female</option>
                      <option value="mercedes">Other</option>
                    </select>
                  </div>
                </div>
                <p className=" text-[#333B69] text-[22px] leading-normal font-semibold">
                  Address Information
                </p>
                <div className=" w-full border-b border-[#E7E7E7] mb-4 mt-2"></div>

                <div className=" w-full flex gap-4 mb-4">
                  <div className=" w-full">
                    <p className=" text-[#0A0A0A] font-semibold text-base leading-6 mb-2">
                      Country of Birth
                    </p>
                    <input
                      type="text"
                      placeholder="USA"
                      className=" focus:outline-none w-full  border border-[#DFEAF2] rounded-[12px] text-sm leading-4 font-medium placeholder-[#717171] py-4 px-4"
                    />
                  </div>
                </div>

                <div className=" w-full flex gap-4 mb-4">
                  <div className=" w-full">
                    <p className=" text-[#0A0A0A] font-medium text-base leading-6 mb-2">
                      City of Birth
                    </p>
                    <select
                      name="city"
                      id="city"
                      className=" focus:outline-none w-full  border border-[#DFEAF2] rounded-[12px] text-sm leading-4 font-medium placeholder-[#717171] py-4 px-4"
                    >
                      <option value="volvo">New York City</option>
                      <option value="saab">Hannover</option>
                      <option value="mercedes">Sidney</option>
                    </select>
                  </div>
                </div>

                <div className=" w-full flex gap-4 mb-4">
                  <div className=" w-full">
                    <p className=" text-[#0A0A0A] font-medium text-base leading-6 mb-2">
                      Zip/Postal Code
                    </p>
                    <select
                      name="gender"
                      id="gender"
                      className=" focus:outline-none w-full  border border-[#DFEAF2] rounded-[12px] text-sm leading-4 font-medium placeholder-[#717171] py-4 px-4"
                    >
                      <option value="volvo">---None---</option>
                      <option value="saab">---None---</option>
                      <option value="mercedes">---None---</option>
                    </select>
                  </div>
                  <div className=" w-full">
                    <p className=" text-[#0A0A0A] font-medium text-base leading-6 mb-2">
                      State/Province
                    </p>
                    <select
                      name="gender"
                      id="gender"
                      className=" focus:outline-none w-full  border border-[#DFEAF2] rounded-[12px] text-sm leading-4 font-medium placeholder-[#717171] py-4 px-4"
                    >
                      <option value="volvo">---None---</option>
                      <option value="saab">---None---</option>
                      <option value="mercedes">---None---</option>
                    </select>
                  </div>
                </div>

                <div className=" w-full flex gap-4 mb-9">
                  <div className=" w-full">
                    <p className=" text-[#0A0A0A] font-medium text-base leading-6 mb-2">
                      Street
                    </p>
                    <select
                      name="gender"
                      id="gender"
                      className=" focus:outline-none w-full  border border-[#DFEAF2] rounded-[12px] text-sm leading-4 font-medium placeholder-[#717171] py-4 px-4"
                    >
                      <option value="volvo">
                        Broadway 10012, New York, NY, USA
                      </option>
                      <option value="saab">
                        Broadway 10012, New York, NY, USA
                      </option>
                      <option value="mercedes">
                        Broadway 10012, New York, NY, USA
                      </option>
                    </select>
                  </div>
                </div>

                <div className=" w-full flex gap-4 mb-4">
                  <div className=" w-full">
                    <p className=" text-[#0A0A0A] font-semibold text-base leading-6 mb-2">
                      Country of Residence
                    </p>
                    <input
                      type="text"
                      placeholder="USA"
                      className=" focus:outline-none w-full  border border-[#DFEAF2] rounded-[12px] text-sm leading-4 font-medium placeholder-[#717171] py-4 px-4"
                    />
                  </div>
                </div>

                <div className=" w-full flex gap-4 mb-4">
                  <div className=" w-full">
                    <p className=" text-[#0A0A0A] font-medium text-base leading-6 mb-2">
                      City of Birth
                    </p>
                    <select
                      name="city"
                      id="city"
                      className=" focus:outline-none w-full  border border-[#DFEAF2] rounded-[12px] text-sm leading-4 font-medium placeholder-[#717171] py-4 px-4"
                    >
                      <option value="volvo">New York City</option>
                      <option value="saab">Hannover</option>
                      <option value="mercedes">Sidney</option>
                    </select>
                  </div>
                </div>

                <div className=" w-full flex gap-4 mb-4">
                  <div className=" w-full">
                    <p className=" text-[#0A0A0A] font-medium text-base leading-6 mb-2">
                      Zip/Postal Code
                    </p>
                    <select
                      name="gender"
                      id="gender"
                      className=" focus:outline-none w-full  border border-[#DFEAF2] rounded-[12px] text-sm leading-4 font-medium placeholder-[#717171] py-4 px-4"
                    >
                      <option value="volvo">---None---</option>
                      <option value="saab">---None---</option>
                      <option value="mercedes">---None---</option>
                    </select>
                  </div>
                  <div className=" w-full">
                    <p className=" text-[#0A0A0A] font-medium text-base leading-6 mb-2">
                      State/Province
                    </p>
                    <select
                      name="gender"
                      id="gender"
                      className=" focus:outline-none w-full  border border-[#DFEAF2] rounded-[12px] text-sm leading-4 font-medium placeholder-[#717171] py-4 px-4"
                    >
                      <option value="volvo">---None---</option>
                      <option value="saab">---None---</option>
                      <option value="mercedes">---None---</option>
                    </select>
                  </div>
                </div>

                <div className=" w-full flex gap-4 mb-9">
                  <div className=" w-full">
                    <p className=" text-[#0A0A0A] font-medium text-base leading-6 mb-2">
                      Street
                    </p>
                    <select
                      name="gender"
                      id="gender"
                      className=" focus:outline-none w-full  border border-[#DFEAF2] rounded-[12px] text-sm leading-4 font-medium placeholder-[#717171] py-4 px-4"
                    >
                      <option value="volvo">
                        Broadway 10012, New York, NY, USA
                      </option>
                      <option value="saab">
                        Broadway 10012, New York, NY, USA
                      </option>
                      <option value="mercedes">
                        Broadway 10012, New York, NY, USA
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              {/* END FORM */}
              <div className=" w-full py-5 px-6 rounded-[16px] shadow-lastTransaction mb-9">
                <p className=" text-[#333B69] text-[26px] font-bold leading-9 mb-6">
                  Last Transactions
                </p>
                <div className=" p-3 rounded-2xl shadow-lastTransactionList flex justify-between items-center mb-3">
                  <div className=" flex gap-4 items-center">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="45"
                        height="46"
                        viewBox="0 0 45 46"
                        fill="none"
                      >
                        <rect
                          y="0.629883"
                          width="45"
                          height="45"
                          rx="15"
                          fill="#FFE0EB"
                        />
                        <path
                          d="M30.4933 29.2159C30.1909 29.9147 29.8328 30.5579 29.4181 31.1492C28.8526 31.9554 28.3897 32.5134 28.0329 32.8233C27.4798 33.3319 26.8873 33.5924 26.2527 33.6072C25.7972 33.6072 25.2478 33.4775 24.6083 33.2146C23.9667 32.9529 23.3771 32.8232 22.838 32.8232C22.2726 32.8232 21.6662 32.9529 21.0176 33.2146C20.368 33.4776 19.8446 33.6146 19.4445 33.6282C18.836 33.6541 18.2295 33.3862 17.6241 32.8232C17.2377 32.4862 16.7544 31.9085 16.1754 31.09C15.5541 30.2159 15.0434 29.2024 14.6433 28.0468C14.2148 26.7988 14 25.5901 14 24.4201C14 23.0797 14.2896 21.9237 14.8697 20.955C15.3256 20.1769 15.9322 19.563 16.6913 19.1125C17.4504 18.6618 18.2706 18.4322 19.1539 18.4175C19.6372 18.4175 20.271 18.567 21.0587 18.8609C21.8441 19.1557 22.3484 19.3052 22.5695 19.3052C22.7348 19.3052 23.295 19.1303 24.2447 18.7818C25.1429 18.4586 25.9009 18.3248 26.5218 18.3775C28.2045 18.5133 29.4687 19.1766 30.3094 20.3717C28.8045 21.2835 28.06 22.5606 28.0749 24.199C28.0885 25.4751 28.5514 26.537 29.4612 27.3802C29.8736 27.7716 30.3341 28.074 30.8464 28.2888C30.7353 28.611 30.618 28.9197 30.4933 29.216V29.2159ZM26.6342 14.03C26.6342 15.0302 26.2688 15.9641 25.5404 16.8286C24.6614 17.8562 23.5982 18.45 22.4453 18.3563C22.4299 18.2305 22.4221 18.104 22.4221 17.9773C22.4221 17.0171 22.8401 15.9894 23.5824 15.1492C23.953 14.7238 24.4244 14.3701 24.996 14.0879C25.5663 13.8099 26.1058 13.6562 26.6132 13.6299C26.628 13.7636 26.6342 13.8973 26.6342 14.03V14.03Z"
                          fill="#FF82AC"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className=" text-[#232323] text-xs font-medium leading-normal">
                        Apple Store
                      </p>
                      <p className=" text-[#718EBF] text-[11px] leading-normal">
                        Transaction Time 10:00AM,21-08-24
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className=" text-[#FE5C73] text-xs font-medium leading-normal text-right">
                      -30.96$
                    </p>
                    <p className=" py-[5.5px] px-2 bg-[#FFE0EB] rounded-[4px] text-[#FE5C73] text-[10px] font-medium leading-4">
                      Debited
                    </p>
                  </div>
                </div>
                <div className=" p-3 rounded-2xl shadow-lastTransactionList flex justify-between items-center mb-3">
                  <div className=" flex gap-4 items-center">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="45"
                        height="46"
                        viewBox="0 0 45 46"
                        fill="none"
                      >
                        <rect
                          y="0.629883"
                          width="45"
                          height="45"
                          rx="15"
                          fill="#E7EDFF"
                        />
                        <path
                          d="M32.6017 23.858C32.6026 23.1765 32.545 22.4963 32.4295 21.8247H22.9993V25.676H28.4005C28.29 26.2911 28.056 26.8774 27.7128 27.3997C27.3695 27.9219 26.9241 28.3693 26.4033 28.7148V31.2147H29.6268C31.5143 29.4745 32.6017 26.9009 32.6017 23.858Z"
                          fill="#4471FF"
                        />
                        <path
                          d="M22.9992 33.6298C25.6978 33.6298 27.9699 32.7437 29.6268 31.216L26.4033 28.7161C25.5061 29.3244 24.3506 29.6716 22.9992 29.6716C20.391 29.6716 18.1772 27.9133 17.3855 25.5439H14.0648V28.1202C14.8971 29.7764 16.1733 31.1687 17.751 32.1416C19.3287 33.1145 21.1457 33.6297 22.9992 33.6298Z"
                          fill="#4471FF"
                        />
                        <path
                          d="M17.3855 25.5441C16.967 24.3025 16.967 22.958 17.3855 21.7164V19.1401H14.0648C13.3646 20.5334 13 22.071 13 23.6303C13 25.1895 13.3646 26.7272 14.0648 28.1204L17.3855 25.5441Z"
                          fill="#4471FF"
                        />
                        <path
                          d="M22.9992 17.5887C24.4253 17.5654 25.8032 18.1042 26.8352 19.0887L29.6893 16.2346C27.8795 14.5348 25.482 13.6015 22.9992 13.6305C21.1457 13.6306 19.3287 14.1459 17.751 15.1188C16.1733 16.0917 14.8971 17.4839 14.0648 19.1401L17.3855 21.7164C18.1772 19.347 20.391 17.5887 22.9992 17.5887Z"
                          fill="#4471FF"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className=" text-[#232323] text-xs font-medium leading-normal">
                        Apple Store
                      </p>
                      <p className=" text-[#718EBF] text-[11px] leading-normal">
                        Transaction Time 10:00AM,21-08-24
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className=" text-[#18356D] text-xs font-medium leading-normal text-right">
                      $$
                    </p>
                    <p className=" py-[5.5px] px-2 bg-[#D1DFFB] rounded-[4px] text-[#143067] text-[10px] font-medium leading-4">
                      Processing
                    </p>
                  </div>
                </div>
                <div className=" p-3 rounded-2xl shadow-lastTransactionList flex justify-between items-center mb-3">
                  <div className=" flex gap-4 items-center">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="45"
                        height="46"
                        viewBox="0 0 45 46"
                        fill="none"
                      >
                        <rect
                          y="0.629883"
                          width="45"
                          height="45"
                          rx="15"
                          fill="#FFE0EB"
                        />
                        <path
                          d="M30.4933 29.2159C30.1909 29.9147 29.8328 30.5579 29.4181 31.1492C28.8526 31.9554 28.3897 32.5134 28.0329 32.8233C27.4798 33.3319 26.8873 33.5924 26.2527 33.6072C25.7972 33.6072 25.2478 33.4775 24.6083 33.2146C23.9667 32.9529 23.3771 32.8232 22.838 32.8232C22.2726 32.8232 21.6662 32.9529 21.0176 33.2146C20.368 33.4776 19.8446 33.6146 19.4445 33.6282C18.836 33.6541 18.2295 33.3862 17.6241 32.8232C17.2377 32.4862 16.7544 31.9085 16.1754 31.09C15.5541 30.2159 15.0434 29.2024 14.6433 28.0468C14.2148 26.7988 14 25.5901 14 24.4201C14 23.0797 14.2896 21.9237 14.8697 20.955C15.3256 20.1769 15.9322 19.563 16.6913 19.1125C17.4504 18.6618 18.2706 18.4322 19.1539 18.4175C19.6372 18.4175 20.271 18.567 21.0587 18.8609C21.8441 19.1557 22.3484 19.3052 22.5695 19.3052C22.7348 19.3052 23.295 19.1303 24.2447 18.7818C25.1429 18.4586 25.9009 18.3248 26.5218 18.3775C28.2045 18.5133 29.4687 19.1766 30.3094 20.3717C28.8045 21.2835 28.06 22.5606 28.0749 24.199C28.0885 25.4751 28.5514 26.537 29.4612 27.3802C29.8736 27.7716 30.3341 28.074 30.8464 28.2888C30.7353 28.611 30.618 28.9197 30.4933 29.216V29.2159ZM26.6342 14.03C26.6342 15.0302 26.2688 15.9641 25.5404 16.8286C24.6614 17.8562 23.5982 18.45 22.4453 18.3563C22.4299 18.2305 22.4221 18.104 22.4221 17.9773C22.4221 17.0171 22.8401 15.9894 23.5824 15.1492C23.953 14.7238 24.4244 14.3701 24.996 14.0879C25.5663 13.8099 26.1058 13.6562 26.6132 13.6299C26.628 13.7636 26.6342 13.8973 26.6342 14.03V14.03Z"
                          fill="#FF82AC"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className=" text-[#232323] text-xs font-medium leading-normal">
                        Apple Store
                      </p>
                      <p className=" text-[#718EBF] text-[11px] leading-normal">
                        Transaction Time 10:00AM,21-08-24
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className=" text-[#FE5C73] text-xs font-medium leading-normal">
                      -30.96$
                    </p>
                    <p className=" py-[5.5px] px-2 bg-[#FFE0EB] rounded-[4px] text-[#FE5C73] text-[10px] font-medium leading-4">
                      Debited
                    </p>
                  </div>
                </div>
                <div className=" p-3 rounded-2xl shadow-lastTransactionList flex justify-between items-center mb-3">
                  <div className=" flex gap-4 items-center">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="45"
                        height="46"
                        viewBox="0 0 45 46"
                        fill="none"
                      >
                        <rect
                          y="0.629883"
                          width="45"
                          height="45"
                          rx="15"
                          fill="#E7EDFF"
                        />
                        <path
                          d="M32.6017 23.858C32.6026 23.1765 32.545 22.4963 32.4295 21.8247H22.9993V25.676H28.4005C28.29 26.2911 28.056 26.8774 27.7128 27.3997C27.3695 27.9219 26.9241 28.3693 26.4033 28.7148V31.2147H29.6268C31.5143 29.4745 32.6017 26.9009 32.6017 23.858Z"
                          fill="#4471FF"
                        />
                        <path
                          d="M22.9992 33.6298C25.6978 33.6298 27.9699 32.7437 29.6268 31.216L26.4033 28.7161C25.5061 29.3244 24.3506 29.6716 22.9992 29.6716C20.391 29.6716 18.1772 27.9133 17.3855 25.5439H14.0648V28.1202C14.8971 29.7764 16.1733 31.1687 17.751 32.1416C19.3287 33.1145 21.1457 33.6297 22.9992 33.6298Z"
                          fill="#4471FF"
                        />
                        <path
                          d="M17.3855 25.5441C16.967 24.3025 16.967 22.958 17.3855 21.7164V19.1401H14.0648C13.3646 20.5334 13 22.071 13 23.6303C13 25.1895 13.3646 26.7272 14.0648 28.1204L17.3855 25.5441Z"
                          fill="#4471FF"
                        />
                        <path
                          d="M22.9992 17.5887C24.4253 17.5654 25.8032 18.1042 26.8352 19.0887L29.6893 16.2346C27.8795 14.5348 25.482 13.6015 22.9992 13.6305C21.1457 13.6306 19.3287 14.1459 17.751 15.1188C16.1733 16.0917 14.8971 17.4839 14.0648 19.1401L17.3855 21.7164C18.1772 19.347 20.391 17.5887 22.9992 17.5887Z"
                          fill="#4471FF"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className=" text-[#232323] text-xs font-medium leading-normal">
                        Apple Store
                      </p>
                      <p className=" text-[#718EBF] text-[11px] leading-normal">
                        Transaction Time 10:00AM,21-08-24
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className=" text-[#18356D] text-xs font-medium leading-normal text-right">
                      $$
                    </p>
                    <p className=" py-[5.5px] px-2 bg-[#D1DFFB] rounded-[4px] text-[#143067] text-[10px] font-medium leading-4">
                      Processing
                    </p>
                  </div>
                </div>
              </div>
              {/* CARD MANAGEMENT */}
              <div className=" p-4 rounded-[16px] shadow-lastTransaction">
                <p className=" text-[#333B69] text-[26px] font-bold leading-9 mb-8">
                  Card Management
                </p>
                <p className=" text-[#343C6A] text-base font-semibold leading-normal mb-2">
                  My Cards
                </p>
                {/* CARD */}
                <div className=" w-[80%] h-[190px] bg-cardBg rounded-2xl p-4 relative mb-8">
                  <div className=" flex justify-between items-center mb-5">
                    <div>
                      <p className=" text-white text-[11px] leading-normal">
                        Balance
                      </p>
                      <p className=" text-white text-base font-semibold leading-normal">
                        $5,756
                      </p>
                    </div>
                    <div>
                      <Image
                        src="/images/Chip_Card.svg"
                        width={0}
                        height={0}
                        alt="Picture of the author"
                        className=" w-[29px] h-auto"
                      />
                    </div>
                  </div>

                  <div className=" flex justify-between items-center w-[80%]">
                    <div>
                      <p className=" text-white opacity-70 text-[10px] leading-normal">
                        CARD HOLDER
                      </p>
                      <p className=" text-white text-[13px] font-semibold leading-normal">
                        Eddy Cusuma
                      </p>
                    </div>
                    <div>
                      <p className=" text-white opacity-70 text-[10px] leading-normal">
                        VALID THRU
                      </p>
                      <p className=" text-white text-[13px] font-semibold leading-normal">
                        12/22
                      </p>
                    </div>
                  </div>
                  <div className=" flex justify-between items-center bg-cardFooter absolute bottom-0 left-0 right-0 w-full h-[51px] mx-auto p-4">
                    <p className=" text-[15pox] font-semibold text-white">
                      3778 **** **** 1234
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="27"
                      height="20"
                      viewBox="0 0 27 20"
                      fill="none"
                    >
                      <circle
                        cx="9.20455"
                        cy="9.83443"
                        r="9.20455"
                        fill="white"
                        fillOpacity="0.5"
                      />
                      <circle
                        cx="17.7955"
                        cy="9.83443"
                        r="9.20455"
                        fill="white"
                        fillOpacity="0.5"
                      />
                    </svg>
                  </div>
                </div>
                {/* END  CARD */}
                <p className="text-[#333B69] text-base font-semibold leading-normal mb-2">
                  Card List
                </p>
                <div className=" p-[10px] h-[69px] rounded-[10px] shadow-lastTransaction flex justify-between items-center mb-3">
                  <div className=" flex items-center">
                    <div className="bg-[#E7EDFF] rounded-[12px] h-[45px] w-[45px] flex justify-center items-center mr-5">
                      <HiOutlineWallet className=" h-5 w-5 text-[#396AFF]" />
                    </div>
                    <div className=" mr-8">
                      <p className="text-[#232323] text-sm font-medium leading-normal">
                        Card Type
                      </p>
                      <p className="text-[#718EBF] text-xs leading-normal">
                        Secondary
                      </p>
                    </div>
                    <div>
                      <p className="text-[#232323] text-sm font-medium leading-normal">
                        Bank
                      </p>
                      <p className="text-[#718EBF] text-xs leading-normal">
                        DBL Bank
                      </p>
                    </div>
                  </div>

                  <div className="text-[#1814F3] text-[11px] font-medium leading-normal">
                    View Details
                  </div>
                </div>
                <div className=" p-[10px] h-[69px] rounded-[10px] shadow-lastTransaction flex justify-between items-center mb-3">
                  <div className=" flex items-center">
                    <div className="bg-[#FFE0EB] rounded-[12px] h-[45px] w-[45px] flex justify-center items-center mr-5">
                      <HiOutlineWallet className=" h-5 w-5 text-[#FF82AC]" />
                    </div>
                    <div className=" mr-8">
                      <p className="text-[#232323] text-sm font-medium leading-normal">
                        Card Type
                      </p>
                      <p className="text-[#718EBF] text-xs leading-normal">
                        Secondary
                      </p>
                    </div>
                    <div>
                      <p className="text-[#232323] text-sm font-medium leading-normal">
                        Bank
                      </p>
                      <p className="text-[#718EBF] text-xs leading-normal">
                        BRC Bank
                      </p>
                    </div>
                  </div>

                  <div className="text-[#1814F3] text-[11px] font-medium leading-normal">
                    View Details
                  </div>
                </div>
                <div className=" p-[10px] h-[69px] rounded-[10px] shadow-lastTransaction flex justify-between items-center mb-7">
                  <div className=" flex items-center">
                    <div className="bg-[#FFF5D9] rounded-[12px] h-[45px] w-[45px] flex justify-center items-center mr-5">
                      <HiOutlineWallet className=" h-5 w-5 text-[#FFBB38]" />
                    </div>
                    <div className=" mr-8">
                      <p className="text-[#232323] text-sm font-medium leading-normal">
                        Card Type
                      </p>
                      <p className="text-[#718EBF] text-xs leading-normal">
                        Secondary
                      </p>
                    </div>
                    <div>
                      <p className="text-[#232323] text-sm font-medium leading-normal">
                        Bank
                      </p>
                      <p className="text-[#718EBF] text-xs leading-normal">
                        ABM Bank
                      </p>
                    </div>
                  </div>

                  <div className="text-[#1814F3] text-[11px] font-medium leading-normal">
                    View Details
                  </div>
                </div>
                <p className="text-[#333B69] text-base font-semibold leading-normal mb-2">
                  Card Setting
                </p>
                <div className=" p-[15px]  rounded-[10px] shadow-lastTransaction  mb-3">
                  <div className=" w-full flex gap-2 justify-between items-center mb-4">
                    <div className=" flex items-center">
                      <div className=" bg-[#FFF5D9] rounded-xl w-[45px] h-[45px] flex items-center justify-center mr-2">
                        <HiOutlineWallet className=" h-5 w-5 text-[#FFBB38]" />
                      </div>
                      <div>
                        <p className=" text-[#232323] text-sm font-medium leading-normal">
                          Block Card
                        </p>
                        <p className=" text-[#718EBF] text-xs leading-normal">
                          Instantly block your card
                        </p>
                      </div>
                    </div>
                    <div className=" flex items-center">
                      <div className=" bg-[#E7EDFF] rounded-xl w-[45px] h-[45px] flex items-center justify-center mr-2">
                        <HiOutlineWallet className=" h-5 w-5 text-[#396AFF]" />
                      </div>
                      <div>
                        <p className=" text-[#232323] text-sm font-medium leading-normal">
                          Change Pic Code
                        </p>
                        <p className=" text-[#718EBF] text-xs leading-normal">
                          Withdraw without any card
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className=" w-full flex gap-2 justify-between items-center">
                    <div className=" flex items-center">
                      <div className=" bg-[#FFE0EB] rounded-xl w-[45px] h-[45px] flex items-center justify-center mr-2">
                        <HiOutlineWallet className=" h-5 w-5 text-[#FF82AC]" />
                      </div>
                      <div>
                        <p className=" text-[#232323] text-sm font-medium leading-normal">
                          Add to Google Pay
                        </p>
                        <p className=" text-[#718EBF] text-xs leading-normal">
                          Withdraw without any card
                        </p>
                      </div>
                    </div>
                    <div className=" flex items-center">
                      <div className=" bg-[#DCFAF8] rounded-xl w-[45px] h-[45px] flex items-center justify-center mr-2">
                        <HiOutlineWallet className=" h-5 w-5 text-[#16DBCC]" />
                      </div>
                      <div>
                        <p className=" text-[#232323] text-sm font-medium leading-normal">
                          Add to Apple Pay
                        </p>
                        <p className=" text-[#718EBF] text-xs leading-normal">
                          Withdraw without any card
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* END CARD MANAGEMENT */}
              <div className="mt-10 w-full flex justify-end items-center gap-5">
                <button className=" py-[13px] px-[26px] border border-[#E7E7E7] rounded-2xl text-[#0A0A0A] text-base font-medium leading-6">
                  Cancel
                </button>
                <button className=" py-[13px] px-[26px] bg-customBlue rounded-2xl text-base font-medium leading-6 text-white ">
                  Update Details
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CustomerViewDetails;
