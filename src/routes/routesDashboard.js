import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/admin/Dashboard";

// MASTER
import Building from "../pages/admin/Master/Building";
import FormBuilding from "../pages/admin/Master/Building/form";

// TRANSACTION
import TakingSample from "../pages/admin/Transaction/TakingSample"
import FormTakingSample from "../pages/admin/Transaction/TakingSample/form"
import SampleRegistration from "../pages/admin/Transaction/SampleRegistration"
import FormSampleRegistration from "../pages/admin/Transaction/SampleRegistration/form"
import SampleHandling from "../pages/admin/Transaction/SampleHandling"
import FormSampleHandling from "../pages/admin/Transaction/SampleHandling/form"
import TestingResult from "../pages/admin/Transaction/TestingResult"
import FormTestingResult from "../pages/admin/Transaction/TestingResult/form"
import MaintenanceRequest from "../pages/admin/Transaction/MaintenanceRequest"
import FormMaintenanceRequest from "../pages/admin/Transaction/MaintenanceRequest/form"
import MaintenanceProcess from "../pages/admin/Transaction/MaintenanceProcess"
import FormMaintenanceProcess from "../pages/admin/Transaction/MaintenanceProcess/form"
import TestingOrder from "../pages/admin/Transaction/TestingOrder";
import FormTestingOrder from "../pages/admin/Transaction/TestingOrder/form";
import PlanningTakingSample from "../pages/admin/Transaction/PlanningTakingSample";
import FormPlanningTakingSample from "../pages/admin/Transaction/PlanningTakingSample/form";
import TestingProcess from "../pages/admin/Transaction/TestingProcess";
import FormTestingProcess from "../pages/admin/Transaction/TestingProcess/form";
import Adjustment from "../pages/admin/Transaction/Adjustment";
import FormAdjusment from "../pages/admin/Transaction/Adjustment/form";
import Warehouse from "../pages/admin/Master/Warehouse";
import FormWarehouse from "../pages/admin/Master/Warehouse/form";
import SampleStorageLocation from "../pages/admin/Master/SampleStorageLocation";
import FormSampleStorageLocation from "../pages/admin/Master/SampleStorageLocation/form";
import StorageLocation from "../pages/admin/Master/StorageLocation";
import FormStorageLocation from "../pages/admin/Master/StorageLocation/form";

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
    
    {
      path: "/master/warehouse",
      element: <Warehouse />,
    },
    {
      path: "/master/warehouse/form",
      element: <FormWarehouse />,
    },
    
    {
      path: "/master/sample-storage-location",
      element: <SampleStorageLocation />,
    },
    {
      path: "/master/sample-storage-location/form",
      element: <FormSampleStorageLocation />,
    },
    
    {
      path: "/master/storage-location",
      element: <StorageLocation />,
    },
    {
      path: "/master/storage-location/form",
      element: <FormStorageLocation />,
    },


    // TRANSACTION

    {
      path: "/transaction/taking-sample",
      element: <TakingSample />,
    },
    {
      path: "/transaction/taking-sample/form",
      element: <FormTakingSample />,
    },

    {
      path: "/transaction/sample-registration",
      element: <SampleRegistration />,
    },
    {
      path: "/transaction/sample-registration/form",
      element: <FormSampleRegistration />,
    },

    {
      path: "/transaction/sample-handling",
      element: <SampleHandling />,
    },
    {
      path: "/transaction/sample-handling/form",
      element: <FormSampleHandling />,
    },

    {
      path: "/transaction/testing-result",
      element: <TestingResult />,
    },
    {
      path: "/transaction/testing-result/form",
      element: <FormTestingResult />,
    },

    {
      path: "/transaction/maintenance-request",
      element: <MaintenanceRequest />,
    },
    {
      path: "/transaction/maintenance-request/form",
      element: <FormMaintenanceRequest />,
    },

    {
      path: "/transaction/maintenance-process",
      element: <MaintenanceProcess />,
    },
    {
      path: "/transaction/maintenance-process/form",
      element: <FormMaintenanceProcess />,
    },

    {
      path: "/transaction/testing-order",
      element: <TestingOrder />,
    },
    {
      path: "/transaction/testing-order/form",
      element: <FormTestingOrder />,
    },

    {
      path: "/transaction/planning-taking-sample",
      element: <PlanningTakingSample />,
    },
    {
      path: "/transaction/planning-taking-sample/form",
      element: <FormPlanningTakingSample />,
    },

    {
      path: "/transaction/testing-process",
      element: <TestingProcess />,
    },
    {
      path: "/transaction/testing-process/form",
      element: <FormTestingProcess />,
    },

    {
      path: "/transaction/adjustment",
      element: <Adjustment />,
    },
    {
      path: "/transaction/adjustment/form",
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
