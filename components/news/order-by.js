import React, { useState } from 'react'

const OrderBy = ({ onChange }) => {
  const [newSortBy, setNewSortBy] = useState('default')

  const handleSortChange = (e) => {
    const selectedSort = e.target.value
    setNewSortBy(selectedSort)
    // 將選擇的排序方式傳遞給父組件的 onChange 函數
    onChange(selectedSort)
  }

  return (
    <div className="dropdown">
      <select
        className="form-select"
        onChange={handleSortChange}
        value={newSortBy}
      >
        <option value="default">最新</option>
        <option value="popular">最熱門</option>
        <option value="oldest">最舊</option>
      </select>
    </div>
  )
}

export default OrderBy
