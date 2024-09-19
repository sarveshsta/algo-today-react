import "./App.css";
import React from "react";
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
import Dashbord from "./user/dashbord/Dashbord";
import Dashboard from "./admin/dashboard/Dashboard";
import OpenDemat from "./user/opendemate/OpenDemat";
import LinkBroker from "./user/linkbroker/LinkBroker";
import ReferEarn from "./user/referandearn/ReferEarn";
import Mystrategies from "./makestrategies/Mystrategies";
import UserHistory from "./user/userhistory/UserHistory";
import ManageTrading from "./user/managetrading/ManageTrading";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Forgotpassword from "./user/forgotpassword/Forgotpassword";
import CustomStrategies from "./user/customstrategies/CustomStrategies";
import { ToastContainer } from "react-toastify";

function App() {
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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homee />} />
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/mobile" element={<Mobile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashbord />} />
          <Route path="/opendemate" element={<OpenDemat />} />
          <Route path="/refer&earn" element={<ReferEarn />} />
          <Route path="/linkbroker" element={<LinkBroker />} />
          <Route path="/admindashboard" element={<Dashboard />} />
          <Route path="/custom" element={<CustomStrategies />} />
          <Route path="/My-strategy" element={<Mystrategies />} />
          <Route path="/userhistory" element={<UserHistory />} />
          <Route path="/managetrading" element={<ManageTrading />} />
          <Route path="/service" element={<Service />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/forgotpassword" element={<Forgotpassword />} />
          <Route path="/newotp" element={<Newotp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default React.memo(App);
