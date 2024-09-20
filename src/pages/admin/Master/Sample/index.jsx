import { Button, Input, Table, Tag } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";

const data = [
  {
    version: "1.0",
    samplecode: "SAM001",
    samplename: "Water Quality Test Sample",
    prodcatcode: "ENVIRO",
    unitcode: "ML",
    formulaqty: 100,
    tempcode: "COOL",
    description: "Standard water sample for quality testing in environmental labs",
    aliasname: "H2O-QT",
    shelflife: 30,
    useintbatchno: true,
    useextbatchno: false,
    manufacturecode: "MAN001",
    buildingcode: "LAB01",
    unitcodepack: "BOX",
    formulaqtypack: 10
  },
  {
    version: "2.1",
    samplecode: "SAM002",
    samplename: "Soil Nutrient Analysis Sample",
    prodcatcode: "AGRI",
    unitcode: "G",
    formulaqty: 500,
    tempcode: "ROOM",
    description: "Soil sample for agricultural nutrient analysis",
    aliasname: "SOIL-NUT",
    shelflife: 90,
    useintbatchno: true,
    useextbatchno: true,
    manufacturecode: "MAN002",
    buildingcode: "LAB02",
    unitcodepack: "BAG",
    formulaqtypack: 5
  },
  {
    version: "1.5",
    samplecode: "SAM003",
    samplename: "Blood Glucose Test Strip",
    prodcatcode: "MEDIC",
    unitcode: "PCS",
    formulaqty: 1,
    tempcode: "COOL",
    description: "Individual test strip for blood glucose measurement",
    aliasname: "GLU-STRIP",
    shelflife: 365,
    useintbatchno: true,
    useextbatchno: false,
    manufacturecode: "MAN003",
    buildingcode: "MED01",
    unitcodepack: "BOTTLE",
    formulaqtypack: 50
  }
];

const Sample = () => {
  // const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  // const [loading, setLoading] = useState(false);

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
      title: "version",
      dataIndex: "version",
      key: "version",
    },
    {
      title: "samplecode",
      dataIndex: "samplecode",
      key: "samplecode",
    },
    {
      title: "samplename",
      dataIndex: "samplename",
      key: "samplename",
    },
    {
      title: "prodcatcode",
      dataIndex: "prodcatcode",
      key: "prodcatcode",
    },
    {
      title: "unitcode",
      dataIndex: "unitcode",
      key: "unitcode",
    },
    {
      title: "formulaqty",
      dataIndex: "formulaqty",
      key: "formulaqty",
    },
    {
      title: "tempcode",
      dataIndex: "tempcode",
      key: "tempcode",
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "aliasname",
      dataIndex: "aliasname",
      key: "aliasname",
    },
    {
      title: "shelflife",
      dataIndex: "shelflife",
      key: "shelflife",
    },
    {
      title: "useintbatchno",
      dataIndex: "useintbatchno",
      key: "useintbatchno",
    },
    {
      title: "useextbatchno",
      dataIndex: "useextbatchno",
      key: "useextbatchno",
    },
    {
      title: "manufacturecode",
      dataIndex: "manufacturecode",
      key: "manufacturecode",
    },
    {
      title: "buildingcode",
      dataIndex: "buildingcode",
      key: "buildingcode",
    },
    {
      title: "unitcodepack",
      dataIndex: "unitcodepack",
      key: "unitcodepack",
    },
    {
      title: "formulaqtypack",
      dataIndex: "formulaqtypack",
      key: "formulaqtypack",
    },
    {
      title: "Suspend",
      dataIndex: "issuspend",
      key: "issuspend",
      render: (suspended) => (
        <Tag color={suspended ? 'red' : 'green'}> {suspended ? 'Yes' : 'No'} </Tag>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle title="Manufacture" subtitle="All data Manufacture" />
        <div>
          <Link to="/master/sample/form">
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
          // loading={loading}
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

export default Sample;
