import "./App.css";
import React, { useEffect } from "react";
import Home from "./user/home/Home";
import Login from "./user/login/Login";
import About from "./user/about/About";
import Wallet from "./user/wallet/Wallet";
import Signup from "./user/signup/Signup";
import Newotp from "./user/newotp/Newotp";
import Mobile from "./user/mobile/Mobile";
import Contact from "./user/contact/Contact";
import Homee from "./components/homee/Homee";
import "bootstrap/dist/css/bootstrap.min.css";
import Service from "./user/servicee/Service";
import "react-toastify/dist/ReactToastify.css";
import "butteruptoasts/src/butterup.css";
import Dashbord from "./user/dashbord/Dashbord";
import Dashboard from "./admin/dashboard/Dashboard";
import OpenDemat from "./user/opendemate/OpenDemat";
import LinkBroker from "./user/linkbroker/LinkBroker";
import ReferEarn from "./user/referandearn/ReferEarn";
import Mystrategies from "./makestrategies/Mystrategies";
import UserHistory from "./user/userhistory/UserHistory";
import ManageTrading from "./user/managetrading/ManageTrading";
import {
  createHashRouter,
  Route,
  Routes,
  HashRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Forgotpassword from "./user/forgotpassword/Forgotpassword";
import CustomStrategies from "./user/customstrategies/CustomStrategies";
import {ExpertStrategy} from "./user/expertstrategies/ExpertStrategy";

import { ToastContainer } from "react-toastify";
import { Circles } from "react-loader-spinner";
import { useSelector } from "react-redux";
import axios from "axios";
import ProtectedRoute from "./user/features/auth/ProtectedRoute.js";
import AdminLayout from "./algoAdmin/layouts/AdminLayout.jsx";
import AdminLogin from "./algoAdmin/pages/AdminLogin.jsx";
import { default as AdminDashboard } from "./algoAdmin/pages/Dashboard.jsx";
import Users from "./algoAdmin/pages/Users.jsx";
import AdminSettings from "./algoAdmin/pages/AdminSettings.jsx";
import AdminProtectedRoute from "./algoAdmin/routes/AdminProtectedRoutes.js";
import Subscriptions from "./algoAdmin/pages/Subscriptions.jsx";
import {CreateStretegy} from "./algoAdmin/pages/CreateStretegy.jsx";
import {AllStretegy} from "./algoAdmin/pages/AllStretegy.jsx";
import {Plans}  from "./algoAdmin/pages/plans"
import {ManagePlans}  from "./algoAdmin/pages/managePlans"
import Profile from "./user/profile/Profile.js"
import {Subscription}  from "./user/subscription/subscription"

const router = createHashRouter([
  { path: "/", element: <Homee /> },
  { path: "/mobile", element: <Mobile /> },
  { path: "/login", element: <Login /> },
  { path: "/wallet", element: <Wallet /> },
  { path: "/about", element: <About /> },
  { path: "/signup", element: <Signup /> },
  { path: "/dashboard", element: <Dashbord /> },
  { path: "/opendemate", element: <OpenDemat /> },
  { path: "/refer&earn", element: <ReferEarn /> },
  { path: "/linkbroker", element: <LinkBroker /> },
  { path: "/admindashboard", element: <Dashboard /> },
  { path: "/custom", element: <CustomStrategies /> },
  { path: "/expertstrategy", element: <ExpertStrategy /> },
  { path: "/subscription", element: <Subscription /> },
 
  { path: "/My-strategy", element: <Mystrategies /> },
  { path: "/userhistory", element: <UserHistory /> },
  { path: "/managetrading", element: <ManageTrading /> },
  { path: "/service", element: <Service /> },
  { path: "/contact-us", element: <Contact /> },
  { path: "/forgotpassword", element: <Forgotpassword /> },
  { path: "/newotp", element: <Newotp /> },
  { path: "/Profile", element: <Profile /> },
 
  { path: "*", element: <Navigate to="/" /> }, // Handle unknown routes
]);

function App() {
  const loading = useSelector((store) => store?.auth?.loading);
  const loading_Stretegy = useSelector((store) => store?.index?.loading);

  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* Global Loader */}
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <Circles
            height="100"
            width="100"
            color="white"
            ariaLabel="circles-loading"
            visible={true}
          />
        </div>
      )}

      {/* Global Loader */}
      {loading_Stretegy && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <Circles
            height="100"
            width="100"
            color="white"
            ariaLabel="circles-loading"
            visible={true}
          />
        </div>
      )}

      {/* <RouterProvider router={router} />; */}

      <HashRouter basename="/">
        <Routes>
          
          <Route path="*" element={<Navigate to="/" />} />
          
          <Route path="/" element={<Homee />} />
          <Route path="/mobile" element={<Mobile />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/wallet"
            element={
              <ProtectedRoute>
                <Wallet />
              </ProtectedRoute>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>  
                <Dashbord />
              </ProtectedRoute>
            }
          />
          <Route path="/opendemate" element={<OpenDemat />} />
          <Route
            path="/Profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/refer&earn"
            element={
              <ProtectedRoute>
                <ReferEarn />
              </ProtectedRoute>
            }
          />
          <Route
            path="/linkbroker"
            element={
              <ProtectedRoute>
                <LinkBroker />
              </ProtectedRoute>
            }
          />
          {/* <Route
            path="/admindashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          /> */}

          <Route
            path="/custom"
            element={
              <ProtectedRoute>
                <CustomStrategies />
              </ProtectedRoute>
            }
          />
          <Route
            path="/expertstrategy"
            element={
              <ProtectedRoute>
                <ExpertStrategy />
              </ProtectedRoute>
            }
          />
          
         
          <Route
            path="/My-strategy"
            element={
              <ProtectedRoute>
                <Mystrategies />
              </ProtectedRoute>
            }
          />
          <Route
            path="/userhistory"
            element={
              <ProtectedRoute>
                <UserHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/managetrading"
            element={
              <ProtectedRoute>
                <ManageTrading />
              </ProtectedRoute>
            }
          />
          <Route
            path="/service"
            element={
              <ProtectedRoute>
                <Service />
              </ProtectedRoute>
            }
          />
          <Route
            path="/subscription"
            element={
              <ProtectedRoute>
                <Subscription />
              </ProtectedRoute>
            }
          />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/forgotpassword" element={<Forgotpassword />} />
          <Route path="/newotp" element={<Newotp />} />


{/* admin stuff */}
<Route path="/admin" element={<AdminLogin />} />
        <Route element={<AdminProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admindashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/adminstrategies" element={<AllStretegy />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/createStretegy" element={<CreateStretegy />} />
            <Route path="/Plans" element={<Plans />} />
            <Route path="/managePlans" element={<ManagePlans />} />

          </Route>
        </Route>



        </Routes>
      </HashRouter>
    </>
  );
}
export default App;
