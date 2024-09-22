"use client";

import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import { EyeOutlined } from "@ant-design/icons";
import { Button, Modal,Tooltip, Table } from "antd";
import React, { useState } from "react";

const DetailLabour = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "Code",
      dataIndex: "Code",
      key: "Code",
      width: 80,
    },
    {
      title: "Parameter",
      dataIndex: "Parameter",
      key: "Parameter",
      width: 100,
    },
    {
      title: "Procedure",
      dataIndex: "Procedure",
      key: "Procedure",
      width: 100,
      render: (text) => (text ?? "N/A"),
    },
    {
      title: "Alias",
      dataIndex: "Alias",
      key: "Alias",
      width: 100,
      render: (text) => (text ?? "N/A"),
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "Description",
      width: 200,
      render: (text) => (text ?? "N/A"),
    }
  ];

  const data = [
    {
      key: 1,
      Code  : "QC01",
      Parameter: "COD",
      Procedure: "Waste-01",
      Alias: "Deternimation of Chemical Oxygen Demand",
      Description: "0"
    },
    {
      key: 2,
      Code  : "QC02",
      Parameter: "TSS",
      Procedure: "Waste-02",
      Alias: "Deternimation of Total Suspended Solid",
      Description: "0"
    },
    {
      key: 3,
      Code  : "QC03",
      Parameter: "pH",
      Procedure: "Waste-03",
      Alias: "Deternimation of pH",
      Description: "0"
    },
    {
      key: 4,
      Code  : "QC04",
      Parameter: "Temperature",
      Procedure: "Waste-04",
      Alias: "Deternimation of Temperature",
      Description: "0"
    },
    {
      key: 5,
      Code  : "QC05",
      Parameter: "DO",
      Procedure: "Waste-05",
      Alias: "Deternimation of Dissolved Oxygen",
      Description: "0"
    },
  ]

  return (
    <>
      <Tooltip title="Detail">
        <Button icon={<EyeOutlined />} type="text" onClick={showModal} />
      </Tooltip>

      <Modal
        title={
          <HeaderTitle
            title="LABOUR"
            subtitle="Detail data a labour"
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

export default DetailLabour;
