import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/admin/Dashboard";

// MASTER
import Building from "../pages/admin/Master/Building";
import FormBuilding from "../pages/admin/Master/Building/form";
import FormTakingSample from "../pages/admin/Master/TakingSample/form";
import FormSampleRegistration from "../pages/admin/Master/SampleRegistration/form";
import FormSampleHandling from "../pages/admin/Master/SampleHandling/form";
import FormTestingResult from "../pages/admin/Master/TestingResult/form";
import FormMaintenanceRequest from "../pages/admin/Master/MaintenanceRequest/form";
import FormMaintenanceProcess from "../pages/admin/Master/MaintenanceProcess/form";

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
    // {
    //   path: "/master/taking-sample",
    //   element: <Building />,
    // },
    {
      path: "/master/taking-sample/form",
      element: <FormTakingSample />,
    },
    // {
    //   path: "/master/sample-registration",
    //   element: <Building />,
    // },
    {
      path: "/master/sample-registration/form",
      element: <FormSampleRegistration />,
    },
    // {
    //   path: "/master/sample-handling",
    //   element: <Building />,
    // },
    {
      path: "/master/sample-handling/form",
      element: <FormSampleHandling />,
    },
    // {
    //   path: "/master/testing-result",
    //   element: <Building />,
    // },
    {
      path: "/master/testing-result/form",
      element: <FormTestingResult />,
    },
    // {
    //   path: "/master/maintenance-request",
    //   element: <Building />,
    // },
    {
      path: "/master/maintenance-request/form",
      element: <FormMaintenanceRequest />,
    },
    // {
    //   path: "/master/maintenance-process",
    //   element: <Building />,
    // },
    {
      path: "/master/maintenance-process/form",
      element: <FormMaintenanceProcess />,
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
