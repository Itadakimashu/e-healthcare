import React, { useState } from "react";
import { Layout, Menu, Card, Table, List, Avatar } from "antd";
import {
  DashboardOutlined,
  CalendarOutlined,
  UserAddOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
      <Menu.Item key="1" icon={<DashboardOutlined />}>
        <Link to='/'>Dashboard</Link> 
      </Menu.Item>
      <Menu.Item key="2" icon={<CalendarOutlined />}>
        <Link to='/appointments'>Appointments</Link> 
      </Menu.Item>
      <Menu.Item key="3" icon={<UserAddOutlined />}>
        <Link to='/add-doctor'>Add Doctor</Link> 
      </Menu.Item>
      <Menu.Item key="4" icon={<TeamOutlined />}>
        <Link to='/doctor-list'>Doctors List</Link> 
      </Menu.Item>
    </Menu>
  );
};

export default Sidebar;
