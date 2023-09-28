import React from 'react'
import Link from 'next/link'
export default function ChangePassword() {
  const inputs = [
    {
      id: 1,
      htmlFor: 'InputOldPassword',
      title: '原密碼',
      placeholder: '請輸入未更改前的密碼',
      type: 'password',
      htmlId: 'InputOldPassword',
      aria: null,
      maxlength: 10,
    },
    {
      id: 2,
      htmlFor: 'InputNewPassword',
      title: '新密碼',
      placeholder: '請輸入想更改的新密碼',
      type: 'password',
      htmlId: 'InputNewPassword',
      aria: null,
      maxlength: 10,
    },
    {
      id: 3,
      htmlFor: 'ReInputNewPassword',
      title: '確認新密碼',
      placeholder: '請再次輸入想更改的新密碼',
      type: 'password',
      htmlId: 'ReInputNewPassword',
      aria: null,
      maxlength: 10,
    },
  ]
  return (
    <>
      <div className={'form-box border border-dark'}>
        <div className={'form-title border-bottom border-dark p-3'}>
          忘記密碼
        </div>
        <form className="p-5">
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
                  id={input.htmlId}
                  aria-describedby={input.aria}
                  maxLength={input.maxlength}
                />
                <div
                  id={'error' + input.id}
                  className={'form-text text-danger'}
                ></div>
              </div>
            )
          })}
        </form>
      </div>
      <div className={'container allow-btn p-0 mt-4'}>
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
