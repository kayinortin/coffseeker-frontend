import React, { useState } from 'react'
import ProductDataFetcher from '../../components/product/PopularProducts'

export default function PopularProducts() {
  const [data, setData] = useState(null)

  const onDataFetched = (fetchedData) => {
    setData(fetchedData)
  }
  return (
    <>
      <div className="container ed-index-product">
        <div className="hot-product-wrapper">
          <div className="line"></div>
          <div className="hot-product">熱銷商品</div>
          <div className="line"></div>
        </div>
        {data && data.products && data.products.length > 0 ? (
          <div>
            <div className="row p-5">
              {data.products.map((product) => (
                <div className="col-md-3 mb-4" key={product.product_id}>
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
          <div className="container">
            <div className="hot-product">目前沒有可用的產品。</div>
          </div>
        )}
      </div>
      <ProductDataFetcher onDataFetched={onDataFetched} />
    </>
  )
}
