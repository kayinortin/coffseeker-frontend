import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useUser } from '@/context/UserInfo'
import FavItems from './FavItems'
import RemoveFavProduct from '@/components/fav/RemoveFavProduct'
import RemoveFavCourse from '@/components/fav/RemoveFavCourse'
import _ from 'lodash'
import Head from 'next/head'
export default function Favorite() {
  const [favProductData, setFavProductData] = useState(null)
  const [favCourseData, setFavCourseData] = useState(null)

  useEffect(() => {
    const fetchFavProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:3005/api/favorite/my-favorite-product-detail`,
          {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        const data = await response.json()
        if (data.products.length !== 0) {
          setFavProductData(data.products)
        } else {
          setFavProductData([])
        }
      } catch (error) {
        console.error('錯誤:', error)
      }
    }
    fetchFavProduct()
    const fetchFavCourse = async () => {
      try {
        const response = await fetch(
          `http://localhost:3005/api/favorite/my-favorite-course-detail`,
          {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        const data = await response.json()
        if (data.courses.length !== 0) {
          setFavCourseData(data.courses)
        } else {
          setFavCourseData([])
        }
      } catch (error) {
        console.error('錯誤:', error)
      }
    }
    fetchFavCourse()
  }, [])

  function handleRemoveFavProduct(id) {
    const updatedFavProductData = _.cloneDeep(favProductData)
    _.remove(updatedFavProductData, (product) => product.id === id)
    RemoveFavProduct(id)
    setFavProductData(updatedFavProductData)
  }
  function handleRemoveFavCourse(id) {
    const updatedFavCourseData = _.cloneDeep(favCourseData)
    _.remove(updatedFavCourseData, (course) => course.id === id)
    RemoveFavCourse(id)
    setFavCourseData(updatedFavCourseData)
  }
  return (
    <>
      <div>
        <Head>
          <title>我的收藏｜探索咖啡COFFSEEKER</title>
        </Head>
      </div>
      <div className={'table-box'}>
        {/* 收藏商品表頭 */}
        <div className={'border border-dark mb-5'}>
          <div className={'form-title border-bottom border-dark p-3 d-flex'}>
            <span className={'col-lg-2'}>
              <h5>收藏商品</h5>
            </span>
            <div className={'d-none d-lg-flex col-10'}>
              <div className={'text-center col-6'}>商品名稱</div>
              <div className={'text-center col-2'}>商品價格</div>
              <div className={'text-center col-2'}>加入日期</div>
              <div className={'text-center col-2'}>查看/移除</div>
            </div>
          </div>
          {/* 收藏商品列表 */}
          {favProductData ? (
            favProductData.length == 0 ? (
              <div className={'text-center py-5'}>尚未收藏任何商品</div>
            ) : (
              favProductData.map((v) => (
                <div key={v.id}>
                  <FavItems
                    data={v}
                    type={'product'}
                    handleRemove={handleRemoveFavProduct}
                  />
                </div>
              ))
            )
          ) : (
            <div className={'text-center py-5'}>資料讀取中</div>
          )}
        </div>
        {/* 收藏課程表頭 */}
        <div className={'border border-dark'}>
          <div className={'form-title border-bottom border-dark p-3 d-flex'}>
            <span className={'col-lg-2'}>
              <h5>收藏課程</h5>
            </span>
            <div className={'d-none d-lg-flex col-10'}>
              <div className={'text-center col-6'}>課程名稱</div>
              <div className={'text-center col-2'}>課程價格</div>
              <div className={'text-center col-2'}>加入日期</div>
              <div className={'text-center col-2'}>查看/移除</div>
            </div>
          </div>
          {/* 收藏課程列表 */}
          {favCourseData ? (
            favCourseData.length == 0 ? (
              <div className={'text-center py-5'}>尚未收藏任何課程</div>
            ) : (
              favCourseData.map((v) => (
                <div key={v.id}>
                  <FavItems
                    data={v}
                    type={'course'}
                    handleRemove={handleRemoveFavCourse}
                  />
                </div>
              ))
            )
          ) : (
            <div className={'text-center py-5'}>資料讀取中</div>
          )}
        </div>
      </div>
    </>
  )
}
