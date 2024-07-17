import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";

const TestingProcess = () => {
  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle title="TESTING PROCESS" subtitle="All data testing process" />
        <div>
          <Link to="/master/testing-process/form">
            <Button type="primary">+ Add New</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default TestingProcess;
