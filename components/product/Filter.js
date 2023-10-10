import { useState } from 'react'
import axios from 'axios'

function Filter(props) {
  const [products, setProducts] = useState([])
  const [filterForm, setFilterForm] = useState({
    origin: [], // 增加產區選項
    Roast_degree: '', // 增加烘焙程度選項
  })

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    let queryString = `http://localhost:3005/api/products/qs?`
    if (filterForm.origin.length) {
      queryString += `origin=${filterForm.origin.join(',')}&`
    }
    if (filterForm.Roast_degree) {
      queryString += `Roast_degree=${filterForm.Roast_degree}`
    }

    try {
      const response = await axios.get(queryString)
      props.onFilter(response.data.data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleFieldChange = (e) => {
    const { name, value } = e.target
    setFilterForm((prevState) => ({
      ...prevState,
      [name]: name === 'origin' ? prevState.origin.concat(value) : value,
    }))
  }

  const resetFilter = async () => {
    setFilterForm({
      origin: [],
      Roast_degree: '',
    })

    try {
      const response = await axios.get('http://localhost:3005/api/products/qs')
      props.onFilter(response.data.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        {/* 這裡可以添加其他篩選條件 */}

        {/* 烘焙程度 */}
        <label>
          烘焙程度：
          <select name="Roast_degree" onChange={handleFieldChange}>
            <option value="">選擇烘焙程度</option>
            <option value="淺烘焙">淺烘焙</option>
            <option value="中淺焙">中淺焙</option>
            <option value="中焙">中焙</option>
            <option value="中深焙">中深焙</option>
            <option value="深焙">深焙</option>
          </select>
        </label>

        {/* 產區 */}
        <fieldset>
          <legend>產區:</legend>
          <label>
            <input
              type="checkbox"
              name="origin"
              value="哥倫比亞"
              onChange={handleFieldChange}
            />
            哥倫比亞
          </label>
          {/* 這裡可以繼續添加其他產區選項 */}
        </fieldset>

        <button type="submit">篩選</button>
        <button type="button" onClick={resetFilter}>
          清除篩選
        </button>
      </form>
    </div>
  )
}

export default Filter
