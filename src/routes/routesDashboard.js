import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/admin/Dashboard";

// MASTER
import Building from "../pages/admin/Master/Building";
import FormBuilding from "../pages/admin/Master/Building/form";

const RoutesDashboard = () => {
  const mainRoutes = [
    {
      path: "/dashboard",
      element: <Dashboard />,
    },

    // MASTER
    {
      path: "/master/building",
      element: <Building />,
    },
    {
      path: "/master/building/form",
      element: <FormBuilding />,
    },
  ];

  return (
    <Routes>
      {mainRoutes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default RoutesDashboard;
