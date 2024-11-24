import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { useState } from "react";
import { getTran } from "../Api/General/GetData";
import { ViewPages } from "./Pages/viewPages";
import { FormPages } from "./Pages/formPages";
import Dashboard from "../pages/ADMIN/Dashboard";
import FormSampleParameter from "../pages/ADMIN/MASTER/Sample/Params/form";
import FormTestingOrderSample from "../pages/ADMIN/SAMPLE_HANDLING/TestingOrder/Sample/form";
import { EditPages } from "./Pages/editPages";

const RoutesDashboard = () => {

  const [Tran, setTran] = useState([]);
  const [FormTran, setFormTran] = useState([]);
  const [EditTran, setEditTran] = useState([]);

  useEffect(() => {
    const fetchTran = async () => {
      try {
        const res = await getTran();
        setTran(res.map((row, index) => ({ ...row, page: ViewPages[row.tranidx] })));
        setFormTran(res.map((row, index) => ({ ...row, page: FormPages[row.tranidx] })));
        setEditTran(res.map((row, index) => ({ ...row, page: EditPages[row.tranidx] })));
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

    ...EditTran.map((item) => ({
      path: `/${item.trantype.toLowerCase()}/${item.tranformname.toLowerCase()}/form/:code`,
      element: item.page,
    })),

    // MASTER SAMPLE
    {
      path: "/master/sample/form/parameter",
      element: <FormSampleParameter />,
    },
    {
      path: "/master/sample/form/parameter/:code",
      element: <FormSampleParameter />,
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
