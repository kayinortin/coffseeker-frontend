import { React, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Skeleton from '@mui/material/Skeleton'
import ProductItem from './productItem'
import ProductDataFetcher from './ProductDataFetcher'
import Sort from './Sort'
import navItems from '../../data/navitems.json'

import { useProducts } from '@/context/product'
import { usePagination } from '@/context/pagination'

export default function ProductList(props) {
  const { setShow } = props
  const router = useRouter()
  const currentRoute = router.asPath
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

  return (
    <>
      <ProductDataFetcher />
      <div className="d-flex justify-content-between container">
        <div className="d-none d-md-block ed-left-filter container mt-5">
          <ul className="ed-navbar__items">
            <ul className="ed-navbar__items">
              {navItems.map((item) => {
                if (!item.children) {
                  return (
                    // 沒有下拉式選單的情況
                    <li
                      className="ed-navbar__item ed-navbar__link"
                      key={item.id}
                    >
                      <a
                        className={`ed-navbar__font ${
                          navItems.find((item) => item.href === currentRoute)
                            ? 'active'
                            : ''
                        }`}
                        aria-current="page"
                        href={item.href}
                      >
                        {item.label}
                      </a>
                    </li>
                  )
                }
                // 有下拉式選單 (children) 的情況
                return (
                  <li className="nav-item dropdown" key={item.id}>
                    <a
                      className={`nav-link dropdown-toggle ed-navbar__font ${
                        item.children.find(
                          (child) => child.href === currentRoute
                        )
                          ? 'active'
                          : ''
                      }`}
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      href="#"
                    >
                      {item.label}
                    </a>
                    <ul className="dropdown-menu">
                      {item.children.map((child) => (
                        <li key={child.id}>
                          <a
                            className={`dropdown-item ${
                              currentRoute === child.href ? 'active' : ''
                            }`}
                            href={child.href}
                          >
                            {child.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                )
              })}
            </ul>
          </ul>
        </div>
        <div className="background mt-4 m-md-5 container ed-right-product px-5">
          <div className="row">
            <h5>精品咖啡豆 單品 | 行家 | 經典 系列咖啡豆</h5>
            <div className="d-flex justify-content-between align-items-center">
              <div className="mt-2 d-none d-md-block">
                共有 {productsData.length} 筆商品
              </div>
              <Sort />
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
