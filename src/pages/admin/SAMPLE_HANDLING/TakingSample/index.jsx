import React from 'react'
import HeaderTitle from '../../../../components/Dashboard/Global/HeaderTitle'
import { Link } from 'react-router-dom'
import { Button, Table, Input } from 'antd'
const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const columns = [
  {
    title: 'TS Number',
    dataIndex: 'TSNumber',
    key: 'TSNumber',
    width: 100,
  },
  {
    title: 'Periode',
    dataIndex: 'Periode',
    key: 'Periode',
    width: 100,
  },
  {
    title: 'Date',
    dataIndex: 'Date',
    key: 'Date',
    width: 100,
  },
  {
    title: 'Sample Code',
    dataIndex: 'SampleCode',
    key: 'SampleCode',
    width: 100,
  },
  {
    title: 'PTS Number',
    dataIndex: 'PTSNumber',
    key: 'PTSNumber',
    width: 100,
  },
  {
    title: 'Sample No',
    dataIndex: 'SampleNo',
    key: 'SampleNo',
    width: 100,
  },
  {
    title: 'Map Code',
    dataIndex: 'MapCode',
    key: 'MapCode',
    width: 100,
  },
  {
    title: 'Address',
    dataIndex: 'Address',
    key: 'Address',
    width: 100,
  },
  {
    title: 'Weather',
    dataIndex: 'Weather',
    key: 'Weather',
    width: 100,
  },
  {
    title: 'Wind Direction',
    dataIndex: 'WindDirection',
    key: 'WindDirection',
    width: 100,
  },
  {
    title: 'Temperature',
    dataIndex: 'Temperature',
    key: 'Temperature',
    width: 100,
  },
  {
    title: "Description",
    dataIndex: "Description",
    key: "Description",
    width: 200,
    render: (text) => (text ?? "N/A"),
  },
]

const data = [
  {
    key: 1,
    TSNumber: 'TS-001',
    Periode: '2021-01',
    Date: '2021-01-01',
    SampleCode: 'SC-001',
    PTSNumber: 'PTS-001',
    SampleNo: 'SN-001',
    MapCode: 'MC-001',
    Address: 'Jl. Jendral Sudirman No. 1',
    Weather: 'Sunny',
    WindDirection: 'North',
    Temperature: '25°C',
    Description: 'Lorem ipsum dolor sit amet',
  },
  {
    key: 2,
    TSNumber: 'TS-002',
    Periode: '2021-02',
    Date: '2021-02-01',
    SampleCode: 'SC-002',
    PTSNumber: 'PTS-002',
    SampleNo: 'SN-002',
    MapCode: 'MC-002',
    Address: 'Jl. Jendral Sudirman No. 2',
    Weather: 'Rainy',
    WindDirection: 'South',
    Temperature: '20°C',
    Description: null,
  }
]

const TakingSample = () => {
  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle title="TAKING SAMPLE" subtitle="All data taking sample" />
        <div>
          <Link to="/transaction/taking-sample/form">
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
          // loading={true}
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
  )
}

export default TakingSample