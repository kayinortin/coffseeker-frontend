import React from 'react'

export default function FormItems({
  // userEmail,
  // userName,
  // userPassword,
  // rePassword,
  // userPhone,
  userGender,
  birthdayYear,
  birthdayMonth,
  birthdayData,
  setMail,
  setName,
  setPassword,
  setRePassword,
  setPhone,
  setGender,
  setBirthdayYear,
  setBirthdayMonth,
  setBirthdayDate,
}) {
  // input文字輸入框===============
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
      maxlength: 30,
      onChange: (e) => setName(e.target.value),
    },
    {
      id: 3,
      htmlFor: 'InputPassword',
      title: '密碼',
      placeholder: '請輸入8~12位數,英數混和的密碼',
      type: 'password',
      aria: null,
      maxlength: 12,
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
      placeholder: '請輸入您的手機號碼,09開頭共10位數字',
      type: 'tel',
      aria: null,
      maxlength: 10,
      onChange: (e) => setPhone(e.target.value),
    },
  ]

  // select選擇輸入框===============
  // 性別
  const selection = [
    {
      id: 7,
      class: 'mb-3',
      htmlFor: 'SelectGender',
      title: '性別',
      value: userGender,
      options: [
        { value: 'Male', opt: '男' },
        { value: 'Female', opt: '女' },
        { value: 'CantDisclose', opt: '不便透漏' },
      ],
      placeholder: '請選擇您的性別',
      onChange: (e) => setGender(e.target.value),
    },
  ]

  // 生日===============
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
      class: 'col-12 mb-3 col-md-4',
      htmlFor: 'SelectBirthdayYear',
      title: '生日',
      value: birthdayYear,
      options: years,
      placeholder: '年',
      onChange: (e) => setBirthdayYear(e.target.value),
    },
    {
      id: 9,
      class: 'col-12 mb-3 col-md-4',
      htmlFor: 'SelectBirthdayMonth',
      title: '',
      value: birthdayMonth,
      options: month,
      placeholder: '月',
      onChange: (e) => setBirthdayMonth(e.target.value),
    },
    {
      id: 10,
      class: 'col-12 mb-3 col-md-4',
      htmlFor: 'SelectBirthdayDate',
      title: '',
      value: birthdayData,
      options: date,
      placeholder: '日',
      onChange: (e) => setBirthdayDate(e.target.value),
    },
  ]
  return (
    <div className="p-5">
      {inputs.map((input) => {
        return (
          <div className="mb-3" key={input.id}>
            <label htmlFor={input.htmlFor} className={'form-label'}>
              {input.title}
            </label>
            <input
              placeholder={input.placeholder}
              type={input.type}
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
              value={select.value}
              onChange={(e) => {
                select.onChange(e)
              }}
            >
              <option value={''} disabled>
                {select.placeholder}
              </option>
              {select.options.map((opts, i) => {
                return (
                  <option key={i} value={opts.value}>
                    {opts.opt}
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
              <select
                className={'form-select'}
                value={select.value}
                onChange={(e) => {
                  select.onChange(e)
                }}
              >
                <option value={''} disabled>
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
  )
}
