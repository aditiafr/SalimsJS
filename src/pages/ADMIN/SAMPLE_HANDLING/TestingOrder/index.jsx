import { Button, Space, Table, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import { getTestingOrder } from "../../../../Api/SampleHandling/GetData";
import SearchInput from "../../../../components/Dashboard/Global/Table/SearchInput";
import TestingOrderAcCost from "./AcCost";
import TestingOrderSample from "./Sample";
import DeleteTestingOrder from "./Delete";
import EditTestingOrder from "./edit";

const TestingOrder = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getTestingOrder();
      setData(response)
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredData = data.filter((item) =>
    Object.values(item).some(
      (val) => val && val.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const columns = [
    {
      title: "No",
      dataIndex: "key",
      key: "key",
      width: 60,
      fixed: "left",
    },
    {
      title: "Request Number",
      dataIndex: "reqnumber",
      key: "reqnumber",
    },
    {
      title: "Periode",
      dataIndex: "periode",
      key: "periode",
    },
    {
      title: "Request Date",
      dataIndex: "reqdate",
      key: "reqdate",
    },
    {
      title: "Customer Code",
      dataIndex: "customercode",
      key: "customercode",
    },
    {
      title: "Request By",
      dataIndex: "requestby",
      key: "requestby",
    },
    {
      title: "Gross",
      dataIndex: "gross",
      key: "gross",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "DPP",
      dataIndex: "dpp",
      key: "dpp",
    },
    {
      title: "VAT",
      dataIndex: "vat",
      key: "vat",
    },
    {
      title: "NET",
      dataIndex: "net",
      key: "net",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "appstatus",
      key: "appstatus",
    },
    {
      title: "Action",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <Space>
          <EditTestingOrder dataSource={record} />
          <DeleteTestingOrder dataSource={record} onDelete={fetchData} />
        </Space>
      ),
    },
  ]

  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle title="TESTING ORDER" subtitle="All data testing order" />
        <div>
          <Link to="form">
            <Button type="primary">+ Add New</Button>
          </Link>
        </div>
      </div>
      <div className="w-full bg-white p-4 rounded-lg">
        <div className="w-full flex justify-end pb-4">
          <SearchInput value={searchText} onChange={handleSearch} />
        </div>
        <Table
          loading={loading}
          rowSelection
          columns={columns}
          dataSource={filteredData}
          expandable={{
            expandedRowRender
          }}
          pagination={{
            showSizeChanger: true,
            defaultPageSize: 10,
          }}
          scroll={{
            x: 3000,
          }}
        />
      </div>
    </>
  );
};

export default TestingOrder;


const expandedRowRender = (record) => {

  const items = [
    {
      key: '1',
      label: 'Ac Cost',
      children: <TestingOrderAcCost dataSource={record.testing_order_ac} />,
    },
    {
      key: '2',
      label: 'Sample',
      children: <TestingOrderSample dataSource={record.testing_order_sample} />,
    },
  ];

  return (
    <Tabs defaultActiveKey="1" items={items} />
  )
}
