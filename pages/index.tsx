import type { NextPage } from "next"
import { useEffect, useState } from "react"
import { Game, startGame, tickGame } from "../lib/game"
import classNames from "classnames"

const width = 20
const height = 20

const Home: NextPage = () => {
  const [game, setGame] = useState<Game>(startGame({ width, height }))

  useEffect(() => {
    const tick = () => setGame((game) => tickGame(game))
    const interval = setInterval(tick, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="w-screen h-screen flex justify-center items-center"
      onClick={() => setGame(startGame({ width, height }))}
    >
      <div
        className="flex flex-row flex-wrap"
        style={{ width: "100vmin", height: "100vmin" }}
      >
        {game.state.map((alive, i) => (
          <div
            key={i}
            className={classNames({ "bg-black": alive })}
            style={{ width: `${100 / width}%`, height: `${100 / height}%` }}
          />
        ))}
      </div>
    </div>
  )
}

export default Home
