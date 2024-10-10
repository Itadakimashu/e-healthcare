import React, { useState } from "react";
import { Layout, Menu, Table, Avatar } from "antd";
import cross_icon  from '../../assets/cross_icon.png';


const Appointments = () => {

  const appointments = [
    {
      key: "1",
      patient: "Richard James",
      department: "Cardiology",
      age: 28,
      dateTime: "24th July, 2024, 10:AM",
      doctor: "Dr. Richard James",
      fees: "$50",
    },
    {
      key: "2",
      patient: "Richard James",
      department: "Neurology",
      age: 28,
      dateTime: "24th July, 2024, 10:AM",
      doctor: "Dr. Richard James",
      fees: "$50",
    },
  ];

  const columns = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Patient",
      dataIndex: "patient",
      key: "patient",
      render: (text) => (
        <span>
          <Avatar
            src="https://xsgames.co/randomusers/avatar.php?g=pixel"
            style={{ marginRight: 8 }}
          />
          {text}
        </span>
      ),
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Date & Time",
      dataIndex: "dateTime",
      key: "dateTime",
    },
    {
      title: "Doctor",
      dataIndex: "doctor",
      key: "doctor",
      render: (text) => (
        <span>
          <Avatar
            src="https://xsgames.co/randomusers/avatar.php?g=pixel"
            style={{ marginRight: 8 }}
          />
          {text}
        </span>
      ),
    },
    {
      title: "Fees",
      dataIndex: "fees",
      key: "fees",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <button style={{ color: "red" }}>
          <img className="w-6 ml-3" src={cross_icon} alt="" />
        </button>
      ),
    },
  ];

  return (
    <div
      className="site-layout-background"
      style={{ padding: 24, minHeight: 360 }}
    >
      <h2>All Appointments</h2>
      <Table columns={columns} dataSource={appointments} />
    </div>
  );
};

export default Appointments;
