import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";

const PlanningTakingSample = () => {
  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle title="PLANNING TAKING SAMPLE" subtitle="All data planning taking sample" />
        <div>
          <Link to="/master/planning-taking-sample/form">
            <Button type="primary">+ Add New</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default PlanningTakingSample;
