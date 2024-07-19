import React from 'react'
import HeaderTitle from '../../../../components/Dashboard/Global/HeaderTitle'
import { Link } from 'react-router-dom'
import { Button } from 'antd'

const TakingSample = () => {
  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle title="TAKING SAMPLE" subtitle="All data taking sample" />
        <div>
          <Link to="/transaction/taking-sample/form">
            <Button type="primary">+ Add New</Button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default TakingSample