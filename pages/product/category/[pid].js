import React from 'react'
import { useRouter } from 'next/router'

export default function ProductCategory() {
  const router = useRouter()
  const { pid } = router.query

  return <div>只傳入種類為：{pid}的商品列表</div>
}
