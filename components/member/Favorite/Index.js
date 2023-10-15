import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useUser } from '@/context/UserInfo'

export default function Favorite() {
  return (
    <>
      <form className={'table-box'}>
        <div className={'border border-dark'}>
          <div className={'form-title border-bottom border-dark p-3'}>
            我的收藏
          </div>
          <div className="p-5">
            <div>東西放這邊</div>
          </div>
        </div>
      </form>
    </>
  )
}
