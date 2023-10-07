import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Swal from 'sweetalert2'
import axios from 'axios'

export default function ChangePassword() {
  const [userId, setId] = useState(106)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [reNewPassword, setReNewPassword] = useState('')

  const inputs = [
    {
      id: 1,
      htmlFor: 'InputOldPassword',
      title: '原密碼',
      placeholder: '請輸入未更改前的密碼',
      type: 'password',
      htmlId: 'InputOldPassword',
      aria: null,
      maxlength: 12,
      onChange: (e) => setOldPassword(e.target.value),
    },
    {
      id: 2,
      htmlFor: 'InputNewPassword',
      title: '新密碼',
      placeholder: '請輸入想更改的新密碼',
      type: 'password',
      htmlId: 'InputNewPassword',
      aria: null,
      maxlength: 12,
      onChange: (e) => setNewPassword(e.target.value),
    },
    {
      id: 3,
      htmlFor: 'ReInputNewPassword',
      title: '確認新密碼',
      placeholder: '請再次輸入想更改的新密碼',
      type: 'password',
      htmlId: 'ReInputNewPassword',
      aria: null,
      maxlength: 12,
      onChange: (e) => setReNewPassword(e.target.value),
    },
  ]
  // 出門前備註 未增加前端驗證
  // 送出表單後清空表單內容
  const handleChangePassword = async () => {
    const formData = {
      id: userId,
      password: newPassword,
    }

    try {
      const response = await axios.put(
        `http://localhost:3005/api/users/${userId}`,
        formData
      )
      console.log(response)
      Swal.fire({
        title: '修改資料成功',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      })
      setOldPassword('')
      setNewPassword('')
      setReNewPassword('')
    } catch (error) {
      console.error('錯誤:', error)
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
