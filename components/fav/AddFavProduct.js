import Swal from 'sweetalert2'
const AddFavProduct = async (id) => {
  const Toast = Swal.mixin({
    toast: true,
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: false,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
  })
  try {
    const response = await fetch(
      `http://localhost:3005/api/favorite/favorite-product`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: id,
        }),
      }
    )
    const data = await response.json()
    if (data.code && data.code == '401') {
      Toast.fire({
        icon: 'info',
        title: '登入會員方可保留收藏',
        iconColor: '#b54b33',
        customClass: {
          popup: 'ed-alert__toast',
          title: 'ed-alert__subtitle',
        },
      })
    }

    // 處理成功響應
    // 更新setFavItemsArr或其他狀態
  } catch (error) {
    console.error('Failed to addFav:', error)
  }
}

export default AddFavProduct
