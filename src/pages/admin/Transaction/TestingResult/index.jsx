import React from 'react'
import HeaderTitle from '../../../../components/Dashboard/Global/HeaderTitle'
import { Link } from 'react-router-dom'
import { Button } from 'antd'

const TestingResult = () => {
  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle title="TESTING RESULT" subtitle="All data testing result" />
        <div>
          <Link to="/transaction/testing-result/form">
            <Button type="primary">+ Add New</Button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default TestingResult