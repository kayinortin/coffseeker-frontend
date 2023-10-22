import Swal from 'sweetalert2'

export default function Validation(
  userEmail,
  userName,
  userPassword,
  rePassword,
  userGender,
  userPhone,
  birthdayYear,
  birthdayMonth,
  birthdayData
) {
  const errorSwal = (error) => {
    Swal.fire({
      title: error,
      icon: 'error',
      iconColor: '#1c262c', //error
      showConfirmButton: false,
      timer: 1500,
    })
  }

  const mailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  const passwordRegex = /^(?=.*[a-zA-Z]).{8,12}$/
  const phoneRegex = /^09\d{8}$/

  if (userEmail === '') {
    errorSwal('信箱不能為空')
    return false
  } else if (!mailRegex.test(userEmail)) {
    errorSwal('請輸入有效的信箱')
    return false
  } else if (userName === '') {
    errorSwal('請輸入您的姓名')
    return false
  } else if (userPassword === '') {
    errorSwal('密碼不能為空')
    return false
  } else if (!passwordRegex.test(userPassword)) {
    errorSwal('密碼格式不符 請輸入8~12位,英數混合的密碼')
    return false
  } else if (rePassword !== userPassword) {
    errorSwal('密碼不相符')
    return false
  } else if (userPhone === '') {
    errorSwal('請輸入手機號碼')
    return false
  } else if (!phoneRegex.test(userPhone)) {
    errorSwal('請輸入09開頭 共10位數字的台灣電話號碼格式')
    return false
  } else if (userGender === '') {
    errorSwal('請選擇您的性別')
    return false
  } else if (
    birthdayYear === '' ||
    birthdayMonth === '' ||
    birthdayData === ''
  ) {
    errorSwal('請完整填入生日日期')
    return false
  }

  return true
}
