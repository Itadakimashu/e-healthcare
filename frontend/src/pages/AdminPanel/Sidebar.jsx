import React, { useState } from "react";
import { Layout, Menu, Card, Table, List, Avatar } from "antd";
import {
  DashboardOutlined,
  CalendarOutlined,
  UserAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      className="sidebar-container"
      style={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          <Link to="/">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<CalendarOutlined />}>
          <Link to="/appointments">Appointments</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<UserAddOutlined />}>
          <Link to="/edit-profile">Edit Profile</Link>
        </Menu.Item>
      </Menu>
      <div className="logout-container">
        <Menu theme="dark" mode="inline">
          <Menu.Item key="4" icon={<LogoutOutlined />}>
            <Link to="/logout">Logout</Link>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
};

export default Sidebar;
