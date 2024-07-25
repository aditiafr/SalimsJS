import React from "react";
import { Button, Input, Space, Table, Tag } from "antd";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import { Link } from "react-router-dom";
import EditDepartment from "./edit";
import DeleteDepartment from "./delete";
const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const columns = [
  {
    title: "Code",
    dataIndex: "Code",
    key: "Code",
    width: 80,
  },
  {
    title: "Name",
    dataIndex: "Name",
    key: "Name",
    width: 100,
  },
  {
    title: "Desciption",
    dataIndex: "Desciption",
    key: "Desciption",
    width: 200,
    render: (text) => (text ?? "N/A"),
  },
  {
    title: "Suspended",
    dataIndex: "Suspended",
    key: "Suspended",
    width: 100,
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
        <EditDepartment />
        <DeleteDepartment name={record.Name} />
      </Space>
    ),
  },
];
const data = [
  {
    key: 1,
    Code: "HR",
    Name: "Human Resourcce",
    Desciption: "A department that manage human resource",
    Suspended: false,
  },
  {
    key: 2,
    Code: "IT",
    Name: "Information Technology",
    Desciption: "A department that manage information technology",
    Suspended: true, 
  },
  {
    key: 3,
    Code: "FIN",
    Name: "Finance",
    Desciption: null,
    Suspended: false,
  }
];

const Department = () => {
  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle
          title="Department"
          subtitle="All data department"
        />
        <div>
          <Link to="/master/department/form">
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

export default Department;
