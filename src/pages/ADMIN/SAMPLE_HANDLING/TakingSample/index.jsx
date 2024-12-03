import React, { useEffect, useState } from 'react'
import HeaderTitle from '../../../../components/Dashboard/Global/HeaderTitle'
import { Link } from 'react-router-dom'
import { Button, Space, Table, Tabs } from 'antd'
import { getTakingSample } from '../../../../Api/SampleHandling/GetData'
import SearchInput from '../../../../components/Dashboard/Global/Table/SearchInput'
import TakingSampleParameter from './Parameter'
import TakingSampleCI from './ContainerInformation'
import DeleteTakingSample from './delete'
import EditTakingSample from './edit'

const TakingSample = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getTakingSample();
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
      title: "Taking Sample Number",
      dataIndex: "tsnumber",
      key: "tsnumber",
      width: 200,
      fixed: "left",
    },
    {
      title: "Periode",
      dataIndex: "periode",
      key: "periode",
    },
    {
      title: "Taking Sample Date",
      dataIndex: "tsdate",
      key: "tsdate",
    },
    {
      title: "Sample Code",
      dataIndex: "samplecode",
      key: "samplecode",
    },
    {
      title: "Planning Taking Sample Number",
      dataIndex: "ptsnumber",
      key: "ptsnumber",
    },
    {
      title: "Sample No",
      dataIndex: "sampleno",
      key: "sampleno",
    },
    {
      title: "Map Code",
      dataIndex: "mapcode",
      key: "mapcode",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Weather",
      dataIndex: "weather",
      key: "weather",
    },
    {
      title: "Wind Direction",
      dataIndex: "winddirection",
      key: "winddirection",
    },
    {
      title: "Temperatur",
      dataIndex: "temperatur",
      key: "temperatur",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <Space>
          <EditTakingSample dataSource={record} />
          <DeleteTakingSample dataSource={record} onDelete={fetchData} />
        </Space>
      ),
    },
  ]

  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle title="TAKING SAMPLE" subtitle="All data taking sample" />
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
            x: 3000,
          }}
        />
      </div>
    </>
  )
}

export default TakingSample

const expandedRowRender = (record) => {

  const items = [
    {
      key: '1',
      label: 'Parameter',
      children: <TakingSampleParameter dataSource={record.taking_sample_parameters} />,
    },
    {
      key: '2',
      label: 'Container Information',
      children: <TakingSampleCI dataSource={record.taking_sample_ci} />,
    },
  ];

  return (
    <Tabs defaultActiveKey="1" items={items} />
  )
}