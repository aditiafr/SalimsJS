import React from 'react'
import HeaderTitle from '../../../../components/Dashboard/Global/HeaderTitle'
import { Link } from 'react-router-dom'
import { Button } from 'antd'

const MaintenanceProcess = () => {
  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle title="MAINTENANCE PROCESS" subtitle="All data maintenance process" />
        <div>
          <Link to="/transaction/maintenance-process/form">
            <Button type="primary">+ Add New</Button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default MaintenanceProcess