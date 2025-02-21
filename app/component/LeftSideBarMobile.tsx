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
import { useRouter } from 'next/navigation';

const axiosProvider = new AxiosProvider();
const storage = new StorageManager();
const LeftSideBarMobile: React.FC = () => {
  const pathname = usePathname();
  const permissions = storage.getUserPermissions();
  const hasCustomerView = permissions?.some(perm => perm.name === 'customer.view');
  const hasCustomerAdd = permissions?.some(perm => perm.name === 'customer.add');
  const hasCustomerDelete = permissions?.some(perm => perm.name === 'customer.delete');
  const hasCustomerEdit = permissions?.some(perm => perm.name === 'customer.edit');
  const hasCustomerAudit = permissions?.some(perm => perm.name === 'customer.audit');
  const hasSystemUserView = permissions?.some(perm => perm.name === 'systemuser.view');
  const hasSystemUserAdd = permissions?.some(perm => perm.name === 'systemuser.add');
  const hasSystemUserDelete = permissions?.some(perm => perm.name === 'systemuser.delete');
  const hasSystemUserEdit = permissions?.some(perm => perm.name === 'systemuser.edit');
  const hasSystemUserAudit = permissions?.some(perm => perm.name === 'systemuser.audit');
  const hasUserActivityView = permissions?.some(perm => perm.name === 'useractivity.view');
  const router = useRouter();

  const handleLogout = async()=>{
    try {
      const response = await axiosProvider.post("/logout",{});
      router.push('/');
    } catch (error) {
      console.error("Error fetching data:", error);
  }
  }
  return (
    <div className="w-full md:w-[15%]  md:flex flex-col justify-between py-2 px-2   mt-2">
      {/* SIDE LEFT BAR TOP SECTION */}
      <div>
        <Link href="/customer">
          <div className=" flex gap-2 mb-12 px-3">
            <Image
              src="/images/orizonIcon.svg"
              alt="Description of image"
              width={0}
              height={0}
              className=" w-11 h-auto"
            />
            <p className=" text-[25px] leading-normal font-black uppercase text-darkMaroon">
              Orizon
            </p>
          </div>
        </Link>
        {/* MENU WITH ICONS */}
        <Link href="/customer">
          <div className=" mb-6 flex gap-5 items-center  cursor-pointer group px-3 py-2  rounded-[6px] hover:bg-lightMaroon">
            <BiSolidHome className=" w-6 h-6 text-[#171717] group-hover:text-darkMaroon" />
            <p className=" text-[#171717] text-base leading-normal font-medium group-hover:text-darkMaroon">
              Dashboard
            </p>
          </div>
        </Link>
        {
          hasCustomerView && 
          (        <Link href="/customer">
            {pathname === "/customer" || pathname === "/customerdetails" ? (
              <div className=" mb-6 flex gap-5 items-center  px-3 py-2  rounded-[6px] bg-darkMaroon">
                <MdOutlineBarChart className=" w-6 h-6 text-white group-hover:text-customBlue " />
                <p className=" text-white text-base leading-normal font-medium group-hover:text-customBlue">
                  Customers
                </p>
              </div>
            ) : (
              <div className=" mb-6 flex gap-5 items-center group px-3 py-2  rounded-[6px] hover:bg-lightMaroon">
                <MdOutlineBarChart className=" w-6 h-6 text-[#171717] group-hover:text-darkMaroon " />
                <p className=" text-[#171717] text-base leading-normal font-medium group-hover:text-darkMaroon">
                  Customers
                </p>
              </div>
            )}
          </Link>)
        }
        <Link href="/transaction">
          {pathname === "/transaction" ? (
            <div className=" mb-6 flex gap-5 items-center  px-3 py-2  rounded-[6px] bg-darkMaroon">
              <TbDeviceMobileDollar className=" w-6 h-6 text-white group-hover:text-customBlue" />
              <p className=" text-white text-base leading-normal font-medium group-hover:text-customBlue">
                Transaction
              </p>
            </div>
          ) : (
            <div className=" mb-6 flex gap-5 items-center group px-3 py-2  rounded-[6px] hover:bg-lightMaroon">
              <TbDeviceMobileDollar className=" w-6 h-6 text-[#171717] group-hover:text-darkMaroon" />
              <p className=" text-[#171717] text-base leading-normal font-medium group-hover:text-darkMaroon">
                Transaction
              </p>
            </div>
          )}
        </Link>
        <Link href="/customer">
          <div className=" mb-6 flex gap-5 items-center group px-3 py-2  rounded-[6px] hover:bg-lightMaroon">
            <HiWrenchScrewdriver className=" w-6 h-6 text-[#171717] group-hover:text-darkMaroon" />
            <p className=" text-[#171717] text-base leading-normal font-medium group-hover:text-darkMaroon">
              Point of Services
            </p>
          </div>
        </Link>
        <Link href="/customer">
          <div className=" mb-6 flex gap-5 items-center group px-3 py-2  rounded-[6px] hover:bg-lightMaroon">
            <FaMoneyCheckDollar className=" w-6 h-6 text-[#171717] group-hover:text-darkMaroon" />
            <p className=" text-[#171717] text-base leading-normal font-medium group-hover:text-darkMaroon">
              Payment Terminal
            </p>
          </div>
        </Link>
        <Link href="/cards">
          {pathname === "/cards" ? (
            <div className=" mb-6 flex gap-5 items-center  px-3 py-2  rounded-[6px] bg-darkMaroon">
              <BsCreditCard2Back className=" w-6 h-6 text-white group-hover:text-darkMaroon" />
              <p className=" text-white text-base leading-normal font-medium group-hover:text-darkMaroon">
                Credit Cards
              </p>
            </div>
          ) : (
            <div className=" mb-6 flex gap-5 items-center group px-3 py-2  rounded-[6px] hover:bg-lightMaroon">
              <BsCreditCard2Back className=" w-6 h-6 text-[#171717] group-hover:text-darkMaroon" />
              <p className=" text-[#171717] text-base leading-normal font-medium group-hover:text-darkMaroon">
                Credit Cards
              </p>
            </div>
          )}
        </Link>
        {
          hasSystemUserView && 
          (
            <Link href="/usermanagement">
            {pathname === "/usermanagement" || pathname === "/useradd" ? (
              <div className=" mb-6 flex gap-5 items-center  px-3 py-2  rounded-[6px] bg-darkMaroon">
                <BiSolidUser className=" w-6 h-6 text-white group-hover:text-customBlue" />
                <p className=" text-white text-base leading-normal font-medium group-hover:text-customBlue">
                  User Management
                </p>
              </div>
            ) : (
              <div className=" mb-6 flex gap-5 items-center group px-3 py-2  rounded-[6px] hover:bg-lightMaroon">
                <BiSolidUser className=" w-6 h-6 text-[#171717] group-hover:text-white" />
                <p className=" text-[#171717] text-base leading-normal font-medium group-hover:text-white">
                  User Management
                </p>
              </div>
            )}
          </Link>
          )
        }
        {hasUserActivityView && 
        <Link href="/user-activity">
        {pathname === "/user-activity" ? (
            <div className=" mb-6 flex gap-5 items-center  px-3 py-2  rounded-[6px] bg-darkMaroon">
              <BiSolidUser className=" w-6 h-6 text-white group-hover:text-customBlue" />
              <p className=" text-white text-base leading-normal font-medium group-hover:text-customBlue">
                User Activity
              </p>
            </div>
        ) : (
            <div className=" mb-6 flex gap-5 items-center group px-3 py-2  rounded-[6px] hover:bg-lightMaroon">
              <BiSolidUser className=" w-6 h-6 text-[#171717] group-hover:text-white" />
              <p className=" text-[#171717] text-base leading-normal font-medium group-hover:text-white">
                User Activity
              </p>
            </div>
        )}
        </Link>
        }
        <div className=" mb-6 flex gap-5 items-center group px-3 py-2  rounded-[6px] hover:bg-lightMaroon">
          <IoMdSettings className=" w-6 h-6 text-[#171717] group-hover:text-darkMaroon" />
          <p className=" text-[#171717] text-base leading-normal font-medium group-hover:text-darkMaroon">
            Settings
          </p>
        </div>
      </div>
      {/* END SIDE LEFT BAR TOP SECTION */}

      {/*  SIDE LEFT BAR BOTTOM SECTION */}
      <div className=" flex gap-2 items-center px-3">
        <div>
          <Image
            src="/images/logoutIcon.svg"
            alt="logout Icon"
            width={24}
            height={24}
          />
        </div>
        <div className=" text-base font-semibold leading-normal text-[#EB5757] cursor-pointer"
        onClick={handleLogout}
        >
          Logout
        </div>
      </div>
      {/*  END SIDE LEFT BAR BOTTOM SECTION */}
    </div>
  );
};

export default LeftSideBarMobile;

