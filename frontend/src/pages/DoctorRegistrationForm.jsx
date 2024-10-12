import React, { useState, useEffect } from "react";
import { User, Clock, DollarSign } from "lucide-react";
import api from "../api";
import axios from "axios";
import { NavLink } from "react-router-dom";

const DoctorRegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    image: null,
    days_of_week: [],
    name: "",
    address: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
    designation: "",
    specialist: [], // Changed from "" to []
    start_time: "",
    end_time: "",
    consultation_fee: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === "checkbox") {
      if (name === "days_of_week") {
        const updatedDays = checked
          ? [...formData.days_of_week, value]
          : formData.days_of_week.filter((day) => day !== value);
        setFormData({
          ...formData,
          days_of_week: updatedDays,
        });
      } else if (name === "specialist") {
        const updatedSpecialist = checked
          ? [...formData.specialist, value.toLowerCase().replace(/ /g, "_")]
          : formData.specialist.filter((special) => special !== value.toLowerCase().replace(/ /g, "_"));
        setFormData({
          ...formData,
          specialist: updatedSpecialist,
        });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("username", formData.username);
      formDataToSend.append("image", formData.image);
      formDataToSend.append("name", formData.name);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("confirm_password", formData.confirm_password);
      formDataToSend.append("designation", formData.designation.toLowerCase().replace(/ /g, "_"));
      formDataToSend.append("start_time", formData.start_time);
      formDataToSend.append("end_time", formData.end_time);
      formDataToSend.append("consultation_fee", formData.consultation_fee);
      formData.days_of_week.forEach(day => formDataToSend.append("days_of_week", day));
      formData.specialist.forEach(special => formDataToSend.append("specialist", special));
  
      const response = await axios.post(
        "http://127.0.0.1:8000/doctor-register/",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log("Registration successful:", response.data);
      <NavLink to={'/'}/>
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error.response.data);
      } else if (error.request) {
        console.error("No Response:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
    console.log("Form submitted:", formData);
  };

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const [designations, setDesignations] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const timeSlots = Array.from(
    { length: 24 },
    (_, i) => `${i.toString().padStart(2, "0")}:00`
  );

  useEffect(() => {
    fetch("http://127.0.0.1:8000/get-designations-and-specialists/")
      .then((response) => response.json())
      .then((data) => {
        const designationNames = data.designations.map(
          (designation) => designation[1]
        );
        const specializationNames = data.specialists.map(
          (specialist) => specialist[1]
        );

        setDesignations(designationNames);
        setSpecializations(specializationNames);
      })
      .catch((error) => {
        console.error("Error fetching designations and specializations:", error);
      });
  }, []);

  const inputClass =
    "w-full px-3 py-2 border rounded-lg transition duration-300 ease-in-out hover:border-blue-500 focus:border-blue-500 focus:outline-none";

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Doctor Registration
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Ready to serve people?
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 mt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Username */}
          <div>
            <label className="block mb-1 text-gray-600">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className={inputClass}
              required
            />
          </div>

          {/* Full Name */}
          <div>
            <label className="block mb-1 text-gray-600">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={inputClass}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={inputClass}
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-1 text-gray-600">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={inputClass}
              required
            />
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block mb-1 text-gray-600">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className={inputClass}
              required
            />
          </div>

          {/* Profile Image */}
          <div>
            <label className="block mb-1 text-gray-600">Profile Image</label>
            <input
              type="file"
              onChange={handleImageUpload}
              className={inputClass}
              accept="image/*"
            />
          </div>

          {/* Consultation Fee */}
          <div>
            <label className="block mb-1 text-gray-600">Consultation Fee</label>
            <div className="relative">
              <input
                type="number"
                name="consultation_fee"
                value={formData.consultation_fee}
                onChange={handleInputChange}
                className={`${inputClass} pl-8`}
                required
              />
              <DollarSign
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
            </div>
          </div>

          {/* Days Available */}
          <div className="md:col-span-2">
            <label className="block mb-1 text-gray-600">Days Available</label>
            <div className="flex flex-wrap gap-2">
              {daysOfWeek.map((day) => (
                <label key={day} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="days_of_week"
                    value={day}
                    checked={formData.days_of_week.includes(day)}
                    onChange={handleInputChange}
                    className="form-checkbox h-5 w-5 text-blue-500 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-600">{day}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Designation */}
          <div>
            <label className="block mb-1 text-gray-600">Designation</label>
            <select
              name="designation"
              value={formData.designation}
              onChange={handleInputChange}
              className={inputClass}
              required
            >
              <option value="">Select Designation</option>
              {designations.map((des) => (
                <option key={des} value={des}>
                  {des}
                </option>
              ))}
            </select>
          </div>

          {/* Specializations */}
          <div className="md:col-span-2">
            <label className="block mb-1 text-gray-600">Specializations</label>
            <div className="flex flex-wrap gap-2">
              {specializations.map((specialist, index) => (
                <label key={index} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="specialist"
                    value={specialist}
                    checked={formData.specialist.includes(specialist.toLowerCase())}
                    onChange={handleInputChange}
                    className="form-checkbox h-5 w-5 text-blue-500 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-600">{specialist}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Working Time Start */}
          <div>
            <label className="block mb-1 text-gray-600">
              Working Time Start
            </label>
            <select
              name="start_time"
              value={formData.start_time}
              onChange={handleInputChange}
              className={inputClass}
              required
            >
              <option value="">Select Start Time</option>
              {timeSlots.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          {/* Working Time End */}
          <div>
            <label className="block mb-1 text-gray-600">Working Time End</label>
            <select
              name="end_time"
              value={formData.end_time}
              onChange={handleInputChange}
              className={inputClass}
              required
            >
              <option value="">Select End Time</option>
              {timeSlots.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={inputClass}
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-1 text-gray-600">Confirm Password</label>
            <input
              type="password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleInputChange}
              className={inputClass}
              required
            />
          </div>
        </div>

        {/* Navigation Links */}
        <p className="text-center text-gray-600 text-xs mt-2">
          Already have an account?{" "}
          <a href="/doclogin" className="text-blue-500 hover:text-blue-800">
            Click Here
          </a>
        </p>
        <p className="text-center text-gray-600 text-xs mt-2">
          Are you a patient?{" "}
          <a href="/register" className="text-blue-500 hover:text-blue-800">
            Click Here
          </a>
        </p>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default DoctorRegistrationForm;
