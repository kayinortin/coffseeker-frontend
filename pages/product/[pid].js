import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Counter from '@/components/Counter'

import Skeleton from '@mui/material/Skeleton'
import Modal from 'react-bootstrap/Modal'
import Swal from 'sweetalert2'

import { useShow } from '../../context/showProductDetail'
import { useCategory } from '@/context/category'
import { useCartList } from '@/context/cart'
import { useUser } from '@/context/UserInfo'

import ProductDetailFavIcon from '@/components/product/ProductDetailFavIcon'
import dayjs from 'dayjs'
import { set } from 'lodash'

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
      // console.log(response.data.image, typeof response.data.image)
      // typeof response.data.image
      const details = response.data
      setDetailData({ ...details })
      setImage(JSON.parse(response.data.image))
    }
  }

  const { show, setShow } = useShow()
  const { cartListData, setCartListData } = useCartList()
  const { isLoggedIn, setIsLoggedIn } = useUser()

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

  // useEffect(() => {
  //   axios.get('http://localhost:3005/api/products').then((res) => {
  //     console.log(res.data)
  //     setImage(res.data)
  //   })
  // }, [])

  const isFetchingDetail = detailData.id === ''
  const isFetchingCategory = categoryData.id === ''

  // 預設加入購物車數量
  const [number, setNumber] = useState(1)

  // 評論系統
  const [showComment, setShowComment] = useState({
    in: false,
    out: false,
  })
  const [commentDetail, setCommentDetail] = useState([])
  const [commentEmpty, setCommentEmpty] =
    useState('歡迎所有會員留下評論分享您的咖啡體驗')
  const [newComment, setNewComment] = useState({
    product_id: '',
    comment: '',
    date: '',
    user_id: '',
  })

  /* 控制modal關閉 & 淡出淡入效果 */
  const handleClose = () => {
    setShow({ ...show, out: true })
    setTimeout(() => {
      setShow({ ...show, in: false, out: false })
    }, 500)
    window.history.back()
  }

  const handleIn = show.in
    ? 'animation animation__modal animation__modal--in'
    : ''
  const handleOut = show.out
    ? 'animation animation__modal animation__modal--out'
    : ''

  const handleCommentIn = showComment.in
    ? 'animation animation__modal animation__modal--in'
    : ''
  const handleCommentOut = showComment.out
    ? 'animation animation__modal animation__modal--out'
    : ''

  const handleCommentOpen = () => {
    setShowComment({ ...setShow, in: true })
  }

  const handleCommentClose = () => {
    setShowComment({ ...show, out: true })
    setTimeout(() => {
      setShowComment({ ...show, in: false, out: false })
    }, 500)
  }

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
                  <img
                    src={`http://localhost:3005/uploads/${images[mainImageIndex]}`}
                    alt="Main product"
                    className="ed-image-main"
                  />
                  <ProductDetailFavIcon id={id} />
                  <div className="ed-image-row">
                    {images.map((image, index) => {
                      if (index === mainImageIndex) return null
                      return (
                        <img
                          key={index}
                          src={`http://localhost:3005/uploads/${image}`}
                          alt={`Product ${index}`}
                          className="ed-image-small"
                          onClick={() => setMainImageIndex(index)}
                        />
                      )
                    })}
                  </div>
                </div>
                <div>活動置放區</div>
              </div>
              <div className="ed-detail-right">
                <div className="d-flex flex-column justify-content-between p-3 p-md-0">
                  <div className="ed-detail__scroll p-md-0">
                    <div className="position-relative">
                      <h5 className="my-2 ed-detail-title">{name}</h5>
                      <h6 className="ed-detail-brand">精選品牌 {brand}</h6>
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
                          <button className="ms-4 ed-addCart__check">
                            立即結帳
                          </button>
                        </div>

                        <div></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
