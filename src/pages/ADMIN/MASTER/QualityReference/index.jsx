import { Button, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import { getQualityReference } from "../../../../Api/Master/getData";
import SearchInput from "../../../../components/Dashboard/Global/Table/SearchInput";
import DetailQualityReference from "./Detail";
import EditQualityReference from "./edit";
import DeleteQualityReference from "./delete";

const QualityReference = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredData = data.filter((item) =>
    Object.values(item).some(
      (val) => val && val.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const fetchData = async () => {
    try {
      const res = await getQualityReference();
      setData(res);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
    setIsLoading(false);
  }, []);


  const columns = [
    {
      title: "No",
      dataIndex: "key",
      key: "key",
      width: 60,
      fixed: "left",
    },
    {
      title: "Quality Reference Id",
      dataIndex: "qrid",
      key: "qrid",
    },
    {
      title: "Quality Reference Name",
      dataIndex: "qrname",
      key: "qrname",
    },
    {
      title: "Product Category Code",
      dataIndex: "prodcatcode",
      key: "prodcatcode",
    },
    {
      title: "Reference Value Quantity",
      dataIndex: "refvalueqty",
      key: "refvalueqty",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Suspend",
      dataIndex: "issuspend",
      key: "issuspend",
      render: (suspended) => (
        <Tag color={suspended ? 'red' : 'green'}> {suspended ? 'Yes' : 'No'} </Tag>
      ),
    },
    {
      title: "Action",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <Space>
          <EditQualityReference dataSource={record} onEdit={fetchData} />
          <DeleteQualityReference dataSource={record} onDelete={fetchData} />
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle title="QUALITY REFERENCE" subtitle="All data QualityReference" />
        <div>
          <Link to="/master/quality_reference/form">
            <Button type="primary">+ Add New</Button>
          </Link>
        </div>
      </div>
      <div className="w-full bg-white p-4 rounded-lg">
        <div className="w-full flex justify-end pb-4">
          <SearchInput value={searchText} onChange={handleSearch} />
        </div>
        <Table
          loading={isLoading}
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
            x: 1500,
          }}
        />
      </div>
    </>
  );
};

export default QualityReference;



const expandedRowRender = (record) => {
  return (
    <DetailQualityReference dataSource={record.detail} />
  )
}
