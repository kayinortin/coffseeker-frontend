import React from 'react'
import Link from 'next/link'
import SignUpForm from '@/components/member/SignUpForm'
export default function SignUp() {
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
                <li className={'breadcrumb-item'}>會員登入</li>
              </ol>
            </nav>
          </div>
        </div>
        {/* 麵包屑結束 */}

        <SignUpForm />
      </div>
    </>
  )
}
