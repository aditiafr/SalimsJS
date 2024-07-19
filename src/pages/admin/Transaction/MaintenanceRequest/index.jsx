import React from 'react'
import HeaderTitle from '../../../../components/Dashboard/Global/HeaderTitle'
import { Link } from 'react-router-dom'
import { Button } from 'antd'

const MaintenanceRequest = () => {
  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle title="MAINTENANCE REQUEST" subtitle="All data maintenance request" />
        <div>
          <Link to="/transaction/maintenance-request/form">
            <Button type="primary">+ Add New</Button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default MaintenanceRequest