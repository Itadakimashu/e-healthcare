import React from 'react';

const MyAppointments = () => {
  const appointments = [
    {
      id: 1,
      doctor: 'Dr. Richard James',
      specialty: 'General physician',
      address: '57th Cross, Richmond Circle, Church Road, London',
      mode: 'Online',
      dateTime: '25, July, 2024 | 6:30 PM',
      status: 'upcoming'
    },
    {
      id: 2,
      doctor: 'Dr. Richard James',
      specialty: 'General physician',
      address: '57th Cross, Richmond Circle, Church Road, London',
      dateTime: '25, July, 2024 | 6:30 PM',
      status: 'pending'
    },
    {
      id: 3,
      doctor: 'Dr. Richard James',
      specialty: 'General physician',
      address: '57th Cross, Richmond Circle, Church Road, London',
      dateTime: '25, July, 2024 | 8:30 PM',
      status: 'paid'
    }
  ];

  return (
    <div className="my-appointments">
      <h1 className='text-center text-3xl font-extrabold text-gray-900 mb-6'>My Appointments</h1>
      <hr />
      {appointments.map((appointment) => (
        <div key={appointment.id} className="appointment-card">
          <div className="doctor-info">
            <img src="https://xsgames.co/randomusers/avatar.php?g=male" alt={appointment.doctor} className="doctor-image" />
            <div>
              <h2>{appointment.doctor}</h2>
              <p>{appointment.specialty}</p>
              <p>Address:</p>
              <p>{appointment.address}</p>
              <p>Mode: {appointment.mode}</p>
              <p>Date & Time: {appointment.dateTime}</p>
            </div>
          </div>
          <div className="appointment-actions">
            {appointment.status === 'upcoming' && (
              <>
              <button className="bg-green-600 hover:bg-yellow-300">Join</button>
              <button className="cancel-btn hover:bg-red-500">Cancel appointment</button>
              </>
            )}
            {appointment.status === 'pending' && (
              <>
                <button className="pay-btn hover:bg-green-500">Pay Now</button>
                <button className="cancel-btn">Cancel appointment</button>
              </>
            )}
            {appointment.status === 'paid' && (
              <>
                <button className="paid-btn" disabled>Paid</button>
                <button className="cancel-btn">Cancel appointment</button>
              </>
            )}
          </div>
        </div>
      ))}
      <style jsx>{`
        .my-appointments {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        .appointment-card {
          display: flex;
          justify-content: space-between;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 20px;
        }
        .doctor-info {
          display: flex;
        }
        .doctor-image {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          margin-right: 20px;
        }
        .appointment-actions {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        button {
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 10px;
        }
        .cancel-btn {
          background-color: #f0f0f0;
          color: #333;
        }
        .pay-btn {
          background-color: #4c6fff;
          color: white;
        }
        .paid-btn {
          background-color: #4c6fff;
          color: white;
          opacity: 0.7;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default MyAppointments;