import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="zh-Hant">
      <meta charset="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <meta property="og:locale" content="zh_TW" />
      <meta property="og:type" content="website" />
      <meta
        property="og:description"
        content="咖啡，不僅是一種飲品，更是一種品味，一種尋找美好的旅程。"
      />
      <meta
        property="og:title"
        content="探索咖啡COFFSEEKER｜網羅世界各地精品咖啡"
      />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1920" />
      <meta property="og:image:height" content="1080" />
      <meta
        name="description"
        content="咖啡，不僅是一種飲品，更是一種品味，一種尋找美好的旅程。"
      />
      <link rel="apple-touch-icon" href="http://localhost:3000/logo192.png" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
      />
      <link rel="manifest" href="http://localhost:3000/manifest.json" />
      <title>探索咖啡COFFSEEKER｜網羅世界各地極品咖啡</title>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
