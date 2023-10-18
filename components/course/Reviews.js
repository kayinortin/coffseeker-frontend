import {React, useEffect} from 'react'
import { useComment } from '@/context/comment'

export default function Review({pid}) {
  const {comments, setComments}=useComment()

  useEffect(()=>{
    const fetchComments=async()=>{
      try{
        const response=await fetch(
          `http://localhost:3005/api/course-comment?course_id=${pid}`
        )

        const fetchedData=await response.json()
        if(fetchedData&&response.status===200){
          setComments(fetchedData)
        }
      }catch(err){
        console.log("發生錯誤："+err)
      }
    }
    fetchComments()
  },[pid, setComments])

  
  return (
    <>
      <div className="comments-section">
        <div className="ed-product-intro-title text-center mt-2">顧客評論</div>
        {comments.length === 0 ? (
          <p>尚未評論，歡迎購買此商品與各位分享心得！</p>
        ) : (
          comments.map((comment, index) => (
            <div key={index} className="comment mt-4">
              <div>
                <img
                  src={`https://ui-avatars.com/api/?background=1C262C&color=fff&bold=true&rounded=true&name=${comment.user_name}`}
                  alt={comment.user_name}
                />
              </div>
              <h5 className="ed-comment-name">{comment.user_name}</h5>

              <div className="rating-container my-2">
                評分：
                {Array.from({ length: 5 }).map((_, index) => (
                  <span
                    key={index}
                    className={
                      index < comment.rating ? 'star active-star' : 'star'
                    }
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="ed-comment-content">{comment.comment}</p>
              <p className="ed-comment-time my-4">時間： {comment.create_at}</p>
              <hr />
            </div>
          ))
        )}
      </div>
    </>
  )
}
