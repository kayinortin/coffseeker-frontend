import { useEffect } from 'react'
import axios from 'axios'
import { useProducts } from '@/context/product'

export default function ProductDataFetcher() {
  const { setProductsData } = useProducts()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await axios.get(
          'http://localhost:3005/api/products'
        )
        const products = productResponse.data.products
        setProductsData(products)
      } catch (error) {
        console.error('資料獲取失敗:', error)
      }
    }
    fetchData()
  }, [])

  return null
}
