import "tailwindcss/tailwind.css"
import type { AppProps } from "next/app"
import Head from "next/head"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Conway&apos;s Game of Life</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
export default MyApp
