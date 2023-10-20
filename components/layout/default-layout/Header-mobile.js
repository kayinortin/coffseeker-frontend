import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import Swal from 'sweetalert2'
import { checkLoginStatus } from '@/components/member/FetchDatas/CheckLoginStaus'
import { useUser } from '@/context/UserInfo'
import { useAuthJWT } from '@/context/useAuthJWT'
import useFirebase from '@/hooks/use-firebase'

export default function HeaderMobile(props) {
  const { navItems, currentRoute, navActions, isTop, isFullScreen } = props
  const { isLoggedIn, setIsLoggedIn } = useUser()
  const { logoutFirebase } = useFirebase()
  const { authJWT, setAuthJWT } = useAuthJWT()

  const router = useRouter()
  const { pathname } = router

  const [check, setCheck] = useState(false)
  useEffect(() => {
    setCheck(false)
  }, [pathname])

  useEffect(() => {
    async function fetchLoginStatus() {
      const loggedIn = await checkLoginStatus()
      setIsLoggedIn(loggedIn)
    }

    fetchLoginStatus()
  }, [isLoggedIn, setIsLoggedIn])

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

  return (
    <>
      <div className="ed-navbar--mobile d-flex d-lg-none">
        <input
          type="checkbox"
          id="menuToggle"
          className="ed-navbar__check"
          checked={check}
          onChange={() => {
            setCheck(!check)
          }}
        />
        <label htmlFor="menuToggle" className="ed-navbar__toggle">
          <i className="fas fa-bars ed-navbar__icon"></i>
        </label>
        <Link className="ed-navbar__font ed-navbar__logo" href="/">
          {!isTop || isFullScreen ? (
            <img src="/logo-white.png" alt="logo" />
          ) : (
            <img src="/logo-dark.png" alt="logo" />
          )}
        </Link>
        <div className={`ed-navbar__menu ${!isTop ? 'ed-navbar--scroll' : ''}`}>
          <ul className="ed-navbar__list">
            {navItems.map((item) => {
              if (!item.children) {
                return (
                  // 沒有下拉式選單的情況
                  <li className="ed-navbar__item" key={item.id}>
                    <a
                      className={`ed-navbar__font ${
                        navItems.find((item) => item.href === currentRoute)
                          ? 'active'
                          : ''
                      }`}
                      aria-current="page"
                      href={item.href}
                    >
                      <h5 className="ed-navbar__font">{item.label}</h5>
                    </a>
                  </li>
                )
              }
              // 有下拉式選單 (children) 的情況
              return (
                <li className="nav-item dropdown" key={item.id}>
                  <input
                    type="checkbox"
                    id={`toggle-${item.id}`}
                    style={{ display: 'none' }}
                  />
                  <label
                    htmlFor={`toggle-${item.id}`}
                    className={`nav-link ed-navbar__font ${
                      item.children.find((child) => child.href === currentRoute)
                        ? 'active'
                        : ''
                    }`}
                  >
                    <h5 className="ed-navbar__font">{item.label}</h5>
                  </label>
                  <ul className="expandable-menu">
                    {item.children.map((child) => (
                      <li key={child.id}>
                        <a
                          className={`dropdown-item ed-navbar__font ${
                            currentRoute === child.href ? 'active' : ''
                          }`}
                          href={child.href}
                        >
                          {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              )
            })}

            <li className="ed-navbar__item">
              <hr className="ed-hr ed-hr--navbar" />
            </li>
            <div className="ed-bg2">
              <img src="/bg2-sm.png" alt="menu-bg" width={240} />
            </div>

            {navActions.map((action) => (
              <li className="ed-navbar__item" key={action.id}>
                <Link href={action.href} className="ed-navbar__btn">
                  {action.iconMobile}
                  <h5 className="ed-navbar__font">{action.label}</h5>
                </Link>
              </li>
            ))}
            {!isLoggedIn ? null : (
              <li className="ed-navbar__item">
                <a
                  className="ed-navbar__btn"
                  onClick={handleLogout}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleLogout()
                    }
                  }}
                  type="button"
                  role="button"
                  tabIndex={0}
                >
                  <i className="fas fa-sign-out-alt ed-navbar__icon ed-navbar__icon--inline"></i>
                  <h5 className="ed-navbar__font">登出</h5>
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  )
}
