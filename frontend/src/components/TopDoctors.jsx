import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {
    const navigate = useNavigate()
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
      fetch("http://127.0.0.1:8000/api/doctors/")
        .then((res) => res.json())
        .then((data) => setDoctors(data));
    }, []);
  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
      <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
      <p className='sm:w-1/3 text-center text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
      {doctors.slice(0,10).map((item) => (
            <div
              onClick={() => {
                navigate(`/appoinment/${item.id}`);
                window.scrollTo(0, 0);
              }}
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
      <button onClick={()=>{navigate('/doctors/'); scrollTo(0,0)}} className='text-gray-600 mt-10 px-4 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300'>More</button>
    </div>
  )
}

export default TopDoctors