import { useState } from 'react'
import Swal from 'sweetalert2'

export default function SendMessage() {
  // const [isPopupOpen, setPopupOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  async function handleSubmit() {
    const response = await fetch('http://localhost:3005/api/email/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, name, email }),
    })

    if (response.ok) {
      Swal.fire({
        icon: 'success',
        title: '成功！',
        iconColor: '#b54b33',
        text: '郵件已成功發送！',
      }).then(() => {
        setMessage('')
        setName('')
        setEmail('')
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: '錯誤！',
        iconColor: '#1C262C',
        text: '無法發送郵件！',
      })
    }
  }

  return (
    <>
      <div className="d-flex justify-content-center align-items-center ei-contact-us">
        <div className="ei-line me-3"></div>
        <h3 className="text-center news-title mobile-contact-us fs-2">
          聯絡我們
        </h3>
        <div className="ei-line ms-3"></div>
      </div>

      {/* 信封區 */}
      <div id="ei-wrap" className="ei-about-container d-none d-lg-block">
        <div id="ei-form-wrap" className={`ei-form}`}>
          <form className="ei-form ">
            <label htmlFor="email" className="mb-3">
              訊息：
            </label>
            <textarea
              className=""
              name="message"
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <label htmlFor="name" className="mb-3">
              姓名：
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="email" className="mb-3">
              Email：
            </label>
            <input
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-dark"
                onClick={handleSubmit}
              >
                送出
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
