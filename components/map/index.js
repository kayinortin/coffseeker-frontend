import dynamic from 'next/dynamic'

const Map = dynamic(() => import('./map'), {
  loading: () => <h2>地圖正在拚盡全力加載中</h2>,
  ssr: false,
})

export default Map
