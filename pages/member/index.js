import React from 'react'
import Link from 'next/link'

export default function User() {
  const sidebar = [
    '會員中心',
    '會員資料查詢/修改',
    '修改密碼',
    '訂單管理',
    '我的收藏',
    '優惠券',
    '登出',
  ]
  return (
    <>
      <section className={'background'}>
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
                <li className={'breadcrumb-item'}>會員中心</li>
              </ol>
            </nav>
          </div>
          {/* 麵包屑結束 */}

          <div className={'row'}>
            <div className={'col-3'}>
              <div className={'sidebar d-flex flex-column'}>
                {sidebar.map((list) => {
                  return (
                    <>
                      <div className={'border-bottom p-2'}>
                        <Link href="/" className={'sidebar-title'}>
                          {list}
                        </Link>
                      </div>
                    </>
                  )
                })}
              </div>
            </div>
            <div className={'col-9 mb-5'}>
              <div className={'content border border-dark'}>
                <div className={'form-title border-bottom border-dark p-3'}>
                  會員中心
                </div>
                <div className={'d-flex flex-column px-5'}>
                  {sidebar.map((list) => {
                    return (
                      <>
                        <div className={'border-bottom p-2'}>
                          <Link href="/" className={'sidebar-title'}>
                            {list}
                          </Link>
                        </div>
                      </>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
