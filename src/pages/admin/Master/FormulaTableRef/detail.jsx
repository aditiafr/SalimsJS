"use client";

import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import { EyeOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip, Table } from "antd";
import React, { useState } from "react";

const DetailFormulaTableRef = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setIsModalOpen(false);
  };

  const propertyColumns = [
    {
      title: "Caption",
      dataIndex: "Caption",
      key: "Caption",
      width: 100,
    },
    {
      title: "Formula",
      dataIndex: "Formula",
      key: "Formula",
      width: 100,
    },
    {
      title: "DataType",
      dataIndex: "DataType",
      key: "DataType",
      width: 100,
    },
    {
      title: "Show",
      dataIndex: "Show",
      key: "Show",
      width: 100,
    },
  ];

  const propertyData = [
    {
      key: "1",
      Caption: "N",
      Formula: "[N]",
      DataType: "float",
      Show: "1",
    },
    {
      key: "2",
      Caption: "GlukosaMg",
      Formula: "[GlukosaMg]",
      DataType: "float",
      Show: "1",
    },
    {
      key: "3",
      Caption: "GlukoasDiff",
      Formula: "[GlukoasDiff]",
      DataType: "float",
      Show: "1",
    },
    {
      key: "4",
      Caption: "GlukosaPct",
      Formula: "[GlukosaPct]",
      DataType: "float",
      Show: "1",
    },
    {
      key: "5",
      Caption: "KolesterolMg",
      Formula: "[KolesterolMg]",
      DataType: "float",
      Show: "1",
    },
    {
      key: "6",
      Caption: "KolesterolDiff",
      Formula: "[KolesterolDiff]",
      DataType: "float",
      Show: "1",
    },
    {
      key: "7",
      Caption: "KolesterolPct",
      Formula: "[KolesterolPct]",
      DataType: "float",
      Show: "1",
    },
    {
      key: "8",
      Caption: "TrigliseridaMg",
      Formula: "[TrigliseridaMg]",
      DataType: "float",
      Show: "1",
    },
    {
      key: "9",
      Caption: "TrigliseridaDiff",
      Formula: "[TrigliseridaDiff]",
      DataType: "float",
      Show: "1",
    }
  ]

  const valueColumns = [
    {
      title: "N",
      dataIndex: "N",
      key: "N",
      width: 100,
    },
    {
      title: "GlukosaMg",
      dataIndex: "GlukosaMg",
      key: "GlukosaMg",
      width: 100,
    },
    {
      title: "GlukoasDiff",
      dataIndex: "GlukoasDiff",
      key: "GlukoasDiff",
      width: 100,
    },
    {
      title: "GlukosaPct",
      dataIndex: "GlukosaPct",
      key: "GlukosaPct",
      width: 100,
    },
    {
      title: "KolesterolMg",
      dataIndex: "KolesterolMg",
      key: "KolesterolMg",
      width: 100,
    },
    {
      title: "KolesterolDiff",
      dataIndex: "KolesterolDiff",
      key: "KolesterolDiff",
      width: 100,
    },
    {
      title: "KolesterolPct",
      dataIndex: "KolesterolPct",
      key: "KolesterolPct",
      width: 100,
    },
    {
      title: "TrigliseridaMg",
      dataIndex: "TrigliseridaMg",
      key: "TrigliseridaMg",
      width: 100,
    },
    {
      title: "TrigliseridaDiff",
      dataIndex: "TrigliseridaDiff",
      key: "TrigliseridaDiff",
      width: 100,
    }
  ]

  const valueData = [
    {
      key: "1",
      N: 2.4,
      GlukosaMg: 2.4,
      GlukoasDiff: 3.4,
      GlukosaPct: 4.4,
      KolesterolMg: 5.4,
      KolesterolDiff: 6.4,
      KolesterolPct: 7.4,
      TrigliseridaMg: 8.4,
      TrigliseridaDiff: 9.4,
    },
    {
      key: "2",
      N: 2.4,
      GlukosaMg: 2.4,
      GlukoasDiff: 3.4,
      GlukosaPct: 4.4,
      KolesterolMg: 5.4,
      KolesterolDiff: 6.4,
      KolesterolPct: 7.4,
      TrigliseridaMg: 8.4,
      TrigliseridaDiff: 9.4,
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
            title="FORMULA TABLE REFERENCE"
            subtitle="Detail data a formula table reference"
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
          title={() => <h3 className="text-lg font-semibold">Table Properties</h3>}
          columns={propertyColumns}
          dataSource={propertyData}
          pagination={false}
          scroll={{
            x: 1000,
          }}
        />

        <Table
          title={() => <h3 className="text-lg font-semibold">Table Value</h3>}
          columns={valueColumns}
          dataSource={valueData}
          pagination={false}
          scroll={{
            x: 1000,
          }}
        />
      </Modal>
    </>
  );
};

export default DetailFormulaTableRef;
