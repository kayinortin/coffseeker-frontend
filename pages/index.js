import { useState, useEffect } from 'react'
import Head from 'next/head'
import AOS from 'aos'

import Explore from '../components/index/explore'
import PopularProduct from '@/components/index/PopularProduct'
import Course from '@/components/index/course'
import CoffeeMap from '@/components/index-coffee-map/coffee-map'
import Loading from '@/components/loading'

const FIRST_VISIT_KEY = 'hasVisitedBefore'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem(FIRST_VISIT_KEY)

    if (!hasVisitedBefore) {
      AOS.init({ duration: 1000 })

      setIsLoading(true)

      const timer = setTimeout(() => {
        setIsLoading(false)
        localStorage.setItem(FIRST_VISIT_KEY, 'true')
      }, 4000)

      return () => clearTimeout(timer)
    }
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <div>
        <Head>
          <title>探索咖啡COFFSEEKER｜網羅世界各地極品咖啡</title>
        </Head>
      </div>
      <Explore />
      <PopularProduct />
      <Course />
      <CoffeeMap />
    </>
  )
}
