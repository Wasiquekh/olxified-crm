import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { appCheck } from "../firebase-config";
import { getToken } from "firebase/app-check";
import { toast } from 'react-toastify';


const SidebarUserUpdateForm = ({
  isEditFlyoutOpen,
  setIsEditFlyoutOpen,
  currentUserData,
}) => {
  return (
    <>
      {isEditFlyoutOpen && (
        <div
          className="min-h-screen w-full bg-[#1f1d1d80] absolute top-0 left-0 right-0 z-[999]"
          onClick={() => setIsEditFlyoutOpen(false)}
        ></div>
      )}
      <div className={`filterflyout ${isEditFlyoutOpen ? "filteropen" : ""}`}>
        <Formik
          initialValues={{
            id: currentUserData.id || "",
            name: currentUserData.name || "",
            mobileNumber: currentUserData.mobile_number || "",
            email: currentUserData.email || "",
          }}
          enableReinitialize={true} // Add this line
          validationSchema={Yup.object({
            name: Yup.string().required("Name is required"),
            mobileNumber: Yup.string()
              .required("Mobile number is required")
              .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
            email: Yup.string()
              .email("Invalid email format")
              .required("Email is required"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              // Get the Firebase App Check token
              const tokenResponse = await getToken(appCheck, true);
              const appCheckToken = tokenResponse.token;
              const accessToken = localStorage.getItem("accessToken");
              const response = await fetch(
                "https://orizon-crm-api-uat.yliqo.com/api/v1/Orizonapigateway/updateuser",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "X-Firebase-AppCheck": appCheckToken,
                    Authorization: `Bearer ${accessToken}`,
                  },
                  body: new URLSearchParams({
                    id: values.id,
                    name: values.name,
                    mobileNumber: values.mobileNumber,
                    email: values.email,
                  }),
                }
              );

              if (response.ok) {
                // Handle successful response
                console.log("User updated successfully");
                toast.success('Form submitted successfully!');
              
               
                  setIsEditFlyoutOpen(false);
               
                
                
              } else {
                // Handle error response
                const errorData = await response.json();
                console.error("Error updating user:", errorData);
              }
            } catch (error) {
              console.error("Request failed:", error);
              toast.success('Form submitted successfully!');
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
            <form onSubmit={handleSubmit} className="w-full">
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
                    <input
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
                    {touched.name && errors.name && (
                      <div className="text-red-500">{errors.name}</div>
                    )}
                  </div>
                  <div className="w-full">
                    <label className="text-[#0A0A0A] font-medium text-base leading-6 mb-2">
                      Mobile
                    </label>
                    <input
                      type="text"
                      name="mobileNumber"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.mobileNumber}
                      className={`focus:outline-none w-full border rounded-[12px] text-sm leading-4 font-medium text-[#717171] py-4 px-4 ${
                        touched.mobileNumber && errors.mobileNumber
                          ? "border-red-500"
                          : "border-[#DFEAF2]"
                      }`}
                    />
                    {touched.mobileNumber && errors.mobileNumber && (
                      <div className="text-red-500">{errors.mobileNumber}</div>
                    )}
                  </div>
                </div>
                <div className="w-full flex gap-4 mb-4">
                  <div className="w-full">
                    <label className="text-[#0A0A0A] font-medium text-base leading-6 mb-2">
                      Email
                    </label>
                    <input
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
                    {touched.email && errors.email && (
                      <div className="text-red-500">{errors.email}</div>
                    )}
                  </div>
                  <div className="w-full">
                    <label className="text-[#0A0A0A] font-medium text-base leading-6 mb-2">
                      Role
                    </label>
                    <select
                      name="role"
                      onChange={handleChange}
                      value={currentUserData.role}
                      className="focus:outline-none w-full border rounded-[12px] text-sm leading-4 font-medium text-[#717171] py-4 px-4"
                    >
                      <option value={currentUserData.role}>
                        {currentUserData.role}
                      </option>
                      {/* <option value="1">Admin</option>
                      <option value="2">Non-Admin</option> */}
                    </select>
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
                  disabled={isSubmitting}
                  onClick={() => setIsEditFlyoutOpen(false)}
                  className="py-[13px] px-[26px] bg-customBlue rounded-2xl text-base font-medium leading-6 text-white"
                >
                    { isSubmitting ? 'Update Details' : 'Updating Details' }
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default SidebarUserUpdateForm;
