import React from "react";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import { Link } from "react-router-dom";
import { Button } from "antd";

const Adjustment = () => {
  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle title="ADJUSTMENT" subtitle="All data adjustment" />
        <div>
          <Link to="/transaction/adjustment/form">
            <Button type="primary">+ Add New</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Adjustment;
