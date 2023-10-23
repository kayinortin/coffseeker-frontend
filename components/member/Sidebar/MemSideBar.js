import React from 'react'
import Link from 'next/link'
import useFirebase from '@/hooks/use-firebase'
import axios from 'axios'
import { useAuthJWT } from '@/context/useAuthJWT'
import Swal from 'sweetalert2'

export default function MemSideBar() {
  const { logoutFirebase } = useFirebase()
  const { authJWT, setAuthJWT } = useAuthJWT()
  const handleLogout = () => {
    axios
      .post(
        'http://localhost:3005/api/auth-jwt/logout',
        {},
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.message === 'success') {
          logoutFirebase()
          localStorage.removeItem('hasVisitedBefore')
          setAuthJWT({
            isAuth: false,
            userData: {
              id: 0,
              name: '',
              username: '',
              r_date: '',
            },
          })

          Swal.fire({
            title: '登出成功',
            icon: 'success',
            iconColor: '#b54b33',
            showConfirmButton: false,
            timer: 1500,
          })
          setTimeout(() => {
            window.location.href = '/'
          }, 1500)
        } else {
          Swal.fire({
            title: '登出失敗',
            icon: 'error',
            iconColor: '#1C262C',
            showConfirmButton: false,
            timer: 1500,
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const sidebar = [
    {
      id: 1,
      option: '會員中心',
      href: '/member/',
    },
    {
      id: 2,
      option: '歷史訂單',
      href: '/member/order-list',
    },
    {
      id: 3,
      option: '我的收藏',
      href: '/member/likes',
    },
    {
      id: 4,
      option: '優惠券',
      href: '/member/coupon',
    },
  ]
  return (
    <>
      <div className={'d-flex flex-column'}>
        {sidebar.map((v) => {
          return (
            <div className={'border-bottom p-2'} key={v.id}>
              <Link href={v.href} className={'sidebar-title'}>
                {v.option}
              </Link>
            </div>
          )
        })}
        <div className={'border-bottom p-2'}>
          <button
            className={'sidebar-title border-0 p-0'}
            onClick={handleLogout}
          >
            登出
          </button>
        </div>
      </div>
    </>
  )
}
