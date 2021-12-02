/**
 * All the code necessary to run Conway's Game of Life.
 */

export type Dimensions = Readonly<{ width: number; height: number }>
export type State = boolean[]
export type Game = Dimensions & { state: State }

export const startGame = ({ width, height }: Dimensions): Game => ({
  width,
  height,
  state: Array(width * height).fill(false),
})

export const countNeighbors = (game: Game, index: number): number =>
  [
    // top
    game.state[index - game.width - 1],
    game.state[index - game.width],
    game.state[index - game.width + 1],
    // sides
    game.state[index - 1],
    game.state[index + 1],
    // bottom
    game.state[index + game.width - 1],
    game.state[index + game.width],
    game.state[index + game.width + 1],
  ].reduce((result, neighbor) => (neighbor ? result + 1 : result), 0)

export const tickGame = (game: Game): Game => ({
  ...game,
  state: game.state.map((alive, index) => {
    const neighbors = countNeighbors(game, index)
    // if it's alive with ≤1 or ≥4 neighbors, it dies
    if (alive && (neighbors <= 1 || neighbors >= 4)) return false
    // if it's empty with 3 neighbors, it comes to life
    if (!alive && neighbors === 3) return true
    // otherwise, it stays the same (alive or dead)
    return alive
  }),
})
