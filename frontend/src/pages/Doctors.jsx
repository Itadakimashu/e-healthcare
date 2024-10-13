import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Doctors = () => {
  const navigate = useNavigate();
  const { speciality } = useParams();
  const [doctors, setDoctors] = useState([]);
  const [filterDoc, setfilterDoc] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/doctors/")
      .then((res) => res.json())
      .then((data) => setDoctors(data));
  }, []);

  const [designations, setDesignations] = useState([]);
  const [specializations, setSpecializations] = useState([]);

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
        console.error(
          "Error fetching designations and specializations:",
          error
        );
      });
  }, []);

  const applyFilter = () => {
    if (speciality) {
      setfilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setfilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div>
      <p className="text-gray-600">Browse through the doctors specialist.</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <div className="flex flex-col gap-4 text-sm text-gray-600">
          {specializations.map((specialization, index) => (
            <p
              key={index}
              onClick={() =>
                specialization === specialization
                  ? navigate("/doctors")
                  : navigate(`/doctors/${specialization}`)
              }
              className={`w-full sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                speciality === specialization ? "bg-indigo-100 text-black" : ""
              }`}
            >
              {specialization}
            </p>
          ))}
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterDoc.map((item) => (
            <div
              onClick={() => navigate(`/appoinment/${item.id}`)}
              key={item.id}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500"
            >
              <img className="bg-blue-50" src={item.image} alt={item.name} />
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-center text-green-500">
                  <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                  <p>Available</p>
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

export default Doctors;