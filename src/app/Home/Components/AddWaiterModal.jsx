"use client";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Tooltip } from "@mui/material";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from 'yup';

const waiterValidationSchema = Yup.object().shape({
  image: Yup.mixed().required("Image is required"),
  name: Yup.string().required("Name is required"),
  age: Yup.number()
    .required("Age is required")
    .positive("Age must be a positive number")
    .integer("Age must be an integer"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  phoneno: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
  gender: Yup.string().required("Gender is required"),
  profession: Yup.string().required("Profession is required"),
});

const AddWaiterModalForm = ({ handleclose, restaurantinfo }) => {
  const formik = useFormik({
    initialValues: {
      image: "",
      name: "",
      age: "",
      email: "",
      phoneno: "",
      gender: "Male",
      profession: "Waiter",
    },
    validationSchema: waiterValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log("Form Data:", values);
      try {
        const res = await axios.post("/api/addwaiter", {
          formData: values,
          id: restaurantinfo.restaurantid,
        });
        console.log(res.data.success);
        if (res.data.success) {
          toast.success("Waiter added successfully");
          setTimeout(() => {
            resetForm();
            handleclose();
          }, 1000);
          window.location.reload();
        }
      } catch (e) {
        console.log(e);
        toast.error("Error adding waiter");
      }
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        formik.setFieldValue("image", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed z-50 h-screen w-screen top-0 left-0 flex justify-center overflow-x-auto items-center bg-black/20 backdrop-blur-sm">
      <div className="bg-[#fff9ea] p-6 rounded-md shadow-md max-w-[50vw] mx-auto relative">
        <Toaster />
        <Tooltip title="close">
          <span
            onClick={handleclose}
            className="absolute top-2 right-2 cursor-pointer"
          >
            <CloseIcon />
          </span>
        </Tooltip>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label className="block text-[#440129] font-semibold mb-2">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-[#440129]"
            />
            {formik.values.image && (
              <img
                src={formik.values.image}
                alt="Selected"
                className="mt-2 w-32 h-32 object-cover rounded-md"
              />
            )}
            {formik.errors.image && formik.touched.image && (
              <p className="form-error p-[2px] text-[0.65rem] text-rose-500">
                {formik.errors.image}
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="mb-4">
              <label className="block text-[#440129] font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="p-2 rounded-md border-2 w-full text-[#440129] focus:border-[#440129]"
              />
              {formik.errors.name && formik.touched.name && (
                <p className="form-error p-[2px] text-[0.65rem] text-rose-500">
                  {formik.errors.name}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-[#440129] font-semibold mb-2">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneno"
                value={formik.values.phoneno}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="p-2 rounded-md border-2 w-full text-[#440129] focus:border-[#440129]"
              />
              {formik.errors.phoneno && formik.touched.phoneno && (
                <p className="form-error p-[2px] text-[0.65rem] text-rose-500">
                  {formik.errors.phoneno}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-[#440129] font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="p-2 rounded-md border-2 w-full text-[#440129] focus:border-[#440129]"
              />
              {formik.errors.email && formik.touched.email && (
                <p className="form-error p-[2px] text-[0.65rem] text-rose-500">
                  {formik.errors.email}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-[#440129] font-semibold mb-2">
                Gender
              </label>
              <select
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="p-2 py-[9px] rounded-md border-2 w-full text-[#440129] focus:border-[#440129]"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {formik.errors.gender && formik.touched.gender && (
                <p className="form-error p-[2px] text-[0.65rem] text-rose-500">
                  {formik.errors.gender}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-[#440129] font-semibold mb-2">
                Age
              </label>
              <input
                type="text"
                name="age"
                value={formik.values.age}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="p-2 rounded-md border-2 w-full text-[#440129] focus:border-[#440129]"
              />
              {formik.errors.age && formik.touched.age && (
                <p className="form-error p-[2px] text-[0.65rem] text-rose-500">
                  {formik.errors.age}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-[#440129] font-semibold mb-2">
                Profession
              </label>
              <select
                name="profession"
                value={formik.values.profession}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="p-2 py-[9px] rounded-md border-2 w-full text-[#440129] focus:border-[#440129]"
              >
                <option value="Waiter">Waiter</option>
                <option value="Chef">Chef</option>
              </select>
              {formik.errors.profession && formik.touched.profession && (
                <p className="form-error p-[2px] text-[0.65rem] text-rose-500">
                  {formik.errors.profession}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => formik.resetForm()}
              className="bg-[#440129] text-white py-2 px-4 rounded-md mr-2"
            >
              Reset
            </button>
            <button
              type="submit"
              className="bg-[#440129] text-white py-2 px-4 rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWaiterModalForm;
