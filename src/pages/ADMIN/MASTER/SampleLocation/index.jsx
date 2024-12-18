import { Button, Space, Table, Tag } from "antd";
import EditSampleLocation from "./edit";
import DeleteSampleLocation from "./delete";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSampleLocation } from "../../../../Api/Master/getData";
import SearchInput from "../../../../components/Dashboard/Global/Table/SearchInput";

const SampleLocation = () => {

  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getSampleLocation();
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
      fixed: "left",
      width: 80,
    },
    {
      title: "Location Code",
      dataIndex: "locationcode",
      key: "LocationCode",
      fixed: "left",
    },
    {
      title: "Location Name",
      dataIndex: "locationname",
      key: "LocationName",
    },
    {
      title: "Building Name",
      dataIndex: "buildingname",
      key: "buildingName",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "Description",
    },
    {
      title: "Suspended",
      dataIndex: "issuspend",
      key: "Suspended",
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
          <EditSampleLocation dataSource={record} onEdit={fetchData} />
          {record.issuspend !== true && (
            <DeleteSampleLocation dataSource={record} onDelete={fetchData} />
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle
          title="SAMPLE LOCATION"
          subtitle="All data sample location"
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
            x: 1200,
          }}
        />
      </div>
    </>
  );
};

export default SampleLocation;
