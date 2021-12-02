import type { NextPage } from "next"
import { useEffect, useState } from "react"
import { Game, startGame, tickGame } from "../lib/game"
import classNames from "classnames"

const Home: NextPage = () => {
  const [game, setGame] = useState<Game>(startGame({ width: 10, height: 10 }))

  useEffect(() => {
    const tick = () => setGame((game) => tickGame(game))
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div
        className="flex flex-row flex-wrap"
        style={{ width: "100vmin", height: "100vmin" }}
      >
        {game.state.map((alive, i) => (
          <div
            key={i}
            className={classNames("border border-black", { "bg-black": alive })}
            style={{ width: "10vmin", height: "10vmin" }}
          />
        ))}
      </div>
    </div>
  )
}

export default Home
