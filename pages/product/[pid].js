import { useRouter } from 'next/router'

export default function ProductDetail() {
  const router = useRouter()
  const { pid } = router.query

  return <div>這是編號 {pid} 的商品頁面</div>
}
