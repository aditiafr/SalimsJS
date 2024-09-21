import { Button, Input, Space, Table } from "antd";
import EditSampleLocation from "./edit";
import DeleteSampleLocation from "./delete";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSampleSLocation } from "../../../../Api/Master/getData";

const SampleLocation = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getSampleSLocation();
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
      title: "Building Code",
      dataIndex: "BuildingCode",
      key: "BuildingCode",
      width: 150,
    },
    {
      title: "Location Code",
      dataIndex: "LocationCode",
      key: "LocationCode",
      width: 150,
    },
    {
      title: "Location Name",
      dataIndex: "LocationName",
      key: "LocationName",
      width: 150,
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "Description",
      width: 150,
    },
    {
      title: "Date Of Use",
      dataIndex: "DateOfUse",
      key: "DateOfUse",
      width: 150,
    },
    {
      title: "Date Of Available",
      dataIndex: "DateOfAvailable",
      key: "DateOfAvailable",
      width: 150,
    },
    {
      title: "Action",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <Space>
          <EditSampleLocation dataSource={record} onEdit={fetchData} />
          <DeleteSampleLocation />
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle
          title="SAMPLE STORAGE LOCATION"
          subtitle="All data sample storage location"
        />
        <div>
          <Link to="/master/sample-storage-location/form">
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

export default SampleLocation;
