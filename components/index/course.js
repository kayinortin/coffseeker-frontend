import { useEffect } from 'react'

export default function Course() {
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

    const img = document.getElementById('course-icon')
    const gallery = document.querySelector('.gallery')

    Object.keys(hoverImages).forEach((btnId) => {
      const btn = document.getElementById(btnId)
      if (btn) {
        btn.addEventListener('mouseover', function () {
          img.src = hoverImages[btnId]
          gallery.setAttribute('data-active-group', btnGroups[btnId])
        })

        btn.addEventListener('mouseout', function () {
          img.src = defaultImage
          gallery.dataset.activeGroup = ' '
        })
      }
    })
  }, [])
  return (
    <>
      <div className="ed-course-intro container d-md-flex mb-4">
        <div className="d-md-flex d-flex-colum justify-content-center">
          <a href="http://localhost:3000/course">
            <img
              className="ed-img-size-2 d-md-none"
              src="http://localhost:3000/index-image/course.png"
              alt="go-to-course"
            />
          </a>
        </div>
        <div className="gallery">
          <img
            className="gallery_img-2x1 group-1"
            src="http://localhost:3000/course-gallery/3.jpg"
            alt="course-gallery"
          />
          <img
            className="gallery_img-2x2 group-2"
            src="http://localhost:3000/course-gallery/11.jpg"
            alt="course-gallery"
          />
          <img
            className="gallery_img-2x2 group-3"
            src="http://localhost:3000/course-gallery/1.jpg"
            alt="course-gallery"
          />

          <img
            className="gallery_img-2x1 group-1"
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
            className="gallery_img-2x1 group-3"
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
            className="gallery_img-2x1 group-2"
            src="http://localhost:3000/course-gallery/13.jpg"
            alt="course-gallery"
          />

          <img
            className="gallery_img-2x1 group-2"
            src="http://localhost:3000/course-gallery/7.jpg"
            alt="course-gallery"
          />
          <img
            className="gallery_img-2x1 group-3"
            src="http://localhost:3000/course-gallery/14.jpg"
            alt="course-gallery"
          />
        </div>
        <div className="ed-course-title">
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
                <a href="/course/category/1">
                  <button id="btn1" className="btn my-2 btn-color-1 me-md-3">
                    選豆課程
                  </button>
                </a>
                <h6 className="slogan">認識咖啡豆與產地差異</h6>
              </div>
              <div className="my-4 d-md-flex justify-content-center align-items-center">
                <a href="/course/category/1">
                  <button id="btn2" className="btn my-2 btn-color-2 me-md-3">
                    烘豆課程
                  </button>
                </a>
                <h6 className="slogan">專業烘豆萃取最佳風味</h6>
              </div>
              <div className="my-4 d-md-flex justify-content-center align-items-center">
                <a href="/course/category/1">
                  <button id="btn3" className="btn my-2 btn-color-3 me-md-3">
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
