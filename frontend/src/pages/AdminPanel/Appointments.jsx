import React, { useState, useEffect } from "react";
import { Table, Avatar, Button, message, Modal } from "antd";
import { RightOutlined, CloseOutlined, CheckOutlined } from "@ant-design/icons";
import axios from "axios";
import api from "../../api"; // Ensure this is correctly configured

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Base API URL (use environment variables in production)
  const API_URL = "/api/appointments/";

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const response = await api.get(API_URL);
        const data = response.data;
        console.log("Fetched Appointments:", data); // Verify data structure

        const transformedData = data.map((appointment) => ({
          key: appointment.id, // Ensure 'id' exists
          id: appointment.id, // Assign 'id'
          patientName: appointment.patient?.name || "N/A",
          symptoms: appointment.symptoms || "N/A",
          dateTime: `${appointment.date} ${appointment.day}`,
          fees: appointment.doctor?.consultation_fee || "N/A",
          status: appointment.status || "N/A",
        }));
        // console.log(transformedData[0].id)

        setAppointments(transformedData);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
        message.error("Failed to fetch appointments.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [API_URL]);

  // Handle Cancel Action
  const handleCancel = (record) => {
    Modal.confirm({
      title: "Are you sure you want to cancel this appointment?",
      onOk: async () => {
        try {
          const appointmentId = record.id; // Use 'id' directly
          console.log("Cancelling Appointment ID:", appointmentId);
          await api.delete(`${API_URL}${appointmentId}/`);
          message.success("Appointment canceled successfully.");
          setAppointments((prev) =>
            prev.filter((appointment) => appointment.id !== appointmentId)
          );
        } catch (error) {
          console.error("Failed to cancel appointment:", error);
          message.error("Failed to cancel appointment.");
        }
      },
    });
  };

  // Handle Start Action
  const handleStart = (record) => {
    Modal.confirm({
      title: "Are you sure you want to start this appointment?",
      onOk: async () => {
        try {
          const appointmentId = record.id; // Use 'id' directly
          const updatedStatus = { status: "running" };
          await axios.put(
            `http://127.0.0.1:8000/update-appointment/${appointmentId}/`,
            updatedStatus
          );
          message.success("Appointment status updated to running.");
          // Update the appointment's status in the state
          setAppointments((prev) =>
            prev.map((appointment) =>
              appointment.id === appointmentId
                ? { ...appointment, status: "running" }
                : appointment
            )
          );
        } catch (error) {
          console.error("Failed to update appointment status:", error);
          message.error("Failed to update appointment status.");
        }
      },
    });
  };

  const handleComplete = (record) => {
    Modal.confirm({
      title: "Are you sure you want to mark this appointment as complete?",
      onOk: async () => {
        try {
          const appointmentId = record.id; // Ensure 'id' is correctly mapped
          const updatedStatus = { status: "completed" };
          await axios.put(`http://127.0.0.1:8000/update-appointment/${appointmentId}/`, updatedStatus);
          message.success("Appointment status updated to completed.");
          // Update the appointment's status in the state
          setAppointments((prev) =>
            prev.map((appointment) =>
              appointment.id === appointmentId
                ? { ...appointment, status: "completed" }
                : appointment
            )
          );
        } catch (error) {
          console.error("Failed to update appointment status:", error);
          message.error("Failed to update appointment status.");
        }
      },
    });
  };
  const columns = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
      width: 50,
      fixed: "left",
    },
    {
      title: "Patient",
      dataIndex: "patientName",
      key: "patientName",
      render: (text, record) => (
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
      title: "Symptoms",
      dataIndex: "symptoms",
      key: "symptoms",
    },
    {
      title: "Date & Time",
      dataIndex: "dateTime",
      key: "dateTime",
    },
    {
      title: "Fees",
      dataIndex: "fees",
      key: "fees",
      render: (fees) => `৳ ${fees}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          style={{
            color:
              status === "pending"
                ? "orange"
                : status === "completed"
                ? "green"
                : status === "running"
                ? "blue"
                : "red",
          }}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "8px" }}>
          {/* Start Button */}
          {record.status !== "running" && record.status !== "completed" && (
            <Button
              type="primary"
              icon={<RightOutlined />}
              onClick={() => handleStart(record)}
            >
              Start
            </Button>
          )}
          {record.status === "running" && (
            <Button
              type="success"
              icon={<CheckOutlined />}
              onClick={() => handleComplete(record)}
            >
              Complete
            </Button>
          )}
          {/* Cancel Button */}
          {record.status !== "canceled" && record.status !== "completed" && (
            <Button
              type="danger"
              icon={<CloseOutlined />}
              onClick={() => handleCancel(record)}
            >
              Cancel
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div
      className="site-layout-background"
      style={{ padding: 24, minHeight: 360 }}
    >
      <h2>All Appointments</h2>
      <Table
        rowKey="id" // Specify 'id' as the unique key
        columns={columns}
        dataSource={appointments}
        loading={loading}
        pagination={{ pageSize: 10 }}
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default Appointments;
