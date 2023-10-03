import React, { useState } from 'react'

export default function OrderBy({ onChange }) {
  const [sortBy, setSortBy] = useState('default')

  // 處理排序方式變更
  const handleSortChange = (event) => {
    const newSortBy = event.target.value
    setSortBy(newSortBy)
    onChange(newSortBy) // 將新的排序方式傳遞給父組件
  }

  return (
    <div>
      <label htmlFor="sortSelect">排序方式：</label>
      <select id="sortSelect" value={sortBy} onChange={handleSortChange}>
        <option value="default">預設排序</option>
        <option value="popular">最多人瀏覽</option>
        <option value="oldest">最舊</option>
      </select>
    </div>
  )
}
