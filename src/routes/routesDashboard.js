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
import FormTestingOrder from "../pages/admin/Transaction/TestingOrder/form";
import FormPlanningTakingSample from "../pages/admin/Transaction/PlanningTakingSample/form";
import FormTestingProcess from "../pages/admin/Transaction/TestingProcess/form";
import FormAdjusment from "../pages/admin/Transaction/Adjustment/form";
import TestingOrder from "../pages/admin/Transaction/TestingOrder";
import PlanningTakingSample from "../pages/admin/Transaction/PlanningTakingSample";
import TestingProcess from "../pages/admin/Transaction/TestingProcess";
import Adjustment from "../pages/admin/Transaction/Adjustment";

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

    // TRANSACTION

    {
      path: "/master/testing-order",
      element: <TestingOrder />,
    },
    {
      path: "/master/testing-order/form",
      element: <FormTestingOrder />,
    },

    {
      path: "/master/planning-taking-sample",
      element: <PlanningTakingSample />,
    },
    {
      path: "/master/planning-taking-sample/form",
      element: <FormPlanningTakingSample />,
    },

    {
      path: "/master/testing-process",
      element: <TestingProcess />,
    },
    {
      path: "/master/testing-process/form",
      element: <FormTestingProcess />,
    },

    {
      path: "/master/adjustment",
      element: <Adjustment />,
    },
    {
      path: "/master/adjustment/form",
      element: <FormAdjusment />,
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
