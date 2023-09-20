import { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'

function ProductsList() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3005/api/products')
        console.log(response.data)
        setData(response.data)
      } catch (error) {
        console.error('資料獲取失敗:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="container mt-2">
      {data && data.products && data.products.length > 0 ? (
        <div>
          <h3>產品列表 (抓資料庫測試) 共有 {data.products.length} 筆資料</h3>
          <div className="row">
            {data.products.map((product) => (
              <div className="col-md-4 mb-4" key={product.product_id}>
                <div className="card">
                  <Image
                    src={`http://localhost:3005/uploads/${product.product_image}`}
                    alt={product.product_name}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.product_name}</h5>
                    <p className="card-text">品牌：{product.product_brand}</p>
                    <p className="card-text">
                      類別：{product.product_category}
                    </p>
                    <p className="card-text">數量：{product.product_amount}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>目前沒有可用的產品。</p>
      )}
    </div>
  )
}

export default ProductsList
