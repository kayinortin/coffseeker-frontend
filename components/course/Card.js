import React from 'react'
import Image from 'next/image'
import data from '@/data/course/course.json'

export default function Card(props) {
  return (
    <div class="card" style="width: 18rem;">
      <Image src="..." class="card-img-top" alt="..." />
      <div class="card-body">
        <p class="card-text">123</p>
      </div>
    </div>
  )
}
