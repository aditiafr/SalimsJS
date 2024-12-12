import React, { useEffect, useState } from 'react';
import { Form, Popconfirm, Table, Button, message, InputNumber, Input } from 'antd';

import { CloseOutlined, DeleteOutlined, EditFilled, SaveFilled } from '@ant-design/icons';
import InputModal from '../../../../../components/Dashboard/Global/InputModal';
import { getParameter } from '../../../../../Api/Master/getData';
import FormSampleProduct from './Product/form';
import FormSampleFormula from './Formula/form';

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  onData,
  onDataParameter,
  onEdit,
  ...restProps
}) => {

  useEffect(() => {
    if (onEdit) {
      setOpenParameter(true);
    }
  }, [onEdit]);


  const [isLoading, setIsLoading] = useState(false);

  const [dataParameter, setDataParameter] = useState([]);
  const [selectParameter, setSelectParameter] = useState("");
  const [openParameter, setOpenParameter] = useState(null);

  // PARAMETER
  useEffect(() => {
    const fetchParameter = async () => {
      try {
        setIsLoading(true);
        const parameterCode = onData.map(item => item.parcode);

        const res = await getParameter();
        const filter = res.filter(item => !parameterCode.includes(item.parcode));
        setDataParameter(filter);

        if (onEdit) {
          const selected = res.filter(item => item.parcode === record.parcode);
          setSelectParameter(selected[0]);
        }

      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }
    if (openParameter) {
      fetchParameter();
      setOpenParameter(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openParameter]);

  useEffect(() => {
    if (selectParameter) {
      onDataParameter(selectParameter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectParameter]);


  return (
    <td {...restProps}>
      {editing ? (
        <div>

          {
            dataIndex === 'req_qty' ||
              dataIndex === 'l_limit' ||
              dataIndex === 'u_limit' ||
              dataIndex === 'l_spec' ||
              dataIndex === 'u_spec'
              ? (
                <Form.Item
                  name={dataIndex}
                  style={{
                    margin: 0,
                  }}
                  rules={[
                    {
                      required: true,
                      message: `Please Input ${title}!`,
                    },
                  ]}
                >
                  <InputNumber placeholder={title} className="w-full" />
                </Form.Item>

              ) : dataIndex === "parname" ? (
                <InputModal
                  title="PARAMETER"
                  label="Parameter"
                  name={dataIndex}
                  dataSource={dataParameter}
                  loading={isLoading}
                  columns={columnsParameter}
                  onData={(values) => setSelectParameter(values)}
                  onOpenModal={(values) => setOpenParameter(values)}
                  onDetail={true}
                />
              ) : (
                <Form.Item
                  name={dataIndex}
                  style={{
                    margin: 0,
                  }}
                  rules={[
                    {
                      required: true,
                      message: `Please Input ${title}!`,
                    },
                  ]}
                >
                  <Input placeholder={title} />
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


const FormSampleParameter = ({ onSaveData, onParamCode, onEdit, onApproval }) => {

  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  const [editingKey, setEditingKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(true);

  const [expandedKeys, setExpandedKeys] = useState([]);
  const [dataFormula, setDataFormula] = useState([]);
  const [dataProduct, setDataProduct] = useState([]);

  const [dataParameter, setDataParameter] = useState(null);

  useEffect(() => {
    if (form && dataParameter) {
      form.setFieldsValue({ parname: dataParameter.parname });
    }
  }, [dataParameter, form])

  useEffect(() => {
    if (onEdit) {
      const dataEdit = onEdit.sample_pa.map((row, index) => ({ ...row, key: index + 1 })).reverse()
      setData(dataEdit);
      setCount(dataEdit.length === 0 ? 0 : dataEdit.map((item) => item.key)[0]);
      onSaveData(dataEdit);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onEdit]);

  useEffect(() => {
    setIsDisable(expandedKeys.length === 0);
  }, [expandedKeys]);

  const handleExpandedRowsChange = (keys) => {
    setExpandedKeys(keys);
  };

  const isEditing = (record) => record.key === editingKey;

  const handleEdit = (record) => {
    // const docExpDate = record.DocExpDate ? dayjs(record.DocExpDate) : null;

    form.setFieldsValue({
      // Description: '',
      ...record,
      // DocExpDate: docExpDate,
    });
    setEditingKey(record.key);
    setExpandedKeys([record.key]);
  };

  const handleDelete = (key) => {
    setIsDisable(false);
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
    if (!record.parcode) {
      const newData = data.filter((item) => item.key !== record.key);
      setData(newData);
    } else {
      setEditingKey('');
    }
    setEditingKey('');

    // console.log("DataFormTran", data);
  };


  const handleSave = async (record) => {
    setIsDisable(false);
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => record.key === item.key);

      if (index > -1) {
        const item = newData[index];
        const parCode = dataParameter.parcode;
        newData.splice(index, 1, {
          ...item,
          ...row,
          parcode: parCode
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
      parname: '',
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
    setExpandedKeys([num]);
  };


  const columns = [
    {
      title: 'No',
      dataIndex: 'key',
      sorter: (a, b) => a.key - b.key,
      width: 80,
    },
    {
      title: 'Parameter Name',
      dataIndex: 'parname',
      editable: true,
    },
    {
      title: 'Request Quantity',
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

  columns.push({
    title: 'Actions',
    dataIndex: 'actions',
    width: 100,
    fixed: "right",
    render: (_, record) => {
      const editable = isEditing(record);
      return editable ? (
        <span className="flex items-center justify-around">
          <Button
            color="primary"
            variant="text"
            icon={<SaveFilled />}
            onClick={() => handleSave(record)}
          />
          <Button
            color="primary"
            variant="text"
            icon={<CloseOutlined />}
            onClick={() => handleCancel(record)}
          />
        </span>
      ) : (
        <span className="flex items-center justify-around">
          <Button
            color="primary"
            variant="text"
            icon={<EditFilled />}
            onClick={() => handleEdit(record)}
          />
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <Button
              color="primary"
              variant="text"
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </span>
      );
    },
  });

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
        onData: data,
        onDataParameter: (values) => setDataParameter(values),
        onEdit: onEdit
      }),
      ...col,
    };
  });

  const handleSaveAllData = async () => {
    setLoading(true);
    setIsDisable(true);

    try {
      const payload = data.map((item) => ({
        ...item,
        sample_fo: dataFormula[item.key] || [],
        sample_pr: dataProduct[item.key] || [] 
      }));
      onSaveData(payload);

      console.log("PostData", payload);
      message.success("Success add form table data!!");
    } catch (error) {
      console.error("Error saving data:", error);
    }

    setLoading(false);
  };


  const handleCancelAllData = () => {
    setData([]);
    setCount(0);
    onSaveData([]);
  }

  const handleSaveFormula = (key, values) => {
    setDataFormula((prev) => ({
      ...prev,
      [key]: values,
    }));
  };

  const handleSaveProduct = (key, values) => {
    setDataProduct((prev) => ({
      ...prev,
      [key]: values,
    }));
  };


  return (
    <Form form={form} component={false}>

      <div className="flex items-center justify-between mb-4">
        <p className="text-2xl font-bold">
          PARAMETER
        </p>
        {!onApproval && (
          <Button
            type="primary"
            onClick={handleAdd}
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
          x: 2000
        }}
        expandable={{
          expandedRowRender: (record) =>
            expandedRowRender(
              record,
              handleSaveFormula,
              handleSaveProduct
            ),
          expandedRowKeys: expandedKeys,
          onExpandedRowsChange: handleExpandedRowsChange,
        }}
      />

      {!onApproval && (
        <div className="flex justify-end gap-2 mt-4">
          <Button
            onClick={handleCancelAllData}
            disabled={!!editingKey || !!isDisable}
          >
            <span>Cancel</span>
          </Button>
          <Button
            type="primary"
            onClick={handleSaveAllData}
            disabled={!!editingKey || !!isDisable}
            loading={loading}
          >
            <span>Save</span>
          </Button>

        </div>
      )}

    </Form>
  );
};
export default FormSampleParameter;

const expandedRowRender = (record, onSaveFormula, onSaveProduct) => {

  const handleFormula = (values) => {
    onSaveFormula(record.key, values)
  }

  const handleProduct = (values) => {
    onSaveProduct(record.key, values)
  }

  return (
    <>
      <div className="m-4 p-4 border rounded-md">
        <FormSampleFormula onSaveData={handleFormula} onEdit={record.sample_fo} />
      </div>

      <div className="m-4 p-4 border rounded-md">
        <FormSampleProduct onSaveData={handleProduct} onEdit={record.sample_pr} />
      </div>
    </>
  );
};

const columnsParameter = [
  {
    title: "No",
    dataIndex: "key",
    key: "key",
    width: 60,
    fixed: "left",
  },
  {
    title: "Parameter Code",
    dataIndex: "parcode",
    key: "parcode",
    fixed: "left",
  },
  {
    title: "Parameter Name",
    dataIndex: "parname",
    key: "parname",
  },
  {
    title: "Method Id",
    dataIndex: "methodid",
    key: "methodid",
  },
  {
    title: "Preservation",
    dataIndex: "preservation",
    key: "preservation",
  },
  {
    title: "Storage Time Limit",
    dataIndex: "storagetimelimit",
    key: "storagetimelimit",
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
    title: "Alias Name",
    dataIndex: "aliasname",
    key: "aliasname",
  },
  {
    title: "Duration",
    dataIndex: "duration",
    key: "duration",
  },
  {
    title: "Akreditasi",
    dataIndex: "akreditasi",
    key: "akreditasi",
  },
  {
    title: "Result Unit Code",
    dataIndex: "resultunitcode",
    key: "resultunitcode",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
];
