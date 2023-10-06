import React from 'react'

function Pagination({ totalPages, currentPage, onPageChange }) {
  const renderPageButtons = () => {
    const pageButtons = []
    for (let i = 1; i <= totalPages; i++) {
      pageButtons.push(
        <li
          key={i}
          className={i === currentPage ? 'page-item active' : 'page-item'}
        >
          <a
            href={`http://localhost:3000/news?page=${i}`}
            className="page-link"
            onClick={(e) => {
              e.preventDefault() // 防止默認行為
              onPageChange(i)
              // 滾動到頁面頂部
              window.scrollTo(0, 0)
            }}
          >
            {i}
          </a>
        </li>
      )
    }
    return pageButtons
  }

  return (
    <div className="ei-pagination-container mb-3">
      <ul className="ei-pagination">
        <li className={currentPage === 1 ? 'page-item disabled' : 'page-item'}>
          <a
            href="#"
            className="page-link"
            onClick={(e) => {
              e.preventDefault() // 防止默認行為
              onPageChange(currentPage - 1)
              // 滾動到頁面頂部
              window.scrollTo(0, 0)
            }}
          >
            &laquo;
          </a>
        </li>
        {renderPageButtons()}
        <li
          className={
            currentPage === totalPages ? 'page-item disabled' : 'page-item'
          }
        >
          <a
            href="#"
            className="page-link"
            onClick={(e) => {
              e.preventDefault() // 防止默認行為
              onPageChange(currentPage + 1)
              // 滾動到頁面頂部
              window.scrollTo(0, 0)
            }}
          >
            &raquo;
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Pagination
