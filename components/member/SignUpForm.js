import React, { useState } from 'react'
import Link from 'next/link'

export default function SignUpForm() {
  // input文字輸入框
  const inputs = [
    {
      id: 1,
      htmlFor: 'InputEmail',
      title: '會員信箱(登入帳號)',
      placeholder: '請輸入信箱',
      type: 'email',
      htmlId: 'Inputmail',
      aria: null,
      maxlength: 50,
    },
    {
      id: 2,
      htmlFor: 'InputName',
      title: '會員姓名',
      placeholder: '請輸入您的姓名',
      type: 'text',
      htmlId: 'InputName',
      aria: null,
      maxlength: 10,
    },
    {
      id: 3,
      htmlFor: 'InputPassword',
      title: '密碼',
      placeholder: '請輸入8~12位數,英數混和的密碼',
      type: 'password',
      htmlId: 'InputPassword',
      aria: null,
      maxlength: 10,
    },
    {
      id: 4,
      htmlFor: 'ReInputPassword',
      title: '確認密碼',
      placeholder: '請輸入相同的密碼',
      type: 'password',
      htmlId: 'ReInputPassword',
      aria: null,
      maxlength: 12,
    },
    {
      id: 6,
      htmlFor: 'InputPhone',
      title: '手機',
      placeholder: '09XX-XXX-XXX',
      type: 'tel',
      htmlId: 'InputPhone',
      aria: null,
      maxlength: 10,
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
      options: ['男', '女', '不便透漏'],
      placeholder: '請選擇您的性別',
      htmlId: 'SelectGender',
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
      placeholder: '年',
      htmlId: 'SelectBirthdayYear',
    },
    {
      id: 9,
      class: 'col-4 mb-3',
      htmlFor: 'SelectBirthdayMonth',
      title: '',
      options: month,
      placeholder: '月',
      htmlId: 'SelectBirthdayMonth',
    },
    {
      id: 10,
      class: 'col-4 mb-3',
      htmlFor: 'SelectBirthdayDate',
      title: '',
      options: date,
      placeholder: '日',
      htmlId: 'SelectBirthdayDate',
    },
  ]

  // 會員條款按鈕判斷
  const [allowContract, setAllowContract] = useState(false)

  return (
    <>
      <div className={'container d-flex justify-content-center pb-3'}>
        <div className={'form-box border border-dark'}>
          <div className={'form-title border-bottom border-dark p-3'}>
            會員註冊
          </div>
          <form className="p-5">
            {inputs.map((input) => {
              return (
                <>
                  <div className="mb-3" key={input.id}>
                    <label htmlFor={input.htmlFor} className={'form-label'}>
                      {input.title}
                    </label>
                    <input
                      placeholder={input.placeholder}
                      type={input.tyoe}
                      className={'form-control'}
                      id={input.htmlId}
                      aria-describedby={input.aria}
                      maxLength={input.maxlength}
                    />
                    <div
                      id={'error' + input.id}
                      className={'form-text text-danger'}
                    ></div>
                  </div>
                </>
              )
            })}
            {/* 性別 */}
            {selection.map((select) => {
              return (
                <>
                  <div className={select.class} key={select.id}>
                    <label htmlFor={select.htmlFor} className={'form-label'}>
                      {select.title}
                    </label>
                    <select className={'form-select'}>
                      <option selected disabled>
                        {select.placeholder}
                      </option>
                      {select.options.map((ops, i) => {
                        return (
                          <>
                            <option key={i} value={ops}>
                              {ops}
                            </option>
                          </>
                        )
                      })}
                    </select>
                  </div>
                </>
              )
            })}
            {/* 生日 */}
            <div className={'row align-items-end'}>
              {birthday.map((select) => {
                return (
                  <>
                    <div className={select.class} key={select.id}>
                      <label htmlFor={select.htmlFor} className={'form-label'}>
                        {select.title}
                      </label>
                      <select className={'form-select'}>
                        <option selected disabled>
                          {select.placeholder}
                        </option>
                        {select.options.map((ops) => {
                          return (
                            <>
                              <option key={ops} value={ops}>
                                {ops}
                              </option>
                            </>
                          )
                        })}
                      </select>
                    </div>
                  </>
                )
              })}
            </div>
          </form>
        </div>
      </div>

      <div
        className={
          'container d-flex justify-content-center mt-4 mb-3 align-items-center'
        }
      >
        <div className={'form-check'}>
          <input
            type="checkbox"
            className={'form-check-input'}
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
        <div className={'form-check'}>
          <input
            type="checkbox"
            className={'form-check-input'}
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
      <div className={'container d-flex justify-content-center allow-btn'}>
        {allowContract === true ? (
          <div
            className={
              'btn-login text-center d-flex justify-content-center flex-column mb-5 agree'
            }
          >
            <span>確認並送出</span>
          </div>
        ) : (
          <div
            className={
              'text-center d-flex justify-content-center flex-column mb-5 disagree'
            }
          >
            <span>請勾選同意會員隱私條款</span>
          </div>
        )}
      </div>
    </>
  )
}
