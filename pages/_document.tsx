import { Html, Head, Main, NextScript } from 'next/document'
import { notojp } from '@/utiles/font'

export default function Document() {
  return (
    <Html lang="en" className={`${notojp.variable}`}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
