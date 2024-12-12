import React, { useEffect, useState } from 'react'
import HeaderTitle from '../../../../components/Dashboard/Global/HeaderTitle'
import { Link } from 'react-router-dom'
import { Button, Input, Table } from "antd";
import SearchInput from '../../../../components/Dashboard/Global/Table/SearchInput';
import { getSampleHandling } from '../../../../Api/SampleHandling/GetData';
import SampleHandlingDetail from './Detail';

const SampleHandling = () => {

  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getSampleHandling();
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
      title: "Split Sample Number",
      dataIndex: "ssnumber",
      key: "ssnumber",
      width: 200,
      fixed: "left",
    },
    {
      title: "Periode",
      dataIndex: "periode",
      key: "periode",
    },
    {
      title: "Split Sample Date",
      dataIndex: "ssdate",
      key: "ssdate",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Is Auto no",
      dataIndex: "isautono",
      key: "isautono",
    },
    {
      title: "Sample Request Number",
      dataIndex: "srnumber",
      key: "srnumber",
    },
    {
      title: "Labour Code",
      dataIndex: "labourcode",
      key: "labourcode",
    },
  ]

  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle title="SAMPLE HANDLING" subtitle="All data sample handling" />
        <div>
          <Link to="form">
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
            x: 2000,
          }}
        />
      </div>
    </>
  )
}

export default SampleHandling

const expandedRowRender = (record) => {

  return (
    <SampleHandlingDetail dataSource={record.details} />
  )
}