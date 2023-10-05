import React from 'react'
import '../../styles/_news.module.scss'

function Pagination() {
  return (
    <div className="ei-pagination-container mb-3">
      <ul className="ei-pagination">
        <li className="page-item">
          <a href="#" className="page-link">
            &laquo;
          </a>
        </li>
        <li className="page-item">
          <a href="#" className="page-link">
            1
          </a>
        </li>
        <li className="page-item">
          <a href="#" className="page-link">
            2
          </a>
        </li>
        <li className="page-item">
          <a href="#" className="page-link">
            3
          </a>
        </li>
        <li className="page-item">
          <a href="#" className="page-link">
            4
          </a>
        </li>
        <li className="page-item disabled">
          <a href="#" className="page-link">
            &raquo;
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Pagination
