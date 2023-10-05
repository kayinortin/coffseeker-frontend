import { useEffect, useState } from 'react'
import axios from 'axios'
import ProductDataFetcher from '../../components/product/ProductDataFetcher'
import { BsCart, BsFillCartCheckFill } from 'react-icons/bs'
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'
import Swal from 'sweetalert2'
import useCart from '@/hooks/useCart'
import { CartContext } from '@/context/CartContent'

export default function ProductsList() {
  const [data, setData] = useState(null)

  const onDataFetched = (fetchedData) => {
    setData(fetchedData)
  }

  const [isFavorited, setFavorited] = useState(false)
  const [isCarted, setCarted] = useState(false)

  const { addCart: addToCart } = useCart(CartContext)

  function doAddCart(product) {
    const {
      product_id,
      product_name,
      product_price,
      product_description,
      product_image,
      product_quantity,
    } = product

    const existingCart = localStorage.getItem('cartList')
      ? JSON.parse(localStorage.getItem('cartList'))
      : []
    const isProductInCart = existingCart.some((item) => item.id === product_id)

    if (isProductInCart) {
      // 商品已经在购物车中，显示失败提示
      Swal.fire({
        icon: 'error',
        title: '商品已加入過購物車',
        customClass: {
          popup: 'c-alert__toast',
          title: 'c-alert__subtitle',
        },
      })
    } else {
      addToCart({
        id: product_id,
        name: product_name,
        price: product_price,
        description: product_description,
        image: product_image,
        quantity: product_quantity,
      })

      // 添加新商品到购物车
      const newItem = {
        id: product_id,
        name: product_name,
        price: product_price,
        description: product_description,
        image: product_image,
        quantity: product_quantity,
      }

      const updatedCart = [...existingCart, newItem]

      // 将购物车数据保存到本地存储
      localStorage.setItem('cartList', JSON.stringify(updatedCart))

      // 提示成功加入购物车
      Swal.fire({
        icon: 'success',
        title: '商品已加入購物車',
        customClass: {
          popup: 'c-alert__toast',
          title: 'c-alert__subtitle',
        },
      })
    }
  }

  return (
    <>
      <div className="background p-4">
        {data && data.products && data.products.length > 0 ? (
          <div>
            <h6>產品列表 (抓資料庫測試) 共有 {data.products.length} 筆資料</h6>
            <div className="row">
              {data.products.map((product) => (
                <div className="col-md-3 mb-4 px-5" key={product.product_id}>
                  <div className="card ed-border-none">
                    <img
                      src={`http://localhost:3005/uploads/${product.product_image}`}
                      alt={product.product_name}
                      className="card-img-top"
                    />
                    <div className="card-body ed-card-body">
                      <p className="card-title ed-card-title">
                        {product.product_name}
                      </p>
                      <p className="ed-card-origin-price">NT$1,200</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <h6 className="ed-card-price">
                          NT${product.product_price}
                        </h6>
                        <div className="d-flex justify-content-between align-items-center">
                          <button
                            className="ed-addCart"
                            onClick={() => {
                              doAddCart(product)
                            }}
                          >
                            加入購物車
                          </button>
                          {/* <button className="ed-addCart">加入購物車</button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="unavailable">
            新品即將推出，<br className="d-md-none"></br>持續探索最佳風味 !{' '}
          </div>
        )}
      </div>
      <ProductDataFetcher onDataFetched={onDataFetched} />
    </>
  )
}
