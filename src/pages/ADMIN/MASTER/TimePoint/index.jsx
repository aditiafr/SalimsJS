import { Button, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditTimePoint from "./edit";
import DeleteTimePoint from "./delete";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import { getTimePoint } from "../../../../Api/Master/getData";
import SearchInput from "../../../../components/Dashboard/Global/Table/SearchInput";

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
      width: 60,
      fixed: "left",
    },
    {
      title: "TimePoint Code",
      dataIndex: "timepointcode",
      key: "TimePointcode",
      fixed: "left",
    },
    {
      title: "Time Point Name",
      dataIndex: "timepointname",
      key: "timepointname",
    },
    {
      title: "Monthly",
      dataIndex: "monthly",
      key: "monthly",
    },
    {
      title: "Interval Day",
      dataIndex: "intervalday",
      key: "intervalday",
    },
    {
      title: "Interval Time",
      dataIndex: "intervaltime",
      key: "intervaltime",
    },
    {
      title: "Testing Window Min Day",
      dataIndex: "twminday",
      key: "twminday",
    },
    {
      title: "Testing Window Min Time",
      dataIndex: "twmintime",
      key: "twmintime",
    },
    {
      title: "Testing Window Max Day",
      dataIndex: "twmaxday",
      key: "twmaxday",
    },
    {
      title: "Testing Window Max Time",
      dataIndex: "twmaxtime",
      key: "twmaxtime",
    },
    {
      title: "Pull Out Window Min Day",
      dataIndex: "powminday",
      key: "powminday",
    },
    {
      title: "Pull Out Window Min Time",
      dataIndex: "powmintime",
      key: "powmintime",
    },
    {
      title: "Pull Out Window Max Day",
      dataIndex: "powmaxday",
      key: "powmaxday",
    },
    {
      title: "Pull Out Window Max Time",
      dataIndex: "powmaxtime",
      key: "powmaxtime",
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
          <EditTimePoint dataSource={record} onEdit={fetchData} />
          {record.issuspend === false && (
            <DeleteTimePoint dataSource={record} onDelete={fetchData} />
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle title="TIME POINT" subtitle="All data time point" />
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
            x: 2500,
          }}
        />
      </div>
    </>
  );
};

export default TimePoint;
