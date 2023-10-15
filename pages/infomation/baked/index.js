import BakedCard from '@/components/baked/baked-card'
import React from 'react'
import Head from 'next/head'

export default function Baked() {
  return (
    <>
      <div>
        <Head>
          <title>烘焙介紹｜探索咖啡COFFSEEKER</title>
        </Head>
      </div>

      <BakedCard />
    </>
  )
}
