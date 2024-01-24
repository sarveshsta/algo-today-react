import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashbord from "./user/dashbord/Dashbord";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./user/Home";
import LinkBroker from "./user/LinkBroker";
import Wallet from "./user/Wallet";
import ManageTrading from "./user/ManageTrading";
import ReferEarn from "./user/ReferEarn";
import UserHistory from "./user/UserHistory";
import OpenDemat from "./user/OpenDemat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Dashbord />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/opendemate" element={<OpenDemat/>} />
        {/* <Route path="/wallet" element={<Wallet />} /> */}
        {/* <Route path="/refer&earn" element={<ReferEarn />} /> */}
        {/* <Route path="/linkbroker" element={<LinkBroker />} /> */}
        {/* <Route path="/userhistory" element={<UserHistory />} /> */}
        {/* <Route path="/managetrading" element={<ManageTrading />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
