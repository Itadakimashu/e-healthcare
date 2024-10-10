import React, { useState, useContext} from "react";
import { Calendar, Clock } from "lucide-react";
import { Alert } from "antd";
import { assets, doctors } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const DoctorCard = ({ name, specialty, experience, about, appointmentFee }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex">
    <div className="w-1/4">
      <div className="w-32 h-32 bg-blue-500 rounded-lg">
        <img src={assets.doc1} alt="" />
      </div>
    </div>
    <div className="w-3/4 ml-6">
      <h2 className="text-xl font-bold">{name}</h2>
      <p className="text-gray-600">
        {specialty} • {experience}
      </p>
      <p className="mt-2 text-sm text-gray-700">{about}</p>
      <p className="mt-2 text-sm">Appointment fee: ${appointmentFee}</p>
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
          : "bg-gray-200 text-gray-700 hover:bg-blue-100"
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
  const { doctors } = useContext(AppContext);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [alert, setAlert] = useState(null); // { type: 'success' | 'error', message: string }

  const handleDateSelect = (date) => {
    setSelectedDate(date === selectedDate ? null : date);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time === selectedTime ? null : time);
  };
  const handleModeSelect = (mode) => {
    setSelectedSlot(mode === selectedSlot ? null : mode);
  };

  const handleBooking = () => {
    if (selectedDate && selectedTime && selectedSlot) {
      // Prepare appointment details
      const appointmentDetails = {
        date: selectedDate,
        time: selectedTime,
        slot: selectedSlot,
      };

      console.log("Sending to backend:", appointmentDetails);

      // TODO: Replace the following with an actual API call using fetch or axios
      // Example using axios:
      /*
      axios.post('/api/appointments', appointmentDetails)
        .then(response => {
          setAlert({ type: 'success', message: 'Appointment Booked Successfully!' });
          setSelectedDate(null);
          setSelectedTime(null);
          setSelectedSlot(null);
        })
        .catch(error => {
          setAlert({ type: 'error', message: 'Failed to book appointment. Please try again.' });
        });
      */

      // For demonstration, we'll assume the booking is successful
      setAlert({ type: "success", message: "Appointment Booked!" });
      setSelectedDate(null);
      setSelectedTime(null);
      setSelectedSlot(null);

      // Hide the alert after 3 seconds
      setTimeout(() => setAlert(null), 3000);
    } else {
      setAlert({ type: "error", message: "Please select both date and time." });
      // Hide the alert after 3 seconds
      setTimeout(() => setAlert(null), 3000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <DoctorCard
        name="Dr. Richard James"
        specialty="MBBS • General Physician"
        experience="2 Years"
        about="Dr. James has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies."
        appointmentFee={50}
      />

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Booking slots</h3>
        <div className="grid grid-cols-7 gap-4">
          {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map(
            (day, index) => (
              <BookingSlot
                key={index}
                day={day}
                date={new Date().getDate() + index}
                isSelected={selectedDate === new Date().getDate() + index}
                onSelect={handleDateSelect}
              />
            )
          )}
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

      <button
        onClick={handleBooking}
        className="mt-8 w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200"
      >
        Book an appointment
      </button>

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
        <div className="w-full mt-5 grid grid-cols-1sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {doctors.slice(0,4).map((item, index) => (
            <div
              onClick={() => {navigate(`/appoinment/${item._id}`); scrollTo(0,0)}}
              key={index}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500"
            >
              <img className="bg-blue-50" src={item.image} alt={item.name} />
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-center text-green-500">
                  <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                  <p>Available</p>
                </div>
                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                <p className="text-gray-600 text-sm">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Appoinment;
