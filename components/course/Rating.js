import { useState } from 'react'
import styles from '@/styles/_course.rating.module.scss'

export default function Rating() {
  const [rating, setRating] = useState(0)
  return (
    <div>
      {Array(5)
        .fill(1)
        .map((v, i) => {
          const score = i + 1

          return (
            <button
              key={i}
              className={styles['star-btn']}
              onClick={() => setRating(score)}
            >
              <span className={score <= rating ? styles['on'] : styles['off']}>
                &#9733;
              </span>
            </button>
          )
        })}
    </div>
  )
}
