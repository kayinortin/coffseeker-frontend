import React, { useState } from 'react'
import { FaAngleDown } from 'react-icons/fa6'
import Link from 'next/link'

export default function InfoChangeForm() {
  const years = []
  let thisYears = new Date().getFullYear()
  let beginYears = thisYears - 100
  for (let i = 0; i < 100; i++) {
    beginYears++
    years.push(beginYears)
  }

  const month = []
  for (let i = 1; i <= 12; i++) {
    month.push(i)
  }

  const date = []
  for (let i = 1; i <= 31; i++) {
    date.push(i)
  }

  const [allowContract, setAllowContract] = useState(false)
  // console.log(years)
  // console.log(month)
  // console.log(date)
  return (
    <>
      <div className={'container d-flex justify-content-center pb-3'}>
        <div className={'login border border-dark'}>
          <div className={'form-title border-bottom border-dark p-3'}>
            會員註冊
          </div>
          <form className="p-5">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className={'form-label'}>
                會員信箱(登入帳號)
              </label>
              <input
                value="test@test.com"
                type="text"
                className={'form-control'}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                readonly
                disabled
              />
              <div id="emailHelp" className={'form-text'}></div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className={'form-label'}>
                會員姓名
              </label>
              <input
                type="text"
                className={'form-control'}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                readonly
              />
              <div id="emailHelp" className={'form-text'}></div>
            </div>
            <div className={'mb-3'}>
              <label htmlFor="exampleInputEmail1" className={'form-label'}>
                密碼
              </label>
              <input
                placeholder="請輸入8~12位數,英數混和的密碼"
                type="password"
                className={'form-control'}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className={'form-text'}></div>
            </div>
            <div className={'mb-3'}>
              <label htmlFor="exampleInputEmail1" className={'form-label'}>
                確認密碼
              </label>
              <input
                placeholder="請輸入相同的密碼"
                type="password"
                className={'form-control'}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className={'form-text'}></div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className={'form-label'}>
                手機
              </label>
              <input
                placeholder="請輸入手機號碼"
                type="email"
                className={'form-control'}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className={'form-text'}></div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className={'form-label'}>
                性別
              </label>
              <select className={'form-select'}>
                <option selected disabled>
                  請選擇性別
                </option>
                <option value="1">男</option>
                <option value="2">女</option>
                <option value="3">不便透漏</option>
              </select>
            </div>
            <div className={'row'}>
              <div className={'col-4 mb-3'}>
                <label htmlFor="exampleInputPassword1" className={'form-label'}>
                  生日
                </label>
                <select className={'form-select'}>
                  <option selected disabled>
                    年
                  </option>
                  {years.map((year, i) => {
                    return (
                      <option key={i} value={year}>
                        {year}
                      </option>
                    )
                  })}
                </select>
              </div>
              <div className={'col-4 mb-3'}>
                <label
                  htmlFor="exampleInputPassword1"
                  className={'form-label birthday-selector'}
                >
                  生日
                </label>
                <select className={'form-select'}>
                  <option selected disabled>
                    月
                  </option>
                  {month.map((month, i) => {
                    return (
                      <option key={i} value={month}>
                        {month}
                      </option>
                    )
                  })}
                </select>
              </div>
              <div className={'col-4 mb-3'}>
                <label
                  htmlFor="exampleInputPassword1"
                  className={'form-label birthday-selector'}
                >
                  生日
                </label>
                <select className={'form-select'}>
                  <option selected disabled>
                    日
                  </option>
                  {date.map((date, i) => {
                    return (
                      <option key={i} value={date}>
                        {date}
                      </option>
                    )
                  })}
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div
        className={
          'container d-flex justify-content-center mt-4 mb-3 align-items-center'
        }
      ></div>
      <div className={'container d-flex justify-content-center allow-btn'}>
        <div
          className={
            'btn-login text-center d-flex justify-content-center flex-column mb-5 agree'
          }
        >
          <span>確認並送出</span>
        </div>
      </div>
    </>
  )
}
