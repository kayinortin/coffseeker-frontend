import Cookies from 'js-cookie'
import axios from 'axios'

export async function FetchUserData() {
  const accessToken = Cookies.get('accessToken')
  // console.log('Fetch accessToken:', accessToken)

  if (!accessToken) {
    return false
  }

  try {
    let response = await fetch('http://localhost:3005/api/auth-jwt/private', {
      method: 'GET', // 或其他你需要的方法
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // 使用 'include' 替代 'withCredentials'
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()
    // console.log(data)
    return data.user
  } catch (error) {
    console.error('Error fetching profile:', error)
  }
}

//   try {
//     const response = await axios.get(
//       'http://localhost:3005/api/auth-jwt/check-login',

//       {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include', // 使用 'include' 替代 'withCredentials'
//       }
//     )

//     if (response.status === 200) {
//       const data = response.data
//       console.log('成功進到200')
//       console.log('這裡是永遠得不到的資料', data)
//       return data
//     } else {
//       return false
//     }
//   } catch (error) {
//     console.log('Error checking login status:', error)
//     return false
//   }
// }
