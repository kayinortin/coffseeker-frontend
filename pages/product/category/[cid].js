import { React, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Skeleton from '@mui/material/Skeleton'

import ProductItem from '@/components/product/productItem'
import ProductDataFetcher from '@/components/product/ProductDataFetcher'
import Sort from '@/components/product/Sort'
import Filter from '@/components/product/Filter'
import FilterMobile from '@/components/product/FilterMobile'

import navItems from '../../../data/navitems.json'

import { useProducts } from '@/context/product'
import { usePagination } from '@/context/pagination'

export default function ProductList(props) {
  const { setShow } = props
  const router = useRouter()
  const { cid } = router.query
  const currentRoute = router.asPath
  const { productsData, setProductsData, sortBy } = useProducts()
  const [filteredProducts, setfilteredProducts] = useState([])
  const [sortedProducts, setSortedProducts] = useState([])

  useEffect(() => {
    const filtered = productsData.filter(
      (product) => product.category_id == cid
    )
    setfilteredProducts(filtered)
  }, [productsData, cid])

  const isFetchingProducts = filteredProducts.length === 0

  console.log(isFetchingProducts)

  useEffect(() => {
    let sorted = [...filteredProducts]
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
  }, [filteredProducts, sortBy])

  const { currentPage, setCurrentPage, totalPages, setTotalPages } =
    usePagination()
  const itemsPerPage = 12
  useEffect(() => {
    setTotalPages(Math.ceil(filteredProducts.length / itemsPerPage))
  }, [filteredProducts, setTotalPages])

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

  function generateBreadcrumb(items, cid) {
    for (let item of items) {
      if (item.children) {
        for (let child of item.children) {
          if (child.id == cid) {
            return [
              { label: item.label, href: item.href || '/product' },
              { label: child.label, href: child.href },
            ]
          }
        }
      }
    }
    return []
  }

  const breadcrumbItems = generateBreadcrumb(navItems, cid)

  return (
    <>
      <ProductDataFetcher />
      <div className="d-flex justify-content-between container">
        <div className="d-none d-md-block ed-left-filter container mt-5">
          <Filter onFilter={setProductsData} />
        </div>

        <div className="background mt-4 m-md-5 container ed-right-product px-5">
          <div className="row">
            <div className="d-flex">
              {breadcrumbItems.map((b, index) => (
                <div
                  key={index}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <Link href={b.href}>
                    <h6>{b.label}</h6>
                  </Link>
                  {index < breadcrumbItems.length - 1 && (
                    <div style={{ margin: '0 5px' }}> &gt; </div>
                  )}
                </div>
              ))}
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <div className="mt-2 d-none d-md-block">
                共有 {filteredProducts.length} 筆商品
              </div>
              <Sort />
              <div className="d-block d-md-none mt-2">
                <FilterMobile onFilter={setProductsData} />
              </div>
            </div>
            {!isFetchingProducts ? (
              <>
                {currentProducts.map((product) => (
                  <ProductItem
                    key={product.id}
                    setShow={setShow}
                    product={product}
                  />
                ))}
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
              <div className="unavailable">
                新品即將推出，<br className="d-md-none"></br>持續探索最佳風味 !
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
