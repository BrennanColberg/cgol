import type { NextPage } from "next"
import { useEffect, useState } from "react"
import { Game, startGame, tickGame } from "../lib/game"

const Home: NextPage = () => {
  const [game, setGame] = useState<Game>(startGame({ width: 10, height: 10 }))

  useEffect(() => {
    const tick = () => setGame((game) => tickGame(game))
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [])

  return <pre>{JSON.stringify(game, undefined, 2)}</pre>
}

export default Home
