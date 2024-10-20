import React, { useEffect, useState } from 'react';
import { Layout, Menu, Card, Table, List, Avatar } from 'antd';
import earning_icon  from '../../assets_admin/earning_icon.svg';
import patients_icon  from '../../assets_admin/patients_icon.svg';
import appointments_icon  from '../../assets_admin/appointments_icon.svg';
import api from '../../api';

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await api.get('/api/appointments/');
        setAppointments(response.data);
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
      }
    };
    fetchAppointments();
  }, []);

  const columns = [
    {
      title: 'Doctor',
      dataIndex: 'doctor',
      key: 'doctor',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
  ];

  return (
    <>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
          <Card style={{ width: '30%' }}>
            <div className='flex items-center'>
              <img src={earning_icon} alt="" />
              <div className='ml-5'>
                <p>$256</p>
                <p>Earnings</p>
              </div>
            </div>
          </Card>
          <Card style={{ width: '30%' }}>

            <div className='flex items-center'>
              <img src={appointments_icon} alt="" />
              <div className='ml-5'>
              <p>2</p>
              <p>Appointments</p>
              </div>
            </div>
          </Card>
          <Card style={{ width: '30%' }}>

            <div className='flex items-center'>
              <img src={patients_icon} alt="" />
              <div className='ml-5'>
              <p>5</p>
              <p>Patients</p>
              </div>
            </div>
          </Card>
        </div>
        <Card title="Latest Appointments">
          <List
            itemLayout="horizontal"
            dataSource={appointments}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
                  title={item.patient.name}
                  description={`Booking on ${item.date}`}
                />
              </List.Item>
            )}
          />
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
