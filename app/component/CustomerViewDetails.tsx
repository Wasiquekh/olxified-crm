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

const axiosProvider = new AxiosProvider();
const storage = new StorageManager();
const activityLogger = new UserActivityLogger();

// Interface for Current User Data
// interface CurrentUserData {
//   id: string;
//   name: string;
//   mobile_number: string;
//   email: string;
//   role: string;
// }

// Props interface for SidebarUserUpdateForm
interface SidebarUserUpdateFormProps {
  isEditFlyoutOpen: boolean;
  setIsEditFlyoutOpen: (open: boolean) => void;
}

// SidebarUserUpdateForm Component
const SidebarUserUpdateForm: React.FC<SidebarUserUpdateFormProps> = ({
  isEditFlyoutOpen,
  setIsEditFlyoutOpen,
}) => {
  const [userDescription, setUserDescription] = useState<string | null>(null);
  //console.log('user desc',userDescription)
  const { accessToken } = useContext(AppContext);

  return (
    <>
      {isEditFlyoutOpen && (
        <div
          className="  bg-[#1f1d1d80] fixed h-full w-full top-0 left-0  z-[1000]"
          onClick={() => setIsEditFlyoutOpen(false)}
        ></div>
      )}
      <div className={`filterflyout ${isEditFlyoutOpen ? "filteropen" : ""}`}>
        <div className="flex justify-between mb-4">
          <p className="text-[#333B69] text-[26px] font-bold leading-9 hover:cursor-pointer block">
            User Details
          </p>
          <button
            type="button"
            onClick={() => setIsEditFlyoutOpen(false)}
            className="h-8 w-8 border border-[#E7E7E7] text-[#0A0A0A] rounded cursor-pointer"
          >
            X
          </button>
        </div>
        <div className="flex gap-20 mb-4">
          <p>Personal Details</p>
        </div>
        <div className=" w-full">
          <div
            data-layer="Frame 1400001983"
            className="Frame1400001983  px-0 py-6 bg-white rounded-xl flex-col justify-start items-start gap-5 inline-flex"
          >
            <div
              data-layer="Frame 1400001979"
              className="Frame1400001979 justify-center items-center gap-4 inline-flex"
            >
              <div
                data-layer="Frame 19"
                className="Frame19 w-[50px] h-[50px] p-2.5 bg-black rounded-[25px] justify-start items-center gap-2.5 flex"
              >
                <div
                  data-layer="fi_3679997"
                  className="Fi3679997 h-[30px] relative  overflow-hidden"
                >
                  <div
                    data-layer="Group"
                    className="Group w-[19.14px] h-[22.50px] left-[5.43px] top-[3.28px] absolute"
                  ></div>
                </div>
              </div>
              <div
                data-layer="Frame 1400001975"
                className="Frame1400001975 grow shrink basis-0 self-stretch px-3.5 py-2.5 bg-[#2db3ff] rounded-xl justify-center items-center gap-2.5 flex"
              >
                <div
                  data-layer="On Progress"
                  className="OnProgress text-white text-sm font-semibol"
                >
                  On Progress
                </div>
              </div>
            </div>
            <div
              data-layer="Liveness Detection"
              className="LivenessDetection w-[279px] text-[#0e0e0e] text-base font-medium"
            >
              Liveness Detection
            </div>
            <div
              data-layer="Group 1171275658"
              className="Group1171275658 w-[423px] h-[195px] relative"
            >
              <div
                data-layer="Rectangle 23880"
                className="Rectangle23880 w-[423px] h-[195px] left-0 top-0 absolute bg-[#cfe3f7]"
              ></div>
              <div
                data-layer="videocam"
                className="Videocam w-6 h-6 left-[199px] top-[86px] absolute  overflow-hidden"
              ></div>
              <div
                data-layer="Verify Video"
                className="VerifyVideo w-[279px] left-[22px] top-[12px] absolute text-[#0e0e0e] text-base font-medium"
              >
                Verify Video
              </div>
            </div>
            <div
              data-layer="Frame 427320337"
              className="Frame427320337 flex-col justify-between items-start flex"
            >
              <div
                data-layer="Select Verification Status"
                className="SelectVerificationStatus text-neutral-950 text-sm font-semibold font-['Source Sans Pro'] leading-[21px]"
              >
                Select Verification Status{" "}
              </div>
              <div
                data-layer="Frame 427320335"
                className="Frame427320335 w-[424px] px-4 py-2 bg-white rounded-xl border border-[#e7e7e7] justify-between items-center inline-flex"
              >
                <div
                  data-layer="--None--"
                  className="None text-[#717171] text-sm font-medium  leading-[21px]"
                >
                  {" "}
                  --None--
                </div>
                <div
                  data-layer="expand_more_FILL0_wght400_GRAD0_opsz48 2"
                  className="ExpandMoreFill0Wght400Grad0Opsz482 w-6 h-6 relative rounded-lg border  overflow-hidden"
                ></div>
              </div>
            </div>
            <div
              data-layer="Frame 1400001977"
              className="Frame1400001977 self-stretch px-4 py-2 bg-white rounded-xl border border-[#e7e7e7] justify-between items-center inline-flex"
            >
              <div
                data-layer="Frame 1400001984"
                className="Frame1400001984 flex-col justify-start items-start gap-3 inline-flex"
              >
                <div
                  data-layer="progressBar"
                  className="Progressbar w-[386px] h-[41px] relative"
                >
                  <div
                    data-layer="24%"
                    className="left-[357px] top-0 absolute text-[#3f3f3f] text-sm font-semibold"
                  >
                    24%
                  </div>
                  <div
                    data-layer="Liveness Code"
                    className="LivenessCode left-0 top-0 absolute text-[#3f3f3f] text-sm font-light"
                  >
                    Liveness Code
                  </div>
                  <div
                    data-layer="progressBar"
                    className="Progressbar w-[386px] h-[18px] left-0 top-[23px] absolute"
                  >
                    <div
                      data-layer="bar"
                      className="Bar w-[386px] h-[7px] left-0 top-[6px] absolute bg-[#e4e4e4] rounded-2xl"
                    ></div>
                    <div
                      data-layer="bar"
                      className="Bar w-[122.62px] h-[7px] left-0 top-[6px] absolute bg-[#2953e8] rounded-2xl"
                    ></div>
                    <div
                      data-layer="Knob"
                      className="Knob w-[49.05px] h-[18px] left-[163.49px] top-0 absolute origin-top-left rotate-180 bg-white rounded-[100px] shadow-[0px_6px_13px_0px_rgba(0,0,0,0.12)] shadow-[0px_0.5px_4px_0px_rgba(0,0,0,0.12)]"
                    ></div>
                  </div>
                </div>
                <div
                  data-layer="Score Now by sliding"
                  className="ScoreNowBySliding self-stretch text-[#757575] text-base font-normal  leading-snug"
                >
                  Score Now by sliding
                </div>
              </div>
            </div>
            <div
              data-layer="Container"
              className="Container self-stretch h-[37px] justify-start items-center gap-3 inline-flex"
            >
              <div
                data-layer="Container"
                className="Container grow shrink basis-0 h-[37px] justify-start items-center gap-2.5 flex"
              >
                <div
                  data-layer="pdf.svg"
                  className="PdfSvg flex-col justify-start items-start inline-flex overflow-hidden"
                >
                  <div
                    data-layer="pdf.svg fill"
                    className="PdfSvgFill w-6 h-6 flex-col justify-center items-center flex overflow-hidden"
                  >
                    <div
                      data-layer="Component 5"
                      className="Component5 w-6 h-6 relative  overflow-hidden"
                    ></div>
                  </div>
                </div>
                <div
                  data-layer="Container"
                  className="Container flex-col justify-start items-start inline-flex"
                >
                  <div
                    data-layer="Margin"
                    className="Margin self-stretch h-[21px] pb-px flex-col justify-start items-start flex"
                  >
                    <div
                      data-layer="Component 11"
                      className="Component11 self-stretch h-5 flex-col justify-start items-start flex"
                    >
                      <div
                        data-layer="Text"
                        className="Text self-stretch text-[#071437] text-sm font-medium  leading-tight"
                      >
                        Id Proof
                      </div>
                    </div>
                  </div>
                  <div
                    data-layer="Component 11"
                    className="Component11 self-stretch h-4 flex-col justify-start items-start flex"
                  >
                    <div
                      data-layer="Text"
                      className="Text text-[#4b5675] text-xs font-normal  leading-none"
                    >
                      4.7 MB 26 Sep 2024 3:20 PM
                    </div>
                  </div>
                </div>
              </div>
              <div
                data-layer="Component 4"
                className="Component4 px-px pt-px pb-[4.25px] justify-start items-center flex"
              >
                <div data-layer="Text" className="Text">
                  <span className="text-[#1b84ff] text-[13px] font-medium  leading-[13px]">
                    V
                  </span>
                  <span className="text-[#1b84ff] text-[13px] font-medium  leading-[13px]">
                    iew to verify
                  </span>
                </div>
              </div>
            </div>
            <div
              data-layer="Container"
              className="Container self-stretch h-[37px] justify-start items-center gap-3 inline-flex"
            >
              <div
                data-layer="Container"
                className="Container grow shrink basis-0 h-[37px] justify-start items-center gap-2.5 flex"
              >
                <div
                  data-layer="doc.svg"
                  className="DocSvg flex-col justify-start items-start inline-flex overflow-hidden"
                >
                  <div
                    data-layer="doc.svg fill"
                    className="DocSvgFill w-6 h-6 flex-col justify-center items-center flex overflow-hidden"
                  >
                    <div
                      data-layer="Component 5"
                      className="Component5 w-6 h-6 relative  overflow-hidden"
                    ></div>
                  </div>
                </div>
                <div
                  data-layer="Container"
                  className="Container flex-col justify-start items-start inline-flex"
                >
                  <div
                    data-layer="Margin"
                    className="Margin self-stretch h-[21px] pb-px flex-col justify-start items-start flex"
                  >
                    <div
                      data-layer="Component 11"
                      className="Component11 self-stretch h-5 flex-col justify-start items-start flex"
                    >
                      <div
                        data-layer="Text"
                        className="Text self-stretch text-[#071437] text-sm font-medium  leading-tight"
                      >
                        Address Proof
                      </div>
                    </div>
                  </div>
                  <div
                    data-layer="Component 11"
                    className="Component11 self-stretch h-4 flex-col justify-start items-start flex"
                  >
                    <div
                      data-layer="Text"
                      className="Text text-[#4b5675] text-xs font-normal  leading-none"
                    >
                      2.3 MB 1 Oct 2024 12:00 PM
                    </div>
                  </div>
                </div>
              </div>
              <div
                data-layer="Component 5"
                className="Component5 px-px pt-px pb-[4.25px] justify-start items-center flex"
              >
                <div data-layer="Text" className="Text">
                  <span className="text-[#1b84ff] text-[13px] font-medium  leading-[13px]">
                    V
                  </span>
                  <span className="text-[#1b84ff] text-[13px] font-medium  leading-[13px]">
                    iew to verify
                  </span>
                </div>
              </div>
            </div>
            <div
              data-layer="Frame 1400001980"
              className="Frame1400001980 flex-col justify-start items-start gap-2 flex"
            >
              <div
                data-layer="On Call Comments"
                className="OnCallComments text-neutral-950 text-sm font-semibold font-['Source Sans Pro'] leading-[21px]"
              >
                On Call Comments
              </div>
              <div
                data-layer="Frame 427320331"
                className="Frame427320331 w-[408px] px-4 py-2 bg-white rounded-xl border border-[#e7e7e7] justify-between items-center inline-flex"
              >
                <div
                  data-layer="Write your comments here"
                  className="WriteYourCommentsHere grow shrink basis-0 h-[73px] text-[#717171] text-sm font-medium  leading-[21px]"
                >
                  Write your comments here
                </div>
              </div>
            </div>
            <div
              data-layer="Frame 1400001982"
              className="Frame1400001982 flex-col justify-between items-start flex"
            >
              <div
                data-layer="Document Error Status"
                className="DocumentErrorStatus text-neutral-950 text-sm font-semibold font-['Source Sans Pro'] leading-[21px]"
              >
                Document Error Status{" "}
              </div>
              <div
                data-layer="Frame 427320335"
                className="Frame427320335 w-[424px] px-4 py-2 bg-white rounded-xl border border-[#e7e7e7] justify-between items-center inline-flex"
              >
                <div
                  data-layer="Blurred images"
                  className="BlurredImages text-[#717171] text-sm font-medium  leading-[21px]"
                >
                  Blurred images
                </div>
                <div
                  data-layer="expand_more_FILL0_wght400_GRAD0_opsz48 2"
                  className="ExpandMoreFill0Wght400Grad0Opsz482 w-6 h-6 relative rounded-lg border  overflow-hidden"
                ></div>
              </div>
            </div>
            <div
              data-layer="Frame 1400001983"
              className="Frame1400001983 w-[424px] h-[289px] px-4 py-2 bg-white rounded-xl border border-[#e7e7e7] flex-col justify-between items-start flex"
            >
              <div
                data-layer="Request Additional Information"
                className="RequestAdditionalInformation text-neutral-950 text-sm font-semibold font-['Source Sans Pro'] leading-[21px]"
              >
                Request Additional Information
              </div>
              <div
                data-layer="Frame 427320337"
                className="Frame427320337 self-stretch px-4 py-2 bg-white rounded-xl border border-[#e7e7e7] justify-between items-center inline-flex"
              >
                <div
                  data-layer="Yes"
                  className="Yes text-[#717171] text-sm font-medium  leading-[21px]"
                >
                  Yes
                </div>
                <div
                  data-layer="expand_more_FILL0_wght400_GRAD0_opsz48 2"
                  className="ExpandMoreFill0Wght400Grad0Opsz482 w-6 h-6 relative rounded-lg border  overflow-hidden"
                ></div>
              </div>
              <div
                data-layer="Checkbox Field"
                className="CheckboxField self-stretch h-11 flex-col justify-start items-start flex"
              >
                <div
                  data-layer="Checkbox and Label"
                  className="CheckboxAndLabel self-stretch justify-start items-center gap-3 inline-flex"
                >
                  <div
                    data-layer="Checkbox"
                    className="Checkbox w-4 h-4 bg-[#09549d] rounded justify-center items-center gap-2.5 flex overflow-hidden"
                  >
                    <div
                      data-layer="Check"
                      className="Check w-4 h-4 relative  overflow-hidden"
                    ></div>
                  </div>
                  <div
                    data-layer="Label"
                    className="Label grow shrink basis-0 text-[#1e1e1e] text-base font-normal  leading-snug"
                  >
                    Label
                  </div>
                </div>
                <div
                  data-layer="Description Row"
                  className="DescriptionRow self-stretch justify-start items-center gap-3 inline-flex"
                >
                  <div
                    data-layer="Space"
                    className="Space w-4 h-4 relative"
                  ></div>
                  <div
                    data-layer="Description"
                    className="Description grow shrink basis-0 text-[#757575] text-base font-normal  leading-snug"
                  >
                    Description
                  </div>
                </div>
              </div>
              <div
                data-layer="Checkbox Field"
                className="CheckboxField self-stretch h-11 flex-col justify-start items-start flex"
              >
                <div
                  data-layer="Checkbox and Label"
                  className="CheckboxAndLabel self-stretch justify-start items-center gap-3 inline-flex"
                >
                  <div
                    data-layer="Checkbox"
                    className="Checkbox w-4 h-4 bg-white rounded border border-[#757575]"
                  ></div>
                  <div
                    data-layer="Label"
                    className="Label grow shrink basis-0 text-[#1e1e1e] text-base font-normal  leading-snug"
                  >
                    Label
                  </div>
                </div>
                <div
                  data-layer="Description Row"
                  className="DescriptionRow self-stretch justify-start items-center gap-3 inline-flex"
                >
                  <div
                    data-layer="Space"
                    className="Space w-4 h-4 relative"
                  ></div>
                  <div
                    data-layer="Description"
                    className="Description grow shrink basis-0 text-[#757575] text-base font-normal  leading-snug"
                  >
                    Description
                  </div>
                </div>
              </div>
              <div
                data-layer="Checkbox Field"
                className="CheckboxField self-stretch h-11 flex-col justify-start items-start flex"
              >
                <div
                  data-layer="Checkbox and Label"
                  className="CheckboxAndLabel self-stretch justify-start items-center gap-3 inline-flex"
                >
                  <div
                    data-layer="Checkbox"
                    className="Checkbox w-4 h-4 bg-[#09549d] rounded justify-center items-center gap-2.5 flex overflow-hidden"
                  >
                    <div
                      data-layer="Check"
                      className="Check w-4 h-4 relative  overflow-hidden"
                    ></div>
                  </div>
                  <div
                    data-layer="Label"
                    className="Label grow shrink basis-0 text-[#1e1e1e] text-base font-normal  leading-snug"
                  >
                    Label
                  </div>
                </div>
                <div
                  data-layer="Description Row"
                  className="DescriptionRow self-stretch justify-start items-center gap-3 inline-flex"
                >
                  <div
                    data-layer="Space"
                    className="Space w-4 h-4 relative"
                  ></div>
                  <div
                    data-layer="Description"
                    className="Description grow shrink basis-0 text-[#757575] text-base font-normal  leading-snug"
                  >
                    Description
                  </div>
                </div>
              </div>
              <div
                data-layer="Checkbox Field"
                className="CheckboxField self-stretch h-11 flex-col justify-start items-start flex"
              >
                <div
                  data-layer="Checkbox and Label"
                  className="CheckboxAndLabel self-stretch justify-start items-center gap-3 inline-flex"
                >
                  <div
                    data-layer="Checkbox"
                    className="Checkbox w-4 h-4 bg-[#09549d] rounded justify-center items-center gap-2.5 flex overflow-hidden"
                  >
                    <div
                      data-layer="Check"
                      className="Check w-4 h-4 relative  overflow-hidden"
                    ></div>
                  </div>
                  <div
                    data-layer="Label"
                    className="Label grow shrink basis-0 text-[#1e1e1e] text-base font-normal  leading-snug"
                  >
                    Label
                  </div>
                </div>
                <div
                  data-layer="Description Row"
                  className="DescriptionRow self-stretch justify-start items-center gap-3 inline-flex"
                >
                  <div
                    data-layer="Space"
                    className="Space w-4 h-4 relative"
                  ></div>
                  <div
                    data-layer="Description"
                    className="Description grow shrink basis-0 text-[#757575] text-base font-normal  leading-snug"
                  >
                    Description
                  </div>
                </div>
              </div>
            </div>
            <div
              data-layer="Frame 1400001984"
              className="Frame1400001984 flex-col justify-start items-start gap-2 flex"
            >
              <div
                data-layer="Final Review"
                className="FinalReview text-neutral-950 text-sm font-semibold font-['Source Sans Pro'] leading-[21px]"
              >
                Final Review
              </div>
              <div
                data-layer="Frame 427320331"
                className="Frame427320331 w-[408px] px-4 py-2 bg-white rounded-xl border border-[#e7e7e7] justify-between items-center inline-flex"
              >
                <div
                  data-layer="Write your comments here"
                  className="WriteYourCommentsHere grow shrink basis-0 h-[73px] text-[#717171] text-sm font-medium  leading-[21px]"
                >
                  Write your comments here
                </div>
              </div>
            </div>
            <div
              data-layer="Frame 427320188"
              className="Frame427320188 self-stretch px-4 py-3 bg-[#09549d] rounded-2xl justify-center items-center gap-2.5 inline-flex"
            >
              <div
                data-layer="Frame 427320187"
                className="Frame427320187 justify-start items-center gap-2 flex"
              >
                <div
                  data-layer="Update Status"
                  className="UpdateStatus text-white text-sm font-semibold "
                >
                  Update Status
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarUserUpdateForm;
