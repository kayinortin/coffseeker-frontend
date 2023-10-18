import React from 'react'
import Slider from 'react-slick'

export default function Movein() {
  // 幻燈片設定
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
  }
  return (
    <>
      <div>
        <Slider {...settings}>
          <div>
            <img
              id="s1"
              src="/index-image/s1.jpg"
              alt="Slide 1"
            />
          </div>
          <div>
            <img
              id="s2"
              src="/index-image/s2.png"
              alt="Slide 2"
            />
          </div>
          <div>
            <img
              id="s3"
              src="/index-image/s3.png"
              alt="Slide 3"
            />
          </div>
          <div>
            <img
              id="s4"
              src="/index-image/s4.png"
              alt="Slide 4"
            />
          </div>
          <div>
            <img
              id="s5"
              src="/index-image/s5.png"
              alt="Slide 5"
            />
          </div>
          <div>
            <img
              id="s6"
              src="/index-image/s6.png"
              alt="Slide 6"
            />
          </div>
        </Slider>
      </div>
    </>
  )
}
