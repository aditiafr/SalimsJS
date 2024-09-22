import { Button, Input, Space, Table, Tag } from "antd";
import EditProductType from "./edit";
import DeleteProductType from "./delete";
import { Link } from "react-router-dom";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import { useEffect, useState } from "react";
import { getProductTypes } from "../../../../Api/Master/getData";
const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const ProductType = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getProductTypes( {
        sortParam: 'prodtypecode', 
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
      title: "Code",
      dataIndex: "ProductTypeCode",
      key: "ProductTypeCode",
      width: 80,
    },
    {
      title: "Name",
      dataIndex: "ProductTypeName",
      key: "ProductTypeName",
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
          <EditProductType dataSource={record} onEdit={fetchData} />
          <DeleteProductType ProductTypeCode={record.ProductTypeCode} name={record.Name} onDelete={fetchData} />
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle
          title="Product Type"
          subtitle="All data product type"
        />
        <div>
          <Link to="/master/product-type/form">
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

export default ProductType;
