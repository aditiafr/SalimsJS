import { Button, Space, Table, Tag } from "antd";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import { Link } from "react-router-dom";
import EditTestMethode from "./edit";
import DeleteTestMethode from "./delete";
import { useEffect, useState } from "react";
import { getTestMethod } from "../../../../Api/Master/getData";
import SearchInput from "../../../../components/Dashboard/Global/Table/SearchInput";

const TestMethode = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getTestMethod();
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
      width: 80,
    },
    {
      title: "Method Id",
      dataIndex: "methodid",
      key: "methodid",
      width: 150,
    },
    {
      title: "Preservation",
      dataIndex: "preservation",
      key: "preservation",
      width: 150,
    },
    {
      title: "Storage Time Limit",
      dataIndex: "storagetimelimit",
      key: "storagetimelimit",
      width: 150,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 150,
    },
    {
      title: "Suspended",
      dataIndex: "issuspend",
      key: "issuspend",
      width: 120,
      render: (suspended) => (
        <Tag color={suspended ? "red" : "green"}>{suspended ? "Yes" : "No"}</Tag>
      ),
    },
    {
      title: "Action",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <Space>
          <EditTestMethode dataSource={record} onEdit={fetchData} />
          {record.issuspend === false && (
            <DeleteTestMethode dataSource={record} onDelete={fetchData} />
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle title="TEST METHODE" subtitle="All data test methode" />
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
            x: 1000,
          }}
        />
      </div>
    </>
  );
};

export default TestMethode;
