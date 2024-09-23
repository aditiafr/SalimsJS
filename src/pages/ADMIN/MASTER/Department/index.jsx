import React, { useEffect, useState } from "react";
import { Button, Input, Space, Table, Tag } from "antd";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import { Link } from "react-router-dom";
import EditDepartment from "./edit";
import DeleteDepartment from "./delete";
import { getDepartments } from "../../../../Api/Master/getData";
const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const Department = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getDepartments( {
        sortParam: 'depcode', 
        sortOrder: 'desc',
      });
      
      setData(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
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
      title: "Department Code",
      dataIndex: "DepartmentCode",
      key: "DepartmentCode",
      width: 80,
    },
    {
      title: "Department Name",
      dataIndex: "DepartmentName",
      key: "DepartmentName",
      width: 100,
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "Description",
      width: 200,
      render: (text) => (text || "N/A"),
    },
    {
      title: "Suspended",
      dataIndex: "IsSuspend",
      key: "IsSuspend",
      width: 100,
      render: (suspended) => {
        return <Tag color={suspended ? 'red' : 'green' }> {suspended ? 'Yes' : 'No'} </Tag>
      }
    },
    {
      title: "Action",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <Space>
          <EditDepartment dataSource={record} onEdit={fetchData} />
          <DeleteDepartment DepartmentCode={record.DepartmentCode} name={record.DepartmentName} onDelete={fetchData} />
        </Space>
      ),
    },
  ];

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
          loading={loading}
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
