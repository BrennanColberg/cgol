import type { NextPage } from "next"
import { useEffect, useRef, useState } from "react"
import { Game, startGame, tickGame } from "../lib/game"

const width = 256
const height = 256

const Home: NextPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [game, setGame] = useState<Game>(startGame({ width, height }))

  useEffect(() => {
    const tick = () => setGame((game) => tickGame(game))
    const interval = setInterval(tick, 50)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current?.getContext("2d")
    if (!canvas) return
    canvas.clearRect(0, 0, width, height)
    game.state.forEach((alive, index) => {
      if (!alive) return
      canvas.fillRect(index % width, Math.floor(index / width), 1, 1)
    })
  }, [canvasRef, game])

  return (
    <div
      className="w-screen h-screen flex justify-center items-center"
      onClick={() => setGame(startGame({ width, height }))}
    >
      <canvas
        style={{
          width: "100vmin",
          height: "100vmin",
          imageRendering: "crisp-edges",
        }}
        width={width}
        height={height}
        ref={canvasRef}
      />
    </div>
  )
}

export default Home
