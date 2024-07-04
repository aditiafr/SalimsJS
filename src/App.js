import React from "react";
import MySidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import RoutesDashboard from "./routes/routesDashboard";
import Login from "./pages/Login";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/*"
          element={
            <MySidebar>
              <RoutesDashboard />
            </MySidebar>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
