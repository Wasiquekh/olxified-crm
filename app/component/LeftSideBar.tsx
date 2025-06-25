"use client";
import Link from "next/link";
import Image from "next/image";
import { BiSolidHome } from "react-icons/bi";
import { MdOutlineBarChart } from "react-icons/md";
import { TbDeviceMobileDollar } from "react-icons/tb";
import { HiWrenchScrewdriver } from "react-icons/hi2";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { BsCreditCard2Back } from "react-icons/bs";
import { BiSolidUser } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { usePathname } from "next/navigation";
import StorageManager from "../../provider/StorageManager";
import AxiosProvider from "../../provider/AxiosProvider";
import { useRouter } from "next/navigation";
import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import { AiOutlineDashboard } from "react-icons/ai";
import { RiHistoryLine } from "react-icons/ri";
import { FaUserEdit } from "react-icons/fa";

const axiosProvider = new AxiosProvider();
const storage = new StorageManager();
const LeftSideBar: React.FC = () => {
  const pathname = usePathname();
  const permissions = storage.getUserPermissions();
  const hasCustomerView = permissions?.some(
    (perm) => perm.name === "customer.view"
  );
  const hasCustomerAdd = permissions?.some(
    (perm) => perm.name === "customer.add"
  );
  const hasCustomerDelete = permissions?.some(
    (perm) => perm.name === "customer.delete"
  );
  const hasCustomerEdit = permissions?.some(
    (perm) => perm.name === "customer.edit"
  );
  const hasCustomerAudit = permissions?.some(
    (perm) => perm.name === "customer.audit"
  );
  const hasSystemUserView = permissions?.some(
    (perm) => perm.name === "systemuser.view"
  );
  const hasSystemUserAdd = permissions?.some(
    (perm) => perm.name === "systemuser.add"
  );
  const hasSystemUserDelete = permissions?.some(
    (perm) => perm.name === "systemuser.delete"
  );
  const hasSystemUserEdit = permissions?.some(
    (perm) => perm.name === "systemuser.edit"
  );
  const hasSystemUserAudit = permissions?.some(
    (perm) => perm.name === "systemuser.audit"
  );
  const hasUserActivityView = permissions?.some(
    (perm) => perm.name === "useractivity.view"
  );
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await axiosProvider.post("/logout", {});
      router.push("/");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const [isSubmenuOpen, setIsSubmenuOpen] = useState<boolean>(false);

  const toggleSubmenu = (): void => {
    setIsSubmenuOpen((prev) => !prev);
  };
  return (
    <div className="w-full hidden md:w-[17%]  md:flex flex-col justify-between py-4 px-1 border-r-2 border-customBorder shadow-borderShadow mt-0  h-screen fixed top-0 left-0">
      {/* SIDE LEFT BAR TOP SECTION */}
      <div className="z-10 overflow-y-auto">
        <Link href="/customer">
          <div className=" flex gap-2 mb-12 px-3 py-2">
            <Image
              src="/images/orizonIcon.svg"
              alt="Description of image"
              width={0}
              height={0}
              className=" w-11 h-auto"
            />
            <p className=" text-[25px] leading-normal font-bold uppercase text-primary-600">
              Orizon
            </p>
          </div>
        </Link>
        {/* MENU WITH ICONS */}
        <Link href="/dashboard">
          {pathname === "/dashboard" ? (
            <div className=" mb-4 flex gap-4 items-center group bg-primary-600 px-3 py-2 rounded-[4px]">
              <BiSolidHome className=" w-6 h-6 text-white group-hover:text-white" />
              <p className=" text-white text-base leading-normal font-medium group-hover:text-white">
                Dashboard
              </p>
            </div>
          ) : (
            <div className=" mb-4 flex gap-4 items-center group px-3 py-2 hover:bg-sideBarHoverbg active:bg-sideBarHoverbgPressed rounded-[4px]">
              <BiSolidHome className=" w-6 h-6 text-firstBlack group-hover:text-primary-600" />
              <p className=" text-firstBlack text-base leading-normal font-medium group-hover:text-primary-600">
                Dashboard
              </p>
            </div>
          )}
        </Link>
        {hasCustomerView && (
          <Link href="/customer">
            {pathname === "/customer" || pathname === "/customerdetails" ? (
              <div className=" mb-4 flex gap-4 items-center group bg-primary-600 px-3 py-2 rounded-[4px] ">
                <MdOutlineBarChart className=" w-6 h-6 text-white group-hover:text-white " />
                <p className=" text-white text-base leading-normal font-medium group-hover:text-white">
                  Customers
                </p>
              </div>
            ) : (
              <div className=" mb-4 flex gap-4 items-center group px-3 py-2 hover:bg-sideBarHoverbg active:bg-sideBarHoverbgPressed rounded-[4px] ">
                <MdOutlineBarChart className=" w-6 h-6 text-firstBlack group-hover:text-primary-600 " />
                <p className=" text-firstBlack text-base leading-normal font-medium group-hover:text-primary-600">
                  Customers
                </p>
              </div>
            )}
          </Link>
        )}
        {hasCustomerView && (
          <div>
            {pathname === "/crm/total-quotes" ||
            pathname === "/crm/total-contacts" ||
            pathname === "/crm/total-accounts" ||
            pathname === "/crm/total-leads" ||
            pathname === "/crm/get-product" ? (
              <>
                <div
                  onClick={toggleSubmenu}
                  className=" mb-4 flex gap-4 items-center group bg-primary-600 px-3 py-2 rounded-[4px] relative cursor-pointer"
                >
                  <AiOutlineDashboard className=" w-6 h-6 text-white group-hover:text-white " />
                  <p className=" text-white text-base leading-normal font-medium group-hover:text-white">
                    CRM
                  </p>
                  <FaChevronDown className="absolute right-3 top-1/2  -translate-y-1/2 text-white" />
                </div>
                {/* Submenu */}
                {isSubmenuOpen && (
                  <div className="ml-14 mb-4  text-base leading-7 font-normal">
                    <Link href="/crm/total-accounts">
                      <p>Total Accounts</p>
                    </Link>
                    <Link href="/crm/total-quotes">
                      <p>Total Quotes</p>
                    </Link>
                    <Link href="/crm/total-contacts">
                      <p>Total Contacts</p>
                    </Link>
                    <Link href="/crm/total-leads">
                      <p>Total Leads</p>
                    </Link>
                    <Link href="/crm/get-product">
                      <p>Get Product</p>
                    </Link>
                  </div>
                )}
              </>
            ) : (
              <>
                <div
                  onClick={toggleSubmenu}
                  className=" mb-4 flex gap-4 items-center group px-3 py-2 hover:bg-sideBarHoverbg active:bg-sideBarHoverbgPressed rounded-[4px] relative cursor-pointer "
                >
                  <AiOutlineDashboard className=" w-6 h-6 text-firstBlack group-hover:text-primary-600 " />
                  <p className=" text-firstBlack text-base leading-normal font-medium group-hover:text-primary-600 cursor-pointer">
                    CRM
                  </p>
                  <FaChevronDown className="absolute right-3 top-1/2  -translate-y-1/2 text-black" />
                </div>
                {/* Submenu */}
                {isSubmenuOpen && (
                  <div className="ml-14 mb-4  text-base leading-7 font-normal">
                    <Link href="/crm/total-accounts">
                      <p>Total Accounts</p>
                    </Link>
                    <Link href="/crm/total-quotes">
                      <p>Total Quotes</p>
                    </Link>
                    <Link href="/crm/total-contacts">
                      <p>Total Contacts</p>
                    </Link>
                    <Link href="/crm/total-leads">
                      <p>Total Leads</p>
                    </Link>
                    <Link href="/crm/get-product">
                      <p>Get Product</p>
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        )}
        <Link href="/transaction">
          {pathname === "/transaction" ? (
            <div className=" mb-4 flex gap-4 items-center group bg-primary-600 px-3 py-2 rounded-[4px]">
              <TbDeviceMobileDollar className=" w-6 h-6 text-white group-hover:text-white" />
              <p className=" text-white text-base leading-normal font-medium group-hover:text-white">
                Transaction
              </p>
            </div>
          ) : (
            <div className=" mb-4 flex gap-4 items-center group px-3 py-2 hover:bg-sideBarHoverbg active:bg-sideBarHoverbgPressed rounded-[4px]">
              <TbDeviceMobileDollar className=" w-6 h-6 text-firstBlack group-hover:text-primary-600" />
              <p className=" text-firstBlack text-base leading-normal font-medium group-hover:text-primary-600">
                Transaction
              </p>
            </div>
          )}
        </Link>
        <Link href="/point-of-services">
          {pathname === "/point-of-services" ? (
            <div className=" mb-4 flex gap-4 items-center group bg-primary-600 px-3 py-2 rounded-[4px]">
              <HiWrenchScrewdriver className=" w-6 h-6 text-white group-hover:text-white" />
              <p className=" text-white text-base leading-normal font-medium group-hover:text-white">
                Point of Services
              </p>
            </div>
          ) : (
            <div className=" mb-4 flex gap-4 items-center group px-3 py-2 hover:bg-sideBarHoverbg active:bg-sideBarHoverbgPressed rounded-[4px]">
              <HiWrenchScrewdriver className=" w-6 h-6 text-firstBlack group-hover:text-primary-600" />
              <p className=" text-firstBlack text-base leading-normal font-medium group-hover:text-primary-600">
                Point of Services
              </p>
            </div>
          )}
        </Link>
        <Link href="/payment-terminal">
          {pathname === "/payment-terminal" ? (
            <div className=" mb-4 flex gap-4 items-center group bg-primary-600 px-3 py-2 rounded-[4px]">
              <FaMoneyCheckDollar className=" w-6 h-6 text-white group-hover:text-white" />
              <p className=" text-white text-base leading-normal font-medium group-hover:text-white">
                Payment Terminal
              </p>
            </div>
          ) : (
            <div className=" mb-4 flex gap-4 items-center group px-3 py-2 hover:bg-sideBarHoverbg active:bg-sideBarHoverbgPressed rounded-[4px]">
              <FaMoneyCheckDollar className=" w-6 h-6 text-firstBlack group-hover:text-primary-600" />
              <p className=" text-firstBlack text-base leading-normal font-medium group-hover:text-primary-600">
                Payment Terminal
              </p>
            </div>
          )}
        </Link>
        <Link href="/cards">
          {pathname === "/cards" ? (
            <div className=" mb-4 flex gap-4 items-center group bg-primary-600 px-3 py-2 rounded-[4px]">
              <BsCreditCard2Back className=" w-6 h-6 text-white group-hover:text-white" />
              <p className=" text-white text-base leading-normal font-medium group-hover:text-white">
                Credit Cards
              </p>
            </div>
          ) : (
            <div className=" mb-4 flex gap-4 items-center group px-3 py-2 hover:bg-sideBarHoverbg active:bg-sideBarHoverbgPressed rounded-[4px]">
              <BsCreditCard2Back className=" w-6 h-6 text-firstBlack group-hover:text-primary-600" />
              <p className=" text-firstBlack text-base leading-normal font-medium group-hover:text-primary-600">
                Credit Cards
              </p>
            </div>
          )}
        </Link>
        {hasSystemUserView && (
          <Link href="/usermanagement">
            {pathname === "/usermanagement" || pathname === "/useradd" ? (
              <div className=" mb-4 flex gap-4 items-center group bg-primary-600 px-3 py-2 rounded-[4px]">
                <FaUserEdit className=" w-6 h-6 text-white group-hover:text-white" />
                <p className=" text-white text-base leading-normal font-medium group-hover:text-white">
                  User Management
                </p>
              </div>
            ) : (
              <div className=" mb-4 flex gap-4 items-center group px-3 py-2 hover:bg-sideBarHoverbg active:bg-sideBarHoverbgPressed rounded-[4px]">
                <FaUserEdit className=" w-6 h-6 text-firstBlack group-hover:text-primary-600" />
                <p className=" text-firstBlack text-base leading-normal font-medium group-hover:text-primary-600">
                  User Management
                </p>
              </div>
            )}
          </Link>
        )}
        {hasUserActivityView && (
          <Link href="/user-activity">
            {pathname === "/user-activity" ? (
              <div className=" mb-4 flex gap-4 items-center group bg-primary-600 px-3 py-2 rounded-[4px]">
                <RiHistoryLine className=" w-6 h-6 text-white group-hover:text-white" />
                <p className=" text-white text-base leading-normal font-medium group-hover:text-white">
                  User Activity
                </p>
              </div>
            ) : (
              <div className=" mb-4 flex gap-4 items-center group px-3 py-2 hover:bg-sideBarHoverbg active:bg-sideBarHoverbgPressed rounded-[4px]">
                <RiHistoryLine className=" w-6 h-6 text-firstBlack group-hover:text-primary-600" />
                <p className=" text-firstBlack text-base leading-normal font-medium group-hover:text-primary-600">
                  User Activity
                </p>
              </div>
            )}
          </Link>
        )}
        <Link href="/setting">
          {pathname === "/setting" ? (
            <div className=" mb-4 flex gap-4 items-center group bg-primary-600 px-3 py-2 rounded-[4px]">
              <IoMdSettings className=" w-6 h-6 text-white group-hover:text-white" />
              <p className=" text-white text-base leading-normal font-medium group-hover:text-white">
                Setting
              </p>
            </div>
          ) : (
            <div className=" mb-4 flex gap-4 items-center group px-3 py-2 hover:bg-sideBarHoverbg active:bg-sideBarHoverbgPressed rounded-[4px]">
              <IoMdSettings className=" w-6 h-6 text-firstBlack group-hover:text-primary-600" />
              <p className=" text-firstBlack text-base leading-normal font-medium group-hover:text-primary-600">
                Setting
              </p>
            </div>
          )}
        </Link>
      </div>
      {/* END SIDE LEFT BAR TOP SECTION */}

      {/*  SIDE LEFT BAR BOTTOM SECTION */}
      <div className=" flex gap-2 items-center px-3 py-2 z-10 ">
        <div>
          <Image
            src="/images/logoutIcon.svg"
            alt="logout Icon"
            width={24}
            height={24}
          />
        </div>
        <div
          className=" text-base font-semibold leading-normal text-[#EB5757] cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </div>
      </div>
      {/*  END SIDE LEFT BAR BOTTOM SECTION */}
      <Image
        src="/images/sideBarDesign.svg"
        alt="logout Icon"
        width={100}
        height={100}
        className="w-full absolute bottom-0 right-0 -mb-24"
      />
    </div>
  );
};

export default LeftSideBar;
