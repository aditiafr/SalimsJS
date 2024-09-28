import { Button, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditProduct from "./edit";
import DeleteProduct from "./delete";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import { getProduct } from "../../../../Api/Master/getData";
import SearchInput from "../../../../components/Dashboard/Global/Table/SearchInput";

const Product = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getProduct();
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
      width: 60,
      fixed: "left",
    },
    {
      title: "Product Code",
      dataIndex: "prodcode",
      key: "prodcode",
      fixed: "left",
    },
    {
      title: "Product Name",
      dataIndex: "prodname",
      key: "prodname",
    },
    {
      title: "Product Type Name",
      dataIndex: "prodtypename",
      key: "prodtypename",
    },
    {
      title: "Product Category Name",
      dataIndex: "prodcatname",
      key: "prodcatname",
    },
    {
      title: "Unit name",
      dataIndex: "unitname",
      key: "unitname",
    },
    {
      title: "Formula QTY",
      dataIndex: "formulaqty",
      key: "formulaqty",
    },
    // {
    //   title: "tempcode",
    //   dataIndex: "tempcode",
    //   key: "tempcode",
    // },
    // {
    //   title: "tempname",
    //   dataIndex: "tempname",
    //   key: "tempname",
    // },
    {
      title: "Warehouse Name",
      dataIndex: "warehousename",
      key: "warehousename",
    },
    {
      title: "Alias Name",
      dataIndex: "aliasname",
      key: "aliasname",
    },
    {
      title: "Shelf Life",
      dataIndex: "shelflife",
      key: "shelflife",
    },
    {
      title: "Use In Batch No",
      dataIndex: "useintbatchno",
      key: "useintbatchno",
    },
    {
      title: "Use Ext BatchNo",
      dataIndex: "useextbatchno",
      key: "useextbatchno",
    },
    {
      title: "Manufacture Name",
      dataIndex: "manufacturename",
      key: "manufacturename",
    },
    {
      title: "Building Name",
      dataIndex: "buildingname",
      key: "buildingname",
    },
    {
      title: "Min Stock",
      dataIndex: "minstock",
      key: "minstock",
    },
    {
      title: "Unit Code Pack",
      dataIndex: "unitcodepack",
      key: "unitcodepack",
    },
    {
      title: "Formula QTY Pack",
      dataIndex: "formulaqtypack",
      key: "formulaqtypack",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
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
          <EditProduct dataSource={record} onEdit={fetchData} />
          {record.issuspend === false && (
            <DeleteProduct dataSource={record} onDelete={fetchData} />
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle title="PRODUCT" subtitle="All data product" />
        <div>
          <Link to="/master/product/form">
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
            x: 4000,
          }}
        />
      </div>
    </>
  );
};

export default Product;
