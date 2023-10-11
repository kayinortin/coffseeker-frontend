import {React, useEffect} from 'react'
import Image from 'next/image'
import Score from './Score'

export default function Review({pid}) {
  

  useEffect(()=>{
    const fetchComments=async()=>{
      try{
        const response=await fetch(
          `http://localhost:3005/api/course-comment?course_id=${pid}`
        )

        const fetchedData=await response.json()
      }catch(err){
        console.log("發生錯誤："+err)
      }
    }
    fetchComments()
  },[pid])

  
  return (
    <div className="my-3 ">
      <div className="  ">
        <div className="mx-auto col-sm-8 col-10 border">
          <div className="d-flex mt-3">
          
            <Image
              src={'/course-image/selfie.png'}
              alt="icon"
              width={50}
              height={50}
              className="rounded-circle ms-3 "
            />
            <div className="border-bottom ">
              <span className="ms-3">XXX學員</span>
              <Score />
            </div>
          </div>
          <div>
            <p className="col-10 my-3 mx-auto">
              當我參加咖啡課時，我學到了製作美味咖啡的技巧，也體驗了咖啡世界的多樣性。老師很專業，課程充實，讓我對咖啡有了更深入的理解。期待下次學習！
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
