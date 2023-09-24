import dynamic from 'next/dynamic'
import Lottie from 'react-lottie-player/dist/LottiePlayerLight'
import lottieJson from '@/public/map-image/LottieFiles-cafeLoading.json'

const Map = dynamic(() => import('./map'), {
  loading: () => (
    <div className="mapArea justify-content-center align-items-center">
      <Lottie
        play
        loop
        style={{ width: 600, height: 600 }}
        animationData={lottieJson}
      />
    </div>
  ),
  ssr: false,
})

export default Map
