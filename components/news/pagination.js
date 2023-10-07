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
          <button
            className="page-link"
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
    return pageButtons
  }

  const handlePageChange = (page) => {
    console.log('Page changed to:', page)
    onPageChange(page) // 記得設置 currentPage 狀態
    // 滾動到頁面頂部
    window.scrollTo(0, 0)
  }

  return (
    <div className="ei-pagination-container mb-3">
      <ul className="ei-pagination">
        <li className={currentPage === 1 ? 'page-item disabled' : 'page-item'}>
          <button
            className="page-link"
            onClick={() => {
              handlePageChange(currentPage - 1)
            }}
          >
            &laquo;
          </button>
        </li>
        {renderPageButtons()}
        <li
          className={
            currentPage === totalPages ? 'page-item disabled' : 'page-item'
          }
        >
          <button
            className="page-link"
            onClick={() => {
              handlePageChange(currentPage + 1)
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
