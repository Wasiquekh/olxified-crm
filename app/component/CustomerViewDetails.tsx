import React, { useContext, useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import AxiosProvider from "../../provider/AxiosProvider";
import StorageManager from "../../provider/StorageManager";
import { AppContext } from "../AppContext";
import { RiDeleteBin6Line } from "react-icons/ri";
import UserActivityLogger from "../../provider/UserActivityLogger";
import Swal from "sweetalert2";
import Image from "next/image";
import { IoVideocam } from "react-icons/io5";

const axiosProvider = new AxiosProvider();
const storage = new StorageManager();
const activityLogger = new UserActivityLogger();

interface Customer {
  id: string;
  firstname: string;
  lastname: string;
  birthdate: string;
  gender: string;
  mobilephonenumber: string;
  email: string;
  streetaddress: string;
  countryofbirth: string;
  countryofresidence: string;
  updated_at: string;
  city?: string | null;
  created_at?: string | null;
  fcmtoken?: string | null;
  idcardrecto?: string | null;
  idcardverso?: string | null;
  iddoctype?: string | null;
  mobilephonenumber_verified?: boolean | null;
  password?: string | null;
  shortintrovideo?: string | null;
  usersignature?: string | null;
  face_id_url?: string | null;
  liveness_score?: number | null;
  [key: string]: any;
}
// Props interface for SidebarUserUpdateForm
interface SidebarUserUpdateFormProps {
  isEditFlyoutOpen: boolean;
  setIsEditFlyoutOpen: (open: boolean) => void;
  customer: Customer | null;
}

// SidebarUserUpdateForm Component
const SidebarUserUpdateForm: React.FC<SidebarUserUpdateFormProps> = ({
  isEditFlyoutOpen,
  setIsEditFlyoutOpen,
  customer,
}) => {
  const [userDescription, setUserDescription] = useState<string | null>(null);
  //console.log('user desc',userDescription)
  const [faceImage, setFaceImage] = useState<string | null>(null);
  const [livenessScore, setLivenessScore] = useState<string | undefined>(
    undefined
  );

  const { accessToken } = useContext(AppContext);
  // if (customer && customer.face_id_url !== undefined) {
  //   console.log("customer id", customer.id);
  //   console.log("system user id", storage.getUserId());
  // }
  const fetchData = async () => {
    if (customer && customer.face_id_url !== undefined) {
      const decimalValue = customer.liveness_score;
      const percentage = (decimalValue * 100).toFixed(2);
      setLivenessScore(percentage);
      const fullUrl = customer.face_id_url;
      const lastPart = fullUrl.split("/").pop();
      try {
        const response = await axiosProvider.post("/getfaceid", {
          filename: lastPart,
        });
        //setFaceImage(response.data.data.url);
        setFaceImage(response.data.data.url);

        // toast.success("Successfully get");
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error("Failed to get Image");
      }
    }
  };

  useEffect(() => {
    // Ensure that fetchData is called when the 'customer' prop is available
    if (customer) {
      fetchData();
    }
  }, [customer]);

  const reject = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to reject this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      input: "text", // Adds a text input field
      inputPlaceholder: "Enter a reason for deletion", // Placeholder text for the input
      inputValidator: (value) => {
        if (!value) {
          return "You need to provide a reason!";
        }
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const reason = result.value; // Get the value entered in the input field
        console.log("Reason for deletion:", reason);
        if (customer && customer.face_id_url !== undefined) {
          //console.log('customer id',customer.id);
          // console.log('system user id',storage.getUserId())
          try {
            const response = await axiosProvider.post("/rejectuser", {
              customer_id: customer.id,
              system_user_id: storage.getUserId(),
              verification_type: "liveness_detection",
              reason_reject: reason,
            });
            toast.success("Customer is rejected");
            // toast.success("Successfully get");
          } catch (error) {
            console.error("Customer rejection is failed:", error);
            toast.error("Customer rejection is failed");
          }
        }
      }
    });
  };
  const approve = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to approve this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (customer && customer.face_id_url !== undefined) {
          // console.log('customer id',customer.id);
          // console.log('system user id',storage.getUserId())
          try {
            const response = await axiosProvider.post("/approveuser", {
              customer_id: customer.id,
              system_user_id: storage.getUserId(),
              verification_type: "liveness_detection",
            });
            toast.success("Customer is Approved");
            // toast.success("Successfully get");
          } catch (error) {
            console.error("Customer is not Approved:", error);
            toast.error("Customer is not Approved");
          }
        }
      }
    });
  };

  return (
    <>
      {isEditFlyoutOpen && (
        <div
          className="  bg-[#1f1d1d80] fixed h-full w-full top-0 left-0  z-[1000]"
          onClick={() => setIsEditFlyoutOpen(false)}
        ></div>
      )}
      <div className={`filterflyout ${isEditFlyoutOpen ? "filteropen" : ""}`}>
        <div className=" w-full">
          <div className="px-0 py-0 bg-white rounded-xl flex-col justify-start items-start gap-5 inline-flex w-full">
            <div className=" flex justify-between items-center w-full ">
              <div className=" justify-center items-center gap-4 inline-flex">
                <Image
                  src="/images/user.svg"
                  alt="Orizon profile"
                  width={50}
                  height={50}
                />
                <div className=" px-7 py-3 bg-[#2db3ff] rounded-xl ">
                  <div className="OnProgress text-white text-sm font-semibold">
                    On Progress
                  </div>
                </div>
              </div>
              <div className="flex justify-end ">
                <button
                  type="button"
                  onClick={() => setIsEditFlyoutOpen(false)}
                  className="h-8 w-8 border border-[#E7E7E7] text-[#0A0A0A] rounded cursor-pointer"
                >
                  X
                </button>
              </div>
            </div>

            <div className="LivenessDetection w-[279px] text-[#0e0e0e] text-base font-medium">
              Liveness Detection
            </div>
            {faceImage ? (
              <Image
                src={faceImage}
                alt="Orizon profile"
                width={200}
                height={200}
              />
            ) : (
              "Loading..."
            )}
            {livenessScore ? (
              <div className="w-full">
                <h1 className="text-xl font-semibold mb-2">
                  Liveness Score: {livenessScore}%
                </h1>
                <div className="w-full bg-gray-200 rounded-lg h-6">
                  <div
                    className="bg-blue-500 h-full rounded-lg"
                    style={{ width: `${livenessScore}%` }}
                  ></div>
                </div>
              </div>
            ) : (
              "loading"
            )}


            <div className=" flex justify-between w-full">
              <button
                onClick={approve}
                className="bg-[#379941] text-white w-[49%] p-3 rounded"
              >
                Approve
              </button>
              <button
                onClick={reject}
                className="bg-[#E52020] text-white w-[49%] p-3 rounded"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarUserUpdateForm;
