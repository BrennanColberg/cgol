import "tailwindcss/tailwind.css"
import type { AppProps } from "next/app"
import Head from "next/head"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Conway&apos;s Game of Life</title>
        <meta
          name="description"
          content="A full-screen in-browser simulation"
        />
        <meta name="author" content="Brennan Colberg" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
export default MyApp
