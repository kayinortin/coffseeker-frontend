import { React, useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import Link from 'next/link'
import Head from 'next/head'
import Skeleton from '@mui/material/Skeleton'

import ProductItem from './productItem'
import ProductDataFetcher from './ProductDataFetcher'
import FilterMobile from './FilterMobile'
import Sort from './Sort'
import Filter from './Filter'

import ProductDetailMobile from '@/components/product/productDetailMobile'

import { useShow } from '@/context/showProductDetail'
import { useProducts } from '@/context/product'
import { usePagination } from '@/context/pagination'

import FetchFavProductId from '../fav/FetchFavProductId'

export default function ProductList() {
  FetchFavProductId()

  const { show, setShow, selectedPid } = useShow()
  const { productsData, setProductsData, sortBy } = useProducts()
  const isFetchingProducts = productsData.length === 0

  const [sortedProducts, setSortedProducts] = useState([])
  useEffect(() => {
    let sorted = [...productsData]
    switch (sortBy) {
      case 'New':
        sorted.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
        break
      case 'Popularity':
        sorted.sort((a, b) => b.popularity - a.popularity)
        break
      case 'MostViews':
        sorted.sort((a, b) => b.views - a.views)
        break
      case 'priceAsc':
        sorted.sort((a, b) => a.discountPrice - b.discountPrice)
        break
      case 'priceDesc':
        sorted.sort((a, b) => b.discountPrice - a.discountPrice)
        break
      default:
        break
    }
    setSortedProducts(sorted)
  }, [productsData, sortBy])

  const { currentPage, setCurrentPage, totalPages, setTotalPages } =
    usePagination()
  const itemsPerPage = 12
  useEffect(() => {
    setTotalPages(Math.ceil(sortedProducts.length / itemsPerPage))
  }, [sortedProducts, setTotalPages])

  const currentProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  )
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  const isMobile = useMediaQuery({ query: '(max-width: 767px)' })

  function ProductSkeleton() {
    return (
      <div className="product-skeleton">
        <Skeleton variant="rectangular" width={250} height={250} />
        <Skeleton variant="text" width="25%" />
        <Skeleton variant="text" width="25%" />
        <Skeleton variant="text" width="25%" />
        <Skeleton variant="text" width="25%" />
      </div>
    )
  }

  return (
    <>
      <ProductDataFetcher />
      <div>
        <Head>
          <title>全站商品｜探索咖啡COFFSEEKER</title>
        </Head>
      </div>
      <div className="d-flex justify-content-between container">
        <div className="d-none d-md-block ed-left-filter container mt-5">
          <Filter
            onFilter={(data) => {
              setProductsData(data)
              setCurrentPage(1)
            }}
          />
        </div>
        <div className="background mt-4 m-md-5 container ed-right-product px-5">
          <div className="row">
            <div className="d-flex">
              <div className="d-flex align-items-center">
                <Link href="/product">
                  <h6>線上購物</h6>
                </Link>
                <div style={{ margin: '0 5px' }}> &gt; </div>
                <Link href="/product">
                  <h6>全站商品</h6>
                </Link>
              </div>
            </div>
            <div className="d-flex my-2 d-md-none">
              共有 {sortedProducts.length} 筆商品
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <div className="mt-2 d-none d-md-block">
                共有 {sortedProducts.length} 筆商品
              </div>
              <Sort />
              <div className="d-block d-md-none mt-2">
                <FilterMobile
                  onFilter={(data) => {
                    setProductsData(data)
                    setCurrentPage(1)
                  }}
                />
              </div>
            </div>

            {sortedProducts.length === 0 ? (
              <div className="ed-placeholder my-5 container">
                <div className="ed-placeholder__img ed-placeholder__img--not-found">
                  <img
                    src="http://localhost:3000/bg1.png"
                    alt="not-found"
                    className="ed-img ed-img--contain"
                  />
                </div>
                <h5 className="text-center lh-lg">
                  很抱歉，未符合您的需求。
                  <br />
                  請您重新調整篩選條件！
                </h5>
              </div>
            ) : !isFetchingProducts ? (
              <>
                {currentProducts.map((product) => (
                  <ProductItem
                    key={product.id}
                    setShow={setShow}
                    product={product}
                  />
                ))}
                {show.in && isMobile && (
                  <ProductDetailMobile pid={selectedPid} />
                )}
                <div className="pagination-container d-flex justify-content-center mt-5">
                  <ul className="pagination">
                    <li
                      className={`ed-page-item ${
                        currentPage === 1 ? 'disabled' : ''
                      }`}
                    >
                      <button
                        className="ed-page-link"
                        href="#"
                        aria-label="Previous"
                        onClick={() => {
                          handlePageChange(currentPage - 1)
                        }}
                      >
                        <span aria-hidden="true">&laquo;</span>
                      </button>
                    </li>
                    {pageNumbers.map((v, i) => {
                      return (
                        <li className="ed-page-item" key={i}>
                          <button
                            className={`ed-page-link ${
                              v === currentPage ? 'active' : ''
                            }`}
                            href="#"
                            onClick={() => {
                              handlePageChange(v)
                            }}
                          >
                            {v}
                          </button>
                        </li>
                      )
                    })}

                    <li className="ed-page-item">
                      <button
                        className={`ed-page-link ${
                          currentPage === totalPages ? 'disabled' : ''
                        }`}
                        href="#"
                        aria-label="Next"
                        onClick={() => handlePageChange(currentPage + 1)}
                      >
                        <span aria-hidden="true">&raquo;</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              Array.from({ length: itemsPerPage }).map((_, idx) => (
                <ProductSkeleton key={idx} />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  )
}
