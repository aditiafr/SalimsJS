import { Button, Space, Table, Tag } from "antd";
import EditPriceList from "./edit";
import DeletePriceList from "./delete";
import { Link } from "react-router-dom";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import { useEffect, useState } from "react";
import SearchInput from "../../../../components/Dashboard/Global/Table/SearchInput";


const PriceList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  const fetchData = async () => {
    try {
      const response = [];
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
      title: "Branch Code",
      dataIndex: "BranchCode",
      key: "BranchCode",
    },
    {
      title: "Price Code",
      dataIndex: "PriceCode",
      key: "PriceCode",
    },
    {
      title: "Price Name",
      dataIndex: "PriceName",
      key: "PriceName",
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "Description",
      render: (text) => (text ?? "N/A"),
    },
    {
      title: "Suspended",
      dataIndex: "Suspended",
      key: "Suspended",
      render: (isSuspend) => (
        <Tag color={isSuspend ? 'red' : 'green'}> {isSuspend ? 'Yes' : 'No'} </Tag>
      ),
    },
    {
      title: "Action",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <Space>
          <EditPriceList />
          <DeletePriceList name={record.PriceName} />
        </Space>
      ),
    },
  ];
  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle
          title="Price List M"
          subtitle="All data price list m"
        />
        <div>
          <Link to="/master/price-list-m/form">
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
            x: 1000,
          }}
        />
      </div>
    </>
  );
};

export default PriceList;
