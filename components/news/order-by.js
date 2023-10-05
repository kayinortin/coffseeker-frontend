import React, { useState } from 'react'

export default function OrderBy({ onChange, onSort }) {
  const [sortBy, setSortBy] = useState('default')

  // 處理排序方式變更
  const handleSortChange = (event) => {
    const newSortBy = event.target.value
    setSortBy(newSortBy)
    onChange(newSortBy) // 將新的排序方式傳遞給父組件
    // 調用外部的排序函數
    if (newSortBy === 'popular') {
      onSort((a, b) => b.views - a.views) // 按最多人瀏覽排序
    } else if (newSortBy === 'oldest') {
      onSort((a, b) => new Date(a.created_at) - new Date(b.created_at)) // 按日期排序
    }
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
