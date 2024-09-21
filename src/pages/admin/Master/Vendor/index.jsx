import { Button, Space, Table, Tag } from "antd";
import EditVendor from "./edit";
import DeleteVendor from "./delete";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getVendor } from "../../../../Api/Master/getData";
import SearchInput from "../../../../components/Dashboard/Global/Table/SearchInput";

const Vendor = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getVendor();
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
      title: "Vendor Code",
      dataIndex: "vendorcode",
      key: "vendorcode",
      fixed: "left",
    },
    {
      title: "Vendor Name",
      dataIndex: "vendorname",
      key: "vendorname",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Postal Code",
      dataIndex: "postalcode",
      key: "postalcode",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Fax Code",
      dataIndex: "fax",
      key: "fax",
    },
    {
      title: "NPWP",
      dataIndex: "npwp",
      key: "npwp",
    },
    {
      title: "Contact Person",
      dataIndex: "contactperson",
      key: "contactperson",
    },
    {
      title: "Address 2",
      dataIndex: "address2",
      key: "address2",
    },
    {
      title: "Hp Number",
      dataIndex: "hp",
      key: "hp",
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 150,
    },
    {
      title: "Suspended",
      dataIndex: "issuspend",
      key: "issuspend",
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
          <EditVendor dataSource={record} onEdit={fetchData} />
          {record.issuspend === false && (
            <DeleteVendor dataSource={record} onDelete={fetchData} />
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle title="VENDOR" subtitle="All data vendor" />
        <div>
          <Link to="/master/vendor/form">
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
            x: 3000,
          }}
        />
      </div>
    </>
  );
};

export default Vendor;
