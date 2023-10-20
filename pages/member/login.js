import React from 'react'
import LoginForm from '@/components/member/LoginForm/Index'
import Link from 'next/link'
import Head from 'next/head'

export default function Login() {
  return (
    <>
      <div>
        <Head>
          <title>會員登入｜探索咖啡COFFSEEKER</title>
        </Head>
      </div>
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
      <div className={'container d-flex justify-content-center mb-5'}>
        <LoginForm />
      </div>
    </>
  )
}
