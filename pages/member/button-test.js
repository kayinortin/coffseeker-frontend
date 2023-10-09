import React from 'react'
import MemberShipButton from '@/components/member/Sidebar/MemberShipButton'
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
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
          <label class="form-check-label" htmlFor="flexCheckDefault">
            Default checkbox
          </label>
        </div>
      </div>
    </>
  )
}
