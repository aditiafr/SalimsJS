"use client";

import React, { useState } from 'react';
import { Form, Input, Col, Row, Button, Table, Popconfirm } from 'antd';
import ButtonSubmit from '../../../../components/Dashboard/Global/Button/ButtonSubmit';
import HeaderTitle from '../../../../components/Dashboard/Global/HeaderTitle';
import EditableTable from '../../../../components/Dashboard/Global/Table/EditableTable';

const FormFormulaTableRef = () => {
  const [form] = Form.useForm();
  const [columnCount, setColumnCount] = useState(0);
  const [columns, setColumns] = useState([]);
  const [initialData, setInitialData] = useState([]);

  const handleColumnCountChange = (e) => {
    const count = parseInt(e.target.value, 10);
    setColumnCount(count);

    const newColumns = [
      {
        title: 'Caption',
        dataIndex: 'caption',
        editable: true,
      },
      {
        title: 'Formula',
        dataIndex: 'formula',
        editable: true,
      },
      {
        title: 'Datatype',
        dataIndex: 'datatype',
        editable: true,
      },
      {
        title: 'Show',
        dataIndex: 'show',
        editable: true,
      },
    ];

    const newData = Array.from({ length: count }, (_, index) => ({
      key: index,
      caption: 'N/A',
      formula: 'N/A',
      datatype: 'N/A',
      show: 'N/A',
    }));

    setColumns(newColumns);
    setInitialData(newData);
  };

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle
          title="FORMULA TABLE REFERENCE"
          subtitle="form data a formula table reference"
        />
      </div>
      <div className="w-full bg-white rounded-lg">
        <Form
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <Row gutter={30} style={{ padding: '28px' }}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Branch"
                name="Branch"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Branch!',
                  },
                ]}
              >
                <Input maxLength={20} />
              </Form.Item>

              <Form.Item
                label="Version"
                name="Version"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Version!',
                  },
                ]}
              >
                <Input maxLength={20} />
              </Form.Item>

              <Form.Item
                label="Code"
                name="Code"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Code!',
                  },
                ]}
              >
                <Input maxLength={20} />
              </Form.Item>

              <Form.Item
                label="Name"
                name="Name"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Name!',
                  },
                ]}
              >
                <Input maxLength={20} />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Formula Code"
                name="FormulaCode"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Formula Code!',
                  },
                ]}
              >
                <Input maxLength={20} />
              </Form.Item>

              <Form.Item
                label="Column Count"
                name="ColumnCount"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Column Count!',
                  },
                ]}
              >
                <Input type="number" maxLength={20} onChange={handleColumnCountChange} />
              </Form.Item>

              <Form.Item label="Description" name="Description">
                <Input.TextArea rows={3} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={30} style={{ padding: '28px' }}>
            <Col span={24}>
              {columnCount > 0 && (
                <>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Table Properties
                  </h3>

                  <EditableTable columns={columns} initialData={initialData} canAddRow={false} canDeleteRow={false}/>
                </>
              )}
            </Col>
          </Row>

          <Row gutter={30} style={{ padding: '28px' }}>
            <Col span={24}>
              {columnCount > 0 && (
                <>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Table Value
                  </h3>

                  <TableValue initialData={initialData} />
                </>
              )}
            </Col>
          </Row>

          <ButtonSubmit onReset={onReset} />
        </Form>
      </div>
    </>
  );
};

export default FormFormulaTableRef;

const TableValue = ({ initialData }) => {
  const [dataSource, setDataSource] = useState(initialData);

  const handleAdd = () => {
    const newData = {
      key: dataSource.length,
      ...initialData.reduce((acc, col) => {
        acc[col.dataIndex] = 'N/A';
        return acc;
      }, {}),
    };

    setDataSource([...dataSource, newData]);
  };

  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    newData.splice(index, 1, row);
    setDataSource(newData);
  };

  const columns = initialData.map((col) => ({
    ...col,
    editable: true,
    render: (_, record) => (
      <EditableCell
        editable={col.editable}
        dataIndex={col.dataIndex}
        title={col.title}
        record={record}
        handleSave={handleSave}
      />
    ),
  }));

  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const save = (value) => {
      handleSave({ ...record, [dataIndex]: value });
    };

    return (
      <td {...restProps}>
        {editable ? (
          <Input value={children} onChange={(e) => save(e.target.value)} />
        ) : (
          children
        )}
      </td>
    );
  };

  const components = {
    body: {
      cell: EditableCell,
    },
  };

  return (
    <div>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Add a row
      </Button>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={[
          ...columns,
          {
            title: 'Operation',
            dataIndex: 'operation',
            render: (_, record) =>
              dataSource.length >= 1 ? (
                <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                  <Button type="primary" danger>
                    Delete
                  </Button>
                </Popconfirm>
              ) : null,
          },
        ]}
        pagination={false}
      />
    </div>
  );
};
