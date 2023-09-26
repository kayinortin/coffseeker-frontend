import { useEffect } from 'react'

export default function Course() {
  // 課程按鈕動畫
  useEffect(() => {
    const hoverImages = {
      btn1: 'http://localhost:3000/course-gallery/btn1-hover.png',
      btn2: 'http://localhost:3000/course-gallery/btn2-hover.png',
      btn3: 'http://localhost:3000/course-gallery/btn3-hover.png',
    }

    const defaultImage = 'http://localhost:3000/course-gallery/default.png'

    const img = document.getElementById('course-icon')

    Object.keys(hoverImages).forEach((btnId) => {
      const btn = document.getElementById(btnId)
      if (btn) {
        btn.addEventListener('mouseover', function () {
          img.src = hoverImages[btnId]
        })

        btn.addEventListener('mouseout', function () {
          img.src = defaultImage
        })
      }
    })
  }, [])
  return (
    <>
      <div className="ed-course-intro">
        <div className="gallery">
          <img
            className="gallery_img-1x1"
            src="http://localhost:3000/course-gallery/1.jpg"
            alt="course-gallery"
          />
          <img
            className="gallery_img-1x2"
            src="http://localhost:3000/course-gallery/2.jpg"
            alt="course-gallery"
          />
          <img
            className="gallery_img-2x1"
            src="http://localhost:3000/course-gallery/3.jpg"
            alt="course-gallery"
          />
          <img
            className="gallery_img-1x1 d-none d-md-block"
            src="http://localhost:3000/course-gallery/4.jpg"
            alt="course-gallery"
          />
          <img
            className="gallery_img-2x2"
            src="http://localhost:3000/course-gallery/9.jpg"
            alt="course-gallery"
          />
          <img
            className="gallery_img-1x2"
            src="http://localhost:3000/course-gallery/6.jpg"
            alt="course-gallery"
          />
          <img
            className="gallery_img-2x1"
            src="http://localhost:3000/course-gallery/7.jpg"
            alt="course-gallery"
          />
          <img
            className="gallery_img-1x1 d-none d-md-block"
            src="http://localhost:3000/course-gallery/5.jpg"
            alt="course-gallery"
          />
          <img
            className="gallery_img-2x2"
            src="http://localhost:3000/course-gallery/8.jpg"
            alt="course-gallery"
          />
          <img
            className="gallery_img-1x2"
            src="http://localhost:3000/course-gallery/11.jpg"
            alt="course-gallery"
          />
          <img
            className="gallery_img-2x2"
            src="http://localhost:3000/course-gallery/14.jpg"
            alt="course-gallery"
          />
          <img
            className="gallery_img-1x1"
            src="http://localhost:3000/course-gallery/13.jpg"
            alt="course-gallery"
          />
          <img
            className="gallery_img-1x2"
            src="http://localhost:3000/course-gallery/10.jpg"
            alt="course-gallery"
          />
          <img
            className="gallery_img-1x1"
            src="http://localhost:3000/course-gallery/12.jpg"
            alt="course-gallery"
          />
          <img
            className="gallery_img-1x1"
            src="http://localhost:3000/course-gallery/15.jpg"
            alt="course-gallery"
          />
        </div>
        <div className="ed-course-title px-5">
          <div className="container d-flex justify-content-center align-items-center ed-index-course">
            <div className="line-white"></div>
            <div className="course-category">課程介紹</div>
            <div className="line-white"></div>
          </div>
          <div className="container d-flex justify-content-center flex-column p-3 mt-4 text-center">
            <div className="container d-flex justify-content-center icon-space">
              <img
                id="course-icon"
                src="http://localhost:3000/course-gallery/default.png"
                alt="course-icon"
                width={160}
                height={160}
              />
            </div>
            <div>
              <img
                className="img-fluid"
                src="http://localhost:3000/coffseeker-logo-inline-2.png"
                alt="coffseeker-logo"
                width={300}
              />
            </div>
            <div className="container d-flex flex-column">
              <div className="my-4 d-md-flex justify-content-center align-items-center">
                <a href="/course">
                  <button id="btn1" className="btn my-2 btn-color-1 me-md-5">
                    選豆課程
                  </button>
                </a>
                <h6 className="slogan">認識咖啡豆與產地差異</h6>
              </div>
              <div className="my-4 d-md-flex justify-content-center align-items-center">
                <a href="/course">
                  <button id="btn2" className="btn my-2 btn-color-2 me-md-5">
                    烘豆課程
                  </button>
                </a>
                <h6 className="slogan">專業烘豆萃取最佳風味</h6>
              </div>
              <div className="my-4 d-md-flex justify-content-center align-items-center">
                <a href="/course">
                  <button id="btn3" className="btn my-2 btn-color-3 me-md-5">
                    手沖課程
                  </button>
                </a>
                <h6 className="slogan">手沖訣竅踏上風味旅程</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
