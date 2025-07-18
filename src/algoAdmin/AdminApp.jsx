import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Settings from "./pages/AdminSettings";
import Login from "./pages/Login";
function AdminApp() {
  return (
    <>
      <Route path="/adminapp" element={<Login />} />
        <Route element={<AdminLayout />}>
       
          <Route path="/adminapp/dashboard" element={<Dashboard />} />
          <Route path="/adminapp/users" element={<Users />} />
          <Route path="/adminapp/settings" element={<Settings />} />
        </Route>
     </>
  );
}

export default AdminApp;
