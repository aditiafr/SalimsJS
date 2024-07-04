import React from "react";
import MySidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import RoutesDashboard from "./routes/routesDashboard";
import Login from "./pages/Login";

const App = () => {
  return (
    <div>
      <MySidebar>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/*" element={<RoutesDashboard />} />
        </Routes>
      </MySidebar>
    </div>
  );
};

export default App;
