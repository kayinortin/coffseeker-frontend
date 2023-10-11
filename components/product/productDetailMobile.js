import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import Image from 'next/image'
import Swal from 'sweetalert2'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

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

export default function ProductDetailMobile(props) {
  const router = useRouter()
  const { pid } = router.query
  // 定義商品圖片路徑
  const [images, setImage] = useState([])
  const [mainImageIndex, setMainImageIndex] = useState(0)
  // 定義商品詳細資訊
  const INITIAL_DETAIL_DATA = {
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
    origin: '',
    manor: '',
    Production_area: '',
    Processing: '',
    altitude: '',
    Variety: '',
    Roast_degree: '',
    note: '',
  }

  const [detailData, setDetailData] = useState(INITIAL_DETAIL_DATA)

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
    origin,
    manor,
    Production_area,
    Processing,
    altitude,
    Variety,
    Roast_degree,
    note,
  } = detailData

  // 取得商品資訊
  useEffect(() => {
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

    if (pid) {
      getDetail()
      setShow((prevShow) => ({ ...prevShow, in: true }))
    }
  }, [pid])

  const { show, setShow } = useShow()
  const { cartListData, setCartListData } = useCartList()
  const { isLoggedIn, setIsLoggedIn } = useUser()

  // 預設加入購物車數量
  const [number, setNumber] = useState(1)

  // 加入購物車
  const addCart = () => {
    const itemInCart = cartListData.some((item) => item.id === detailData.id)

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

    if (itemInCart) {
      Toast.fire({
        icon: 'info',
        title: '此商品已加入購物車',
        customClass: {
          popup: 'ed-alert__toast',
          title: 'ed-alert__subtitle',
        },
      })
      return
    }

    Toast.fire({
      icon: 'success',
      title: '商品已加入購物車',
      customClass: {
        popup: 'ed-alert__toast',
        title: 'ed-alert__subtitle',
      },
    })

    const newItem = {
      id: detailData.id,
      name: detailData.name,
      image: detailData.image,
      price: detailData.price,
      discountPrice: detailData.discountPrice,
      description: detailData.description,
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
          description: cartListData[i].description,
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

  // 文本分段
  const [firstPart, secondPart] = note.split('T')

  // 取得評論資訊
  const { comments } = useComment()

  // 計算平均評分
  let ratingSum = 0
  for (let i = 0; i < comments.length; i++) {
    ratingSum += comments[i].rating
  }
  let ratingAvg = ratingSum && comments.length ? ratingSum / comments.length : 3

  const AerageStars = () => {
    return Array.from({ length: 5 }).map((_, index) => (
      <div
        key={index}
        className={index < Math.round(ratingAvg) ? 'star active-star' : 'star'}
      >
        ★
      </div>
    ))
  }

  const [showModal, setShowModal] = useState(false)

  const handleOpenModal = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <>
      {/* 手機版 */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>商品詳情</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container d-none">
            <div className="d-flex justify-content-between">
              <div className="sidebar-left d-none d-md-block">
                <div className="d-flex flex-column">
                  <div className="mt-5">
                    <h5>加購商品</h5>
                  </div>
                  <div className="mt-4 d-flex justify-content-between align-items-center">
                    <div>
                      <img src="" alt="圖片" />
                    </div>
                    <div>
                      <h6>其他咖啡豆推薦</h6>
                      <p>NT$ 100</p>
                    </div>
                  </div>
                  <hr />
                  <div className="mt-3 d-flex justify-content-between align-items-center">
                    <div>
                      <img src="" alt="圖片" />
                    </div>
                    <div>
                      <h6>其他咖啡豆推薦</h6>
                      <p>NT$ 100</p>
                    </div>
                  </div>
                  <hr />
                  <div className="mt-2 d-block">
                    <ul className="ed-sidebar-li">
                      <li className="mt-1 fw-bold">線上購物</li>
                      <Link href="http://localhost:3000/product">
                        <li className="mt-3">全站商品</li>
                      </Link>
                      <Link href="http://localhost:3000/product/category/1">
                        <li className="mt-3">咖啡豆</li>
                      </Link>
                      <Link href="http://localhost:3000/product/category/2">
                        <li className="mt-3">濾掛包</li>
                      </Link>
                      <Link href="http://localhost:3000/product/category/6">
                        <li className="mt-3">送禮推薦</li>
                      </Link>
                    </ul>
                  </div>
                </div>
              </div>
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
                          <div className="rating-container my-3">
                            {AerageStars()}
                          </div>
                          <div className="my-2">
                            <span className="ed-detail-price">
                              NT{discountPrice}
                            </span>
                          </div>
                          <div className="d-flex mt-4">
                            <ul className="ed-detail__list">
                              {origin && (
                                <li className="ed-detail__item">
                                  【國家】：{origin}
                                </li>
                              )}
                              {manor && (
                                <li className="ed-detail__item">
                                  【莊園】：{manor}
                                </li>
                              )}
                              {Production_area && (
                                <li className="ed-detail__item">
                                  【產區】：{Production_area}
                                </li>
                              )}
                              {Processing && (
                                <li className="ed-detail__item">
                                  【處理法】：{Processing}
                                </li>
                              )}
                              {altitude && (
                                <li className="ed-detail__item">
                                  【海拔】：{altitude}
                                </li>
                              )}
                              {Variety && (
                                <li className="ed-detail__item">
                                  【品種】：{Variety}
                                </li>
                              )}
                              {Roast_degree && (
                                <li className="ed-detail__item">
                                  【焙度】：{Roast_degree}
                                </li>
                              )}
                              {note && (
                                <>
                                  <li className="ed-detail__item">
                                    【風味描述】
                                  </li>
                                  <li className="ed-detail__item__descript lh-base">
                                    {description}
                                  </li>
                                </>
                              )}
                            </ul>
                          </div>
                          <div className="d-flex flex-column">
                            <div className="d-flex align-items-center">
                              <Counter number={number} setNumber={setNumber} />
                              <p className="ms-5">
                                <span className="h4 fw-bold">{amount}</span>
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
                              <Link href="http://localhost:3000/cart">
                                <button className="ms-4 ed-addCart__check">
                                  立即結帳
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="d-flex flex-column">
                  <img
                    src="http://localhost:3000/product_detail/banner.png"
                    alt="product-detail-banner"
                  />
                  <div className="d-flex flex-column ed-product-intro">
                    <div className="ed-product-intro-title text-center mt-4 ">
                      商品特色
                    </div>
                    <div className="mt-2">
                      <h5>【極精品】</h5>
                      <p>{name}</p>
                    </div>
                    <div className="mt-3">
                      <h5>【烘豆師筆記】</h5>
                      <div className="ed-product-intro-detail lh-lg">
                        {firstPart}
                        <br />
                        <br />
                        {secondPart}
                      </div>
                    </div>
                  </div>
                  <div className="d-flex flex-column">
                    <div className="ed-product-intro-title text-center mt-4">
                      商品規格
                    </div>
                    <div>
                      <ol className="ed-product-intro-list lh-lg">
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
                  {isLoggedIn ? (
                    <>
                      <Comment pid={pid} />
                    </>
                  ) : (
                    <div className="mx-auto text-center">
                      <h5 className="my-3">請先登入再進行評論</h5>
                      <div className="my-4">
                        <Link href="http://localhost:3000/member/login">
                          <button className="ed-addCart">登入會員</button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
                <hr />
                <TopHits />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            關閉
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
