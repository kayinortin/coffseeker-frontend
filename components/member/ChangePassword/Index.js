import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useUser } from '@/context/UserInfo'
// 10/10 尚未完成
// 未增加前端驗證
// 送出表單後清空表單內容
// 原密碼驗證

export default function ChangePassword() {
  // useContext
  const { userData, setUserData } = useUser()
  // useState
  const [userId, setId] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [reNewPassword, setReNewPassword] = useState('')

  useEffect(() => {
    if (userData) {
      setId(userData.id)
      // console.log('已取得資料')
    } else {
      // console.log('未取得資料')
    }
  }, [userData])

  const inputs = [
    {
      id: 1,
      htmlFor: 'inputOldPassword',
      title: '原密碼',
      placeholder: '請輸入未更改前的密碼',
      type: 'password',
      htmlId: 'inputOldPassword',
      value: oldPassword,
      aria: null,
      maxlength: 12,
      onChange: (e) => setOldPassword(e.target.value),
    },
    {
      id: 2,
      htmlFor: 'inputNewPassword',
      title: '新密碼',
      placeholder: '請輸入想更改的新密碼',
      type: 'password',
      htmlId: 'inputNewPassword',
      value: newPassword,
      aria: null,
      maxlength: 12,
      onChange: (e) => setNewPassword(e.target.value),
    },
    {
      id: 3,
      htmlFor: 'reInputNewPassword',
      title: '確認新密碼',
      placeholder: '請再次輸入想更改的新密碼',
      type: 'password',
      htmlId: 'reInputNewPassword',
      value: reNewPassword,
      aria: null,
      maxlength: 12,
      onChange: (e) => setReNewPassword(e.target.value),
    },
  ]

  // 前端驗證使用
  const passwordRegex = /^(?=.*[a-zA-Z]).{8,12}$/

  const errorSwal = (error) => {
    Swal.fire({
      title: error,
      icon: 'error',
      iconColor: '#1c262c', //error
      showConfirmButton: false,
      timer: 1500,
    })
  }

  const handleChangePassword = async () => {
    if (newPassword === '') {
      errorSwal('密碼不能為空')
      return false
    } else if (!passwordRegex.test(newPassword)) {
      errorSwal('密碼格式不符 請輸入8~12位,英數混合的密碼')
      return false
    } else if (reNewPassword !== newPassword) {
      errorSwal('密碼不相符')
      return false
    }

    const formData = {
      id: userId,
      oldPassword: oldPassword,
      password: newPassword,
    }

    try {
      const response = await axios.post(
        `http://localhost:3005/api/users/change-password`,
        formData
      )
      // console.log(response)

      if (response.data.code == 400) {
        errorSwal('密碼修改失敗 舊密碼不相符')
        return
      }

      Swal.fire({
        title: '密碼修改成功',
        icon: 'success',
        iconColor: '#b54b33', //success
        showConfirmButton: false,
        timer: 1500,
      })

      // 重置表單內容
      setOldPassword('')
      setNewPassword('')
      setReNewPassword('')
    } catch (error) {
      console.error('錯誤:', error)
      errorSwal('伺服器錯誤 密碼修改失敗')
    }
  }

  return (
    <>
      <form className={'form-box'}>
        <div className={'border border-dark'}>
          <div className={'form-title border-bottom border-dark p-3'}>
            修改密碼
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
                    type={input.type}
                    className={'form-control'}
                    id={input.htmlId}
                    aria-describedby={input.aria}
                    value={input.value}
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
          </div>
        </div>
        <div className={'mt-4'}>
          <button
            className={'btn-login text-center border-0'}
            type="button"
            onClick={handleChangePassword}
          >
            確認並送出
          </button>
        </div>
      </form>
    </>
  )
}
