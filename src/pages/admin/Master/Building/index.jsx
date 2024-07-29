import { Button, Input, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditBuilding from "./edit";
import DeleteBuilding from "./delete";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import { getBuilding } from "../API/getData";
const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const columns = [
  {
    title: "No",
    dataIndex: "key",
    key: "key",
    width: 40,
    fixed: "left",
  },
  {
    title: "BuildingCode",
    dataIndex: "BuildingCode",
    key: "BuildingCode",
    width: 150,
  },
  {
    title: "BuildingName",
    dataIndex: "BuildingName",
    key: "BuildingName",
    width: 150,
  },
  {
    title: "Action",
    fixed: "right",
    width: 100,
    render: (_, record) => (
      <Space>
        <EditBuilding />
        <DeleteBuilding />
      </Space>
    ),
  },
];
// const data = [
//   {
//     key: "1",
//     Code: "BLD01",
//     Address: "Jl. Jendral Sudirman",
//     ZIPCode: "ZIP01",
//     City: "Jakarta Pusat",
//     Country: "Indonesia",
//     Phone: "0812345678",
//     Contact: "Slamet",
//     Fax: "17829",
//     Desciption: "Test Data",
//   },
//   {
//     key: "2",
//     Code: "BLD02",
//     Address: "Jl. Jendral Sudirman",
//     ZIPCode: "ZIP01",
//     City: "Jakarta Pusat",
//     Country: "Indonesia",
//     Phone: "0812345678",
//     Contact: "Slamet",
//     Fax: "17829",
//     Desciption: "Test Data",
//   },
//   {
//     key: "3",
//     Code: "BLD03",
//     Address: "Jl. Jendral Sudirman",
//     ZIPCode: "ZIP01",
//     City: "Jakarta Pusat",
//     Country: "Indonesia",
//     Phone: "0812345678",
//     Contact: "Slamet",
//     Fax: "17829",
//     Desciption: "Test Data",
//   },
//   {
//     key: "4",
//     Code: "BLD04",
//     Address: "Jl. Jendral Sudirman",
//     ZIPCode: "ZIP01",
//     City: "Jakarta Pusat",
//     Country: "Indonesia",
//     Phone: "0812345678",
//     Contact: "Slamet",
//     Fax: "17829",
//     Desciption: "Test Data",
//   },
// ];

const Building = () => {

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await getBuilding();
      setData(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [])

  console.log(data);

  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle title="BUILDING" subtitle="All data building" />
        <div>
          <Link to="/master/building/form">
            <Button type="primary">+ Add New</Button>
          </Link>
        </div>
      </div>
      <div className="w-full bg-white p-4 rounded-lg">
        <div className="w-full flex justify-end pb-4">
          <Search
            placeholder="search..."
            allowClear
            onSearch={onSearch}
            style={{ width: 200 }}
          />
        </div>
        <Table
          // loading={true}
          rowSelection
          columns={columns}
          dataSource={data}
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

export default Building;
