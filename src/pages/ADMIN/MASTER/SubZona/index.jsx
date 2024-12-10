import { Button, Space, Table, Tag } from "antd";
import EditZona from "./edit";
import DeleteZona from "./delete";
import { Link } from "react-router-dom";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import { useEffect, useState } from "react";
import { getSubZona } from "../../../../Api/Master/getData";
import SearchInput from "../../../../components/Dashboard/Global/Table/SearchInput";


const SubZona = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  const fetchData = async () => {
    try {
      const response = await getSubZona();
      setData(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    setLoading(false);
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
      title: "Zona Code",
      dataIndex: "zonacode",
      key: "zonacode",
    },
    {
      title: "Subzona Code",
      dataIndex: "subzonacode",
      key: "subzonacode",
    },
    {
      title: "Subzona Name",
      dataIndex: "subzonaname",
      key: "subzonaname",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (text) => (text ?? "N/A"),
    },
    {
      title: "ZIP Code",
      dataIndex: "zipcode",
      key: "zipcode",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Latitude, Longitude",
      dataIndex: "latlong",
      key: "latlong",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => (text ?? "N/A"),
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
          <EditZona />
          <DeleteZona name={record.SubZonaName} />
        </Space>
      ),
    },
  ];
  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle
          title="SUBZONA"
          subtitle="All data subzona"
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
            x: 2000,
          }}
        />
      </div>
    </>
  );
};

export default SubZona;
