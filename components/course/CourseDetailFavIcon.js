import { useState, useEffect } from 'react'

import { useFavorite } from '../../context/fav'
import AddFavCourse from '../fav/AddFavCourse'
import RemoveFavCourse from '../fav/RemoveFavCourse'
import FetchFavCourseId from '../fav/FetchFavCourse'
function CourseDetailFavIcon(props) {
  FetchFavCourseId()
  const { id } = props
  const { favCoursesArr, setFavCoursesArr } = useFavorite()
  const [fav, setFav] = useState(false)
  if (favCoursesArr.includes(parseInt(id)) && !fav) {
    setFav(true)
  }
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
      localStorage.setItem('fav', favArr)
    } else {
      //收藏 -> 取消收藏
      setFav(!fav)
      RemoveFavCourse(parseInt(id))
      const remainFavArr = favCoursesArr.filter((item) => item !== parseInt(id))
      setFavCoursesArr([...remainFavArr])
      localStorage.setItem('fav', remainFavArr)
    }
  }

  const isActive =
    favCoursesArr.findIndex((item) => item === parseInt(id)) !== -1

  return (
    <>
      <button
        className={`hw-fav-btn hw-fav-btn--large hw-fav-btn--icon ${
          isActive && 'active'
        } `}
        type="button"
        onClick={handleSetFav}
      >
        <i className="fas fa-heart hw-fav-btn__icon"></i>
      </button>
    </>
  )
}

export default CourseDetailFavIcon
