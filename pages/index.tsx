import type { NextPage } from "next"
import { useCallback, useEffect, useRef, useState } from "react"
import { Dimensions, Game, startGame, tickGame } from "../lib/game"

const MAX_CELLS = parseInt(process.env.NEXT_PUBLIC_MAX_CELLS as string)
const MIN_CELL_SIZE = parseInt(process.env.NEXT_PUBLIC_MIN_CELL_SIZE as string)

const Home: NextPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState<Dimensions>()
  const [game, setGame] = useState<Game>()
  const [darkMode, setDarkMode] = useState<boolean>(false)

  useEffect(() => {
    setDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches)
    const listener = (e: any) => setDarkMode(e.matches)
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", listener)
    return () =>
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", listener)
  }, [])

  const resize = useCallback(() => {
    const width = window.innerWidth / MIN_CELL_SIZE
    const height = window.innerHeight / MIN_CELL_SIZE
    const cells = width * height
    const scale = Math.sqrt(Math.min(MAX_CELLS, cells) / cells)
    setDimensions({
      width: Math.floor(width * scale),
      height: Math.floor(height * scale),
    })
  }, [])

  useEffect(() => {
    resize()
    window.addEventListener("resize", resize)
    return () => window.removeEventListener("resize", resize)
  }, [resize])

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!dimensions) return
      console.log(event.x, event.y)
      const gameX = Math.floor(event.x / (window.innerWidth / dimensions.width))
      const gameY = Math.floor(
        event.y / (window.innerHeight / dimensions.height),
      )
      console.log(gameX, gameY)
      setGame((game) => {
        if (!game) return undefined
        const state = game.state
        state[gameX + gameY * dimensions!.width] = "black"
        setGame({ ...game, state })
      })
    }
    window.addEventListener("mousemove", listener)
    return () => window.removeEventListener("mousemove", listener)
  }, [dimensions])

  const reset = useCallback(() => {
    if (dimensions) setGame(startGame(dimensions, ["red", "blue", "green"]))
  }, [dimensions])
  useEffect(() => reset(), [reset])

  useEffect(() => {
    const tick = () => setGame((game) => game && tickGame(game))
    const interval = setInterval(tick, 50)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!game) return
    const { width, height } = game
    const canvas = canvasRef.current?.getContext("2d")
    if (!canvas) return
    canvas.clearRect(0, 0, width, height)
    game.state.forEach((color, index) => {
      if (!color) return
      canvas.fillStyle =
        color === "black" ? (darkMode ? "white" : "black") : color
      canvas.fillRect(index % width, Math.floor(index / width), 1, 1)
    })
  }, [canvasRef, game, darkMode])

  return (
    <canvas
      onClick={reset}
      style={{
        imageRendering: "pixelated",
        backgroundColor: darkMode ? "black" : "white",
        cursor: "crosshair",
      }}
      width={dimensions?.width}
      height={dimensions?.height}
      ref={canvasRef}
      className="w-screen h-screen"
    />
  )
}

export default Home
