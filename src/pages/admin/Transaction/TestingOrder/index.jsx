import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";

const TestingOrder = () => {
  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle title="TESTING ORDER" subtitle="All data testing order" />
        <div>
          <Link to="/master/testing-order/form">
            <Button type="primary">+ Add New</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default TestingOrder;
