import { FaMapMarkerAlt } from 'react-icons/fa'
import { IoIosWifi } from 'react-icons/io'
import { LiaChairSolid } from 'react-icons/lia'
import { IoEarOutline } from 'react-icons/io5'
import { PiCoffee } from 'react-icons/pi'
import Image from 'next/image'
import {
  BsPlugin,
  BsXLg,
  BsCheckLg,
  BsQuestionLg,
  BsDashLg,
} from 'react-icons/bs'
export default function CafeList({ cafes, handleCafeClick }) {
  return (
    <>
      {cafes.length === 0 ? (
        <div className="text-center">
          <p className="text-center lh-base">
            無資料，請重新選擇區域
            <br />
            或更改篩選條件
          </p>
          <Image
            className="mt-5 opacity-50"
            src={'/divination-image/wrap6.png'}
            alt={'咖啡插圖'}
            width={300}
            height={377}
          />
        </div>
      ) : (
        <p className="text-end">共{cafes.length}家</p>
      )}
      {cafes.map((cafe) => (
        <CafeItem key={cafe.id} cafe={cafe} handleCafeClick={handleCafeClick} />
      ))}
    </>
  )
}
//判斷打勾叉叉icon
function checkValue(value) {
  switch (value) {
    case 'yes':
      return <BsCheckLg />
    case 'no':
      return <BsXLg />
    case 'maybe':
      return <BsQuestionLg />
    default:
      return <BsDashLg />
  }
}
function CafeItem({ cafe, handleCafeClick }) {
  if (parseFloat(cafe.latitude) === 0) {
    return null // 如果cafe.latitude等於0，則不渲染按鈕
  }

  return (
    <button
      className="cafeItem border-0 border-bottom grid gap-3 d-flex flex-column py-3 border-black"
      onClick={() => handleCafeClick(cafe)}
    >
      <h4 className="">{cafe.name}</h4>
      <h6>
        <FaMapMarkerAlt />
        {cafe.address.replace(/^\d+/, '')}
        {cafe.distanceInKm != null && (
          <>
            <br />
            <span className="distanceText">
              {cafe.distanceInKm.toFixed(1)}公里
            </span>
          </>
        )}
      </h6>
      <p>
        <span>
          <IoIosWifi />
          {cafe.wifi}★
        </span>
        <span>
          <LiaChairSolid />
          {cafe.seat}★
        </span>
        <span>
          <IoEarOutline />
          {cafe.quiet}★
        </span>
        <span>
          <PiCoffee />
          {cafe.tasty}★
        </span>
        <span>
          <BsPlugin />
          {checkValue(cafe.socket)}
        </span>
      </p>
    </button>
  )
}
