import React from 'react'
import HeaderTitle from '../../../../components/Dashboard/Global/HeaderTitle'
import { Link } from 'react-router-dom'
import { Button } from 'antd'

const SampleRegistration = () => {
  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle title="SAMPLE REGISTRATION" subtitle="All data sample registration" />
        <div>
          <Link to="/transaction/sample-registration/form">
            <Button type="primary">+ Add New</Button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default SampleRegistration