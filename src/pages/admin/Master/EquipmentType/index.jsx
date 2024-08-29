import { Button, Input, Space, Table, Tag } from "antd";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import { Link } from "react-router-dom";
import EditEquipmentType from "./edit";
import DeleteEquipmentType from "./delete";
import { useEffect, useState } from "react";
import { getEquipmentType } from "../../../../Api/Master/getData";

const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const EquipmentType = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
    console.log('adadawd')

      const response = await getEquipmentType()
      console.log('adad', response)
      setData(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "No",
      dataIndex: "key",
      key: "key",
      width: 60,
      fixed: "left",
    },
    {
      title: "Equipment Type Code",
      dataIndex: "EquipmentTypeCode",
      key: "EquipmentTypeCode",
      width: 80,
    },
    {
      title: "Equipment Type Name",
      dataIndex: "EquipmentTypeName",
      key: "EquipmentTypeName",
      width: 100,
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "Description",
      width: 200,
      render: (text) => (text || "N/A"),
    },
    {
      title: "Suspended",
      dataIndex: "Suspended",
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
          <EditEquipmentType dataSource={record} onEdit={fetchData} />
          <DeleteEquipmentType EquipmentTypeCode={record.EquipmentTypeCode} name={record.EquipmentTypeName} onDelete={fetchData} />
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle
          title="Equipment Type"
          subtitle="All data equipment type"
        />
        <div>
          <Link to="/master/equipment-type/form">
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
          // loading={true}
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

export default EquipmentType;
