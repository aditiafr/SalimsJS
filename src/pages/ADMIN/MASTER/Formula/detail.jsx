"use client";

import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import { EyeOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip, Table, Typography } from "antd";
import Title from "antd/es/typography/Title";
import React, { useState } from "react";
const { Paragraph, Text } = Typography;

const DetailFormula = () => {
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
      title: "Parameter",
      dataIndex: "Parameter",
      key: "Parameter",
      width: 100,
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "Description",
      width: 200,
      render: (text) => (text ?? "N/A"),
    },
    {
      title: "Sim Value",
      dataIndex: "SimValue",
      key: "SimValue",
      width: 100,
    },
  ];

  const data = [
    {
      key: 1,
      Parameter: "#GI_E01",
      Description: "Faktor Pengecekan",
      SimValue: 1.00,
    },
    {
      key: 2,
      Parameter: "#GI_E02",
      Description: "N Tiosufate",
      SimValue: 0.1,
    },
    {
      key: 3,
      Parameter: "@ms@",
      Description: "Masa Sample (gr)",
      SimValue: 3,
    },
    {
      key: 4,
      Parameter: "@Vb@",
      Description: "Volume Blanko (ml)",
      SimValue: 25,
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
            title="FORMULA"
            subtitle="Detail data a formula"
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
          title={() => (
            <Title level={5}>Formula Parameter</Title>
          )}
          columns={columns}
          dataSource={data}
          pagination={false}
          scroll={{
            x: 1000,
          }}
        />

        <Paragraph style={{ marginTop: 40 }}>
          <Title level={5}>Formula</Title>

            = ((( 
              VLOOKUP([N] = FLOOR((@Vb@ - @Vs@) * (0.1/#GI_EO2#)); [TBLLC[ ; [GlukosaMg]) +
              VLOOKUP([N] = FLOOR((@Vb@ - @Vs@) * (0.1/#GI_EO2#)); [TBLLC[ ; [FruktosaMg])
            )))
        </Paragraph>

        <Paragraph>
          <Title level={5}>Sim Result</Title>
          <Text code>34.675</Text>
        </Paragraph>
      </Modal>
    </>
  );
};

export default DetailFormula;
