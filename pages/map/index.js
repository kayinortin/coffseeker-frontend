import React from 'react'
import MapIndex from '@/components/map'
import Head from 'next/head'

function Map() {
  return (
    <>
      <div>
        <Head>
          <title>咖啡地圖｜探索咖啡COFFSEEKER</title>
        </Head>
      </div>
      <MapIndex />
    </>
  )
}

export default Map
