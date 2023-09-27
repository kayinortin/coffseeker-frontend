import React from 'react'
import CoursePic from '@/components/course/CoursePic'
import CourseText from '@/components/course/CourseText'
import CourseInfoBtn from '@/components/course/CourseInfoBtn'
import style from '@/styles/_course.module.scss'
import Image from 'next/image'

export default function CourseDescription() {
  return (
    <>
      <section>
        <div className="d-none d-sm-block">
          <CourseInfoBtn />
        </div>

        <div className="border border-3 col-sm-2 col-4 mb-3 text-center">
          課程介紹
        </div>
        <h6>【課程大綱】</h6>
        <div className={style['course-intro']}>
          <ul>
            <p className="fs-5">第一堂：咖啡的基本知識</p>
            <li>咖啡的起源和歷史</li>
            <li>咖啡豆的種類和產地</li>
          </ul>

          <br />
          <ul>
            <p className="fs-5">第四堂：手沖沖煮方法 基本的手沖沖煮步驟</p>
            <li>不同的手沖沖煮方法（例如V60、Chemex、AeroPress等）</li>
            <li>基本的手沖沖煮步驟</li>
            <li>控制沖煮時間和水溫</li>
          </ul>
          <br />
          <ul>
            <p className="fs-5">第九堂：考試和證書頒發</p>
            <li>咖啡知識測試</li>
            <li>手沖咖啡製作測試</li>
          </ul>
        </div>
      </section>
      <section className="col-10 mx-auto">
        <h6>【教師簡介】</h6>
        <Image
          alt="header"
          src="/course-image/selfie.png"
          width={50}
          height={50}
          className="ms-4 rounded-circle"
        />
        <p className="fw-bold">教師姓名：XXX</p>
        <p className="fw-bold">教師資歷：XXXXXXXXXXXXXXXXX</p>
        <p className="fw-bold">教師自介：</p>
        <p>
          這裡有一位經驗豐富的咖啡教師，致力於教授咖啡的精髓。他/她擁有超過10年的咖啡行業經驗，包括在知名咖啡館工作以及參加國際咖啡大賽。他/她精通不同種類的咖啡豆，並擅長各種沖煮方法，從手沖、濾杯到意式咖啡機，無一不在行。
          這位咖啡教師熱愛分享知識，他/她的教學風格深入淺出，讓學員們能夠輕鬆理解並掌握咖啡的精髓。
        </p>
      </section>
      <section className="course-sp col-10 mx-auto">
        <h6>【課程特色】</h6>

        <p>
          1.咖啡基礎知識：
          <br />
          咖啡課程通常會從基本知識開始，介紹咖啡的來源、種類、處理方法和風味特性。這有助於學生了解咖啡的基本概念。
        </p>
        <p>
          2.咖啡沖煮技巧：
          <br />
          課程可能會教授各種咖啡沖煮方法，包括手沖、濾杯、法壺、濃縮咖啡機等。學生將學會如何調整研磨度、溫度和萃取時間，以製作出理想的咖啡。
        </p>
      </section>
    </>
  )
}
