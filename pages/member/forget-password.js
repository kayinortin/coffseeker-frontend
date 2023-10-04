import React from 'react'
import Link from 'next/link'
import ForgetPassword from '@/components/member/ForgetPassword'
export default function Forget() {
  return (
    <>
      <div className={'background'}>
        <div className={'container'}>
          {/* 麵包屑 */}
          <div className={'row'}>
            <nav className={'nav-breadcrumb'}>
              <ol className={'breadcrumb my-3'}>
                <li className={'breadcrumb-item'}>
                  <Link href="/" className={'link'}>
                    首頁
                  </Link>
                </li>
                <li className={'breadcrumb-item'}>
                  <Link href="./login" className={'link'}>
                    會員登入
                  </Link>
                </li>
                <li className={'breadcrumb-item'}>忘記密碼</li>
              </ol>
            </nav>
          </div>
        </div>
        {/* 麵包屑結束 */}
        <div className={'container d-flex justify-content-center mb-5'}>
          <ForgetPassword />
        </div>
      </div>
    </>
  )
}
