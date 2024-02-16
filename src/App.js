import "./App.css";
import Home from "./user/Home";
import Wallet from "./user/Wallet";
import Login from "./user/login/Login";
import ReferEarn from "./user/ReferEarn";
import OpenDemat from "./user/OpenDemat";
import Signup from "./user/signup/Signup";
import Newotp from "./user/newotp/Newotp";
import Mobile from "./user/mobile/Mobile";
import LinkBroker from "./user/LinkBroker";
import UserHistory from "./user/UserHistory";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashbord from "./user/dashbord/Dashbord";
import ManageTrading from "./user/ManageTrading";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Forgotpassword from "./user/forgotpassword/Forgotpassword";
import CustomStrategies from "./user/CustomStrategies";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/mobile" element={<Mobile />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/newotp" element={<Newotp />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashbord" element={<Dashbord />} />
        <Route path="/opendemate" element={<OpenDemat/>} />
        <Route path="/refer&earn" element={<ReferEarn />} />
        <Route path="/linkbroker" element={<LinkBroker />} />
        <Route path="/custom" element={<CustomStrategies/>} />
        <Route path="/userhistory" element={<UserHistory />} />
        <Route path="/managetrading" element={<ManageTrading />} />
        <Route path="/forgotpassword" element={<Forgotpassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
