import { useEffect, useState } from 'react'
import axios from 'axios'
<<<<<<< HEAD
=======
import ProductDataFetcher from '../../components/product/ProductDataFetcher'
>>>>>>> upstream/dev

export default function ProductsList() {
  const [data, setData] = useState(null)

<<<<<<< HEAD
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3005/api/products')
        // console.log(response.data)
        setData(response.data)
      } catch (error) {
        console.error('資料獲取失敗:', error)
      }
    }
    fetchData()
  }, [])
=======
  const onDataFetched = (fetchedData) => {
    setData(fetchedData)
  }
>>>>>>> upstream/dev

  return (
    <>
      <div className="ed-pd-bg-setting p-4">
        {data && data.products && data.products.length > 0 ? (
          <div>
            <h4>產品列表 (抓資料庫測試) 共有 {data.products.length} 筆資料</h4>
            <div className="row">
              {data.products.map((product) => (
<<<<<<< HEAD
                <div className="col-md-2 mb-4" key={product.product_id}>
=======
                <div className="col-md-3 mb-4 px-5" key={product.product_id}>
>>>>>>> upstream/dev
                  <div className="card card-small">
                    <img
                      src={`http://localhost:3005/uploads/${product.product_image}`}
                      alt={product.product_name}
                      className="card-img-top"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.product_name}</h5>
                      <h6 className="card-text">
                        品牌：{product.product_brand}
                      </h6>
                      <h6 className="card-text">
                        類別：{product.product_category}
                      </h6>
                      <h6 className="card-text">
                        數量：{product.product_amount}
                      </h6>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
<<<<<<< HEAD
          <p>目前沒有可用的產品。</p>
        )}
      </div>
=======
          <div className="unavailable">
            新品即將推出，<br className="d-md-none"></br>持續探索最佳風味 !{' '}
          </div>
        )}
      </div>
      <ProductDataFetcher onDataFetched={onDataFetched} />
>>>>>>> upstream/dev
    </>
  )
}
