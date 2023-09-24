import Cookies from 'js-cookie'

export async function checkLoginStatus() {
  const token = Cookies.get('accessToken')
  console.log('accessToken:', token)

  if (!token) {
    return false
  }

  try {
    const response = await fetch(
      'http://localhost:3005/api/auth-jwt/check-login',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    if (response.status === 200) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error('Error checking login status:', error)
    return false
  }
}
