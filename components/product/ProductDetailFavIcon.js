import { useState } from 'react'

import { useFavorite } from '../../context/fav'
import AddFavProduct from '../fav/AddFavProduct'
import RemoveFavProduct from '../fav/RemoveFavProduct'
function ProductDetailFavIcon(props) {
  const { id } = props
  const { favItemsArr, setFavItemsArr } = useFavorite()
  const [fav, setFav] = useState(false)
  if (favItemsArr.includes(id) && !fav) {
    setFav(true)
  }
  const handleSetFav = () => {
    if (fav === false) {
      //未收藏 -> 收藏
      if (favItemsArr.includes(id)) {
        return
      }
      setFav(!fav)
      const favArr = [...favItemsArr, id]
      AddFavProduct(id)
      setFavItemsArr(favArr)
      localStorage.setItem('fav', favArr)
    } else {
      //收藏 -> 取消收藏
      setFav(!fav)
      RemoveFavProduct(id)
      const remainFavArr = favItemsArr.filter((item) => item !== id)
      setFavItemsArr([...remainFavArr])
      localStorage.setItem('fav', remainFavArr)
    }
  }

  const isActive = favItemsArr.findIndex((item) => item === id) !== -1

  return (
    <>
      <button
        className={`ed-fav-btn ed-fav-btn--large ed-fav-btn--icon ${
          isActive && 'active'
        } `}
        type="button"
        onClick={handleSetFav}
      >
        <i className="fas fa-heart ed-fav-btn__icon"></i>
      </button>
    </>
  )
}

export default ProductDetailFavIcon
