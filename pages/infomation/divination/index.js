import React from 'react'
import DivinationIndex from '@/components/divination'
import Head from 'next/head'

export default function Divination() {
  return (
    <>
      <div>
        <Head>
          <title>咖啡占卜｜探索咖啡COFFSEEKER</title>
        </Head>
      </div>
      <DivinationIndex />
    </>
  )
}
