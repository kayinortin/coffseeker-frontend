import React from 'react'
import { BiSolidRightArrow } from 'react-icons/bi'

export default function Step({ currentStep }) {
  return (
    <>
      <div className={'steps'}>
        {/* 第一步 */}
        <div className={`step ${currentStep === 1 ? 'active' : ''}`}>
          <div className={'stepTop'}>
            <div
              className={`stepCircle ${
                currentStep === 1 ? 'circleBlue' : 'circleGray'
              }`}
            ></div>
            <div
              className={`setNum ${
                currentStep === 1 ? 'setnumWhite' : 'setnumGray'
              }`}
            >
              1
            </div>
          </div>
          <div
            className={`stepFont ${
              currentStep === 1 ? 'stepfontBlue' : 'stepfontWhite'
            }`}
          >
            您的購物車
          </div>
        </div>
        <BiSolidRightArrow
          className={`stepArrow ${
            currentStep === 1 ? 'arrowBlue' : 'arrowGray'
          }`}
        />
        {/* 第二步 */}
        <div className={`step ${currentStep === 2 ? 'active' : ''}`}>
          <div className={'stepTop'}>
            <div
              className={`stepCircle ${
                currentStep === 2 ? 'circleBlue' : 'circleGray'
              }`}
            ></div>
            <div
              className={`setNum ${
                currentStep === 2 ? 'setnumWhite' : 'setnumGray'
              }`}
            >
              2
            </div>
          </div>
          <div
            className={`stepFont ${
              currentStep === 2 ? 'stepfontBlue' : 'stepfontGray'
            }`}
          >
            填寫地址與付款
          </div>
        </div>
        <BiSolidRightArrow
          className={`stepArrow ${
            currentStep === 2 ? 'arrowBlue' : 'arrowGray'
          }`}
        />
        {/* 第三步 */}
        <div className={`step ${currentStep === 3 ? 'active' : ''}`}>
          <div className={'stepTop'}>
            <div
              className={`stepCircle ${
                currentStep === 3 ? 'circleBlue' : 'circleGray'
              }`}
            ></div>
            <div
              className={`setNum ${
                currentStep === 3 ? 'setnumWhite' : 'setnumGray'
              }`}
            >
              3
            </div>
          </div>
          <div
            className={`stepFont ${
              currentStep === 3 ? 'stepfontBlue' : 'stepfontGray'
            }`}
          >
            成立訂單
          </div>
        </div>
      </div>
    </>
  )
}
