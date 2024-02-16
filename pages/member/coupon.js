import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import MemSideBar from '@/components/member/Sidebar/MemSideBar'
import CouponListTable from '@/components/member/CouponListTable'
import Head from 'next/head'

export default function Coupon() {
  const [orderBy, setOrderBy] = useState('ASC')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [pageBar, setPageBar] = useState([])

  useEffect(() => {
    const pageArr = []
    for (let i = 1; i <= totalPage; i++) {
      pageArr.push(i)
    }
    setPageBar(pageArr)
  }, [totalPage])
  return (
    <>
      <div>
        <Head>
          <title>優惠券｜探索咖啡COFFSEEKER</title>
        </Head>
      </div>
      <div className={'container pr-defualt-height'}>
        {/* 麵包屑 */}
        <div className={'row'}>
          <nav className={'col-lg-3 nav-breadcrumb'}>
            <ol className={'breadcrumb my-3'}>
              <li className={'breadcrumb-item'}>
                <Link href="/" className={'link'}>
                  首頁
                </Link>
              </li>
              <li className={'breadcrumb-item'}>
                <Link href="/member" className={'link'}>
                  會員中心
                </Link>
              </li>
              <li className={'breadcrumb-item'}>優惠券</li>
            </ol>
          </nav>
          <div className={'col-12 col-lg-9'}>
            <div
              className={
                'container h-100 d-lg-flex justify-content-end align-items-center'
              }
            >
              <select
                className={'ed-select-control order-select my-2 my-lg-0'}
                onChange={(e) => {
                  setOrderBy(e.target.value)
                  // console.log(orderBy)
                }}
              >
                <option value={'ASC'}>有效期限：近到遠</option>
                <option value={'DESC'}>有效期限：遠到近</option>
              </select>
            </div>
          </div>
        </div>
        {/* 麵包屑結束 */}

        <div className={'row'}>
          <div className={'col-lg-3 d-none d-lg-block'}>
            <MemSideBar />
          </div>
          <div className={'col-12 col-lg-9 mb-5'}>
            <div className={'container d-flex mb-1'}>
              <CouponListTable
                orderBy={orderBy}
                setOrderBy={setOrderBy}
                currentPage={currentPage}
                totalPage={totalPage}
                setTotalPage={setTotalPage}
              />
            </div>
          </div>
          {/* 分頁 */}
          <div className={'col-12'}>
            <div className={'container d-flex mb-5 justify-content-center'}>
              <ul className={'pagination'}>
                <li
                  className={`ed-page-item ${
                    currentPage <= 1 ? 'disabled' : null
                  } `}
                >
                  <button
                    className={'ed-page-link'}
                    aria-label="Previous"
                    onClick={() => {
                      const nextPage = currentPage - 1
                      setCurrentPage(nextPage)
                      window.scrollTo(0, 0)
                    }}
                  >
                    «
                  </button>
                </li>
                {pageBar.map((page) => {
                  return (
                    <li className={'ed-page-item'} key={page}>
                      <button
                        className={`ed-page-link ${
                          currentPage === page ? 'active disabled' : null
                        }`}
                        onClick={() => {
                          setCurrentPage(page)
                          console.log(page)
                          window.scrollTo(0, 0)
                        }}
                      >
                        {page}
                      </button>
                    </li>
                  )
                })}
                <li
                  className={`ed-page-item ${
                    currentPage === totalPage || totalPage < 1
                      ? 'disabled'
                      : null
                  } `}
                >
                  <button
                    className="ed-page-link "
                    aria-label="Next"
                    onClick={() => {
                      const nextPage = currentPage + 1
                      setCurrentPage(nextPage)
                      window.scrollTo(0, 0)
                    }}
                  >
                    »
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
