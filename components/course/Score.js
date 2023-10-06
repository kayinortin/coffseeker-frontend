import styles from '@/styles/_course.rating.module.scss'

export default function Score() {
  return (
    <div className=" my-3">
      <span className={styles['on']}>&#9733;</span>
      <span className={styles['on']}>&#9733;</span>
      <span className={styles['on']}>&#9733;</span>
      <span className={styles['on']}>&#9733;</span>
      <span className={styles['on']}>&#9733;</span>
    </div>
  )
}
