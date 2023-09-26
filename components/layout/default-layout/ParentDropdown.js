import React, { useState } from 'react'
import Navbar from './navbar'
import Header from './header'

export default function ParentComponent() {
  const [activeDropdown, setActiveDropdown] = useState('none')

  const toggleDropdownUser = () => {
    setActiveDropdown(activeDropdown === 'user' ? 'none' : 'user')
  }

  const toggleDropdown = () => {
    setActiveDropdown(activeDropdown === 'navbar' ? 'none' : 'navbar')
  }

  return (
    <>
      <Header
        isOpen={activeDropdown === 'user'}
        toggleDrop={toggleDropdownUser}
        currentDropdown={activeDropdown}
      />
      <Navbar
        isOpen={activeDropdown === 'navbar'}
        toggleDrop={toggleDropdown}
        currentDropdown={activeDropdown}
      />
    </>
  )
}
