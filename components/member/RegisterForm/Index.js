import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Swal from 'sweetalert2'
import axios from 'axios'
import Validation from './Validation'
import FormItems from './FormItems'

export default function RegisterForm() {
  const router = useRouter()

  const [errorMessage, setErrorMessage] = useState('')
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

  // 會員條款按鈕判斷
  const [allowContract, setAllowContract] = useState(false)

  // 送出表單
  const handleFormSubmit = async () => {
    // 進行表單驗證
    const isValied = Validation(
      userEmail,
      userPassword,
      rePassword,
      userGender,
      userPhone,
      birthdayYear,
      birthdayMonth,
      birthdayData
    )

    if (isValied) {
      const formData = {
        username: userName,
        password: userPassword,
        email: userEmail,
        gender: userGender,
        phone: userPhone,
        birthday: birthdayYear + '-' + birthdayMonth + '-' + birthdayData,
      }
      try {
        const response = await axios.post(
          `http://localhost:3005/api/users/`,
          formData
        )
        console.log(response)
        Swal.fire({
          title: '註冊成功',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        })
        router.push('/member/login')
      } catch (error) {
        console.error('錯誤:', error)
      }
    }
  }

  return (
    <>
      <form id="loginForm" className={'form-box'}>
        <div className={'border border-dark'}>
          <div className={'form-title border-bottom border-dark p-3'}>
            會員註冊
          </div>
          <FormItems
            userEmail={userEmail}
            userName={userName}
            userPassword={userPassword}
            rePassword={rePassword}
            userPhone={userPhone}
            userGender={userGender}
            birthdayYear={birthdayYear}
            birthdayMonth={birthdayMonth}
            birthdayData={birthdayData}
            setMail={setMail}
            setName={setName}
            setPassword={setPassword}
            setRePassword={setRePassword}
            setPhone={setPhone}
            setGender={setGender}
            setBirthdayYear={setBirthdayYear}
            setBirthdayMonth={setBirthdayMonth}
            setBirthdayDate={setBirthdayDate}
          />
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
        {allowContract ? (
          <div className={'d-flex justify-content-center'}>
            <button
              type="button"
              className={'btn-login border-0 text-center'}
              onClick={handleFormSubmit}
            >
              確認並送出
            </button>
          </div>
        ) : (
          <div className={'d-flex'}>
            <button
              className={'btn-login border-0 text-center disagree py-auto'}
              type="button"
            >
              請勾選同意會員隱私條款
            </button>
          </div>
        )}
      </form>
    </>
  )
}
