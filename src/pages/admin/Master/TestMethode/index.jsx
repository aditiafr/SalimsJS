import { Button, Input, Space, Table } from "antd";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import { Link } from "react-router-dom";
import EditTestMethode from "./edit";
import DeleteTestMethode from "./delete";
import { useEffect, useState } from "react";
import { getTestMethode } from "../../../../Api/Master/getData";

const TestMethode = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getTestMethode();
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
      dataIndex: "MethodId",
      key: "MethodId",
      width: 150,
    },
    {
      title: "Preservation",
      dataIndex: "Preservation",
      key: "Preservation",
      width: 150,
    },
    {
      title: "Storage Time Limit",
      dataIndex: "StorageTimeLimit",
      key: "StorageTimeLimit",
      width: 150,
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "Description",
      width: 150,
    },
    // {
    //   title: "Suspended",
    //   dataIndex: "Suspended",
    //   key: "Suspended",
    //   width: 120,
    //   render: (suspended) => (
    //     <Tag color={suspended ? "red" : "green"}>{suspended ? "Yes" : "No"}</Tag>
    //   ),
    // },
    {
      title: "Action",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <Space>
          <EditTestMethode dataSource={record} onEdit={fetchData} />
          <DeleteTestMethode />
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle title="TEST METHODE" subtitle="All data test methode" />
        <div>
          <Link to="/master/test-methode/form">
            <Button type="primary">+ Add New</Button>
          </Link>
        </div>
      </div>
      <div className="w-full bg-white p-4 rounded-lg">
        <div className="w-full flex justify-end pb-4">
          <Input
            placeholder="search..."
            allowClear
            value={searchText}
            onChange={handleSearch}
            style={{ width: 200 }}
          />
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
