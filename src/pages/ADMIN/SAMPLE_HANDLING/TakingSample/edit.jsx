import { EditFilled } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const EditTakingSample = ({ dataSource }) => {

    const navigate = useNavigate();

    const handleEdit = async () => {
        navigate(`form/${dataSource.tsnumber}`)
    }

    return (
        <>
            <Tooltip title="Edit">
                <Button icon={<EditFilled />} type="text" onClick={handleEdit} />
            </Tooltip>
        </>
    )
}

export default EditTakingSample