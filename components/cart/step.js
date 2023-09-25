import React from 'react'
import { BiSolidRightArrow } from 'react-icons/Bi'

export default function Step() {
  return (
    <>
      <div className={'steps'}>
        <div className={'step'}>
          <div className={'stepTop'}>
            <div className={'stepCircle circleBlue'}></div>
            <div className={'setNum setnumWhite'}>1</div>
          </div>
          <div className={'stepFont stepfontBlue'}>確認購物清單</div>
        </div>
        <BiSolidRightArrow className={'arrow arrowBlue'} />
        <div className={'step'}>
          <div className={'stepTop'}>
            <div className={'stepCircle circleGray'}></div>
            <div className={'setNum setnumGray'}>2</div>
          </div>
          <div className={'stepFont stepfontGray'}>填寫資料</div>
        </div>
        <BiSolidRightArrow className={'arrow arrowGray'} />
        <div className={'step'}>
          <div className={'stepTop'}>
            <div className={'stepCircle circleGray'}></div>
            <div className={'setNum setnumGray'}>3</div>
          </div>
          <div className={'stepFont stepfontGray'}>訂單確認</div>
        </div>
      </div>
    </>
  )
}
