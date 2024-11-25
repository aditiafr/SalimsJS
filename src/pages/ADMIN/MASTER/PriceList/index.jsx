import { Button, Input, Space, Table, Tabs, Tag } from "antd";
import EditPriceList from "./edit";
import DeletePriceList from "./delete";
import { Link } from "react-router-dom";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import { useEffect, useState } from "react";
import { getPriceList } from "../../../../Api/Master/getData";
import PriceListDetail from "./PriceListDetail";
const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const PriceList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getPriceList();
      setData(response);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "Branch Code",
      dataIndex: "branchcode",
      key: "branchcode",
      width: 100,
    },
    {
      title: "Price Code",
      dataIndex: "pricecode",
      key: "pricecode",
      width: 100,
    },
    {
      title: "Price Name",
      dataIndex: "pricename",
      key: "pricename",
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
      render: (isSuspend) => (
        <Tag color={isSuspend ? 'red' : 'green' }> {isSuspend ? 'Yes' : 'No'} </Tag>
      ),
    },
    {
      title: "Action",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <Space>
          <EditPriceList onEdit={fetchData} dataSource={record} />
          {record.issuspend === false && (
            <DeletePriceList name={record.pricename} priceListCode={record.pricecode} onDelete={fetchData} />
          )}  
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle
          title="Price List"
          subtitle="All data price list"
        />
        <div>
          <Link to="/master/pricelist/form">
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
          expandable={{ 
            expandedRowRender
           }}
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

export default PriceList;

const expandedRowRender = (record) => {
  const items = [
    {
      key: '1',
      label: 'Detail',
      children: <PriceListDetail dataSource={record.detail} />,
    },
  ];

  return (
    <Tabs defaultActiveKey="1" items={items} />
  )
}