
import { Button, Input, Space, Table } from "antd";
import EditTimePoint from "./edit";
import DeleteTimePoint from "./delete";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTimePoint } from "../../../../Api/Master/getData";

const TimePoint = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getTimePoint();
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
      title: "TimePointCode",
      dataIndex: "TimePointCode",
      key: "TimePointCode",
      width: 150,
    },
    {
      title: "TimePointName",
      dataIndex: "TimePointName",
      key: "TimePointName",
      width: 150,
    },
    {
      title: "Monthly",
      dataIndex: "Monthly",
      key: "Monthly",
      width: 150,
    },
    {
      title: "IntervalDay",
      dataIndex: "IntervalDay",
      key: "IntervalDay",
      width: 150,
    },
    {
      title: "IntervalTime",
      dataIndex: "IntervalTime",
      key: "IntervalTime",
      width: 150,
    },
    {
      title: "TWMinDay",
      dataIndex: "TWMinDay",
      key: "TWMinDay",
      width: 150,
    },
    {
      title: "TWMinTime",
      dataIndex: "TWMinTime",
      key: "TWMinTime",
      width: 150,
    },
    {
      title: "TWMaxDay",
      dataIndex: "TWMaxDay",
      key: "TWMaxDay",
      width: 150,
    },
    {
      title: "TWMaxTime",
      dataIndex: "TWMaxTime",
      key: "TWMaxTime",
      width: 150,
    },
    {
      title: "POWMinDay",
      dataIndex: "POWMinDay",
      key: "POWMinDay",
      width: 150,
    },
    {
      title: "POWMinTime",
      dataIndex: "POWMinTime",
      key: "POWMinTime",
      width: 150,
    },
    {
      title: "POWMaxDay",
      dataIndex: "POWMaxDay",
      key: "POWMaxDay",
      width: 150,
    },
    {
      title: "POWMaxTime",
      dataIndex: "POWMaxTime",
      key: "POWMaxTime",
      width: 150,
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "Description",
      width: 150,
    },
    {
      title: "Action",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <Space>
          <EditTimePoint dataSource={record} onEdit={fetchData} />
          <DeleteTimePoint />
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle
          title="TIME POINT"
          subtitle="All data time point"
        />
        <div>
          <Link to="/master/time-point/form">
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

export default TimePoint;
