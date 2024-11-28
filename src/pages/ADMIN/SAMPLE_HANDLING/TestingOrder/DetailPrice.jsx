import React, { useState } from 'react'
import { toRupiahNo } from '../../../../components/Dashboard/Global/General'
import { InputNumber } from 'antd'

const DetailPriceSample = ({ onData }) => {

  const [discount_p, setDiscount_p] = useState(0);
  const [discount_m, setDiscount_m] = useState(0);

  // console.log(discount_p);


  return (
    <>
      <div className="flex items-center justify-between border-b-2 py-4 px-1">
        <p className="font-bold">Gross</p>
        <div className="flex items-center justify-between w-1/4">
          <p>Rp</p>
          <p>{toRupiahNo(onData.Gross)}</p>
        </div>
      </div>
      <div className="flex items-center justify-between border-b-2 py-4 px-1">
        <p className="font-bold">Discount (
          <InputNumber
            // placeholder="Borderless"
            variant="borderless"
            suffix="%"
          // className="w-full"
          style={{
            padding: 0,
            width: 60
          }}
          />
          )</p>
        <div className="flex items-center justify-between w-1/4">
          <p>Rp</p>
          <p>
            <InputNumber
              placeholder="Borderless"
              variant="borderless"
              className="w-full text-right"
            />
          </p>
          {/* <p>{toRupiahNo(onData.TotalDiscount)}</p> */}
        </div>
      </div>
      <div className="flex items-center justify-between border-b-2 py-4 px-1">
        <p className="font-bold">DPP</p>
        <div className="flex items-center justify-between w-1/4">
          <p>Rp</p>
          <p>{toRupiahNo(onData.DPP)}</p>
        </div>
      </div>
      <div className="flex items-center justify-between border-b-2 py-4 px-1">
        <p className="font-bold">VAT ({onData.VATPersen}%)</p>
        <div className="flex items-center justify-between w-1/4">
          <p>Rp</p>
          <p>{toRupiahNo(onData.TotalVAT)}</p>
        </div>
      </div>
      <div className="flex items-center justify-between py-4 px-1">
        <p className="font-bold">NET</p>
        <div className="flex items-center justify-between w-1/4">
          <p>Rp</p>
          <p>{toRupiahNo(onData.NET)}</p>
        </div>
      </div>
    </>
  )
}

export default DetailPriceSample