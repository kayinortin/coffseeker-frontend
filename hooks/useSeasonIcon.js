import { useState, useEffect } from 'react'

function useSeasonIcon(monthIndex) {
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

  const [iconSrc, setIconSrc] = useState('/season/10.jpg')

  useEffect(() => {
    const mobileMatch = window.matchMedia('(max-width: 992px)')

    function handleDeviceChange(e) {
      if (e.matches) {
        setIconSrc(monthlyData[monthIndex].otherCover)
      } else {
        setIconSrc(monthlyData[monthIndex].cover)
      }
    }

    mobileMatch.addListener(handleDeviceChange)
    handleDeviceChange(mobileMatch)

    return () => {
      mobileMatch.removeListener(handleDeviceChange)
    }
  }, [monthIndex])

  return iconSrc
}

export default useSeasonIcon
