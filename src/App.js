import "./App.css";
import Home from "./user/Home";
import Wallet from "./user/Wallet";
import ReferEarn from "./user/ReferEarn";
import OpenDemat from "./user/OpenDemat";
import LinkBroker from "./user/LinkBroker";
import UserHistory from "./user/UserHistory";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashbord from "./user/dashbord/Dashbord";
import ManageTrading from "./user/ManageTrading";
import Signup from "./user/signup/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./user/login/Login";
import Otp from "./user/otp/Otp";
import Newotp from "./user/newotp/Newotp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashbord" element={<Dashbord />} />
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Otp />} />
        <Route path="/newotp" element={<Newotp />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/opendemate" element={<OpenDemat/>} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/refer&earn" element={<ReferEarn />} />
        <Route path="/linkbroker" element={<LinkBroker />} />
        <Route path="/userhistory" element={<UserHistory />} />
        <Route path="/managetrading" element={<ManageTrading />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
