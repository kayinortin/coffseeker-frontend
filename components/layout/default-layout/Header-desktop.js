import { useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import Swal from 'sweetalert2'
import { checkLoginStatus } from '@/components/member/FetchDatas/CheckLoginStaus'
import { useUser } from '@/context/UserInfo'
import { useAuthJWT } from '@/context/useAuthJWT'
import useFirebase from '@/hooks/use-firebase'

export default function HeaderDesktop(props) {
  const { navItems, currentRoute, navActions, isTop, isFullScreen } = props
  const { isLoggedIn, setIsLoggedIn } = useUser()
  const { logoutFirebase } = useFirebase()
  const { authJWT, setAuthJWT } = useAuthJWT()

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
      <div className="ed-navbar--desktop d-none d-lg-flex">
        <ul className="ed-navbar__items">
          <li className="ed-navbar__item">
            <Link className="ed-navbar__font ed-navbar__logo" href="/">
              {!isTop || isFullScreen ? (
                <img src="/logo-white.png" alt="logo" />
              ) : (
                <img src="/logo-dark.png" alt="logo" />
              )}
            </Link>
          </li>

          <ul className="ed-navbar__items">
            {navItems.map((item) => {
              if (!item.children) {
                return (
                  // 沒有下拉式選單的情況
                  <li className="ed-navbar__item ed-navbar__link" key={item.id}>
                    <a
                      className={`ed-navbar__font ${
                        navItems.find((item) => item.href === currentRoute)
                          ? 'active'
                          : ''
                      }`}
                      aria-current="page"
                      href={item.href}
                    >
                      {item.label}
                    </a>
                  </li>
                )
              }
              // 有下拉式選單 (children) 的情況
              return (
                <li className="nav-item dropdown" key={item.id}>
                  <a
                    className={`nav-link dropdown-toggle ed-navbar__font ${
                      item.children.find((child) => child.href === currentRoute)
                        ? 'active'
                        : ''
                    }`}
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    href="#"
                  >
                    {item.label}
                  </a>
                  <ul className="dropdown-menu">
                    {item.children.map((child) => (
                      <li key={child.id}>
                        <a
                          className={`dropdown-item ${
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
          </ul>
        </ul>
        <ul className="ed-navbar__actions">
          {navActions.map((action) => (
            <li className="ed-navbar__icon" key={action.id}>
              <Link href={action.href} className="ed-navbar__btn">
                {action.iconMobile}
                {action.tagDesktop}
              </Link>
            </li>
          ))}
          {!isLoggedIn ? null : (
            <li className="ed-navbar__icon d-flex logout-icon">
              <div
                className="fas fa-sign-out-alt ed-navbar__font"
                onClick={handleLogout}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleLogout()
                  }
                }}
                type="button"
                role="button"
                tabIndex={0}
              ></div>
            </li>
          )}
        </ul>
      </div>
    </>
  )
}
