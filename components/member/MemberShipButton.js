import React from 'react'
import { SlUser } from 'react-icons/sl'

export default function MemberShipButton() {
  return (
    <>
      <div class="dropdown">
        <SlUser
          className={'dropdown-toggle'}
          data-bs-toggle="dropdown"
          aria-expanded="false"
          onClick={() => {
            console.log('測試')
          }}
        />

        <ul class="dropdown-menu">
          <li>
            <a class="dropdown-item" href="#">
              Action
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="#">
              Another action
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="#">
              Something else here
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}
