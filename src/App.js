import "./App.css";
import React from "react";
import Home from "./user/home/Home";
import Login from "./user/login/Login";
import Wallet from "./user/wallet/Wallet";
import Signup from "./user/signup/Signup";
import Newotp from "./user/newotp/Newotp";
import Mobile from "./user/mobile/Mobile";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Dashbord from "./user/dashbord/Dashbord";
import Dashboard from "./admin/dashboard/Dashboard";
import OpenDemat from "./user/opendemate/OpenDemat";
import LinkBroker from "./user/linkbroker/LinkBroker";
import ReferEarn from "./user/referandearn/ReferEarn";
import UserHistory from "./user/userhistory/UserHistory";
import ManageTrading from "./user/managetrading/ManageTrading";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Forgotpassword from "./user/forgotpassword/Forgotpassword";
import CustomStrategies from "./user/customstrategies/CustomStrategies";
import Homee from "./components/homee/Homee";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Homee />} />
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mobile" element={<Mobile />} />
        <Route path="/newotp" element={<Newotp />} />
        <Route path="/dashbord" element={<Dashbord />} />
        <Route path="/opendemate" element={<OpenDemat />} />
        <Route path="/refer&earn" element={<ReferEarn />} />
        <Route path="/linkbroker" element={<LinkBroker />} />
        <Route path="/admindashboard" element={<Dashboard />} />
        <Route path="/custom" element={<CustomStrategies />} />
        <Route path="/userhistory" element={<UserHistory />} />
        <Route path="/managetrading" element={<ManageTrading />} />
        <Route path="/forgotpassword" element={<Forgotpassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default React.memo(App);
