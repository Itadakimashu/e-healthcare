import "./App.css";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { Layout, Button } from "antd";
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
import Dashboard from "./pages/AdminPanel/Dashbored";
import Sidebar from "./pages/AdminPanel/Sidebar";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useState, useEffect, useContext } from "react";
import Appointments from "./pages/AdminPanel/Appointments";
import { assets } from "./assets/assets";
import Register from "./pages/Register";
import DoctorRegistrationForm from "./pages/DoctorRegistrationForm";
import DoctorLoginForm from "./pages/DoctorLoginForm";
import ProtectedRoute from "./components/ProtectedRoute";
import { AppContext } from "./context/AppContext";

const { Sider, Header, Content } = Layout;

const App = () => {
  const { whoLoggedIn, setwhoLoggedIn } = useContext(AppContext);
  const [collapsed, setCollapsed] = useState(false);

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
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const storedWhoLoggedIn = localStorage.getItem("whoLoggedIn");
    if (storedWhoLoggedIn) {
      setwhoLoggedIn(storedWhoLoggedIn);
    }
  }, [setwhoLoggedIn]);

  useEffect(() => {
    if (whoLoggedIn) {
      localStorage.setItem("whoLoggedIn", whoLoggedIn);
    }
  }, [whoLoggedIn]);

  const DynamicHeader = () => {
    const location = useLocation();

    let headerText = "Default Header";
    const adminRoutes = {
      "/dashboard": "Dashboard",
      "/appointments": "Appointments",
    };

    if (adminRoutes[location.pathname]) {
      headerText = adminRoutes[location.pathname];
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

  const logout = () => {
    localStorage.clear();
    setwhoLoggedIn(null);
    window.location.href = "/";
  };

  const Logout = () => {
    useEffect(() => {
      logout();
    }, []);
    return null;
  };

  const DoctorLayout = () => (
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
          <img src={assets.logo} alt="Logo" />
        </div>
        <Sidebar />
      </Sider>
      <Layout>
        <DynamicHeader />
        <Content style={{ margin: "16px" }}>
          <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
            <Routes>
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/appointments"
                element={
                  <ProtectedRoute>
                    <Appointments />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/logout"
                element={
                  <ProtectedRoute>
                    <Logout /> 
                  </ProtectedRoute>
                }
              />
              <Route
                path="*"
                element={<Navigate to="/dashboard" />}
              />
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
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/my-appoinments"
          element={
            <ProtectedRoute>
              <MyAppoinments />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/doclogin" element={<DoctorLoginForm />} />
        <Route path="/docregister" element={<DoctorRegistrationForm />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/my-profile"
          element={
            <ProtectedRoute>
              <MyProfile />
            </ProtectedRoute>
          }
        />
        <Route path="/appoinment/:docId" element={<Appoinment />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );

  return (
    <>
      {whoLoggedIn === "doctor" ? <DoctorLayout /> : <UserLayout />}
    </>
  );
};

export default App;
