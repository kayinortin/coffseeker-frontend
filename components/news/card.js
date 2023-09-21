// Card.js
import React, { useState } from 'react';
import styles from '../../styles/_news.module.scss';

export default function Card() {
  const initialNewsData = [
    {
      title: '九月滿千免運',
      content: '這是一篇關於九月滿千免運的精彩文章內容，這是一個非常值得期待的優惠活動，請繼續閱讀以了解更多詳情。',
      imageUrl:
        'https://www.zhanlu.com.tw/wp-content/uploads/2023/08/edc8ea4b3886052bd042929856e41fda.jpg',
      date: '2023-09-21',
    },
    {
      title: '標題2',
      content: '這是新聞2的內容。',
      imageUrl:
        'https://www.zhanlu.com.tw/wp-content/uploads/2023/06/eccbc87e4b5ce2fe28308fd9f2a7baf3-1.jpg',
      date: '2023-09-20',
    },
    {
      title: '標題3',
      content: '這是新聞3的內容。',
      imageUrl:
        'https://www.zhanlu.com.tw/wp-content/uploads/2023/06/1679091c5a880faf6fb5e6087eb1b2dc-1.jpg',
      date: '2023-09-19',
    },
    {
      title: '標題4',
      content: '這是新聞4的內容。',
      imageUrl:
        'https://www.zhanlu.com.tw/wp-content/uploads/2023/06/a87ff679a2f3e71d9181a67b7542122c-1.jpg',
      date: '2023-09-19',
    },
  ];

  const [newsData, setNewsData] = useState(initialNewsData);
  const [expandedCard, setExpandedCard] = useState(null);

  const handleCardClick = (index) => {
    if (expandedCard === index) {
      // 如果點擊已經展開的卡片，則關閉它
      setExpandedCard(null);
      setNewsData(initialNewsData);
    } else {
      //被點選的卡片移到陣列的最前面
      const newNewsData = [...newsData];
      const clickedCard = newNewsData.splice(index, 1)[0];
      newNewsData.unshift(clickedCard);
      setExpandedCard(0); // 設定展開的卡片索引為第一個
      setNewsData(newNewsData); // 更新 newsData 狀態
    }
  };

  const scrollToExpandedCard = () => {
    if (expandedCard !== null) {
      // 使用展開的卡片索引來滾動到展開的卡片
      const card = document.querySelector(`#card-${expandedCard}`);
      if (card) {
        card.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="card-container">
      {newsData.map((news, index) => (
        <div
          key={index}
          className={`${styles.card} ${expandedCard === index ? styles['expanded-card'] : ''}`}
          onClick={() => handleCardClick(index)}
          id={`card-${index}`} // 給每個卡片一個唯一的ID
        >
          <img
            src={news.imageUrl}
            className="card-img-top img-fluid custom-image"
            alt="..."
          />
          <div className="card-body text-left">
            <p className="create-at my-2">{news.date}</p>
            <h5 className="card-title fw-bold">{news.title}</h5>
            {expandedCard === index && (
              <p className="card-text">{news.content}</p>
            )}
          </div>
        </div>
      ))}
      {scrollToExpandedCard()}
    </div>
  );
}
