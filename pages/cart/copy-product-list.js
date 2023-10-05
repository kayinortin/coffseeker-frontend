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

    addToCart({
      id: product_id,
      name: product_name,
      price: product_price,
      description: product_description,
      image: product_image,
      quantity: product_quantity,
    })

    // 在這裡將商品資料存儲在本地存儲
    const newItem = {
      id: product_id,
      name: product_name,
      price: product_price,
      description: product_description,
      image: product_image,
      quantity: product_quantity,
    }

    // 檢查本地存儲中是否已經有購物車資料
    const existingCart = localStorage.getItem('cartList')
      ? JSON.parse(localStorage.getItem('cartList'))
      : []

    // 添加新商品到購物車
    const updatedCart = [...existingCart, newItem]

    // 將購物車資料保存到本地存儲
    localStorage.setItem('cartList', JSON.stringify(updatedCart))

    // 提示成功加入購物車
    Swal.fire({
      icon: 'success',
      title: '商品已加入購物車',
      customClass: {
        popup: 'c-alert__toast',
        title: 'c-alert__subtitle',
      },
    })
  }

  // 加入購物車的按鈕，需要使用useContext 處理
  // const { cartListData, setCartListData } = useCartList()
  // const [number, setNumber] = useState(1)
  // const [detailData, setDetailData] = useState([])  // 需再定義商品細節欄位
  // const [cartListData, setCartListData] = useState([]) // 存放進useContext
  // const [cartIconLength, setCartIconLength] = useState() // 購物車icon數字

  // const addCart = () => {
  //   const Toast = Swal.mixin({
  //     toast: true,
  //     position: 'top-end',
  //     showConfirmButton: false,
  //     timer: 2000,
  //     timerProgressBar: false,
  //     didOpen: (toast) => {
  //       toast.addEventListener('mouseenter', Swal.stopTimer)
  //       toast.addEventListener('mouseleave', Swal.resumeTimer)
  //     },
  //   })

  //   Toast.fire({
  //     icon: 'success',
  //     title: '商品已加入購物車',
  //     customClass: {
  //       popup: 'c-alert__toast',
  //       title: 'c-alert__subtitle',
  //     },
  //   })

  //   const newItem = {
  //     id: detailData.id,
  //     name: detailData.name,
  //     image: detailData.image,
  //     price: detailData.price,
  //     discountPrice: detailData.discountPrice,
  //     amount: number,
  //   }

  //   const newItemData = [...cartListData, newItem]

  //   for (let i = 0; i < cartListData.length; i++) {
  //     if (cartListData[i].id === newItem.id) {
  //       const newAmountItem = {
  //         id: cartListData[i].id,
  //         name: cartListData[i].name,
  //         image: cartListData[i].image,
  //         price: cartListData[i].price,
  //         discountPrice: cartListData[i].discountPrice,
  //         amount: cartListData[i].amount + newItem.amount,
  //       }
  //       const oldCartListData = cartListData.filter(
  //         (item, i) => item.id !== newItem.id
  //       )
  //       const newCartListData = [...oldCartListData, newAmountItem]

  //       setCartListData(newCartListData)
  //       return localStorage.setItem('cartList', JSON.stringify(newCartListData))
  //     }
  //   }

  //   if (cartListData.length !== 0) {
  //     setCartListData(newItemData)
  //     localStorage.setItem('cartList', JSON.stringify(newItemData))
  //   } else {
  //     setCartListData([newItem])
  //     localStorage.setItem('cartList', JSON.stringify([newItem]))
  //   }
  // }

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
