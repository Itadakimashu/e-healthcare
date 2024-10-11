import React, { useState, useEffect } from "react";
import { User, Clock, DollarSign } from "lucide-react";

const DoctorRegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    image: null,
    daysAvailable: [],
    fullName: "",
    address: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    designation: "",
    specialization: "",
    workingTimeStart: "",
    workingTimeEnd: "",
    fee: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      const updatedDays = checked
        ? [...formData.daysAvailable, value]
        : formData.daysAvailable.filter((day) => day !== value);

      const updateSpecialization = checked?
      [...formData.specialization, value]
      : formData.specialization.filter((special) => specialization !== value);
      setFormData({ ...formData, daysAvailable: updatedDays, specialization: updateSpecialization  });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add form submission logic here
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
  const [designations, setdesignations] = useState([]);
  const [specializations, setspecializations] = useState([]);
  const timeSlots = Array.from(
    { length: 24 },
    (_, i) => `${i.toString().padStart(2, "0")}:00`
  );

  const handlespecializations = () => {
    setspecializations(specializations === setspecializations ? null : specializations)
  };
  useEffect(() => {
    fetch("http://127.0.0.1:8000/get-designations-and-specialists/")
      .then((response) => response.json())
      .then((data) => {
        // Extract the second element (human-readable part) from each array
        const designationNames = data.designations.map(
          (designation) => designation[1]
        );
        const specializationNames = data.specialists.map(
          (specialist) => specialist[1]
        );

        setdesignations(designationNames);
        setspecializations(specializationNames);
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
          Ready to serve pepole?
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 mt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <div>
            <label className="block mb-1 text-gray-600">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className={inputClass}
              required
            />
          </div>
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
          <div>
            <label className="block mb-1 text-gray-600">Profile Image</label>
            <input
              type="file"
              onChange={handleImageUpload}
              className={inputClass}
              accept="image/*"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-600">Consultation Fee</label>
            <div className="relative">
              <input
                type="number"
                name="fee"
                value={formData.fee}
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
          <div className="md:col-span-2">
            <label className="block mb-1 text-gray-600">Days Available</label>
            <div className="flex flex-wrap gap-2">
              {daysOfWeek.map((day) => (
                <label key={day} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="daysAvailable"
                    value={day}
                    checked={formData.daysAvailable.includes(day)}
                    onChange={handleInputChange}
                    className="form-checkbox h-5 w-5 text-blue-500 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-600">{day}</span>
                </label>
              ))}
            </div>
          </div>
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
          <div className="md:col-span-2">
            <label className="block mb-1 text-gray-600">Specializations</label>
            <div className="flex flex-wrap gap-2">
              {specializations.map((specialization, index) => (
                <label key={index} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="specialization"
                    value={specialization}
                    checked={formData.specialization.includes(specialization)}
                    onChange={handleInputChange}
                    onClick={handlespecializations}
                    className="form-checkbox h-5 w-5 text-blue-500 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-600">{specialization}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block mb-1 text-gray-600">
              Working Time Start
            </label>
            <select
              name="workingTimeStart"
              value={formData.workingTimeStart}
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
          <div>
            <label className="block mb-1 text-gray-600">Working Time End</label>
            <select
              name="workingTimeEnd"
              value={formData.workingTimeEnd}
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
          <div>
            <label className="block mb-1 text-gray-600">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={inputClass}
              required
            />
          </div>
        </div>
        <p className="text-center text-gray-600 text-xs mt-2">
          Already have an account?{" "}
          <a href="/doclogin" className="text-blue-500 hover:text-blue-800">
            Click Here
          </a>
        </p>
        <p className="text-center text-gray-600 text-xs mt-2">
          Are you are a patient?{" "}
          <a href="/register" className="text-blue-500 hover:text-blue-800">
            Click Here
          </a>
        </p>

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
