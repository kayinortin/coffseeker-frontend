import React from 'react'

function Pagination({ totalPages, currentPage, onPageChange }) {
  const maxVisiblePages = 5 // 設定最大可見頁數
  const pageButtons = []

  // 計算起始頁碼和結束頁碼
  let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1)
  let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages)

  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(endPage - maxVisiblePages + 1, 1)
  }

  // 組合頁數按鈕
  for (let i = startPage; i <= endPage; i++) {
    pageButtons.push(
      <li
        key={i}
        className={i === currentPage ? 'ei-page-item active' : 'ei-page-item'}
      >
        <button
          className="ei-page-link"
          onClick={() => {
            onPageChange(i)
            // 滾動到頁面頂部
            window.scrollTo(0, 0)
          }}
        >
          {i}
        </button>
      </li>
    )
  }

  return (
    <div className="ei-pagination-container mb-3">
      <ul className="ei-pagination">
        <li
          className={
            currentPage === 1 ? 'ei-page-item disabled' : 'ei-page-item'
          }
        >
          <button
            className="ei-page-link"
            onClick={() => {
              onPageChange(currentPage - 1)
            }}
          >
            &laquo;
          </button>
        </li>
        {pageButtons}
        <li
          className={
            currentPage === totalPages
              ? 'ei-page-item disabled'
              : 'ei-page-item'
          }
        >
          <button
            className="ei-page-link"
            onClick={() => {
              onPageChange(currentPage + 1)
            }}
          >
            &raquo;
          </button>
        </li>
      </ul>
    </div>
  )
}

export default Pagination
