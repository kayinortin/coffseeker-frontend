import { useState } from 'react'
import { useRouter } from 'next/router'

import { useFavorite } from '@/context/fav'
import AddFavProduct from './fav/AddFavProduct'
import RemoveFavProduct from './fav/RemoveFavProduct'
function FavIcon(props) {
  const { size, type, id } = props
  const [fav, setFav] = useState(false)
  const router = useRouter()
  const locationPath = router.asPath

  const { favItemsArr, setFavItemsArr } = useFavorite()

  const isEmptyState = favItemsArr.length === 0

  const handleSetFav = () => {
    setFav(!fav)
    const favArr = [...favItemsArr, id]
    if (fav === false) {
      //未收藏 -> 收藏
      if (favItemsArr.includes(id)) {
        return
      }
      AddFavProduct(id)
      setFavItemsArr(favArr)
      localStorage.setItem('fav', favArr)
    } else {
      //收藏 -> 取消收藏
      RemoveFavProduct(id)
      const remainFavArr = favArr.filter((item) => item !== id)
      setFavItemsArr([...remainFavArr])
      localStorage.setItem('fav', remainFavArr)
    }
  }

  const isActive =
    !isEmptyState && favItemsArr.findIndex((item) => item === id) !== -1

  return (
    <>
      <button
        className={`ed-fav-btn ed-fav-btn--${size} ed-fav-btn--${type} ${
          (isActive || fav) && 'active'
        } `}
        type="button"
        onClick={handleSetFav}
      >
        <i className="fas fa-heart ed-fav-btn__icon"></i>
        {type === 'icon-text' && (
          <div className="ed-fav-btn__text">取消收藏</div>
        )}
      </button>
    </>
  )
}

export default FavIcon
