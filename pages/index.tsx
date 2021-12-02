import type { NextPage } from "next"
import { useCallback, useEffect, useRef, useState } from "react"
import { Dimensions, Game, startGame, tickGame } from "../lib/game"

const MAX_CELLS = 100000
const MIN_CELL_SIZE = 5

const Home: NextPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState<Dimensions>()
  const [game, setGame] = useState<Game>()

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
    if (dimensions) setGame(startGame(dimensions))
  }, [dimensions])

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
    game.state.forEach((alive, index) => {
      if (!alive) return
      canvas.fillRect(index % width, Math.floor(index / width), 1, 1)
    })
  }, [canvasRef, game])

  return (
    <canvas
      onClick={() => dimensions && setGame(startGame(dimensions))}
      style={{
        imageRendering: "crisp-edges",
      }}
      width={dimensions?.width}
      height={dimensions?.height}
      ref={canvasRef}
      className="w-screen h-screen"
    />
  )
}

export default Home
