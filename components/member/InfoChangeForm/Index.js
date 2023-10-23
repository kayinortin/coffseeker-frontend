import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useUser } from '@/context/UserInfo'
import { useRouter } from 'next/router'
import axios from 'axios'
import Swal from 'sweetalert2'
import { FetchUserData } from '../FetchDatas/FetchUserData'

export default function InfoChangeForm() {
  const { userData, setUserData } = useUser()
  const router = useRouter()
  // console.log('userData抽取成功', userData)

  const [userId, setId] = useState('')
  const [userEmail, setMail] = useState('')
  const [userName, setName] = useState('')
  const [userPhone, setPhone] = useState('')
  const [userAddress, setAddress] = useState('')
  const [userGender, setGender] = useState('')
  const [birthdayYear, setBirthdayYear] = useState('')
  const [birthdayMonth, setBirthdayMonth] = useState('')
  const [birthdayData, setBirthdayDate] = useState('')

  const checkToken = Cookies.get('accessToken')
  useEffect(() => {
    async function fetchData() {
      // console.log('Fetch accessToken:', checkToken)

      if (checkToken) {
        const fetchUser = await FetchUserData()
        // console.log(fetchUser)
        if (fetchUser) {
          setUserData(fetchUser)
          setId(fetchUser.id)
          setMail(fetchUser.email)
          setName(fetchUser.username)
          setPhone(fetchUser.phone ?? '')
          setGender(fetchUser.gender ?? '')
          setAddress(fetchUser.address ?? '')
          if (fetchUser.birthday) {
            const UserBirthday = fetchUser.birthday.split('-')
            setBirthdayYear(UserBirthday[0])
            setBirthdayMonth(UserBirthday[1])
            setBirthdayDate(UserBirthday[2])
          } else {
            setBirthdayYear('1990')
            setBirthdayMonth('01')
            setBirthdayDate('01')
          }
        }
      } else {
        // console.log('Cookie不存在')
        router.push('/member/login')
      }
    }

    fetchData()
  }, [])

  // input文字輸入框
  const inputs = [
    {
      id: 1,
      htmlForId: 'InputEmail',
      class: 'form-control disable',
      title: '會員信箱(登入帳號)',
      value: userEmail,
      type: 'email',
      aria: null,
      maxlength: 50,
      disabled: true,
      onChange: (e) => setMail(e.target.value),
    },
    {
      id: 2,
      htmlForId: 'InputName',
      class: 'form-control',
      title: '會員姓名',
      value: userName,
      type: 'text',
      aria: null,
      maxlength: 30,
      disabled: false,
      onChange: (e) => setName(e.target.value),
    },
    {
      id: 3,
      htmlForId: 'InputPhone',
      class: 'form-control',
      title: '手機',
      value: userPhone,
      type: 'tel',
      aria: null,
      maxlength: 10,
      disabled: false,
      onChange: (e) => setPhone(e.target.value),
    },
    {
      id: 4,
      htmlForId: 'InputAddress',
      class: 'form-control',
      title: '收貨地址',
      value: userAddress,
      type: 'tel',
      aria: null,
      maxlength: 30,
      disabled: false,
      onChange: (e) => setAddress(e.target.value),
    },
  ]

  // select選擇輸入框
  // 性別
  const selection = [
    {
      id: 7,
      class: 'mb-3',
      htmlForId: 'SelectGender',
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
    if (i < 10) {
      month.push('0' + i)
    } else {
      month.push(i)
    }
  }

  const date = []
  for (let i = 1; i <= 31; i++) {
    if (i < 10) {
      date.push('0' + i)
    } else {
      date.push(i)
    }
  }

  const birthday = [
    {
      id: 8,
      class: 'col-12 mb-3 col-md-4',
      htmlForId: 'SelectBirthdayYear',
      title: '生日',
      options: years,
      userBirth: birthdayYear,
      placeholder: '年',
      onChange: (e) => setBirthdayYear(e.target.value),
    },
    {
      id: 9,
      class: 'col-12 mb-3 col-md-4',
      htmlForId: 'SelectBirthdayMonth',
      title: '',
      options: month,
      userBirth: birthdayMonth,
      placeholder: '月',

      onChange: (e) => setBirthdayMonth(e.target.value),
    },
    {
      id: 10,
      class: 'col-12 mb-3 col-md-4',
      htmlForIdId: 'SelectBirthdayDate',
      title: '',
      options: date,
      userBirth: birthdayData,
      placeholder: '日',

      onChange: (e) => setBirthdayDate(e.target.value),
    },
  ]

  const errorSwal = (error) => {
    Swal.fire({
      title: error,
      icon: 'error',
      iconColor: '#1C262C',
      showConfirmButton: false,
      timer: 1500,
    })
  }
  const phoneRegex = /^09\d{8}$/
  const handleUserInfoChange = async () => {
    if (userName === '') {
      errorSwal('姓名不能為空')
      return false
    } else if (userPhone === '') {
      errorSwal('手機號碼不能為空')
      return false
    } else if (!phoneRegex.test(userPhone)) {
      errorSwal('請輸入09開頭 共10位數字的台灣電話號碼格式')
      return false
    }

    const formData = {
      id: userId,
      email: userEmail,
      username: userName,
      gender: userGender,
      phone: userPhone,
      address: userAddress,
      birthday: birthdayYear + '-' + birthdayMonth + '-' + birthdayData,
    }

    try {
      const response = await axios.put(
        `http://localhost:3005/api/users/${userId}`,
        formData
      )
      // console.log(userId)
      // console.log(response)
      Swal.fire({
        title: '修改資料成功',
        icon: 'success',
        iconColor: '#b54b33', //成功
        showConfirmButton: false,
        timer: 1500,
      })
    } catch (error) {
      console.error('錯誤:', error)
    }

    try {
      const response = await axios.post(
        'http://localhost:3005/api/auth-jwt/info-change-jwt',
        { id: userId }
      )
      // console.log('成功取得Token', response)
      if (response.data.code === '200' && response.data.accessToken) {
        Cookies.set('accessToken', response.data.accessToken)
      }
    } catch (error) {
      console.error('錯誤:', error)
    }
  }

  return (
    <>
      <form className={'form-box'}>
        <div className={'border border-dark'}>
          <div className={'form-title border-bottom border-dark p-3'}>
            會員資料檢視/修改
          </div>
          <div className="p-5">
            {inputs.map((input) => {
              return (
                <div className="mb-3" key={input.id}>
                  <label htmlFor={input.htmlForId} className={'form-label'}>
                    {input.title}
                  </label>
                  <input
                    id={input.htmlForId}
                    value={input.value}
                    type={input.type}
                    className={input.class}
                    aria-describedby={input.aria}
                    maxLength={input.maxlength}
                    {...(input.disabled
                      ? { readOnly: true, disabled: true }
                      : {})}
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
                  <label htmlFor={select.htmlForId} className={'form-label'}>
                    {select.title}
                  </label>
                  <select
                    id={select.htmlForId}
                    className={'form-select'}
                    value={userGender}
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
                    <label htmlFor={select.htmlForId} className={'form-label'}>
                      {select.title}
                    </label>
                    <select
                      id={select.htmlForId}
                      className={'form-select'}
                      value={select.userBirth}
                      onChange={(e) => {
                        select.onChange(e)
                      }}
                    >
                      <option disabled>{select.placeholder}</option>
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
        <div className={'mt-4'}>
          <button
            className={'btn-login text-center border-0'}
            type="button"
            onClick={handleUserInfoChange}
          >
            確認並送出
          </button>
        </div>
      </form>
    </>
  )
}
