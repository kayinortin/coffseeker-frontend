import { useState, useEffect } from 'react'
import Head from 'next/head'
import Explore from '../components/index/explore'
import Hot from '../components/product/index'
import Course from '../components/index/course'
import CoffeeMap from '@/components/index-coffee-map/coffee-map'
import AOS from 'aos'
import Loading from '@/components/loading'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    AOS.init({
      duration: 1000,
    })

    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      {/* 頁面名稱 */}
      <div>
        <Head>
          <title>探索咖啡COFFSEEKER｜網羅世界各地極品咖啡</title>
        </Head>
      </div>
      {/* 首頁探索功能 */}
      <Explore />
      {/* 此處製作熱門商品 */}
      <Hot />
      {/* 此處製作課程區 */}
      <Course />
      {/* 此處製作咖啡產地的介紹 */}
      <CoffeeMap />
    </>
  )
}
