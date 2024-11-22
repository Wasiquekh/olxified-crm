import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { appCheck } from "../firebase-config";
import { getToken } from "firebase/app-check";
import { toast } from "react-toastify";
import AxiosProvider from "../../provider/AxiosProvider";
import StorageManager from "../../provider/StorageManager";

const axiosProvider = new AxiosProvider();
const storage = new StorageManager();

interface CurrentUserData {
  id: string;
  name: string;
  mobile_number: string;
  email: string;
  role: string;
}

interface SidebarUserUpdateFormProps {
  isEditFlyoutOpen: boolean;
  setIsEditFlyoutOpen: (open: boolean) => void;
  currentUserData: CurrentUserData;
  setShouldRefetch: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarUserUpdateForm: React.FC<SidebarUserUpdateFormProps> = ({
  isEditFlyoutOpen,
  setIsEditFlyoutOpen,
  currentUserData,
  setShouldRefetch,
}) => {
interface CurrentUserData {
  id: string;
  name: string;
  mobile_number: string;
  email: string;
  role: string;
}
  return (
    <>
      {isEditFlyoutOpen && (
        <div
          className="  bg-[#1f1d1d80] fixed h-full w-full top-0 left-0  z-[1000]"
          onClick={() => setIsEditFlyoutOpen(false)}
        ></div>
      )}
      <div className={`filterflyout ${isEditFlyoutOpen ? "filteropen" : ""}`}>
        <Formik
          initialValues={{
            id: currentUserData?.id || "",
            name: currentUserData?.name || "",
            mobile_number: currentUserData?.mobile_number || "",
            email: currentUserData?.email || "",
          }}
          enableReinitialize={true}
          validationSchema={Yup.object({
            name: Yup.string().required("Name is required"),
            mobile_number: Yup.string()
              .required("Mobile number is required")
              .matches(
                /^\+\d{1,4}\d{10}$/,
                "Enter a valid mobile number with country code"
              ),
            email: Yup.string()
              .email("Invalid email format")
              .required("Email is required"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const tokenResponse = await getToken(appCheck, true);
              const appCheckToken = tokenResponse.token;
              const accessToken = storage.getAccessToken();

              const res = await axiosProvider.post("/updateuser", values, {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                  "X-Firebase-AppCheck": appCheckToken,
                  Authorization: `Bearer ${accessToken}`,
                },
              });

              if (res.status === 200) {
                toast.success("User updated successfully!");
                setIsEditFlyoutOpen(false);
                setShouldRefetch((prev) => !prev);
              } else if (res.status === 204) {
                toast.success("No Data Changed!");
              } else {
                toast.error(`Unexpected response: ${res.status}`);
              }
            } catch (error) {
              console.error("Error during user update:", error);

              if (error.response) {
                const { status, data } = error.response;
                if (status === 409) {
                  toast.error(data?.msg || "Conflict error occurred.");
                } else {
                  toast.error(
                    data?.msg ||
                      `Error: ${status} - ${
                        data?.message || "Something went wrong"
                      }`
                  );
                }
              } else {
                toast.error("Failed to submit the form.");
              }
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit} className="w-full">
              <div className="flex justify-between mb-8">
                <p className="text-[#333B69] text-[26px] font-bold leading-9">
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
              <div className="flex flex-col gap-3 mb-[10px]">
                <div className="w-full flex gap-4 mb-4">
                  <div className="w-full">
                    <label className="text-[#0A0A0A] font-medium text-base leading-6 mb-2">
                      Name
                    </label>
                    <Field
                      type="text"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      className={`focus:outline-none w-full border rounded-[12px] text-sm leading-4 font-medium text-[#717171] py-4 px-4 ${
                        touched.name && errors.name
                          ? "border-red-500"
                          : "border-[#DFEAF2]"
                      }`}
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div className="w-full">
                    <label className="text-[#0A0A0A] font-medium text-base leading-6 mb-2">
                      Mobile
                    </label>
                    <Field
                      type="text"
                      name="mobile_number"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.mobile_number}
                      className={`focus:outline-none w-full border rounded-[12px] text-sm leading-4 font-medium text-[#717171] py-4 px-4 ${
                        touched.mobile_number && errors.mobile_number
                          ? "border-red-500"
                          : "border-[#DFEAF2]"
                      }`}
                    />
                    <ErrorMessage
                      name="mobile_number"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                </div>
                <div className="w-full flex gap-4 mb-4">
                  <div className="w-full">
                    <label className="text-[#0A0A0A] font-medium text-base leading-6 mb-2">
                      Email
                    </label>
                    <Field
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      className={`focus:outline-none w-full border rounded-[12px] text-sm leading-4 font-medium text-[#717171] py-4 px-4 ${
                        touched.email && errors.email
                          ? "border-red-500"
                          : "border-[#DFEAF2]"
                      }`}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div className="w-full">
                    <label className="text-[#0A0A0A] font-medium text-base leading-6 mb-2">
                      Role
                    </label>
                    <Field
                      as="select"
                      name="role"
                      onChange={handleChange}
                     // value={values.role || currentUserData?.role || ""}
                      className="focus:outline-none w-full border rounded-[12px] text-sm leading-4 font-medium text-[#717171] py-4 px-4"
                    >
                      <option value="" disabled>
                        Select Role
                      </option>
                      {currentUserData?.role && (
                        <option value={currentUserData.role}>
                          {currentUserData.role}
                        </option>
                      )}
                    </Field>
                  </div>
                </div>
              </div>

              <div className="mt-10 w-full flex justify-end items-center gap-5">
                <button
                  type="button"
                  onClick={() => setIsEditFlyoutOpen(false)}
                  className="py-[13px] px-[26px] border border-[#E7E7E7] rounded-2xl text-[#0A0A0A] text-base font-medium leading-6"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={() => setIsEditFlyoutOpen(false)}
                  disabled={isSubmitting}
                  className="py-[13px] px-[26px] bg-customBlue rounded-2xl text-base font-medium leading-6 text-white"
                >
                  {isSubmitting ? "Updating Details" : "Update Details"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default SidebarUserUpdateForm;
