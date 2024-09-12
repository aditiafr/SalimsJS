import { Button, Input, Space, Table, Tag } from "antd";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import { Link } from "react-router-dom";
import EditPackingType from "./edit";
import DeletePackingType from "./delete";
import { useEffect, useState } from "react";
import { getPackingTypes } from "../../../../Api/Master/getData";
const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const PackingType = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getPackingTypes( {
        sortParam: 'unitcode', 
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
      title: "Packing Type Code",
      dataIndex: "PackingTypeCode",
      key: "PackingTypeCode",
      width: 80,
    },
    {
      title: "Packing Type Name",
      dataIndex: "PackingTypeName",
      key: "PackingTypeName",
      width: 100,
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "Description",
      width: 200,
      render: (text) => (text ?? "N/A"),
    },
    {
      title: "Suspended",
      dataIndex: "IsSuspend",
      key: "IsSuspend",
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
          <EditPackingType dataSource={record} onEdit={fetchData} />
          <DeletePackingType PackingTypeCode={record.PackingTypeCode} name={record.PackingTypeName} onDelete={fetchData} />
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle
          title="Packing Type"
          subtitle="All data packing type"
        />
        <div>
          <Link to="/master/packing-type/form">
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

export default PackingType;
