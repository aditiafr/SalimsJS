import React from "react";
import MySidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import RoutesDashboard from "./routes/routesDashboard";
import Login from "./pages/Login";
import MyFooter from "./components/Footer";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/*"
          element={
            <>
              <MySidebar>
                <RoutesDashboard />
              </MySidebar>
              {/* <MyFooter /> */}
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
