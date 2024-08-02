import { Button, Input, Space, Table, Tag } from "antd";
import EditVendor from "./edit";
import DeleteVendor from "./delete";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getVendor } from "../../../../Api/Master/getData";

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
      width: 80,
    },
    {
      title: "Branch Code",
      dataIndex: "BranchCode",
      key: "BranchCode",
      width: 150,
    },
    {
      title: "Vendor Code",
      dataIndex: "VendorCode",
      key: "VendorCode",
      width: 150,
    },
    {
      title: "Vendor Name",
      dataIndex: "VendorName",
      key: "VendorName",
      width: 150,
    },
    {
      title: "Address",
      dataIndex: "Address",
      key: "Address",
      width: 300,
    },
    {
      title: "City",
      dataIndex: "City",
      key: "City",
      width: 150,
    },
    {
      title: "Postal Code",
      dataIndex: "PostalCode",
      key: "PostalCode",
      width: 150,
    },
    {
      title: "Country",
      dataIndex: "Country",
      key: "Country",
      width: 150,
    },
    {
      title: "Phone",
      dataIndex: "Phone",
      key: "Phone",
      width: 150,
    },
    {
      title: "Fax",
      dataIndex: "Fax",
      key: "Fax",
      width: 150,
    },
    {
      title: "NPWP",
      dataIndex: "NPWP",
      key: "NPWP",
      width: 150,
    },
    {
      title: "Contact Person",
      dataIndex: "ContactPerson",
      key: "ContactPerson",
      width: 150,
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "Description",
      width: 150,
    },
    // {
    //   title: "Suspended",
    //   dataIndex: "Suspended",
    //   key: "Suspended",
    //   width: 120,
    //   render: (suspended) => (
    //     <Tag color={suspended ? "red" : "green"}>{suspended ? "Yes" : "No"}</Tag>
    //   ),
    // },
    {
      title: "Action",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <Space>
          <EditVendor dataSource={record} onEdit={fetchData} />
          <DeleteVendor />
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

export default Vendor;
