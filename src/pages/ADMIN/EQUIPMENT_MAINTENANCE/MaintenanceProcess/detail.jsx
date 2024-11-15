"use client";

import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import { EyeOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip, Table, Tag } from "antd";
import React, { useState, useEffect } from "react";

const DetailFormula = ({ dataSource }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);


  const fetchData = async () => {
    try {
      setLoading(true);
      console.log(dataSource);

      setData(dataSource.detail);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: 'Branch',
      dataIndex: 'branchcode',
      key: 'branchcode',
      width: 100,
    },
    {
      title: 'MR Number',
      dataIndex: 'mrnumber',
      key: 'mrnumber',
      width: 100,
    },
    {
      title: 'MR Date',
      dataIndex: 'mrdate',
      key: 'mrdate',
      width: 100,
    },
    {
      title: 'Equipment Code',
      dataIndex: 'equipmentcode',
      key: 'equipmentcode',
      width: 100,
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
      width: 100,
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
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 200,
      render: (text) => (text ?? 'N/A'),
    }
  ]

  return (
    <>
      <Tooltip title="Detail">
        <Button icon={<EyeOutlined />} type="text" onClick={showModal} />
      </Tooltip>

      <Modal
        title={
          <HeaderTitle
            title="Maintenance Process"
            subtitle="Detail data a maintenance process"
          />
        }
        centered
        open={isModalOpen}
        closable={true}
        onCancel={handleCancel}
        width={1300}
        styles={{
          body: {
            maxHeight: "70vh",
            overflow: "auto",
          },
        }}
        footer={false}
      >
        <Table
          loading={loading}
          columns={columns}
          dataSource={data}
          pagination={false}
          scroll={{
            x: 1000,
          }}
        />
      </Modal>
    </>
  );
};

export default DetailFormula;
