import React, { useEffect, useState } from 'react';
import { Form, Input, Popconfirm, Table, Typography, Button, message, InputNumber } from 'antd';

import { CloseOutlined, DeleteOutlined, EditFilled, SaveFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';
import InputModal from '../../../../../components/Dashboard/Global/InputModal';
import { getParameter } from '../../../../../Api/Master/getData';

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  onDataParam,
  ...restProps
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [dataParam, setDataParam] = useState([]);
  const [selectParam, setSelectParam] = useState("");
  const [openParam, setOpenParam] = useState(null);

  useEffect(() => {
    const fetchParam = async () => {
      try {
        setIsLoading(true);
        const res = await getParameter();
        setDataParam(res)
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }
    if (openParam) {
      fetchParam();
      setOpenParam(false);
    }
  }, [openParam]);

  useEffect(() => {
    if (selectParam) {
      onDataParam(selectParam);
    }
  }, [onDataParam, selectParam]);

  return (
    <td {...restProps}>
      {editing ? (
        <div>

          {dataIndex === 'description' ? (
            <Form.Item
              name={dataIndex}
            >
              <TextArea rows={4} placeholder={title} />
            </Form.Item>

          ) :
            dataIndex === "parcode" ? (
              <InputModal
                title="Parameter"
                label={title}
                name={dataIndex}
                dataSource={dataParam}
                loading={isLoading}
                columns={columnsParam}
                onData={(values) => setSelectParam(values)}
                onOpenModal={(values) => setOpenParam(values)}
                onDetail={true}
              />
            ) : (
              <Form.Item
                name={dataIndex}
                rules={[
                  {
                    required: true,
                    message: `Please Input ${title}!`,
                  },
                ]}
              >
                {
                  dataIndex === 'req_qty' ||
                    dataIndex === 'l_limit' ||
                    dataIndex === 'u_limit' ||
                    dataIndex === 'l_spec' ||
                    dataIndex === 'u_spec'
                    ? (
                      <InputNumber placeholder={title} min={1} className="w-full" />
                    ) : (
                      <Input placeholder={title} maxLength={50} />
                    )
                }
              </Form.Item>
            )}


        </div>
      ) : (
        children
      )
      }
    </td >
  );
};


const FormCustomerParam = ({ onSaveData, onEdit, onApproval }) => {

  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  const [editingKey, setEditingKey] = useState('');
  // const [loading, setLoading] = useState(false);
  // const [isDisable, setIsDisable] = useState(true);

  const [dataParam, setDataParam] = useState(null);

  useEffect(() => {
    if (form && dataParam) {
      form.setFieldsValue({ parcode: dataParam.parname });
    }
  }, [dataParam, form])

  useEffect(() => {
    if (onEdit) {
      const dataEdit = onEdit.map((row, index) => ({ ...row, key: index + 1 })).reverse()
      setData(dataEdit);
      setCount(dataEdit.length === 0 ? 0 : dataEdit.map((item) => item.key)[0]);
      onSaveData(dataEdit);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onEdit]);


  // useEffect(() => {
  //     if (onEdit || onApproval) {
  //         const fetchData = async () => {
  //             try {
  //                 const response = await getWODocumentTrasaction();
  //                 const filter = response.filter((item) =>
  //                     item.FacilityCode === FacilityCode &&
  //                     item.WONumber === WONumber
  //                 ).map((row, index) => ({
  //                     ...row, key: index + 1
  //                 })).reverse()
  //                 setData(filter)
  //                 setCount(filter.length === 0 ? 0 : filter.map((item) => item.key)[0])
  // onSaveData(filter)
  //             } catch (error) {
  //                 setData([]);
  //                 setCount(0);
  // onSaveData([]);
  //                 console.log(error);
  //             }
  //         }

  //         fetchData();
  //     }
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [FacilityCode, WONumber, onEdit]);

  const isEditing = (record) => record.key === editingKey;

  const handleEdit = (record) => {
    // const docExpDate = record.DocExpDate ? dayjs(record.DocExpDate) : null;

    form.setFieldsValue({
      // Description: '',
      ...record,
      // DocExpDate: docExpDate,
    });
    setEditingKey(record.key);
  };

  const handleDelete = (key) => {
    // setIsDisable(false);
    const deletedRow = data.find((row) => row.key === key);
    const deletedNumber = deletedRow.key;
    const deletedkey = deletedRow.key;

    const newData = data.filter((row) => row.key !== key);

    const updatedData = newData.map((row) => {

      if (row.key > deletedNumber && row.key > deletedkey) {
        return { ...row, key: row.key - 1 };
      }
      return row;
    });

    setCount(updatedData.length > 0 ? updatedData[0].key : 0);

    setData(updatedData);
    onSaveData(updatedData);

    // console.log("DataFormTran", updatedData);
  };


  const handleCancel = (record) => {
    if (!record.username) {
      const newData = data.filter((item) => item.key !== record.key);
      setData(newData);
    } else {
      setEditingKey('');
    }
    setEditingKey('');

    // console.log("DataFormTran", data);
  };


  const handleSave = async (record) => {
    // setIsDisable(false);
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => record.key === item.key);
      const duplicatePar = newData.find((item) => record.parname === item.parcode)
      if (duplicatePar) {
        message.error("Duplicate Parameter!")
      } else {

        if (index > -1) {
          const item = newData[index];
          const ParCode = dataParam.parcode;
          newData.splice(index, 1, {
            ...item,
            ...row,
            parcode: ParCode,
          });
          setData(newData);
          setEditingKey('');
          console.log("DataFormTran", newData);
          onSaveData(newData)
        } else {
          newData.push(row);
          setData(newData);
          setEditingKey('');
          console.log("DataFormTran", newData);
          onSaveData(newData)
        }

        const editedRow = data.find((row) => row.key === record.key);
        const lastNumber = editedRow.key;

        setCount(lastNumber);
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };


  const handleAdd = () => {

    const num = count + 1;
    // const code = (count + 1).toString().padStart(3, '0');

    if (editingKey) {
      message.warning("Complete the input form !");
      return; // Stop saving if duplicate found
    }

    const newData = {
      key: num,
      parcode: '',
      req_qty: '',
      l_limit: '',
      u_limit: '',
      l_spec: '',
      u_spec: '',
      frequency: '',
      specification: '',
    };
    setData([newData, ...data]);
    handleEdit(newData);

    // console.log("DataFormTran", data);
  };

  // const handleSaveAllData = async () => {
  //     setLoading(true);
  //     setIsDisable(true);
  //     try {
  //         onSaveData(data);
  //         console.log("PostData", data);
  //         message.success("Success add form table data!!");
  //     } catch (error) {
  //         console.log(error);
  //     }
  //     setLoading(false);
  // }

  // const handleCancelAllData = () => {
  //     setData([]);
  //     setCount(0);
  //     onSaveData([]);
  // }

  const columns = [
    {
      title: 'No',
      dataIndex: 'key',
      sorter: (a, b) => a.key - b.key,
      width: 80,
    },
    {
      title: 'Parameter Code',
      dataIndex: 'parcode',
      editable: true,
    },
    {
      title: 'Request QTY',
      dataIndex: 'req_qty',
      editable: true,
    },
    {
      title: 'Lower Limit',
      dataIndex: 'l_limit',
      editable: true,
    },
    {
      title: 'Upper Limit',
      dataIndex: 'u_limit',
      editable: true,
    },
    {
      title: 'Lower Spec',
      dataIndex: 'l_spec',
      editable: true,
    },
    {
      title: 'Upper Spec',
      dataIndex: 'u_spec',
      editable: true,
    },
    {
      title: 'Frequency',
      dataIndex: 'frequency',
      editable: true,
    },
    {
      title: 'Specification',
      dataIndex: 'specification',
      editable: true,
    },
  ];

  if (!onApproval) {
    columns.push({
      title: 'Actions',
      dataIndex: 'actions',
      width: 100,
      fixed: "right",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span className="flex items-center justify-around">
            <Typography.Link onClick={() => handleSave(record)} style={{ fontSize: '18px' }}>
              <SaveFilled />
            </Typography.Link>

            <Typography.Link onClick={() => handleCancel(record)} style={{ fontSize: '18px' }}>
              <CloseOutlined />
            </Typography.Link>
          </span>
        ) : (
          <span className="flex items-center justify-around">
            <Typography.Link onClick={() => handleEdit(record)} style={{ fontSize: '18px' }}>
              <EditFilled />
            </Typography.Link>
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
              <Link>
                <DeleteOutlined style={{ fontSize: '18px' }} />
              </Link>
            </Popconfirm>
          </span>
        );
      },
    });
  }

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        onDataParam: (values) => setDataParam(values),
      }),
      ...col,
    };
  });

  return (
    <Form form={form} component={false}>
      <div className="flex items-center justify-between mb-4">
        <p className="text-2xl font-bold">
          PARAMETER
        </p>
        {!onApproval && (
          <Button
            onClick={handleAdd}
            color="primary"
            variant="contained"
            disabled={!!editingKey}
          >
            + Add Data
          </Button>
        )}
      </div>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        // bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={false}
        scroll={{
          x: 1500
        }}
      />
      {/* {!onApproval && (
                <div className="flex justify-end gap-2 mt-4">
                    <Button
                        type="primary"
                        onClick={handleCancelAllData}
                        disabled={!!editingKey || !!isDisable}
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button
                        color="primary"
                        onClick={handleSaveAllData}
                        variant="contained"
                        disabled={!!editingKey || !!isDisable}
                    >
                        <span>Save</span>
                    </Button>

                </div>
            )} */}
    </Form>
  );
};
export default FormCustomerParam;

const columnsParam = [
  {
    title: 'No',
    dataIndex: 'key',
    sorter: (a, b) => a.key - b.key,
    width: 80,
  },
  {
    title: 'Parameter Name',
    dataIndex: 'parname',
    key: 'parname'
  },
  {
    title: 'Method Id',
    dataIndex: 'methodid',
    key: 'methodid'
  },
  {
    title: 'Preservation',
    dataIndex: 'preservation',
    key: 'preservation'
  },
  {
    title: 'Parameter Category Name',
    dataIndex: 'parcatname',
    key: 'parcatname'
  },
  {
    title: 'Unit Name',
    dataIndex: 'unitname',
    key: 'unitname'
  },
  {
    title: 'Alias Name',
    dataIndex: 'aliasname',
    key: 'aliasname'
  },
  {
    title: 'Duration',
    dataIndex: 'duration',
    key: 'duration'
  },
  {
    title: 'Akreditasi',
    dataIndex: 'akreditasi',
    key: 'akreditasi'
  },
  {
    title: 'Result Unit Code',
    dataIndex: 'resultunitcode',
    key: 'resultunitcode'
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price'
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description'
  },
]
