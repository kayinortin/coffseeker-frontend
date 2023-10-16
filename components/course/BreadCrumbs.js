import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from '@/styles/_breadcrumb.module.scss'

const BreadCrumbs = ({
  omitRoot = false,
  homeIcon = <i className="bi bi-house-door-fill"></i>,
  isHomeIcon = false,
  isChevron = false,
  name,
}) => {
  const router = useRouter()
  const { isReady, asPath } = router
  const { pid } = router.query
  

  const [showChild, setShowChild] = useState(false)
  const [pathSegments, setPathSegments] = useState([])

  useEffect(() => {
    setShowChild(true)

    // 解析 URL 的路徑段落
    if (isReady) {
      const segments = asPath.split('/').filter((segment) => !!segment)
      setPathSegments(segments)
    }
  }, [isReady, asPath])

  return (
    <>
      <nav aria-label="breadcrumb ed-detail-brand">
        <ol
          className={`breadcrumb px-3 py-1  rounded-3 ${
            isChevron ? styles['breadcrumb-chevron'] : ''
          }`}
        >
          {!omitRoot && (
            <li
              className={`breadcrumb-item ${
                isChevron ? styles['breadcrumb-item'] : ''
              }`}
            >
              <Link
                href="/"
                className="link-body-emphasis fw-semibold text-decoration-none"
              >
                {!isHomeIcon ? '首頁' : homeIcon}
              </Link>
            </li>
          )}
          {showChild &&
            (pathSegments[0] === 'course' ? (
              <li className="breadcrumb-item active" aria-current="page">
                <Link
                  href="/course"
                  className="link-body-emphasis fw-semibold text-decoration-none"
                >
                  課程列表
                </Link>
              </li>
            ) : (
              ''
            ))}
          {pid === 'undefined' ? (
            ''
          ) : (
            <li className="breadcrumb-item active" aria-current="page">
              {pid}
            </li>
          )}
        </ol>
      </nav>
    </>
  )
}

const BreadCrumbsMobile = (
  omitRoot = false,
  homeIcon = <i className="bi bi-house-door-fill"></i>,
  isHomeIcon = false,
  isChevron = false
) => {
  const router = useRouter()
  const { isReady, asPath } = router
  const { pid } = router.query

  const [showChild, setShowChild] = useState(false)
  const [pathSegments, setPathSegments] = useState([])

  useEffect(() => {
    setShowChild(true)

    // 解析 URL 的路徑段落
    if (isReady) {
      const segments = asPath.split('/').filter((segment) => !!segment)
      setPathSegments(segments)
    }
  }, [isReady, asPath])
  return (
    <>
      <nav aria-label="breadcrumb d-sm-none">
        <ol
          className={`breadcrumb px-3 py-1 rounded-3 ${
            isChevron ? styles['breadcrumb-chevron'] : ''
          }`}
        >
          {!omitRoot && (
            <li
              className={`breadcrumb-item ${
                isChevron ? styles['breadcrumb-item'] : ''
              }`}
            >
              <Link
                href="/"
                className="link-body-emphasis fw-semibold text-decoration-none"
              >
                {!isHomeIcon ? '首頁' : homeIcon}
              </Link>
            </li>
          )}
          {showChild &&
            (pathSegments[0] === 'course' ? (
              <li className="breadcrumb-item active" aria-current="page">
                <Link
                  href="/course"
                  className="link-body-emphasis fw-semibold text-decoration-none"
                >
                  課程列表
                </Link>
              </li>
            ) : (
              ''
            ))}
          {pid === 'undefined' ? (
            ''
          ) : (
            <li className="breadcrumb-item active" aria-current="page">
              {pid}
            </li>
          )}
        </ol>
      </nav>
    </>
  )
}

export { BreadCrumbs, BreadCrumbsMobile }
