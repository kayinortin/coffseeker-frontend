import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Image from 'next/image'
import Swal from 'sweetalert2'

import { useShow } from '../../context/showProductDetail'
import { useCategory } from '@/context/category'
import { useCartList } from '@/context/cart'
import { useUser } from '@/context/UserInfo'
import { useComment } from '@/context/comment'
import { useProducts } from '@/context/product'

import Counter from '@/components/Counter'
import ProductDetailFavIcon from '@/components/product/ProductDetailFavIcon'
import Comment from '@/components/Comment'
import FetchComment from '@/components/FetchComment'
import TopHits from '@/components/TopHits'

export default function ProductDetail(props) {
  const router = useRouter()
  const { pid } = router.query
  // 取得商品圖片路徑
  const [images, setImage] = useState([])
  const [mainImageIndex, setMainImageIndex] = useState(0)

  const getDetail = async () => {
    if (pid) {
      let response = await axios.get(
        `http://localhost:3005/api/products/${pid}`
      )
      const details = response.data

      setDetailData({ ...details })
      if (response.data.image) {
        setImage(JSON.parse(response.data.image))
      }
    }
  }

  const { show, setShow } = useShow()
  const { cartListData, setCartListData } = useCartList()
  const { isLoggedIn, setIsLoggedIn, userData, setUserData } = useUser()
  const { productsData, setProductsData } = useProducts()
  const { categoryData } = useCategory()
  const [category, setCategory] = useState({ id: '', name: '' })

  // 取得商品詳細資訊
  const [detailData, setDetailData] = useState({
    id: '',
    name: '',
    brand: '',
    amount: 0,
    price: 0,
    discountPrice: 0,
    views: 0,
    description: '',
    category_id: 0,
    popularity: 0,
  })
  const {
    id,
    name,
    brand,
    amount,
    price,
    discountPrice,
    views,
    description,
    category_id,
    popularity,
  } = detailData

  useEffect(() => {
    if (pid) {
      setDetailData({
        id: '',
        image: '',
        name: '',
        brand: '',
        amount: 0,
        price: 0,
        discountPrice: 0,
        views: 0,
        description: '',
        category_id: 0,
        popularity: 0,
      })
      getDetail()
      setShow({ ...show, in: true })
    }
  }, [pid])

  // 預設加入購物車數量
  const [number, setNumber] = useState(1)

  // 加入購物車
  const addCart = () => {
    // 加入購物車alert
    const Toast = Swal.mixin({
      toast: true,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: false,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      },
    })

    Toast.fire({
      icon: 'success',
      title: '商品已加入購物車',
      customClass: {
        popup: 'c-alert__toast',
        title: 'c-alert__subtitle',
      },
    })

    const newItem = {
      id: detailData.id,
      name: detailData.name,
      image: detailData.image,
      price: detailData.price,
      discountPrice: detailData.discountPrice,
      amount: number,
    }

    const newItemData = [...cartListData, newItem]

    for (let i = 0; i < cartListData.length; i++) {
      if (cartListData[i].id === newItem.id) {
        const newAmountItem = {
          id: cartListData[i].id,
          name: cartListData[i].name,
          image: cartListData[i].image,
          price: cartListData[i].price,
          discountPrice: cartListData[i].discountPrice,
          amount: cartListData[i].amount + newItem.amount,
        }
        const oldCartListData = cartListData.filter(
          (item, i) => item.id !== newItem.id
        )
        const newCartListData = [...oldCartListData, newAmountItem]

        setCartListData(newCartListData)
        return localStorage.setItem('cartList', JSON.stringify(newCartListData))
      }
    }

    if (cartListData.length !== 0) {
      setCartListData(newItemData)
      localStorage.setItem('cartList', JSON.stringify(newItemData))
    } else {
      setCartListData([newItem])
      localStorage.setItem('cartList', JSON.stringify([newItem]))
    }
  }

  // 取得評論資訊
  const { comments, setComments } = useComment()

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-between">
          <div className="sidebar-left">1234</div>
          <div className="ed-sidebar-right">
            {/* 左邊 */}
            <div className="d-flex justify-content-between mt-3">
              <div className="container ed-detail-left">
                {/* 照片換置 */}
                <div className="ed-image-gallery">
                  <Image
                    src={`http://localhost:3005/uploads/${images[mainImageIndex]}`}
                    alt={`${name}`}
                    className="ed-image-main"
                    width={300}
                    height={300}
                  />
                  <ProductDetailFavIcon id={id} />
                  <div className="ed-image-row">
                    {images.map((image, index) => {
                      if (index === mainImageIndex) return null
                      return (
                        <Image
                          key={index}
                          src={`http://localhost:3005/uploads/${image}`}
                          alt={`Product ${index}`}
                          className="ed-image-small"
                          width={100}
                          height={100}
                          onClick={() => setMainImageIndex(index)}
                        />
                      )
                    })}
                  </div>
                </div>
                <div className="d-flex ed-activity align-items-center">
                  <div className="ed-activity-title text-center">
                    新會員優惠
                  </div>
                  <div className="ed-activity-detail">
                    領取專屬優惠卷 <br /> 折抵商品<span>100元</span>
                  </div>
                </div>
              </div>
              <div className="ed-detail-right">
                <div className="d-flex flex-column justify-content-between p-3 p-md-0">
                  <div className="ed-detail__scroll p-md-0">
                    <div className="position-relative">
                      <p className="ed-detail-brand mt-2">
                        精選品牌 &gt; {brand}
                      </p>
                      <h5 className="ed-detail-title">{name}</h5>
                      <div className="my-2">
                        <span className="ed-detail-price">
                          NT{discountPrice}
                        </span>
                      </div>
                      <div className="d-flex mt-4">
                        <ul className="ed-detail__list">
                          <li className="ed-detail__item">【國家】：</li>
                          <li className="ed-detail__item">【莊園】：</li>
                          <li className="ed-detail__item">【產區】：</li>
                          <li className="ed-detail__item">【處理法】：</li>
                          <li className="ed-detail__item">【海拔】：</li>
                          <li className="ed-detail__item">【品種】：</li>
                          <li className="ed-detail__item">【焙度】：</li>
                          <li className="ed-detail__item">【風味描述】</li>
                          <li className="ed-detail__item__descript">
                            描述內容
                          </li>
                        </ul>
                      </div>
                      <div className="d-flex flex-column">
                        <div className="d-flex align-items-center">
                          <Counter number={number} setNumber={setNumber} />
                          <p className="ms-4">
                            <span className="h4 fw-bold">{amount}</span>{' '}
                            組庫存量
                          </p>
                        </div>
                        <div className="d-flex align-items-center">
                          <button
                            className="ed-addCart__detail d-flex align-items-center mt-3"
                            onClick={addCart}
                          >
                            加入購物車
                            <i className="fas fa-shopping-cart"></i>
                          </button>
                          <a href="http://localhost:3000/cart">
                            <button className="ms-4 ed-addCart__check">
                              立即結帳
                            </button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="d-flex flex-column">
              <Image
                src="http://localhost:3000/product_detail/banner.png"
                alt="product-detail-banner"
                width={907}
                height={400}
              />
              <div className="d-flex flex-column ed-product-intro">
                <div className="ed-product-intro-title text-center mt-4">
                  商品特色
                </div>
                <div className="mt-2">
                  <h5>【極精品】</h5>
                  <p>巴拿馬 翡翠莊園 Jaramillo 綠標瑰夏 日曬</p>
                </div>
                <div className="mt-3">
                  <h5>【烘豆師筆記】</h5>
                  <div className="ed-product-intro-detail">
                    生豆時聞得到淡淡的莓果香氣，為了加強這樣美好的風味，前期使用了中等的節奏進行烘焙，將水果般甜膩、果汁般的口感呈現出來。至一爆的發展，將節奏慢下來，讓口感能夠更突出而不掩蓋香氣。
                    <br />
                    <br />
                    初聞乾香氣時，帶有一點藍莓、百香果的調性。在熱時品飲，有些微的枇杷清香，和著熱帶水果的風味。酸甜感有如荔枝輕輕點綴在舌面。尾韻帶一點異國香料感，回甘性強如糖蜜，最後以淡雅的桂圓作陪襯，整杯咖啡給人一種身處於異國的熱帶風情。
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column">
                <div className="ed-product-intro-title text-center mt-4">
                  商品規格
                </div>
                <div>
                  <ol className="ed-product-intro-list">
                    <li>新鮮咖啡烘焙豆</li>
                    <li>重量100g</li>
                    <li>有效期限一年</li>
                    <li>製造日期見包裝上標示</li>
                    <li>單向排氣閥鋁箔袋包裝</li>
                  </ol>
                </div>
              </div>
              <hr />
              <FetchComment pid={pid} />
              <Comment pid={pid} />
            </div>
            <hr />
            <TopHits />
          </div>
        </div>
      </div>
    </>
  )
}
