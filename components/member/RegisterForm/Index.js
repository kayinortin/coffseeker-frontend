import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Swal from 'sweetalert2'
import axios from 'axios'
import Validation from './Validation'
import FormItems from './FormItems'
import contenOfContract from '@/data/member/contract.json'

export default function RegisterForm() {
  // 表單狀態們
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
  // 會員條款按鈕判斷
  const [allowContract, setAllowContract] = useState(false)

  const router = useRouter()
  // 送出表單
  const handleFormSubmit = async () => {
    // 進行表單驗證
    const isValied = Validation(
      userEmail,
      userName,
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
        if (response.data.code === '200') {
          Swal.fire({
            title: '註冊成功',
            icon: 'success',
            iconColor: '#b54b33', //success
            showConfirmButton: false,
            timer: 1500,
          })
          router.push('/member/login')
        } else {
          Swal.fire({
            title: '此信箱已被註冊',
            icon: 'error',
            iconColor: '#1c262c', //error
            showConfirmButton: false,
            timer: 1500,
          })
        }
      } catch (error) {
        console.error('錯誤:', error)
      }
    }
  }

  const openContract = () => {
    Swal.fire({
      title: `使用者隱私合約`,
      html: `<div class="border border-dark contract">${contenOfContract.contract}</div>`,
      confirmButtonText: '了解',
      customClass: {
        popup: 'contract-popup', // 自定義彈窗的類別
      },
    })
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

        {/* <div
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
        </div> */}
        <div
          className={
            'container d-flex justify-content-center mt-3 mb-4 align-items-center'
          }
        >
          <div className={'form-check d-flex align-items-center'}>
            <input
              type="checkbox"
              className={'check-input border border-dark me-3'}
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
              <button
                type="button"
                className={'orange-text bg-none border-0'}
                onClick={openContract}
              >
                「會員隱私條款」
              </button>
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
