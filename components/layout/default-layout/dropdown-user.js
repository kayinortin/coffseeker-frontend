import React, { useState } from 'react'
import { useRouter } from 'next/router'

export default function Dropdown({ items }) {
  const router = useRouter()
  const currentRoute = router.pathname
  //   console.log(currentRoute)

  const [dropdownUserOpen, setDropdownUserOpen] = useState(false)
  const toggleDropdown = () => {
    setDropdownUserOpen(!dropdownUserOpen)
  }

  const children = items[0].children

  return (
    <>
      <ul className="ed-reset slideIn">
        {children.map((v) => {
          return (
            <li key={v.id}>
              <a
                className={`dropdown-item ${
                  currentRoute === v.href ? 'active' : ''
                }`}
                href={v.href}
                onClick={toggleDropdown}
              >
                {v.label}
              </a>
            </li>
          )
        })}
      </ul>
    </>
  )
}
