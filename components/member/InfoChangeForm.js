import React, { useState } from 'react'
import { FaAngleDown } from 'react-icons/fa6'
import Link from 'next/link'

export default function InfoChangeForm() {
  const fakeUser = {
    id: 1,
    name: 'Jone Doe',
    email: 'johndoe@example.com',
    birthday: '1990-01-01',
    gender: '男',
    phone: '0909121343',
  }

  // input文字輸入框
  const inputs = [
    {
      id: 1,
      htmlFor: 'InputEmail',
      class: 'form-control disable',
      title: '會員信箱(登入帳號)',
      value: fakeUser.email,
      type: 'email',
      htmlId: 'Inputmail',
      aria: null,
      maxlength: 50,
      disabled: true,
    },
    {
      id: 2,
      htmlFor: 'InputName',
      class: 'form-control',
      title: '會員姓名',
      value: fakeUser.name,
      type: 'text',
      htmlId: 'InputName',
      aria: null,
      maxlength: 10,
      disabled: false,
    },
    {
      id: 3,
      htmlFor: 'InputPhone',
      class: 'form-control',
      title: '手機',
      value: fakeUser.phone,
      type: 'tel',
      htmlId: 'InputPhone',
      aria: null,
      maxlength: 10,
      disabled: false,
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
      value: fakeUser.gender,
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
  return (
    <>
      <div className={'form-box border border-dark'}>
        <div className={'form-title border-bottom border-dark p-3'}>
          會員資料檢視/修改
        </div>
        <form className="p-5">
          {inputs.map((input) => {
            return (
              <div className="mb-3" key={input.id}>
                <label htmlFor={input.htmlFor} className={'form-label'}>
                  {input.title}
                </label>
                <input
                  value={input.value}
                  type={input.tyoe}
                  className={input.class}
                  id={input.htmlId}
                  aria-describedby={input.aria}
                  maxLength={input.maxlength}
                  {...(input.disabled
                    ? { readOnly: true, disabled: true }
                    : {})}
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
                <select className={'form-select'}>
                  <option selected disabled>
                    {select.placeholder}
                  </option>
                  {select.options.map((ops, i) => {
                    return (
                      <option
                        key={i}
                        value={ops}
                        {...(select.value === ops ? { selected: true } : {})}
                      >
                        {ops}
                      </option>
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
                  <select className={'form-select'}>
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
