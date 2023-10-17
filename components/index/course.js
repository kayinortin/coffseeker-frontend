import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import Link from 'next/link'
import Image from 'next/image'
import AOS from 'aos'

export default function Course() {
  const [activeGroup, setActiveGroup] = useState(null)

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
  const [aosValue, setAosValue] = useState(isMobile ? 'fade-up' : 'fade-right')

  useEffect(() => {
    setAosValue(isMobile ? 'fade-up' : 'fade-right')
  }, [isMobile])

  useEffect(() => {
    AOS.init({
      duration: 1000,
    })
  }, [])

  return (
    <>
      <div className="ed-course-intro container d-lg-flex mb-4 justify-content-between">
        <Link className="ed-zindex" href="/course">
          <div
            className="gallery flex-column"
            data-active-group={activeGroup}
            data-aos={aosValue}
            data-aos-delay={300}
          >
            <Image
              className="gallery_img-2x2 group-2"
              src="/course-gallery/3.jpg"
              alt="course-gallery"
              width={400}
              height={400}
            />
            <Image
              className="gallery_img-2x1 group-2"
              src="/course-gallery/11.jpg"
              alt="course-gallery"
              width={400}
              height={200}
            />
            <Image
              className="gallery_img-1x2 group-1"
              src="/course-gallery/1.jpg"
              alt="course-gallery"
              width={200}
              height={400}
            />

            <Image
              className="gallery_img-1x1 group-3"
              src="/course-gallery/4.jpg"
              alt="course-gallery"
              width={200}
              height={200}
            />
            <Image
              className="gallery_img-2x2 group-2"
              src="/course-gallery/10.jpg"
              alt="course-gallery"
              width={400}
              height={400}
            />
            <Image
              className="gallery_img-2x2 group-1"
              src="/course-gallery/9.jpg"
              alt="course-gallery"
              width={400}
              height={400}
            />
            <Image
              className="gallery_img-1x1 group-3"
              src="/course-gallery/15.jpg"
              alt="course-gallery"
              width={200}
              height={200}
            />
            <Image
              className="gallery_img-2x2 group-3"
              src="/course-gallery/8.jpg"
              alt="course-gallery"
              width={400}
              height={400}
            />
            <Image
              className="gallery_img-2x2 group-2"
              src="/course-gallery/12.jpg"
              alt="course-gallery"
              width={400}
              height={400}
            />
            <Image
              className="gallery_img-2x2 group-1"
              src="/course-gallery/13.jpg"
              alt="course-gallery"
              width={400}
              height={400}
            />

            <Image
              className="gallery_img-2x2 group-2"
              src="/course-gallery/7.jpg"
              alt="course-gallery"
              width={400}
              height={400}
            />
            <Image
              className="gallery_img-2x1 group-3"
              src="/course-gallery/14.jpg"
              alt="course-gallery"
              width={400}
              height={200}
            />
          </div>
        </Link>

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
            <div className="container d-flex flex-column px-4 px-lg-0">
              <div
                className="my-5 my-md-2 d-md-flex justify-content-center align-items-center"
                data-aos={aosValue}
                data-aos-delay={300}
              >
                <Link href="/course">
                  <button
                    id="btn1"
                    className="btn my-2 btn-color-1 me-md-3"
                    onMouseEnter={() => setActiveGroup('group1')}
                    onMouseLeave={() => setActiveGroup(null)}
                  >
                    拉花 <br /> 課程
                  </button>
                  <Image
                    className="ed-course-index"
                    src="/index-image/course01.png"
                    alt="拉花課程"
                    width={150}
                    height={150}
                    data-aos={aosValue}
                    data-aos-delay={300}
                  />
                </Link>
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
                data-aos={aosValue}
                data-aos-delay={600}
              >
                <Link href="/course">
                  <button
                    id="btn2"
                    className="btn my-2 btn-color-2 me-md-3"
                    onMouseEnter={() => setActiveGroup('group2')}
                    onMouseLeave={() => setActiveGroup(null)}
                  >
                    烘豆 <br /> 課程
                  </button>
                  <Image
                    className="ed-course-index"
                    src="/index-image/course02.png"
                    alt="烘豆課程"
                    width={150}
                    height={150}
                    data-aos={aosValue}
                    data-aos-delay={600}
                  />
                </Link>
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
                data-aos={aosValue}
                data-aos-delay={700}
              >
                <Link href="/course">
                  <button
                    id="btn3"
                    className="btn my-2 btn-color-3 me-md-3"
                    onMouseEnter={() => setActiveGroup('group3')}
                    onMouseLeave={() => setActiveGroup(null)}
                  >
                    手沖 <br /> 課程
                  </button>
                  <Image
                    className="ed-course-index"
                    src="/index-image/course03.png"
                    alt="手沖課程"
                    width={150}
                    height={150}
                    data-aos={aosValue}
                    data-aos-delay={700}
                  />
                </Link>

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
                data-aos-delay={750}
              >
                <img
                  className="arrow me-5 me-md-0"
                  src="/index-image/arrow.gif"
                  alt="arrow"
                />
                <Link
                  className="d-md-inline d-flex justify-content-center align-items-center ms-md-5 ms-0"
                  href="/course"
                >
                  <br />
                  <button className="btn my-2 btn-color-4 me-md-3">
                    進入課程
                  </button>
                  <h6 className="ed-h6-resize">
                    <span>學習如何烘豆和手沖，</span>
                    <br />
                    <span>決定自己的咖啡風味！</span>
                  </h6>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
