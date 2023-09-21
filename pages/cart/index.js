import React from 'react'

export default function Cart() {
  return (
    <>
      <div className={'container'}>
        <h1>購物車</h1>
        <div className={'step'}>
          <div className={'stepTop'}>
            <div className={'stepCircle'}></div>
            <div className={'setNum'}>1</div>
          </div>
          <div className={'stepFont'}>確認購物清單</div>
        </div>
        <div className={'step'}>
          <div className={'stepTop'}>
            <div className={'stepCircle circle-gray'}></div>
            <div className={'setNum'}>2</div>
          </div>
          <div className={'stepFont'}>確認購物清單</div>
        </div>
      </div>
    </>
  )
}
