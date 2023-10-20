import { useState, useEffect, useRef } from 'react'
import useTextAnimation from '@/hooks/useTextAnimation'
import { FaCircleRight } from 'react-icons/fa6'
import { FaCircleLeft } from 'react-icons/fa6'
import useSeasonIcon from '@/hooks/useSeasonIcon'
import AOS from 'aos'

export default function Explore() {
  const monthlyData = [
    {
      titleMonth: 'January 一月',
      month: 'COFFSEEKER ‧ 一月',
      cover: '/season/1.png',
      wrapper: '/season/wrap1.png',
      otherCover: '/season/1-sm.png',
      reveal: '神秘面紗 ． 日曬',
      content:
        '新年新起點，用東亞日曬的果香，喚醒你的感官，揭開全新的一年的序幕。',
    },
    {
      titleMonth: 'February 二月',
      month: 'COFFSEEKER ‧ 二月',
      cover: '/season/2.png',
      wrapper: '/season/wrap2.png',
      otherCover: '/season/2-sm.png',
      reveal: '一抹陽光 ． 水洗',
      content:
        '冬日的霜冷和沉寂，在肯亞水洗豆的酸甜平衡中融化，陽光穿透雲層，為你送上溫暖的擁抱。',
    },
    {
      titleMonth: 'March 三月',
      month: 'COFFSEEKER ‧ 三月',
      cover: '/season/3.png',
      wrapper: '/season/wrap3.png',
      otherCover: '/season/3-sm.png',
      reveal: '會談雨林 ． 濕剝',
      content:
        '春風中帶著東方的神秘，蘇門答臘的濕剝香氣，深入翠綠的熱帶雨林，探索大自然的奧秘。',
    },
    {
      titleMonth: 'April 四月',
      month: 'COFFSEEKER ‧ 四月',
      cover: '/season/4.png',
      wrapper: '/season/wrap4.png',
      otherCover: '/season/4-sm.png',
      reveal: '春光故事 ． 日曬',
      content:
        '感受盧安達日曬的深邃香味，如同春天的故事，層次豐富，引導你慢慢沉浸品味。',
    },
    {
      titleMonth: 'May 五月',
      month: 'COFFSEEKER ‧ 五月',
      cover: '/season/5.png',
      wrapper: '/season/wrap5.png',
      otherCover: '/season/5-sm.png',
      reveal: '春末細雨 ． 水洗',
      content:
        '哥倫比亞的山谷、雨季和陽光，化作每粒水洗豆的醇香，伴你走過春末。',
    },
    {
      titleMonth: 'June 六月',
      month: 'COFFSEEKER ‧ 六月',
      cover: '/season/6.png',
      wrapper: '/season/wrap6.png',
      otherCover: '/season/6-sm.png',
      reveal: '激情南美 ． 濕剝',
      content:
        '舞動夏日的狂歡，隨著巴西的濕剝咖啡而起，激情四溢的南美，讓靈魂乘載異國的熱情活力。',
    },
    {
      titleMonth: 'July 七月',
      month: 'COFFSEEKER ‧ 七月',
      cover: '/season/7.png',
      wrapper: '/season/wrap7.png',
      otherCover: '/season/7-sm.png',
      reveal: '坦尚尼亞 ． 日曬',
      content:
        '從乞力馬扎羅的山坡，匯聚非洲的陽光與風情，流入你的杯中，坦尚尼亞日曬豆。',
    },
    {
      titleMonth: 'August 八月',
      month: 'COFFSEEKER ‧ 八月',
      cover: '/season/8.png',
      wrapper: '/season/wrap8.png',
      otherCover: '/season/8-sm.png',
      reveal: '非洲心臟 ． 水洗',
      content:
        '品味布隆迪，就像一次水洗後的清晨沉思，寧靜、純淨，非洲心臟的祕密花園，帶著自然的和諧。',
    },
    {
      titleMonth: 'September 九月',
      month: 'COFFSEEKER ‧ 九月',
      cover: '/season/9.png',
      wrapper: '/season/wrap9.png',
      otherCover: '/season/9-sm.png',
      reveal: '秋意飄揚 ． 濕剝',
      content:
        '秋意初露，越南濕剝豆重溫每個美好時刻，甜美的香氣，溫暖你每一個清晨。',
    },
    {
      titleMonth: 'October 十月',
      month: 'COFFSEEKER ‧ 十月',
      cover: '/season/10.jpg',
      wrapper: '/season/wrap10.png',
      otherCover: '/season/10-sm.png',
      reveal: '金色秋葉 ． 日照',
      content: '尼加拉瓜的日照，猶如金色的秋葉，漫舞在十月的微風中，充滿詩意。',
    },
    {
      titleMonth: 'November 十一月',
      month: 'COFFSEEKER ‧ 十一月',
      cover: '/season/11.png',
      otherCover: '/season/11-sm.png',
      wrapper: '/season/wrap11.png',
      reveal: '火山贈饋 ． 水洗',
      content:
        '每顆寶石瓜地馬拉水洗豆，都是火山土壤深處的饋贈，濃烈與細緻組成的冬日暖意，注入熾熱的暖意。',
    },
    {
      titleMonth: 'December 十二月',
      month: 'COFFSEEKER ‧ 十二月',
      cover: '/season/12.png',
      otherCover: '/season/12-sm.png',
      wrapper: '/season/wrap12.png',
      reveal: '印度亙古 ． 歲末',
      content:
        '年末的寂靜，印度濕剝譜出悠揚樂曲，回響在心中，為歲末帶來完美與期盼。',
    },
  ]

  const [showTimeline, setShowTimeline] = useState(false)
  const [currenttitleMonth, setCurrenttitleMonth] = useState('January 一月')
  const [currentCoverDescription, setCurrentCoverDescription] =
    useState('COFFSEEKER ‧ 十月')

  const [currentCover, setCurrentCover] = useState('金色秋葉 ． 日照')
  const [currentContent, setCurrentContent] = useState(
    '尼加拉瓜的日照，猶如金色的秋葉，漫舞在十月的微風中，充滿詩意。'
  )
  const [currentImage, setCurrentImage] = useState('/season/10.jpg')
  const [monthIndex, setMonthIndex] = useState(9)

  const handleMonthClick = (data) => {
    const index = monthlyData.findIndex(
      (item) => item.titleMonth === data.titleMonth
    )
    setMonthIndex(index)
    setCurrentCoverDescription(data.month)
    setCurrentCover(data.reveal)
    setCurrentContent(data.content)
    setCurrentImage(data.cover)
    setShowTimeline(false)
    setShowSeasonWrap(false)

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    AOS.init({
      duration: 1000,
    })
  }, [])

  const textRef1 = useRef(null)
  const textRef2 = useRef(null)
  const textRef3 = useRef(null)
  const textRef4 = useRef(null)
  const textRef5 = useRef(null)
  const textRef6 = useRef(null)

  useTextAnimation(textRef1, currentCoverDescription, 'fadeInUp')
  useTextAnimation(textRef2, currentCover, 'fadeInUp')
  useTextAnimation(textRef3, currentContent, 'fadeInUp')
  useTextAnimation(textRef4, '', 'fadeInRight')
  useTextAnimation(textRef5, '', 'fadeInUp')
  useTextAnimation(textRef6, currentContent, 'fadeInUp')

  const [showSeasonWrap, setShowSeasonWrap] = useState(false)

  const handleClick = () => {
    setShowSeasonWrap(!showSeasonWrap)
    setShowTimeline(!showTimeline)
  }

  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [progress, setProgress] = useState(3)

  const startDragging = (e) => {
    setIsDragging(true)
    setStartX(e.pageX - e.currentTarget.offsetLeft)
    setScrollLeft(e.currentTarget.scrollLeft)
  }

  const stopDragging = () => {
    setIsDragging(false)
  }

  // 使滾輪無法上下滾動
  useEffect(() => {
    const handleWheelScroll = (e) => {
      if (showSeasonWrap && e.deltaY !== 0) {
        e.preventDefault()
        const container = e.currentTarget
        container.scrollLeft += e.deltaY
      }
    }

    document.addEventListener('wheel', handleWheelScroll, { passive: false })

    const scrollableContainer = document.querySelector('.season-wrap')

    if (scrollableContainer) {
      scrollableContainer.addEventListener('wheel', handleWheelScroll)
    }

    return () => {
      document.removeEventListener('wheel', handleWheelScroll)
      if (scrollableContainer) {
        scrollableContainer.removeEventListener('wheel', handleWheelScroll)
      }
    }
  }, [showSeasonWrap])

  const isMobile = () => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(max-width: 768px)').matches
    }
    return false
  }

  const whileDragging = (e) => {
    if (!isDragging) return
    if (!isMobile()) {
      e.preventDefault()
    }

    const x = e.pageX - e.currentTarget.offsetLeft
    const walk = x - startX
    const newScrollLeft = scrollLeft - walk
    e.currentTarget.scrollLeft = newScrollLeft

    const totalWidth = e.currentTarget.scrollWidth - e.currentTarget.clientWidth
    const currentProgress = (newScrollLeft / (totalWidth + 700)) * 100

    setProgress(currentProgress)
  }
  const handleWheel = (e) => {
    if (showSeasonWrap && e.deltaY !== 0) {
      const container = e.currentTarget
      container.scrollLeft += e.deltaY

      const totalWidth = container.scrollWidth - container.clientWidth
      const currentProgress = (container.scrollLeft / (totalWidth + 300)) * 100

      setProgress(currentProgress)
    }
  }

  const iconSrc = useSeasonIcon(monthIndex)

  return (
    <>
      {/* 時令咖啡 */}
      <div>
        <button className="timeline-btn" onClick={handleClick}>
          {showTimeline ? (
            <FaCircleLeft className="ed-icon d-none d-lg-block" />
          ) : (
            <FaCircleRight className="ed-icon d-none d-lg-block" />
          )}
          {showTimeline ? '歸途' : '探索'}
        </button>
      </div>
      {/* 展開側邊欄 */}
      <div
        className={`season-wrap ${showSeasonWrap ? 'expanded' : ''}`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            startDragging(e)
          }
        }}
        onMouseDown={startDragging}
        onMouseLeave={stopDragging}
        onMouseUp={stopDragging}
        onMouseMove={whileDragging}
        onTouchStart={startDragging}
        onTouchEnd={stopDragging}
        onTouchMove={whileDragging}
        onWheel={handleWheel}
      >
        {showSeasonWrap && (
          <div className="overscroll">
            <div className="h-full fixed d-lg-flex d-block">
              <div className="d-flex h-full flex-col">
                <div className="scroll-progress d-none d-lg-block">
                  <div className="progress-bar">
                    <div
                      className="progress-index"
                      style={{ left: `${progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="season-content grow">
                  <div className="season-list d-flex">
                    {monthlyData.map((data, index) => (
                      <div className="season-list d-flex" key={index}>
                        <div className="season-item">
                          <div className="season-timeline">
                            <span className="bar" ref={textRef4}></span>
                            <h6 className="bar-month">
                              <span>{data.titleMonth}</span>
                            </h6>
                            <span className="bar"></span>
                          </div>
                          <div className="ed-season-btn">
                            <h4>
                              <span ref={textRef5}>{data.reveal}</span>
                            </h4>
                            <div className="ed-wrapper-content">
                              {data.content}
                            </div>

                            <button
                              className="btn btn-image"
                              onClick={() => handleMonthClick(data)}
                            >
                              <img src={data.wrapper} alt="season-icon" />
                            </button>
                          </div>
                        </div>
                        <div className="divider d-flex flex-col">
                          <div className="season-timeline d-flex">
                            <div className="linebar d-none d-lg-block"></div>
                          </div>
                          <div className="divider-line d-flex"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 首頁 */}
      <div className="ed-container">
        <div className="ed-content">
          <div className="d-flex justify-content-between pad-portrait sm-pt-0">
            <div className="ed-left-content">
              <div className="ed-index-head">
                <span className="ed-index-name" ref={textRef1}>
                  {currentCoverDescription}
                </span>
                <h2>
                  <div className="text-reveal whitespace-nowrap">
                    <span ref={textRef2}>{currentCover}</span>
                  </div>
                  <div className="line-reveal"></div>
                </h2>
              </div>
              <p id="ed-index-description" className="ed-index-descriptions">
                <span ref={textRef3}>{currentContent}</span>
              </p>
              <div className="scroll-tips">
                <span className="dot"></span>
                <span className="text">scroll</span>
                <div className="line-container">
                  <span className="line"></span>
                  <span className="shadow-line"></span>
                </div>
                <img
                  className="bg-opacity"
                  data-aos="fade-left"
                  src="/bg-3-ro.png"
                  alt="coffseeker"
                />
              </div>
            </div>
            <div className="ed-right-content">
              <div className="ed-index-img">
                <img
                  className="ed-position"
                  data-aos="fade-down"
                  src="/season/border.png"
                  alt=""
                />
                <div className="arched-image">
                  <div>
                    <img data-aos="fade-up" src={iconSrc} alt="index-cover" />
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
