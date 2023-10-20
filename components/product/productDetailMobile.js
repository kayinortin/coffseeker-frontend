import { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import Image from 'next/image'
import Head from 'next/head'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import useAddCart from '@/hooks/useAddCart'

import { useShow } from '../../context/showProductDetail'
import { useUser } from '@/context/UserInfo'
import { useComment } from '@/context/comment'

import Counter from '@/components/Counter'
import ProductDetailFavIcon from '@/components/product/ProductDetailFavIcon'
import Comment from '@/components/Comment'
import FetchComment from '@/components/FetchComment'
import TopHitsMobile from '@/components/TopHitsMobile'
import FetchFavProductId from '../fav/FetchFavProductId'

export default function ProductDetailMobile({ pid }) {
  FetchFavProductId()
  // const [number, setNumber] = useState(1)
  const [images, setImage] = useState([])
  const [mainImageIndex, setMainImageIndex] = useState(0)
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
    discountPrice,
    description,
    origin,
    manor,
    Production_area,
    Processing,
    altitude,
    Variety,
    Roast_degree,
    note,
  } = detailData

  const [showModal, setShowModal] = useState()
  const { show, setShow } = useShow()
  const selectedPid = show.selectedPid
  // 取得商品資訊
  useEffect(() => {
    const getDetail = async () => {
      if (selectedPid) {
        let response = await axios.get(
          `http://localhost:3005/api/products/${selectedPid}`
        )
        const details = response.data

        setDetailData({ ...details })
        if (response.data.image) {
          setImage(JSON.parse(response.data.image))
        }
      }
    }

    if (selectedPid) {
      getDetail()
      setShow((prevShow) => ({ ...prevShow, in: true }))
    }
  }, [selectedPid])

  useEffect(() => {
    setShowModal(show.in)
  }, [show.in])

  const handleCloseModal = () => {
    setShowModal(false)
    setShow((prevShow) => ({ ...prevShow, in: false }))
  }

  const { addCart, number, setNumber } = useAddCart(detailData)

  const { isLoggedIn, setIsLoggedIn } = useUser()

  // 取得評論資訊
  const { comments } = useComment()
  // 文本分段
  const [firstPart, secondPart] = note.split('T')
  // 計算平均評分
  let ratingSum = 0
  for (let i = 0; i < comments.length; i++) {
    ratingSum += comments[i].rating
  }
  let ratingAvg = ratingSum && comments.length ? ratingSum / comments.length : 3
  let roundedRating = Math.floor(ratingAvg)
  let hasHalfStar = ratingAvg - roundedRating >= 0.5 ? true : false

  const AerageStars = () => {
    return Array.from({ length: 5 }).map((_, index) => {
      let starClass = 'star'

      if (index < roundedRating) {
        starClass += ' active-star'
      } else if (index === roundedRating && hasHalfStar) {
        starClass += ' half-star'
      }

      return (
        <div key={index} className={starClass}>
          ★
        </div>
      )
    })
  }

  return (
    <>
      <div>
        <Head>
          <title>精選咖啡｜探索咖啡COFFSEEKER</title>
        </Head>
      </div>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
        className="upwardModal"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="d-flex flex-column mt-3">
              <div className="ed-detail-left">
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
                <div className="d-flex align-items-center justify-content-start">
                  <div className="ed-activity-mobile-title text-center mt-4">
                    新會員優惠
                  </div>
                  <div className="ed-activity-mobile-detail mt-4 ms-3">
                    領取專屬優惠卷 <br /> 折抵商品<span>100元</span>
                  </div>
                </div>
              </div>
              <div className="ed-detail-right">
                <div className="d-flex flex-column justify-content-between p-md-0">
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
                          NT${discountPrice}
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
                            <li className="ed-detail__item lh-base">
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
                              <li className="ed-detail__item">【風味描述】</li>
                              <li className="ed-detail__item__descript lh-base">
                                {description}
                              </li>
                            </>
                          )}
                        </ul>
                      </div>
                      <div className="d-flex flex-column">
                        <div className="d-flex align-items-center justify-content-between">
                          <Counter
                            number={number}
                            setNumber={setNumber}
                            maxCount={amount}
                          />
                          <p className="ms-5">
                            <span className="h4 fw-bold">{amount}</span>
                            組庫存量
                          </p>
                        </div>
                        <div className="d-flex align-items-center justify-content-center">
                          <button
                            className="ed-addCart__detail-mobile d-flex align-items-center mt-3"
                            onClick={addCart}
                          >
                            加入購物車
                            <i className="fas fa-shopping-cart"></i>
                          </button>
                          {isLoggedIn ? (
                            <Link href="/cart">
                              <button className="ms-4 ed-addCart__check">
                                立即結帳
                              </button>
                            </Link>
                          ) : (
                            <Link href="/member/login">
                              <button className="ms-4 ed-addCart__check">
                                立即結帳
                              </button>
                            </Link>
                          )}
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
                src="/product_detail/banner.png"
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
              <FetchComment pid={selectedPid} />
              {isLoggedIn ? (
                <>
                  <Comment pid={selectedPid} />
                </>
              ) : (
                <div className="mx-auto text-center">
                  <h5 className="my-3">請先登入再進行評論</h5>
                  <div className="my-4">
                    <Link href="/member/login">
                      <button className="ed-addCart">登入會員</button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <hr />
            <TopHitsMobile />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="ed-btn-close" onClick={handleCloseModal}>
            關閉
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
