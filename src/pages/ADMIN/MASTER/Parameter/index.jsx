import { Button, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditParameter from "./edit";
import DeleteParameter from "./delete";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import SearchInput from "../../../../components/Dashboard/Global/Table/SearchInput";
import { getParameter } from "../../../../Api/Master/getData";

const Parameter = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getParameter();
      setData(response);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

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
      title: "Parameter Code",
      dataIndex: "parcode",
      key: "parcode",
      fixed: "left",
    },
    {
      title: "Parameter Name",
      dataIndex: "parname",
      key: "parname",
    },
    {
      title: "Method Id",
      dataIndex: "methodid",
      key: "methodid",
    },
    {
      title: "Preservation",
      dataIndex: "preservation",
      key: "preservation",
    },
    {
      title: "Storage Time Limit",
      dataIndex: "storagetimelimit",
      key: "storagetimelimit",
    },
    {
      title: "Product Category Code",
      dataIndex: "prodcatcode",
      key: "prodcatcode",
    },
    {
      title: "product Category Name",
      dataIndex: "prodcatname",
      key: "prodcatname",
    },
    {
      title: "Unit Code",
      dataIndex: "unitcode",
      key: "unitcode",
    },
    {
      title: "Unit Name",
      dataIndex: "unitname",
      key: "unitname",
    },
    {
      title: "Alias Name",
      dataIndex: "aliasname",
      key: "aliasname",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Akreditasi",
      dataIndex: "akreditasi",
      key: "akreditasi",
    },
    {
      title: "Result Unit Code",
      dataIndex: "resultunitcode",
      key: "resultunitcode",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
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
          <EditParameter dataSource={record} onEdit={fetchData} />
          {record.issuspend === false && (
            <DeleteParameter dataSource={record} onDelete={fetchData} />
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle
          title="PARAMETER"
          subtitle="All data parameter"
        />
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
          pagination={{
            showSizeChanger: true,
            defaultPageSize: 10,
          }}
          scroll={{
            x: 3500,
          }}
        />
      </div>
    </>
  );
};

export default Parameter;
