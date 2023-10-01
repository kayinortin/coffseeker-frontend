import { useState, useEffect } from 'react'

function useSeasonIcon(monthIndex) {
  const monthlyData = [
    {
      titleMonth: 'January 一月',
      month: 'COFFSEEKER ‧ 一月',
      cover: 'http://localhost:3000/season/1.png',
      wrapper: 'http://localhost:3000/season/wrap1.png',
      otherCover: 'http://localhost:3000/season/1-sm.png',
      reveal: '東亞的神秘面紗',
      content:
        '新年新起點，用東亞日曬的果香喚醒你的感官，揭開全新的一年的序幕。',
    },
    {
      titleMonth: 'February 二月',
      month: 'COFFSEEKER ‧ 二月',
      cover: 'http://localhost:3000/season/2.png',
      wrapper: 'http://localhost:3000/season/wrap2.png',
      otherCover: 'http://localhost:3000/season/2-sm.png',
      reveal: '肯亞的一抹陽光',
      content: '冬天裡的一抹陽光，肯亞水洗豆的酸甜平衡，為你送上溫暖的擁抱。',
    },
    {
      titleMonth: 'March 三月',
      month: 'COFFSEEKER ‧ 三月',
      cover: 'http://localhost:3000/season/3.png',
      wrapper: 'http://localhost:3000/season/wrap3.png',
      otherCover: 'http://localhost:3000/season/3-sm.png',
      reveal: '會談蘇門答臘',
      content: '春風中帶著遠方的神秘，蘇門答臘的濕剝香氣，宛如森林中的探險。',
    },
    {
      titleMonth: 'April 四月',
      month: 'COFFSEEKER ‧ 四月',
      cover: 'http://localhost:3000/season/4.png',
      wrapper: 'http://localhost:3000/season/wrap4.png',
      otherCover: 'http://localhost:3000/season/4-sm.png',
      reveal: '盧安達的春光故事',
      content:
        '感受盧安達日曬的深沉與複雜，像春天的故事，層次豐富，待你慢慢品味。',
    },
    {
      titleMonth: 'May 五月',
      month: 'COFFSEEKER ‧ 五月',
      cover: 'http://localhost:3000/season/5.png',
      wrapper: 'http://localhost:3000/season/wrap5.png',
      otherCover: 'http://localhost:3000/season/5-sm.png',
      reveal: '哥倫比亞春末迎夏',
      content:
        '哥倫比亞的山谷、雨季和陽光，化作每粒水洗豆的醇香，伴你走過春末。',
    },
    {
      titleMonth: 'June 六月',
      month: 'COFFSEEKER ‧ 六月',
      cover: 'http://localhost:3000/season/6.png',
      wrapper: 'http://localhost:3000/season/wrap6.png',
      otherCover: 'http://localhost:3000/season/6-sm.png',
      reveal: '巴西夏日的午後狂歡',
      content: '攜巴西的濕剝風情，舞動夏日的狂歡，讓靈魂乘載南美的熱情活力。',
    },
    {
      titleMonth: 'July 七月',
      month: 'COFFSEEKER ‧ 七月',
      cover: 'http://localhost:3000/season/7.png',
      wrapper: 'http://localhost:3000/season/wrap7.png',
      otherCover: 'http://localhost:3000/season/7-sm.png',
      reveal: '坦尚尼亞日曬豆',
      content:
        '從乞力馬扎羅的山坡到你的杯中，坦尚尼亞日曬豆，細說著非洲的夏日傳說。',
    },
    {
      titleMonth: 'August 八月',
      month: 'COFFSEEKER ‧ 八月',
      cover: 'http://localhost:3000/season/8.png',
      wrapper: 'http://localhost:3000/season/wrap8.png',
      otherCover: 'http://localhost:3000/season/8-sm.png',
      reveal: '暢遊非洲的味蕾之旅',
      content:
        '品味布隆迪，就像一次水洗後的清晨沉思，寧靜、純淨，帶著自然的和諧。',
    },
    {
      titleMonth: 'September 九月',
      month: 'COFFSEEKER ‧ 九月',
      cover: 'http://localhost:3000/season/9.png',
      wrapper: 'http://localhost:3000/season/wrap9.png',
      otherCover: 'http://localhost:3000/season/9-sm.png',
      reveal: '秋風伴遊越南濕剝豆',
      content: '秋天的第一杯，越南濕剝豆帶著珍貴的回憶，溫暖你的每一個清晨。',
    },
    {
      titleMonth: 'October 十月',
      month: 'COFFSEEKER ‧ 十月',
      cover: 'http://localhost:3000/season/10.jpg',
      wrapper: 'http://localhost:3000/season/wrap10.png',
      otherCover: 'http://localhost:3000/season/10-sm.png',
      reveal: '金色秋葉尼加拉瓜',
      content: '尼加拉瓜的日照，猶如金色的秋葉，漫舞在十月的微風中，充滿詩意。',
    },
    {
      titleMonth: 'November 十一月',
      month: 'COFFSEEKER ‧ 十一月',
      cover: 'http://localhost:3000/season/11.png',
      otherCover: 'http://localhost:3000/season/11-sm.png',
      wrapper: 'http://localhost:3000/season/wrap11.png',
      reveal: '寶石水洗火山贈饋',
      content:
        '每顆寶石瓜地馬拉水洗豆，都是火山土壤深處的饋贈，濃烈與細緻組成的冬日暖意。',
    },
    {
      titleMonth: 'December 十二月',
      month: 'COFFSEEKER ‧ 十二月',
      cover: 'http://localhost:3000/season/12.png',
      otherCover: 'http://localhost:3000/season/12-sm.png',
      wrapper: 'http://localhost:3000/season/wrap12.png',
      reveal: '亙古的傳說告別歲末',
      content:
        '告別的十二月，以印度濕剝咖啡的特色和風味，為今年畫上完美的句號。',
    },
  ]
  // 首先，我们检查月份索引的有效性
  
  const [iconSrc, setIconSrc] = useState('http://localhost:3000/season/10.jpg')

  useEffect(() => {
    const mobileMatch = window.matchMedia('(max-width: 992px)')
    console.log(window.matchMedia('(max-width: 992px)').matches)

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
  }, [monthIndex]) // 我们将monthIndex添加为依赖项，这样如果它改变，我们的effect会重新运行

  return iconSrc
}

export default useSeasonIcon
