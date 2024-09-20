import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { useState } from "react";
import { getTran } from "../Api/General/GetData";
import { ViewPages } from "./Pages/viewPages";
import { FormPages } from "./Pages/formPages";
import Dashboard from "../pages/ADMIN/Dashboard";

const RoutesDashboard = () => {

  const [Tran, setTran] = useState([]);
  const [FormTran, setFormTran] = useState([]);

  useEffect(() => {
    const fetchTran = async () => {
      try {
        const res = await getTran();
        setTran(res.map((row, index) => ({ ...row, page: ViewPages[row.tranidx] })));
        setFormTran(res.map((row, index) => ({ ...row, page: FormPages[row.tranidx] })));
      } catch (error) {
        console.log(error);
      }
    }
    fetchTran();
  }, []);

  const mainRoutes = [
    {
      path: "/dashboard",
      element: <Dashboard />,
    },

    // MASTER

    ...Tran.map((item) => ({
      path: `/${item.trantype.toLowerCase()}/${item.tranformname.toLowerCase()}`,
      element: item.page,
    })),

    ...FormTran.map((item) => ({
      path: `/${item.trantype.toLowerCase()}/${item.tranformname.toLowerCase()}/form`,
      element: item.page,
    })),

    // {
    //   path: "/master/building",
    //   element: <Building />,
    // },
    // {
    //   path: "/master/building/form",
    //   element: <FormBuilding />,
    // },

    // {
    //   path: "/master/warehouse",
    //   element: <Warehouse />,
    // },
    // {
    //   path: "/master/warehouse/form",
    //   element: <FormWarehouse />,
    // },

    // {
    //   path: "/master/sample-storage-location",
    //   element: <SampleStorageLocation />,
    // },
    // {
    //   path: "/master/sample-storage-location/form",
    //   element: <FormSampleStorageLocation />,
    // },

    // {
    //   path: "/master/storage-location",
    //   element: <StorageLocation />,
    // },
    // {
    //   path: "/master/storage-location/form",
    //   element: <FormStorageLocation />,
    // },

    // {
    //   path: "/master/vendor",
    //   element: <Vendor />,
    // },
    // {
    //   path: "/master/vendor/form",
    //   element: <FormVendor />,
    // },

    // {
    //   path: "/master/test-methode",
    //   element: <TestMethode />,
    // },
    // {
    //   path: "/master/test-methode/form",
    //   element: <FormTestMethode />,
    // },

    // {
    //   path: "/master/time-point",
    //   element: <TimePoint />,
    // },
    // {
    //   path: "/master/time-point/form",
    //   element: <FormTimePoint />,
    // },

    // {
    //   path: "/master/customer",
    //   element: <Customer />,
    // },
    // {
    //   path: "/master/customer/form",
    //   element: <FormCustomer />,
    // },

    // {
    //   path: "/master/department",
    //   element: <Department />,
    // },
    // {
    //   path: "/master/department/form",
    //   element: <FormDepartment />,
    // },

    // {
    //   path: "/master/equipment-type",
    //   element: <EquipmentType />,
    // },
    // {
    //   path: "/master/equipment-type/form",
    //   element: <FormEquipmentType />,
    // },

    // {
    //   path: "/master/packing-type",
    //   element: <PackingType />,
    // },
    // {
    //   path: "/master/packing-type/form",
    //   element: <FormPackingType />,
    // },
    // {
    //   path: "/master/product-category",
    //   element: <ProductCategory />,
    // },
    // {
    //   path: "/master/product-category/form",
    //   element: <FormProductCategory />,
    // },
    // {
    //   path: "/master/product-type",
    //   element: <ProductType />,
    // },
    // {
    //   path: "/master/product-type/form",
    //   element: <FormProductType />,
    // },
    // {
    //   path: "/master/other-expense",
    //   element: <OtherExpense />,
    // },
    // {
    //   path: "/master/other-expense/form",
    //   element: <FormOtherExpense />,
    // },
    // {
    //   path: "/master/parameter-category",
    //   element: <ParameterCategory />,
    // },
    // {
    //   path: "/master/parameter-category/form",
    //   element: <FormParameterCategory />,
    // },
    // {
    //   path: "/master/parameter",
    //   element: <Parameter />,
    // },
    // {
    //   path: "/master/parameter/form",
    //   element: <FormParameter />,
    // },
    // {
    //   path: "/master/equipment",
    //   element: <Equipment />,
    // },
    // {
    //   path: "/master/equipment/form",
    //   element: <FormEquipment />,
    // },
    // {
    //   path: "/master/labour",
    //   element: <Labour />,
    // },
    // {
    //   path: "/master/labour/form",
    //   element: <FormLabour />,
    // },
    // {
    //   path: "/master/formula",
    //   element: <Formula />,
    // },
    // {
    //   path: "/master/formula/form",
    //   element: <FormFormula />,
    // },
    // {
    //   path: "/master/formula-table-ref",
    //   element: <FormulaTableRef />,
    // },
    // {
    //   path: "/master/formula-table-ref/form",
    //   element: <FormFormulaTableRef />,
    // },
    // {
    //   path: "/master/zona",
    //   element: <Zona />,
    // },
    // {
    //   path: "/master/zona/form",
    //   element: <FormZona />,
    // },
    // {
    //   path: "/master/sub-zona",
    //   element: <SubZona />,
    // },
    // {
    //   path: "/master/sub-zona/form",
    //   element: <FormSubZona />,
    // },
    // {
    //   path: "/master/price-list-d",
    //   element: <PriceListD />,
    // },
    // {
    //   path: "/master/price-list-d/form",
    //   element: <FormPriceListD />,
    // },
    // {
    //   path: "/master/price-list-m",
    //   element: <PriceListM />,
    // },
    // {
    //   path: "/master/price-list-m/form",
    //   element: <FormPriceListM />,
    // },

    // TRANSACTION

    // {
    //   path: "/transaction/taking-sample",
    //   element: <TakingSample />,
    // },
    // {
    //   path: "/transaction/taking-sample/form",
    //   element: <FormTakingSample />,
    // },

    // {
    //   path: "/transaction/sample-registration",
    //   element: <SampleRegistration />,
    // },
    // {
    //   path: "/transaction/sample-registration/form",
    //   element: <FormSampleRegistration />,
    // },

    // {
    //   path: "/transaction/sample-handling",
    //   element: <SampleHandling />,
    // },
    // {
    //   path: "/transaction/sample-handling/form",
    //   element: <FormSampleHandling />,
    // },

    // {
    //   path: "/transaction/testing-result",
    //   element: <TestingResult />,
    // },
    // {
    //   path: "/transaction/testing-result/form",
    //   element: <FormTestingResult />,
    // },

    // {
    //   path: "/transaction/maintenance-request",
    //   element: <MaintenanceRequest />,
    // },
    // {
    //   path: "/transaction/maintenance-request/form",
    //   element: <FormMaintenanceRequest />,
    // },

    // {
    //   path: "/transaction/maintenance-process",
    //   element: <MaintenanceProcess />,
    // },
    // {
    //   path: "/transaction/maintenance-process/form",
    //   element: <FormMaintenanceProcess />,
    // },

    // {
    //   path: "/transaction/testing-order",
    //   element: <TestingOrder />,
    // },
    // {
    //   path: "/transaction/testing-order/form",
    //   element: <FormTestingOrder />,
    // },

    // {
    //   path: "/transaction/planning-taking-sample",
    //   element: <PlanningTakingSample />,
    // },
    // {
    //   path: "/transaction/planning-taking-sample/form",
    //   element: <FormPlanningTakingSample />,
    // },

    // {
    //   path: "/transaction/testing-process",
    //   element: <TestingProcess />,
    // },
    // {
    //   path: "/transaction/testing-process/form",
    //   element: <FormTestingProcess />,
    // },

    // {
    //   path: "/transaction/adjustment",
    //   element: <Adjustment />,
    // },
    // {
    //   path: "/transaction/adjustment/form",
    //   element: <FormAdjusment />,
    // },
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
