import { Button, Input, Space, Table, Tag } from "antd";
import EditZona from "./edit";
import DeleteZona from "./delete";
import { Link } from "react-router-dom";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import { useEffect, useState } from "react";
import { getSubZona } from "../../../../Api/Master/getData";
const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const SubZona = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getSubZona();

      setData(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);


  const columns = [
    {
      title: "Sub Zona Code",
      dataIndex: "subzonacode",
      key: "subzonacode",
      width: 100,
    },
    {
      title: "Sub Zona Name",
      dataIndex: "subzonaname",
      key: "subzonaname",
      width: 100,
    },
    {
      title: "Zona Code",
      dataIndex: "zonacode",
      key: "zonacode",
      width: 80,
    },
    {
      title: "Zona Name",
      dataIndex: "zonaname",
      key: "zonaname",
      width: 80,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: 200,
      render: (text) => (text ?? "N/A"),
    },
    {
      title: "ZIP Code",
      dataIndex: "zipcode",
      key: "zipcode",
      width: 100,
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      width: 100,
    },
    {
      title: "LatLong",
      dataIndex: "latlong",
      key: "latlong",
      width: 100,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 200,
      render: (text) => (text ?? "N/A"),
    },
    {
      title: "Suspended",
      dataIndex: "issuspend",
      key: "issuspend",
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
          <EditZona dataSource={record} onEdit={fetchData} />
          <DeleteZona name={record.subzonaname} subZonaCode={record.subzonacode} onDelete={fetchData} />
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle
          title="Sub Zona"
          subtitle="All data sub zona"
        />
        <div>
          <Link to="/master/subzona/form">
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

export default SubZona;
