import React from 'react'

export default function SendMessage() {
  // const [isPopupOpen, setPopupOpen] = useState(false)
  return (
    <div id="ei-wrap" className="ei-about-container">
      <div className="d-flex justify-content-center align-items-center ei-contact-us">
        <div className="ei-line me-3"></div>
        <h3 className="text-center news-title mobile-contact-us">聯絡我們</h3>
        <div className="ei-line ms-3"></div>
      </div>

      <div id="ei-form-wrap" className={`ei-form }`}>
        <form className="ei-form ">
          <label htmlFor="email" className="mb-3">
            訊息:
          </label>
          <textarea
            className=""
            name="message"
            id="message"
            defaultValue=""
          ></textarea>
          <label htmlFor="name" className="mb-3">
            姓名:
          </label>
          <input type="text" name="name" value="" id="name" />
          <label htmlFor="email" className="mb-3">
            Email:
          </label>
          <input type="text" name="email" value="" id="email" />
          <div className="d-flex justify-content-center">
            <button
              type="submit"
              name="submit"
              value="NOW, I SEND THANKS!"
              className="text-center btn btn-dark mt-3"
            >
              送出
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
