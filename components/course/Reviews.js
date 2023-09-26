import React from 'react'
import Image from 'next/image'
import Rating from './Rating'

export default function Review() {
  return (
    <div>
      <h3 className="text-center">學員評價</h3>
      <div className="d-flex">
        <Image
          src={'/course-image/selfie.png'}
          alt="icon"
          width={50}
          height={50}
        />
        <div>
          <span>XXX學員</span>
          <Rating />
        </div>
      </div>
    </div>
  )
}
