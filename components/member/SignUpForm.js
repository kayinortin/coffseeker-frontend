import React from 'react'
import Link from 'next/link'
import { FaFacebook, FaGoogle, FaTwitter } from 'react-icons/fa'

export default function LoginForm() {
  return (
    <>
      <div className={'container d-flex justify-content-center pb-3'}>
        <div className={'login border border-dark'}>
          <div className={'form-title border-bottom border-dark p-3'}>
            會員註冊
          </div>
          <form className="p-5">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                會員信箱(登入帳號)
              </label>
              <input
                placeholder="請輸入信箱"
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text"></div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                會員姓名
              </label>
              <input
                placeholder="請輸入信箱"
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text"></div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                密碼
              </label>
              <input
                placeholder="請輸入密碼"
                type="password"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text"></div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                手機
              </label>
              <input
                placeholder="請輸入手機號碼"
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text"></div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                性別
              </label>
              <select class="form-select">
                <option selected>請選擇性別</option>
                <option value="1">男</option>
                <option value="2">女</option>
                <option value="3">不便透漏</option>
              </select>
            </div>
            <div className={'d-flex justify-content-between'}>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  生日
                </label>
                <select class="form-select">
                  <option selected>年</option>
                  <option value="1">男</option>
                  <option value="2">女</option>
                  <option value="3">不便透漏</option>
                </select>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleInputPassword1"
                  className="form-label birthday-selector"
                >
                  生日
                </label>
                <select class="form-select">
                  <option selected>月</option>
                  <option value="1">男</option>
                  <option value="2">女</option>
                  <option value="3">不便透漏</option>
                </select>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleInputPassword1"
                  className="form-label birthday-selector"
                >
                  生日
                </label>
                <select class="form-select">
                  <option selected>日</option>
                  <option value="1">男</option>
                  <option value="2">女</option>
                  <option value="3">不便透漏</option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div
        className={
          'container d-flex justify-content-center mt-4 mb-3 align-items-center'
        }
      >
        <div className={'form-check'}>
          <input
            type="checkbox"
            className={'form-check-input'}
            id="exampleCheck1"
          />
          <label className={'form-check-label'} htmlFor="exampleCheck1">
            訂閱電子報
          </label>
        </div>
      </div>
      <div
        className={
          'container d-flex justify-content-center mt-3 mb-4 align-items-center'
        }
      >
        <div className={'form-check'}>
          <input
            type="checkbox"
            className={'form-check-input'}
            id="exampleCheck2"
          />
          <label className={'form-check-label'} htmlFor="exampleCheck2">
            我已閱讀並同意
            <Link href="" className={'text-secondary'}>
              「會員隱私條款」
            </Link>
          </label>
        </div>
      </div>
      <div className={'container d-flex justify-content-center'}>
        <div
          className={
            'btn-login text-center d-flex justify-content-center flex-column mb-5'
          }
        >
          <span>確認並送出</span>
        </div>
      </div>
    </>
  )
}
