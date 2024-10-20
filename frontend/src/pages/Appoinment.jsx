import React, { useState, useContext, useEffect } from "react";
import { Calendar, Clock } from "lucide-react";
import { Alert } from "antd";
import { assets, doctors } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants";
import { nextDay } from "date-fns";
import axios from "axios";
import api from "../api";

const DoctorCard = ({
  name,
  image,
  specialty,
  experience,
  about,
  appointmentFee,
}) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex">
    <div className="w-1/4">
      <div className="w-40 rounded-lg">
        <img src={image} alt="" />
      </div>
    </div>
    <div className="w-3/4 ml-6">
      <h2 className="text-xl font-bold">{name}</h2>
      <p className="text-gray-600">
        {specialty} • {experience}
      </p>
      <p className="mt-2 text-sm text-gray-700">{about}</p>
      <p className="mt-2 text-sm">Appointment fee: ৳{appointmentFee}</p>
    </div>
  </div>
);

const BookingSlot = ({ day, date, isSelected, onSelect }) => (
  <div className="text-center">
    <p className="font-semibold">{day}</p>
    <button
      onClick={() => onSelect(date)}
      className={`text-xl font-bold rounded-full w-10 h-10 flex items-center justify-center mx-auto my-2 transition-colors duration-200 ${
        isSelected
          ? "bg-blue-500 text-white"
          : "bg-gray-200 text-gray-700 hover:bg-blue-500"
      }`}
    >
      {date}
    </button>
  </div>
);

const TimeSlots = ({ slots, onSelect, selectedTime }) => (
  <div className="col-span-7 mt-4">
    <div className="flex justify-center space-x-4">
      {slots.map((slot, index) => (
        <button
          key={index}
          onClick={() => onSelect(slot)}
          className={`px-4 py-2 text-sm border rounded-full transition-colors duration-200 ${
            selectedTime === slot
              ? "bg-blue-500 text-white"
              : "hover:bg-blue-500 hover:text-white"
          }`}
        >
          {slot}
        </button>
      ))}
    </div>
  </div>
);

const OnlineorOffline = ({ slots, onSelect, selectedSlot }) => (
  <div className="col-span-7 mt-4">
    <div className="flex justify-center space-x-4">
      {slots.map((slot, index) => (
        <button
          key={index}
          onClick={() => onSelect(slot)}
          className={`px-4 py-2 text-sm border rounded-full transition-colors duration-200 ${
            selectedSlot === slot
              ? "bg-blue-500 text-white"
              : "hover:bg-blue-500 hover:text-white"
          }`}
        >
          {slot}
        </button>
      ))}
    </div>
  </div>
);

const RelatedDoctor = ({ name, specialty, available }) => (
  <div className="text-center">
    <div className="w-24 h-24 bg-gray-300 rounded-lg mx-auto mb-2"></div>
    <p className={`text-xs ${available ? "text-green-500" : "text-red-500"}`}>
      {available ? "• Available" : "• Unavailable"}
    </p>
    <p className="font-semibold">{name}</p>
    <p className="text-xs text-gray-600">{specialty}</p>
  </div>
);

