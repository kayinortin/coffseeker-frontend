import React from 'react'
import HandBrewCard from '@/components/handbrewed/handbrewed-card'
import Head from 'next/head'

const HandBrew = () => {
  return (
    <>
      <div>
        <Head>
          <title>手沖介紹｜探索咖啡COFFSEEKER</title>
        </Head>
      </div>
      {/* 標題區 */}
      <div className="d-flex justify-content-center my-4 align-items-center mobile-news-title">
        <div className="ei-line me-3"></div>
        <h3 className="text-center news-title fs-2">手沖介紹</h3>
        <div className="ei-line ms-3"></div>
      </div>
      <HandBrewCard />
    </>
  )
}

export default HandBrew
