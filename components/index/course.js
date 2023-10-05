import { useState, useEffect } from 'react'
import Image from 'next/image'
import AOS from 'aos'

export default function Course() {
  // 檢查是否為手機介面
  const isMobile = () => {
    if (typeof window !== 'undefined' && window.navigator) {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        window.navigator.userAgent
      )
    }
    return false
  }

  // 課程按鈕動畫
  useEffect(() => {
    const hoverImages = {
      btn1: 'http://localhost:3000/course-gallery/btn1-hover.png',
      btn2: 'http://localhost:3000/course-gallery/btn2-hover.png',
      btn3: 'http://localhost:3000/course-gallery/btn3-hover.png',
    }
    const btnGroups = {
      btn1: 'group1',
      btn2: 'group2',
      btn3: 'group3',
    }

    const defaultImage = 'http://localhost:3000/course-gallery/default.png'

    const gallery = document.querySelector('.gallery')

    Object.keys(hoverImages).forEach((btnId) => {
      const btn = document.getElementById(btnId)
      if (btn) {
        btn.addEventListener('mouseover', function () {
          gallery.setAttribute('data-active-group', btnGroups[btnId])
        })
        btn.addEventListener('mouseout', function () {
          gallery.dataset.activeGroup = ' '
        })
      }
    })
  }, [])

  // AOS動畫
  useEffect(() => {
    AOS.init({
      duration: 2000,
    })
  }, [])

  return (
    <>
      <div className="ed-course-intro container d-lg-flex mb-4 justify-content-between">
        <a className="ed-zindex" href="./course">
          <div
            className="gallery flex-column"
            data-aos={isMobile() ? 'fade-up' : 'fade-right'}
            data-aos-delay={200}
          >
            <img
              className="gallery_img-2x2 group-1"
              src="http://localhost:3000/course-gallery/3.jpg"
              alt="course-gallery"
            />
            <img
              className="gallery_img-2x1 group-2"
              src="http://localhost:3000/course-gallery/11.jpg"
              alt="course-gallery"
            />
            <img
              className="gallery_img-1x2 group-3"
              src="http://localhost:3000/course-gallery/1.jpg"
              alt="course-gallery"
            />

            <img
              className="gallery_img-1x1 group-1"
              src="http://localhost:3000/course-gallery/4.jpg"
              alt="course-gallery"
            />

            <img
              className="gallery_img-2x2 group-1"
              src="http://localhost:3000/course-gallery/10.jpg"
              alt="course-gallery"
            />
            <img
              className="gallery_img-2x2 group-2"
              src="http://localhost:3000/course-gallery/9.jpg"
              alt="course-gallery"
            />
            <img
              className="gallery_img-1x1 group-3"
              src="http://localhost:3000/course-gallery/15.jpg"
              alt="course-gallery"
            />
            <img
              className="gallery_img-2x2 group-3"
              src="http://localhost:3000/course-gallery/8.jpg"
              alt="course-gallery"
            />
            <img
              className="gallery_img-2x2 group-1"
              src="http://localhost:3000/course-gallery/12.jpg"
              alt="course-gallery"
            />
            <img
              className="gallery_img-2x2 group-2"
              src="http://localhost:3000/course-gallery/13.jpg"
              alt="course-gallery"
            />

            <img
              className="gallery_img-2x2 group-2"
              src="http://localhost:3000/course-gallery/7.jpg"
              alt="course-gallery"
            />
            <img
              className="gallery_img-2x1 group-3"
              src="http://localhost:3000/course-gallery/14.jpg"
              alt="course-gallery"
            />
          </div>
        </a>

        <div className="ed-course-title">
          <div className="ed-bg-circle"></div>
          <div className="container d-block ed-index-course">
            <div
              className="line-white"
              data-aos="fade-down"
              data-aos-delay="200"
            ></div>
            <div
              className="course-category"
              data-aos="fade-down"
              data-aos-delay="500"
            >
              課程介紹
            </div>
            <div
              className="line-white"
              data-aos="fade-down"
              data-aos-delay="200"
            ></div>
          </div>
          <div className="container d-flex justify-content-center flex-column p-3 mt-4 text-center">
            <div className="container d-flex flex-column">
              <div
                className="my-5 my-md-2 d-md-flex justify-content-center align-items-center"
                data-aos={isMobile() ? 'fade-up' : 'fade-left'}
                data-aos-delay={300}
              >
                <Image
                  className="ed-course-index"
                  src="http://localhost:3000/index-image/course01.png"
                  alt=""
                  width={150}
                  height={150}
                  data-aos={isMobile() ? 'fade-up' : 'fade-left'}
                  data-aos-delay={300}
                />
                <a href="./course/category/1">
                  <button id="btn1" className="btn my-2 btn-color-1 me-md-3">
                    拉花 <br /> 課程
                  </button>
                </a>
                <h6 className="slogan">
                  <span>
                    跨越拉花的界線，
                    <br />
                    感受筆觸下的藝術。
                  </span>
                </h6>
              </div>
              <div
                className="my-3 my-md-5 d-md-flex justify-content-center align-items-center"
                data-aos={isMobile() ? 'fade-up' : 'fade-left'}
                data-aos-delay={600}
              >
                <Image
                  className="ed-course-index"
                  src="http://localhost:3000/index-image/course02.png"
                  alt=""
                  width={150}
                  height={150}
                  data-aos={isMobile() ? 'fade-up' : 'fade-left'}
                  data-aos-delay={600}
                />
                <a href="./course/category/1">
                  <button id="btn2" className="btn my-2 btn-color-2 me-md-3">
                    烘豆 <br /> 課程
                  </button>
                </a>
                <h6 className="slogan">
                  <span>
                    感受烘豆的溫度，
                    <br />
                    聆聽咖啡豆的心跳。
                  </span>
                </h6>
              </div>
              <div
                className="my-5 my-md-3 d-md-flex justify-content-center align-items-center"
                data-aos={isMobile() ? 'fade-up' : 'fade-left'}
                data-aos-delay={900}
              >
                <Image
                  className="ed-course-index"
                  src="http://localhost:3000/index-image/course03.png"
                  alt=""
                  width={150}
                  height={150}
                  data-aos={isMobile() ? 'fade-up' : 'fade-left'}
                  data-aos-delay={900}
                />
                <a href="./course/category/1">
                  <button id="btn3" className="btn my-2 btn-color-3 me-md-3">
                    手沖 <br /> 課程
                  </button>
                </a>

                <h6 className="slogan">
                  <span>
                    最純粹的咖啡風味，
                    <br />
                    每一滴，都是心意。
                  </span>
                </h6>
              </div>
              <div
                className="ed-my-md-5 d-md-flex d-block justify-content-center align-items-center ed-course-enter"
                data-aos="fade-down"
                data-aos-delay={600}
              >
                <img
                  className="arrow me-5 me-md-0"
                  src="http://localhost:3000/index-image/arrow.gif"
                  alt="arrow"
                />
                <a
                  className="d-flex d-md-inline justify-content-center  align-items-center ms-md-5 ms-0"
                  href="./course"
                >
                  <br />
                  <button id="btn4" className="btn my-2 btn-color-4 me-md-3">
                    進入課程
                  </button>
                  <h6 className="ed-h6-resize">
                    <span>學習如何烘豆和手沖，</span>
                    <br />
                    <span>決定自己的咖啡風味！</span>
                  </h6>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
