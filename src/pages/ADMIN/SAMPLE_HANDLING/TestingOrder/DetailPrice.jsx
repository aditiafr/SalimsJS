import React, { useEffect, useState } from 'react'
import { toRupiahNo } from '../../../../components/Dashboard/Global/General'
import { InputNumber } from 'antd'

const DetailPriceSample = ({ valueGross, onData, onEdit }) => {

  // console.log(onEdit);

  useEffect(() => {
    if (onEdit) {
      setDiscount_p(onEdit.discount_p)
      setVat_p(onEdit.vat)
    }
  }, [onEdit]);



  const [discount_p, setDiscount_p] = useState(0);
  const [vat_p, setVat_p] = useState(11);

  // TOTAL PRICE
  const Gross = valueGross
  const DiscountPersen = discount_p
  const TotalDiscount = Gross * (DiscountPersen / 100);
  const DPP = Gross - TotalDiscount;
  const VATPersen = vat_p
  const TotalVAT = DPP * (VATPersen / 100);
  const NET = DPP + TotalVAT;

  useEffect(() => {
    onData({
      Gross: Gross,
      DiscountPersen: DiscountPersen,
      TotalDiscount: TotalDiscount,
      DPP: DPP,
      VATPersen: VATPersen,
      TotalVAT: TotalVAT,
      NET: NET,
    })
  }, [DPP, DiscountPersen, Gross, NET, TotalDiscount, TotalVAT, VATPersen, onData]);

  return (
    <>
      <div className="flex items-center justify-between border-b-2 py-4 px-1">
        <p className="font-bold">Gross</p>
        <div className="flex items-center justify-between w-1/4">
          <p>Rp</p>
          <p>{toRupiahNo(Gross)}</p>
        </div>
      </div>
      <div className="flex items-center justify-between border-b-2 py-4 px-1">
        <p className="font-bold">Discount
          <InputNumber
            // defaultValue={0}
            min={0}
            max={100}
            formatter={(value) => `${value}%`}
            parser={(value) => value?.replace('%', '')}
            onChange={(value) => setDiscount_p(value)}
            className="ml-2 w-16"
            value={discount_p}
          />
        </p>
        <div className="flex items-center justify-between w-1/4">
          <p>Rp</p>
          <p>{toRupiahNo(TotalDiscount)}</p>
          {/* <p>{toRupiahNo(onData.TotalDiscount)}</p> */}
        </div>
      </div>
      <div className="flex items-center justify-between border-b-2 py-4 px-1">
        <p className="font-bold">DPP</p>
        <div className="flex items-center justify-between w-1/4">
          <p>Rp</p>
          <p>{toRupiahNo(DPP)}</p>
        </div>
      </div>
      <div className="flex items-center justify-between border-b-2 py-4 px-1">
        <p className="font-bold">VAT
          <InputNumber
            // defaultValue={11}
            min={0}
            max={100}
            formatter={(value) => `${value}%`}
            parser={(value) => value?.replace('%', '')}
            onChange={(value) => setVat_p(value)}
            className="ml-2 w-16"
            value={vat_p}
          />
        </p>
        <div className="flex items-center justify-between w-1/4">
          <p>Rp</p>
          <p>{toRupiahNo(TotalVAT)}</p>
        </div>
      </div>
      <div className="flex items-center justify-between py-4 px-1">
        <p className="font-bold">NET</p>
        <div className="flex items-center justify-between w-1/4">
          <p>Rp</p>
          <p>{toRupiahNo(NET)}</p>
        </div>
      </div>
    </>
  )
}

export default DetailPriceSample