import { Button, Input, Table, Tabs, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import { getSample } from "../../../../Api/Master/getData";
import SearchInput from "../../../../components/Dashboard/Global/Table/SearchInput";
import SampleParams from "./Params";

// const data = [
//   { params: '#BJ1#', des: 'Berat Jenis Sample', value: '1' },
//   { params: '@Bps@', des: 'Berat Penimbangan standar', value: '3' },
//   { params: '@Bpu@', des: 'Berat penimbangan uji', value: '6' },
//   { params: '@Cws@', des: 'Purity baku pembanding yang digunakan', value: '8' },
//   { params: '@Fps@', des: 'Faktor pengenceran standard', value: '4' },
//   { params: '@Fpu@', des: 'Faktor pengenceran uji', value: '7' },
//   { params: '@Ls@', des: 'Luas Area Standar', value: '5' },
//   { params: '@Lu@', des: 'Luas area uji', value: '2' }
// ];

// let total = "((@Lu@ * (@Bps@ / @Fps@ * 1000)) / (@Ls@ * (@Bpu@ * 1.5) / (@Fpu@ * #BJ1#) * 1000)) * @Cws@";

// const replaceParams = (expression, data) => {
//   data.forEach(({ params, value }) => {
//     const regex = new RegExp(params, 'g');
//     expression = expression.replace(regex, value);
//   });
//   return expression;
// };

// let evaluatedTotal = replaceParams(total, data);

// try {
//   // eslint-disable-next-line no-eval
//   const result = eval(evaluatedTotal);
//   console.log("Hasil perhitungan:", result);
// } catch (error) {
//   console.error("Error saat menghitung ekspresi:", error);
// }


const Sample = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getSample();
      setData(response)
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

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
      title: "Sample Code",
      dataIndex: "samplecode",
      key: "samplecode",
      fixed: "left",
    },
    {
      title: "Sample Name",
      dataIndex: "samplename",
      key: "samplename",
    },
    {
      title: "Version",
      dataIndex: "version",
      key: "version",
    },
    {
      title: "Formula QTY",
      dataIndex: "formulaqty",
      key: "formulaqty",
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
      title: "Use Int Batch No",
      dataIndex: "useintbatchno",
      key: "useintbatchno",
    },
    {
      title: "Use Ext Batch No",
      dataIndex: "useextbatchno",
      key: "useextbatchno",
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
      title: "Product Category Name",
      dataIndex: "prodcatname",
      key: "prodcatname",
    },
    {
      title: "Unit Name",
      dataIndex: "unitname",
      key: "unitname",
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
        <HeaderTitle title="SAMPLE" subtitle="All data Sample" />
        <div>
          <Link to="/master/sample/form">
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
          expandable={{
            expandedRowRender
          }}
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

const expandedRowRender = (record) => {

  return (
    <>
    <h1 className="text-2xl font-semibold my-2">Parameter</h1>
    <SampleParams dataSource={record.sample_pa} />
    </>
  )
};
