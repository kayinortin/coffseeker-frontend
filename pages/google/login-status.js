import { useAuth } from '@/context/useAuth'
import Link from 'next/link'

export default function LoginStatus() {
  const { auth } = useAuth()

  // 未登入時，不會出現頁面內容
  if (!auth.isAuth) return <></>

  return (
    <>
      <h1>登入狀態頁(未登入無法觀看)</h1>
      <p>會員姓名:{auth.userData.name}</p>

      <Link href="/user-google/">會員登出入測試頁(session-cookie)</Link>
      <br />
      <Link href="/user-google/google-login">
        google-login測試頁(session-cookie)
      </Link>
    </>
  )
}
