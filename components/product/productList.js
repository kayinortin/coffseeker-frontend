import { React, useEffect, useState } from 'react'
import Skeleton from '@mui/material/Skeleton'
import ProductItem from './ProductItem'
import ProductDataFetcher from './ProductDataFetcher'
import Sort from './Sort'

import { useProducts } from '@/context/product'

export default function ProductList(props) {
  const { setShow } = props
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

  return (
    <>
      <ProductDataFetcher />
      <div className="d-flex justify-content-between container">
        <div className="d-none d-md-block ed-left-filter container mt-5">
          123
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
              sortedProducts.map((product, i) => {
                return (
                  <ProductItem
                    key={product.id}
                    setShow={setShow}
                    product={product}
                  />
                )
              })
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
