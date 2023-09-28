import React from 'react'
import style from '@/styles/_course.module.scss'

export default function Pagination() {
  const pages = ['1', '2', '3', '4', '5']
  return (
    <div className="d-flex justify-content-center col-sm-12 col-4">
      <nav aria-label="Page navigation example ">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {pages.map((v, i) => {
            return (
              <li className="page-item" key={i}>
                <a className="page-link" href="#">
                  {v}
                </a>
              </li>
            )
          })}

          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}
