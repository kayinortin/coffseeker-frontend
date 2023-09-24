import { useRouter } from 'next/router'
import Link from 'next/link'
import newsData from '../../data/news/news.json'
import style from '../../styles/_news.module.scss'

export default function NewsDetail() {
  const router = useRouter()
  const { nid } = router.query

  const selectedNews = newsData.find((news) => news.id === parseInt(nid))

  if (!selectedNews) {
    return <p>找不到該新聞</p>
  }

  return (
    <div className="container">
      {/* 麵包屑*/}
      <div className="row ms-4 mt-1">
        <nav className="nav-breadcrumb ms-3">
          <ol className="breadcrumb m-3 ">
            <li className="breadcrumb-item">
              <Link href="/" className="link">
                首頁
              </Link>
            </li>
            <Link
              href="/news"
              className="breadcrumb-item text-decoration-none link"
            >
              最新消息
            </Link>
            <Link
              href="#"
              className="breadcrumb-item text-decoration-none link"
            >
              {selectedNews.title}
            </Link>
          </ol>
        </nav>
      </div>
      <div className="news-detail">
        <h3 className="text-center mb-4">{selectedNews.title}</h3>
        <p className="mb-4 text-end me-3 ei-news-date ">
          發佈日期: {selectedNews.date}
        </p>
        <div className="d-flex justify-content-center">
          <img src={selectedNews.imageUrl} alt="" className="img-fluid mb-3" />
        </div>

        <p className="ei-letter-spacing lh-base mb-3 ms-2">{selectedNews.content}</p>
      </div>
    </div>
  )
}
