import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'

import { useUser } from '@/context/UserInfo'
import { useComment } from '@/context/comment'

import { FetchUserData } from './member/FetchDatas/FetchUserData'

export default function Comment({ totalStars = 5, pid }) {
  const { setComments } = useComment()
  const [rating, setRating] = useState(0)
  const [commentText, setCommentText] = useState('')
  const { isLoggedIn, setIsLoggedIn, userData, setUserData } = useUser()

  const [userId, setId] = useState('')
  const [userEmail, setMail] = useState('')
  const [userName, setName] = useState('')

  useEffect(() => {
    async function fetchData() {
      const data = await FetchUserData()
      if (data) {
        setIsLoggedIn(true)
        setUserData(data)
        setId(data.id)
        setMail(data.email)
        setName(data.username)
      }
    }
    fetchData()
  }, [])

  const handleStarClick = (index) => {
    setRating(index)
  }

  const handleSubmit = async () => {
    if (!isLoggedIn || !userData) {
      Swal.fire({
        icon: 'error',
        title: '尚未登入',
        iconColor: '#b54b33',
        text: '請您登入後再評論',
      })
      return
    }
    if (rating === 0) {
      Swal.fire({
        icon: 'warning',
        title: '提示',
        iconColor: '#1C262C',
        text: '請選擇評分',
      })
      return
    }

    try {
      const response = await fetch('http://localhost:3005/api/comment/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: pid,
          user_id: userData.id,
          user_email: userData.email,
          user_name: userData.username,
          comment: commentText,
          date: new Date().toISOString().split('T')[0],
          rating: rating,
        }),
      })

      const data = await response.json()

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: '成功',
          text: '評論和評分已送出',
          iconColor: '#1C262C',
        }).then(() => {
          setCommentText('')
        })
        const newComment = {
          user_name: userData.username,
          rating: rating,
          comment: commentText,
          create_at: new Date().toISOString().split('T')[0],
        }

        setComments((prevComments) => [...prevComments, newComment])
      } else if (response.status === 401) {
        Swal.fire({
          icon: 'warning',
          title: '尚未購買商品',
          iconColor: '#1C262C',
          text: data.message || '還沒品嘗過嗎？快去購買商品吧！',
        })
      } else if (response.status === 400) {
        Swal.fire({
          icon: 'error',
          title: '今日已評論過',
          iconColor: '#1C262C',
          text: data.message || '您今天已經評論過了，感謝您的支持！',
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: '錯誤',
          iconColor: '#1C262C',
          text: '請您確認評論和評分是否正確',
        })
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        iconColor: '#1C262C',
        text: 'Something went wrong! Please try again later.',
      })
    }
  }

  return (
    <>
      <div className="rating-container mt-4">
        評分：
        {Array.from({ length: totalStars }).map((_, index) => (
          <button
            key={index}
            className={index < rating ? 'star active-star' : 'star'}
            onClick={() => handleStarClick(index + 1)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleStarClick(index + 1)
              }
            }}
          >
            ★
          </button>
        ))}
      </div>

      <textarea
        className="ed-comment-textarea"
        id="comment-textarea"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="歡迎留下您的評論，與大家分享您的心得"
      />
      <button className="btn ed-comment-btn" onClick={handleSubmit}>
        提交評論
      </button>
    </>
  )
}
