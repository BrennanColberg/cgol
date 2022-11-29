import "tailwindcss/tailwind.css"
import type { AppProps } from "next/app"
import Head from "next/head"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <script
          defer
          data-domain="cgol.app"
          src="https://plausible.io/js/script.js"
        />

        <title>Conway&apos;s Game of Life</title>
        <meta name="title" content="Conway's Game of Life" />
        <meta
          name="description"
          content="A full-screen in-browser simulation"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cgol.app/" />
        <meta property="og:title" content="Conway's Game of Life" />
        <meta
          property="og:description"
          content="A full-screen in-browser simulation"
        />
        <meta property="og:image" content="https://cgol.app/preview.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://cgol.app/" />
        <meta property="twitter:title" content="Conway's Game of Life" />
        <meta
          property="twitter:description"
          content="A full-screen in-browser simulation"
        />
        <meta property="twitter:image" content="https://cgol.app/preview.png" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
export default MyApp
