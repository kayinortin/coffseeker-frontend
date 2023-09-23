import React, { useState } from 'react'
import ProductDataFetcher from '../../components/product/PopularProducts'

export default function PopularProducts() {
  const [data, setData] = useState(null)

  const onDataFetched = (fetchedData) => {
    setData(fetchedData)
  }
  return (
    <>
      <div>
        <h4>最熱門的商品</h4>
        {data && data.products && data.products.length > 0 ? (
          <div>
            <h4>產品列表 (抓資料庫測試) 共有 {data.products.length} 筆資料</h4>
            <div className="row">
              {data.products.map((product) => (
                <div className="col-md-2 mb-4" key={product.product_id}>
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
          <p>目前沒有可用的產品。</p>
        )}
      </div>
      <ProductDataFetcher onDataFetched={onDataFetched} />
    </>
  )
}
