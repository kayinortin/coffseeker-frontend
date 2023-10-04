import { useEffect, useState } from 'react'
import axios from 'axios'

import ProductList from '@/components/product/productList'

import { BsCart, BsFillCartCheckFill } from 'react-icons/bs'
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'
import Swal from 'sweetalert2'
// import { useProducts } from '@/context/product'

export default function Products() {
  // const { setProductsData } = useProducts()

  // const [isFavorited, setFavorited] = useState(false)
  // const [isCarted, setCarted] = useState(false)

  return (
    <>
      
      <ProductList />
    </>
  )
}
