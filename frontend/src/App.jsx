import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { Layout, Button } from "antd";
// import 'antd/dist/antd.css';
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import About from "./pages/About";
import MyProfile from "./pages/MyProfile";
import MyAppoinments from "./pages/MyAppoinments";
import Appoinment from "./pages/Appoinment";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./pages/AdminPanel/Dashbored"; // Fixed typo
import Sidebar from "./pages/AdminPanel/Sidebar";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import Appointments from "./pages/AdminPanel/Appointments";
import AddDoctor from "./pages/AdminPanel/AddDoctor";
import DoctorList from "./pages/AdminPanel/DoctorList";
import { assets } from "./assets/assets";
import Register from "./pages/Register";
import DoctorRegistrationForm from "./pages/DoctorRegistrationForm";
import DoctorLoginForm from "./pages/DoctorLoginForm";
import ProtectedRoute from "./components/ProtectedRoute";

const { Sider, Header, Content } = Layout;

const App = () => {
  const [isLoggedInAdmin, setIsAdminLoggedIn] = useState(false);

  const [collapsed, setCollapsed] = useState(window.innerWidth < 768); 

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const DynamicHeader = () => {
    const location = useLocation();

    let headerText = "Default Header";
    if (location.pathname === "/") {
      headerText = "Dashboard";
    } else if (location.pathname === "/add-doctor") {
      headerText = "Add Doctor";
    }
     else if (location.pathname === "/appointments") {
      headerText = "Appointments";
    }
    else if (location.pathname === "/doctor-list") {
      headerText = "Doctor List";
    }

    return (
      <Header
        style={{
          background: "#fff",
          padding: "0 16px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Button
          type="primary"
          onClick={toggleCollapsed}
          style={{ marginLeft: 16, marginRight: 15 }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <h2 style={{ margin: 0 }}>{headerText}</h2>
      </Header>
    );
  };

  const AdminLayout = () => (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={toggleCollapsed}
        className="sidebar"
      >
        <div
          className="logo"
          style={{
            height: "32px",
            margin: "16px",
            background: "rgba(255, 255, 255, 0.3)",
          }}
        >
          {/* Logo Placeholder */}
          {/* <Logo /> */}
          <img src={assets.logo} alt="" />
        </div>
        <Sidebar />
      </Sider>
      <Layout>
        <DynamicHeader />
        <Content style={{ margin: "16px" }}>
          <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/add-doctor" element={<AddDoctor />} />
              <Route path="/doctor-list" element={<DoctorList />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Layout>
  );

  const UserLayout = () => (
    <div className="mx-4 sm:mx-[10%]">
      <Navbar />
      <Routes>
      <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dd" element={<MyAppoinments/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/docregister" element={<DoctorRegistrationForm/>} />
        <Route path="/doclogin" element={<DoctorLoginForm/>} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-appoinments" element={<MyAppoinments />} />
        <Route path="/appoinment/:docId" element={<Appoinment />} />
      </Routes>
      
      <Footer />
    </div>
  );

  if (isLoggedInAdmin) {
    return <AdminLayout />;
  }

  return <UserLayout />;
};

export default App;
