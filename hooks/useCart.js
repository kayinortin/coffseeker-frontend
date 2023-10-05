import { CartContext } from '@/context/CartContent'
import { useContext } from 'react'

const useCart = () => {
  const { cart, setCart } = useContext(CartContext)

  const addCart = ({ id, name, description, price, image }) => {
    const item = {
      id,
      name,
      description,
      price,
      image,
    }
    item.id = new Date().getTime()
    setCart((prevCart) => [...prevCart, item])
  }
  const removeCart = () => {}
  return {
    addCart,
    removeCart,
  }
}

export default useCart
