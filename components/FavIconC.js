import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { useFavorite } from '@/context/fav'
import AddFavCourse from './fav/AddFavCourse'
import RemoveFavCourse from './fav/RemoveFavCourse'
function FavIconC(props) {
  const { size, type, id } = props
  const [fav, setFav] = useState(false)
  const router = useRouter()
  const locationPath = router.asPath
  const { favCoursesArr, setFavCoursesArr } = useFavorite()
  if (favCoursesArr.includes(parseInt(id)) && !fav) {
    setFav(true)
  }

  const isEmptyState = favCoursesArr.length === 0

  const handleSetFav = () => {
    if (fav === false) {
      //未收藏 -> 收藏
      if (favCoursesArr.includes(parseInt(id))) {
        return
      }
      setFav(!fav)
      const favArr = [...favCoursesArr, parseInt(id)]
      AddFavCourse(parseInt(id))
      setFavCoursesArr(favArr)
      localStorage.setItem('favC', favArr)
    } else {
      //收藏 -> 取消收藏
      setFav(!fav)
      RemoveFavCourse(parseInt(id))
      const remainFavArr = favCoursesArr.filter((item) => item !== parseInt(id))
      setFavCoursesArr([...remainFavArr])
      localStorage.setItem('favC', remainFavArr)
    }
  }

  const isActive =
    !isEmptyState &&
    favCoursesArr.findIndex((item) => item === parseInt(id)) !== -1

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

export default FavIconC
