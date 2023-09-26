import React from 'react'
import MemberShipButton from '@/components/member/MemberShipButton'
export default function ButtonTest() {
  return (
    <>
      <div className="container">
        <div className={'mb-3 form-check'}>
          <input
            type="checkbox"
            className={'form-check-input'}
            id="exampleCheck1"
          />
          <label className={'form-check-label'} htmlFor="exampleCheck1">
            記住密碼
          </label>
        </div>
      </div>
    </>
  )
}
