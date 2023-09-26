import { useState } from 'react'
import Dropdown from '../default-layout/dropdown'
import DropdownUser from '../default-layout/dropdown-user'
import Data from '@/data/dropdown/menuItems.json'
import DataUser from '@/data/dropdown/admin.json'

export default function ParentComponent() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [dropdownUserOpen, setDropdownUserOpen] = useState(false)

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev)
    setDropdownUserOpen(false)
  }

  const toggleDropdownUser = () => {
    setDropdownUserOpen((prev) => !prev)
    setDropdownOpen(false)
  }

  return (
    <>
      <Dropdown
        items={Data}
        isOpen={dropdownOpen}
        toggleDropdown={toggleDropdown}
      />
      <DropdownUser
        items={DataUser}
        isOpen={dropdownUserOpen}
        toggleDropdown={toggleDropdownUser}
      />
    </>
  )
}
