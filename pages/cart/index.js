import React from 'react'
import { BiSolidRightArrow } from 'react-icons/Bi'
import Step from '@/components/cart/step'

export default function Cart() {
  return (
    <>
      <section className={'background'}>
        <div className={'container'}>
          {/* <div className={'step'}>
            <div className={'step1'}>
              <div className={'stepTop'}>
                <div className={'stepCircle circleBlue'}></div>
                <div className={'setNum setnumWhite'}>1</div>
              </div>
              <div className={'stepFont stepfontBlue'}>確認購物清單</div>
            </div>
            <BiSolidRightArrow className={'arrow arrowBlue'} />
            <div className={'step2'}>
              <div className={'stepTop'}>
                <div className={'stepCircle circleGray'}></div>
                <div className={'setNum setnumGray'}>2</div>
              </div>
              <div className={'stepFont stepfontGray'}>填寫資料</div>
            </div>
            <BiSolidRightArrow className={'arrow arrowGray'} />
            <div className={'step3'}>
              <div className={'stepTop'}>
                <div className={'stepCircle circleGray'}></div>
                <div className={'setNum setnumGray'}>3</div>
              </div>
              <div className={'stepFont stepfontGray'}>訂單確認</div>
            </div>
          </div> */}
          <Step />
        </div>
      </section>
    </>
  )
}
