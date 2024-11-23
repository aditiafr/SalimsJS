import React from 'react'
import { toRupiahNo } from '../../../../components/Dashboard/Global/General'

const DetailPriceSample = ({onData}) => {  
  
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
        <p className="font-bold">Discount ({onData.DiscountPersen}%)</p>
        <div className="flex items-center justify-between w-1/4">
          <p>Rp</p>
          <p>{toRupiahNo(onData.TotalDiscount)}</p>
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