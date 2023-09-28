import React from 'react'
import { BiSolidRightArrow } from 'react-icons/bi'

export default function Step() {
  return (
    <>
      <div className={'steps'}>
        <div className={'step'}>
          <div className={'stepTop'}>
            <div className={'stepCircle circleBlue'}></div>
            <div className={'setNum setnumWhite'}>1</div>
          </div>
          <div className={'stepFont stepfontBlue'}>您的購物車</div>
        </div>
        <BiSolidRightArrow className={'arrow arrowBlue'} />
        <div className={'step'}>
          <div className={'stepTop'}>
            <div className={'stepCircle circleGray'}></div>
            <div className={'setNum setnumGray'}>2</div>
          </div>
          <div className={'stepFont stepfontGray'}>填寫地址與付款</div>
        </div>
        <BiSolidRightArrow className={'arrow arrowGray'} />
        <div className={'step'}>
          <div className={'stepTop'}>
            <div className={'stepCircle circleGray'}></div>
            <div className={'setNum setnumGray'}>3</div>
          </div>
          <div className={'stepFont stepfontGray'}>成立訂單</div>
        </div>
      </div>
    </>
  )
}
