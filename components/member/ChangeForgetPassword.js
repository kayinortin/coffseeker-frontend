import React from 'react'
import Link from 'next/link'
export default function ChangeForgetPassword() {
  return (
    <>
      <div className={'container d-flex justify-content-center pb-3'}>
        <div className={'login border border-dark'}>
          <div className={'form-title border-bottom border-dark p-3'}>
            忘記密碼
          </div>
          <form className="p-5">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                新密碼
              </label>
              <input
                placeholder="請輸入8~12位數,英數混和的密碼"
                type="password"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text"></div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                新密碼確認
              </label>
              <input
                placeholder="請輸入相同的密碼"
                type="password"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text"></div>
            </div>
          </form>
        </div>
      </div>
      <div className={'container d-flex justify-content-center'}>
        <div
          className={
            'btn-login text-center d-flex justify-content-center flex-column mb-5'
          }
        >
          <span>確認變更</span>
        </div>
      </div>
    </>
  )
}
