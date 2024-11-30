import { Button, Input, Space, Table, Tabs, Tag } from "antd";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import EditFormula from "./edit";
import DeleteFormula from "./delete";
import DetailFormula from "./detail";
import { getFormula } from "../../../../Api/Master/getData";
import FormulaDetail from "./FormulaDetail";
const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const Formula = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);  

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getFormula();
      setData(response);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "Branch",
      dataIndex: "branchcode",
      key: "branchcode",
      width: 80,
    },
    {
      title: "Version",
      dataIndex: "version",
      key: "version",
      width: 100,
    },
    {
      title: "Code",
      dataIndex: "formulacode",
      key: "formulacode",
      width: 80,
    },
    {
      title: "Name",
      dataIndex: "formulaname",
      key: "formulaname",
      width: 100,
    },
    {
      title: "Is Numeric",
      dataIndex: "isnumeric",
      key: "isnumeric",
      width: 110,
      render: (isNumeric) => (
        <Tag color={isNumeric ? 'geekblue' : 'blue' }> {isNumeric ? 'Yes' : 'No'} </Tag>
      ),
    },
    {
      title: "Result Type",
      dataIndex: "isfinalresult",
      key: "isfinalresult",
      width: 120,
      render: (isfinalresult) => (
        isfinalresult ? 'Final' : 'Support' 
      ),
    },
    {
      title: "Is Compare Spec",
      dataIndex: "comparespec",
      key: "comparespec",
      width: 150,
      render: (isCompareSpec) => (
        <Tag color={isCompareSpec ? 'geekblue' : 'blue' }> {isCompareSpec ? 'Yes' : 'No'} </Tag>
      ),
    },
    {
      title: "Sim Result",
      dataIndex: "simvalue",
      key: "simvalue",
      width: 120,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 200,
      render: (text) => (text ?? "N/A"),
    },
    {
      title: "Suspended",
      dataIndex: "issuspend",
      key: "issuspend",
      width: 110,
      render: (suspended) => (
         <Tag color={suspended ? 'red' : 'green' }> {suspended ? 'Yes' : 'No'} </Tag>
      ),
    },
    {
      title: "Action",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <Space>
          <EditFormula />
          {record.issuspend === false && (
            <DeleteFormula name={record.formulaname} formulaCode={record.formulacode} onDelete={fetchData} />
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle
          title="Formula"
          subtitle="All data formula"
        />
        <div>
          <Link to="/master/formula/form">
            <Button type="primary">+ Add New</Button>
          </Link>
        </div>
      </div>
      <div className="w-full bg-white p-4 rounded-lg">
        <div className="w-full flex justify-end pb-4">
          <Search
            placeholder="Search..."
            onSearch={onSearch}
            style={{
              width: 200,
            }}
          />
        </div>
        <Table
          loading={loading}
          rowSelection
          columns={columns}
          dataSource={data}
          expandable={{ expandedRowRender }}
          pagination={{
            showSizeChanger: true,
            defaultPageSize: 10,
          }}
          scroll={{
            x: 1000,
          }}
        />
      </div>
    </>
  );
};

export default Formula;

const expandedRowRender = (record) => {
  const items = [
    {
      key: "1",
      label: "Detail",
      children: <FormulaDetail dataSource={record.detail} />,
    },
  ];

  return (
    <Tabs defaultActiveKey="1" items={items} />
  )
}