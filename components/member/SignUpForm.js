import React, { useState } from 'react'
import Link from 'next/link'

export default function SignUpForm() {
  const [userId, setId] = useState('')
  const [userEmail, setMail] = useState('')
  const [userName, setName] = useState('')
  const [userPassword, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [userPhone, setPhone] = useState('')
  const [userGender, setGender] = useState('')
  const [birthdayYear, setBirthdayYear] = useState('')
  const [birthdayMonth, setBirthdayMonth] = useState('')
  const [birthdayData, setBirthdayDate] = useState('')

  // input文字輸入框
  const inputs = [
    {
      id: 1,
      htmlFor: 'InputEmail',
      title: '會員信箱(登入帳號)',
      placeholder: '請輸入信箱',
      type: 'email',
      aria: null,
      maxlength: 50,
      onChange: (e) => setMail(e.target.value),
    },
    {
      id: 2,
      htmlFor: 'InputName',
      title: '會員姓名',
      placeholder: '請輸入您的姓名',
      type: 'text',
      aria: null,
      maxlength: 10,
      onChange: (e) => setName(e.target.value),
    },
    {
      id: 3,
      htmlFor: 'InputPassword',
      title: '密碼',
      placeholder: '請輸入8~12位數,英數混和的密碼',
      type: 'password',
      aria: null,
      maxlength: 10,
      onChange: (e) => setPassword(e.target.value),
    },
    {
      id: 4,
      htmlFor: 'ReInputPassword',
      title: '確認密碼',
      placeholder: '請輸入相同的密碼',
      type: 'password',
      aria: null,
      maxlength: 12,
      onChange: (e) => setRePassword(e.target.value),
    },
    {
      id: 6,
      htmlFor: 'InputPhone',
      title: '手機',
      placeholder: '09XX-XXX-XXX',
      type: 'tel',
      aria: null,
      maxlength: 10,
      onChange: (e) => setPhone(e.target.value),
    },
  ]

  // select選擇輸入框
  // 性別
  const selection = [
    {
      id: 7,
      class: 'mb-3',
      htmlFor: 'SelectGender',
      title: '性別',
      options: [
        { value: 'Male', opt: '男' },
        { value: 'Female', opt: '女' },
        { value: 'CantDisclose', opt: '不便透漏' },
      ],
      placeholder: '請選擇您的性別',
      onChange: (e) => setGender(e.target.value),
    },
  ]

  // 生日
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

  const birthday = [
    {
      id: 8,
      class: 'col-4 mb-3',
      htmlFor: 'SelectBirthdayYear',
      title: '生日',
      options: years,
      onChange: (e) => setBirthdayYear(e.target.value),
    },
    {
      id: 9,
      class: 'col-4 mb-3',
      htmlFor: 'SelectBirthdayMonth',
      title: '',
      options: month,
      onChange: (e) => setBirthdayMonth(e.target.value),
    },
    {
      id: 10,
      class: 'col-4 mb-3',
      htmlFor: 'SelectBirthdayDate',
      title: '',
      options: date,
      onChange: (e) => setBirthdayDate(e.target.value),
    },
  ]

  // 會員條款按鈕判斷
  const [allowContract, setAllowContract] = useState(false)

  return (
    <>
      <form id="loginForm" className={'form-box'}>
        <div className={'border border-dark'}>
          <div className={'form-title border-bottom border-dark p-3'}>
            會員註冊
          </div>
          <div className="p-5">
            {inputs.map((input) => {
              return (
                <div className="mb-3" key={input.id}>
                  <label htmlFor={input.htmlFor} className={'form-label'}>
                    {input.title}
                  </label>
                  <input
                    placeholder={input.placeholder}
                    type={input.tyoe}
                    className={'form-control'}
                    id={input.htmlFor}
                    aria-describedby={input.aria}
                    maxLength={input.maxlength}
                    onChange={(e) => {
                      input.onChange(e)
                    }}
                  />
                  <div
                    id={'error' + input.id}
                    className={'form-text text-danger'}
                  ></div>
                </div>
              )
            })}
            {/* 性別 */}
            {selection.map((select) => {
              return (
                <div className={select.class} key={select.id}>
                  <label htmlFor={select.htmlFor} className={'form-label'}>
                    {select.title}
                  </label>
                  <select
                    className={'form-select'}
                    value={'default'}
                    onChange={(e) => {
                      select.onChange(e)
                    }}
                  >
                    <option value={'default'} disabled>
                      {select.placeholder}
                    </option>
                    {select.options.map((opts, i) => {
                      return (
                        <>
                          <option key={i} value={opts.value}>
                            {opts.opt}
                          </option>
                        </>
                      )
                    })}
                  </select>
                </div>
              )
            })}
            {/* 生日 */}
            <div className={'row align-items-end'}>
              {birthday.map((select) => {
                return (
                  <div className={select.class} key={select.id}>
                    <label htmlFor={select.htmlFor} className={'form-label'}>
                      {select.title}
                    </label>
                    <select
                      className={'form-select'}
                      onChange={(e) => {
                        select.onChange(e)
                      }}
                    >
                      <option selected disabled>
                        {select.placeholder}
                      </option>
                      {select.options.map((ops) => {
                        return (
                          <option key={ops} value={ops}>
                            {ops}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div
          className={
            'container d-flex justify-content-center mt-4 mb-3 align-items-center'
          }
        >
          <div className={'form-check d-flex align-items-center'}>
            <input
              type="checkbox"
              className={'check-input me-3'}
              id="CheckForPapers"
            />
            <label className={'form-check-label'} htmlFor="CheckForPapers">
              訂閱電子報
            </label>
          </div>
        </div>
        <div
          className={
            'container d-flex justify-content-center mt-3 mb-4 align-items-center'
          }
        >
          <div className={'form-check d-flex align-items-center'}>
            <input
              type="checkbox"
              className={'check-input me-3'}
              id="exampleCheck2"
              onClick={() => {
                if (allowContract) {
                  setAllowContract(false)
                } else {
                  setAllowContract(true)
                }
                console.log(allowContract)
              }}
            />
            <label className={'form-check-label'} htmlFor="exampleCheck2">
              我已閱讀並同意
              <Link href="" className={'orange-text'}>
                「會員隱私條款」
              </Link>
            </label>
          </div>
        </div>
        {allowContract === true ? (
          <div className={'d-flex justify-content-center'}>
            <button type="button" className={'btn-login border-0 text-center'}>
              <span className={'agree'}>確認並送出</span>
            </button>
          </div>
        ) : (
          <div className={'d-flex justify-content-center'}>
            <button type="button" className={'btn-login border-0 text-center'}>
              <span>請勾選同意會員隱私條款</span>
            </button>
          </div>
        )}
      </form>
    </>
  )
}
