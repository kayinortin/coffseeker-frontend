import { useRouter } from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import Head from 'next/head'
import style from '../../styles/_news.module.scss'

const NewsDetail = ({ news, error }) => {
  const router = useRouter()
  const contentWithLineBreaks =
    news && news.news_content ? news.news_content.replace(/\n/g, '<br>') : ''

  if (error) {
    return <div>{error}</div>
  }

  return (
    <>
      {/* 麵包屑 */}
      <div className="ei-row">
        <nav className="nav-breadcrumb me-4 d-none d-sm-block">
          <ol className="ei-breadcrumb m-3 list-inline">
            <div>
              <Head>
                <title>{`${news.news_title}｜探索咖啡COFFSEEKER`}</title>
              </Head>
            </div>
            <li className="breadcrumb-item list-inline-item">
              <Link href="/" className="link ">
                首頁
              </Link>
            </li>
            <li className="breadcrumb-item list-inline-item">
              <Link
                href="/news"
                className="breadcrumb-item text-decoration-none link ms-2 "
              >
                最新消息
              </Link>
            </li>
            <li className="breadcrumb-item list-inline-item">
              <a
                href={`/news/${router.query.nid}`}
                className="breadcrumb-item text-decoration-none link ms-2 "
              >
                {news?.news_title}
              </a>
            </li>
          </ol>
        </nav>
      </div>

      <div className="container ei-container-nid mb-4">
        <div className="news-deail mt-3">
          <h3 className="text-center mb-4 mobile-news-title lh-sm fs-3">
            {news?.news_title}
          </h3>
          <p className="mb-4 text-end me-3 ei-news-date">{news?.created_at}</p>
          <div className="d-flex justify-content-center">
            {news?.news_image ? (
              <img
                src={`http://localhost:3005/uploads/${news?.news_image}`}
                alt={news?.news_title}
                className="img-fluid mb-4"
              />
            ) : null}
          </div>
        </div>

        <p
          className="ei-letter-spacing lh-lg ms-2 mb-4"
          dangerouslySetInnerHTML={{ __html: contentWithLineBreaks }}
        ></p>
      </div>
    </>
  )
}

// 使用 getServerSideProps 從伺服器端獲取資料。可以確保在伺服器端和客戶端都可以存取資料，並在重新整理時資料不會消失。
export async function getServerSideProps(context) {
  const { params } = context
  const { nid } = params

  try {
    const response = await axios.get(`http://localhost:3005/api/news/${nid}`)
    if (response.data) {
      return {
        props: { news: response.data },
      }
    } else {
      return {
        props: { error: '無效的消息數據' },
      }
    }
  } catch (error) {
    return {
      props: { error: '資料獲取失敗，請重試。' },
    }
  }
}

export default NewsDetail
