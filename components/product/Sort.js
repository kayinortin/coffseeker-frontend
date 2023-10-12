import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useProducts } from '@/context/product'

export default function Sort() {
  const router = useRouter()
  const { sortBy, setSortBy } = useProducts()
  const { cid } = router.query

  useEffect(() => {
    if (!router.query.sortBy) {
      setSortBy('default')
    }
  }, [router.query])

  const handleSortChange = (e) => {
    setSortBy(e.target.value)
    if (cid) {
      router.push(`/product/category/${cid}?sortBy=${e.target.value}`)
    } else {
      router.push(`/product?sortBy=${e.target.value}`)
    }
  }

  return (
    <div className="mt-2 mt-md-0">
      <select
        className="ed-select-control"
        name="form-select"
        value={sortBy}
        onChange={handleSortChange}
      >
        <option value="default" disabled>
          商品排序依...
        </option>
        <option value="New">最新上架</option>
        <option value="Popularity">熱賣商品</option>
        <option value="MostViews">最多人看</option>
        <option value="priceAsc">價格由低到高</option>
        <option value="priceDesc">價格由高到低</option>
      </select>
    </div>
  )
}
