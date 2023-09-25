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
    <section className="background">
      <div className="container ei-container-nid">
        {/* 麵包屑 */}
        <div className="row ms-4 mt-1 mt-3">
          <nav className="nav-breadcrumb ms-4 d-none d-sm-block ">
            <ol className="ei-breadcrumb m-3 list-inline">
              <li className="breadcrumb-item list-inline-item">
                <Link href="/" className="link">
                  首頁
                </Link>
              </li>
              <li className="breadcrumb-item list-inline-item">
                <Link
                  href="/news"
                  className="breadcrumb-item text-decoration-none link ms-2"
                >
                  最新消息
                </Link>
              </li>
              <li className="breadcrumb-item list-inline-item">
                <Link
                  href="/news"
                  className="breadcrumb-item text-decoration-none link ms-2"
                >
                  {selectedNews.title}
                </Link>
              </li>
            </ol>
          </nav>
        </div>
        <div className="news-detail mt-3">
          <h3 className="text-center mb-4 mobile-news-title lh-sm">{selectedNews.title}</h3>
          <p className="mb-4 text-end me-3 ei-news-date ">
            發佈日期: {selectedNews.date}
          </p>
          <div className="d-flex justify-content-center">
            <img
              src={selectedNews.imageUrl}
              alt=""
              className="img-fluid mb-3"
            />
          </div>
          <p className="ei-letter-spacing lh-base mb-3 ms-2">
            {selectedNews.content}
          </p>
        </div>
      </div>
    </section>
  )
}