const Appoinment = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [doctor, setDoctor] = useState([]);
  const [relatedDoctors, setRelatedDoctors] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [alert, setAlert] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/doctors/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setDoctor(data);
        // Fetch related doctors
        if (data.specialist && data.specialist.length > 0) {
          fetch(
            `${API_BASE_URL}/api/doctors?specialty=${data.specialist[0].name}`
          )
            .then((res) => res.json())
            .then((relatedData) => setRelatedDoctors(relatedData));
        }
      })
      .catch((error) => {
        console.error("Error fetching doctor data:", error);
        setAlert({
          type: "error",
          message: "Failed to load doctor information.",
        });
      });
  }, [id, API_BASE_URL]);

  const getNextDate = (dayName) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayIndex = days.indexOf(dayName);
    if (dayIndex === -1) return null;
    return nextDay(new Date(), dayIndex);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date === selectedDate ? null : date);
    setSelectedTime(null);
    setSelectedSlot(null);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time === selectedTime ? null : time);
    setSelectedSlot(null);
  };

  const handleModeSelect = (mode) => {
    setSelectedSlot(mode === selectedSlot ? null : mode);
  };

  const handleBooking = async () => {
    if (selectedDate) {  // Ensure a date is selected
      const day = selectedDate.toLocaleDateString("en-US", { weekday: "long" });
      const formattedDate = selectedDate.toISOString().split("T")[0]; // Use yyyy-mm-dd format
      const patientId = parseInt(localStorage.getItem("user id"), 10);
      if (isNaN(patientId)) {
        setAlert({ type: "error", message: "Invalid patient ID." });
        setTimeout(() => setAlert(null), 3000);
        return;
      }
  
      const appointmentDetails = {
        doctor_id: doctor.id,
        user_id: patientId,
        day: day,
        date: formattedDate,
        // time: selectedTime, // Uncomment if time is needed
      };
  
      console.log("Sending to backend:", appointmentDetails);
  
      try {
        const response = await api.post("/create-appointment/", appointmentDetails);
        setAlert({
          type: "success",
          message: "Appointment Booked Successfully!",
        });
        setSelectedDate(null);
        setSelectedTime(null);
      } catch (error) {
        console.error("Error response:", error.response);
        
        const validationErrors = error.response?.data; // Adjust based on your API response structure
        let errorMessage = "Failed to book appointment. Please try again.";
  
        if (validationErrors) {
          errorMessage = Object.entries(validationErrors)
            .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
            .join("; ");
        }
  
        setAlert({
          type: "error",
          message: errorMessage,
        });
      }
  
      setTimeout(() => setAlert(null), 3000);
    } else {
      setAlert({ type: "error", message: "Please select both date and time." });
      setTimeout(() => setAlert(null), 3000);
    }
  };
  
  

  return (
    <div className="max-w-4xl mx-auto p-6">
      {
        <DoctorCard
          name={doctor.name}
          image={doctor.image}
          specialty={
            Array.isArray(doctor.specialist)
              ? doctor.specialist.map((spec, index) => (
                  <span key={index}>
                    {spec.name.charAt(0).toUpperCase() + spec.name.slice(1)}
                    {index < doctor.specialist.length - 1 ? ", " : ""}
                  </span>
                ))
              : "N/A"
          }
          experience="2 Years"
          about={`${doctor.name} has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.`}
          appointmentFee={doctor.consultation_fee}
        />
      }

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Booking slots</h3>
        <div className="grid grid-cols-7 gap-4">
          {doctor.work_times &&
            doctor.work_times.length > 0 &&
            doctor.work_times[0].days_of_week.map((day, index) => {
              const nextDate = getNextDate(day.name);
              const displayDate = nextDate ? nextDate.getDate() : "N/A";
              return (
                <BookingSlot
                  key={index}
                  day={day.name}
                  date={displayDate}
                  isSelected={
                    selectedDate &&
                    nextDate &&
                    selectedDate.getTime() === nextDate.getTime()
                  }
                  onSelect={() => handleDateSelect(nextDate)}
                />
              );
            })}
          {selectedDate && (
            <TimeSlots
              slots={["9:00 am", "2:30 pm", "4:30 pm"]}
              onSelect={handleTimeSelect}
              selectedTime={selectedTime}
            />
          )}
          {selectedDate && selectedTime && (
            <OnlineorOffline
              slots={["Online", "Offline"]}
              onSelect={handleModeSelect}
              selectedSlot={selectedSlot}
            />
          )}
        </div>
      </div>

      {localStorage.getItem(ACCESS_TOKEN) ? (
        <button
          onClick={handleBooking}
          className="mt-8 w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200"
        >
          Book an appointment
        </button>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="mt-8 w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200"
        >
          Book an appointment
        </button>
      )}

      {alert && (
        <Alert
          message={alert.type === "success" ? "Success" : "Error"}
          description={alert.message}
          type={alert.type}
          showIcon
          style={{ marginTop: "16px" }}
        />
      )}

      <div className="mt-12">
        <h3 className="text-lg font-semibold mb-4 text-center">
          Related Doctors
        </h3>
        <p className="text-sm text-gray-600 mb-4 text-center">
          Simply browse through our extensive list of trusted doctors.
        </p>
        <hr />
        <div className="w-full mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {relatedDoctors.map((item, index) => (
            <div
              onClick={() => {
                navigate(`/appoinment/${item.id}`);
                window.scrollTo(0, 0);
              }}
              key={index}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-transform duration-500"
            >
              <img
                className="bg-blue-50 w-full h-48 object-cover"
                src={item.image}
                alt={item.name}
              />
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-center text-green-500">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Available</span>
                </div>
                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                <p className="text-gray-600 text-sm">
                  {item.specialist.map((spec, index) => (
                    <span key={index}>
                      {spec.name.charAt(0).toUpperCase() + spec.name.slice(1)}
                      {index < item.specialist.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Appoinment;
