/**
 * All the code necessary to run Conway's Game of Life.
 */

export type Dimensions = Readonly<{ width: number; height: number }>
export type State = (string | null)[]
export type Game = Dimensions & {
  colors: string[]
  state: State
}

export const startGame = (
  { width, height }: Dimensions,
  colors: string[],
): Game => ({
  width,
  height,
  colors,
  state: Array(width * height)
    .fill(null)
    .map(() =>
      Math.random() > 0.5
        ? colors[Math.floor(Math.random() * colors.length)]
        : null,
    ),
})

export const extractNeighbors = (game: Game, index: number): string[] =>
  [
    // top
    game.state[index - game.width],
    // bottom
    game.state[index + game.width],
    // left
    index % game.width !== 0 && game.state[index - game.width - 1],
    index % game.width !== 0 && game.state[index - 1],
    index % game.width !== 0 && game.state[index + game.width - 1],
    // right
    (index + 1) % game.width !== 0 && game.state[index + 1],
    (index + 1) % game.width !== 0 && game.state[index - game.width + 1],
    (index + 1) % game.width !== 0 && game.state[index + game.width + 1],
  ].filter((neighbor): neighbor is string => !!neighbor)

export const tickGame = (game: Game): Game => ({
  ...game,
  state: game.state.map((color, index) => {
    const neighbors = extractNeighbors(game, index)
    // if it's alive with ≤1 or ≥4 neighbors, it dies
    if (color && (neighbors.length <= 1 || neighbors.length >= 4)) return null
    // if it's empty with 3 neighbors, it comes to life
    if (!color && neighbors.length === 3) {
      // set it to the same color as the majority of its neighbors
      if (neighbors[0] === neighbors[1]) return neighbors[0]
      if (neighbors[0] === neighbors[2]) return neighbors[0]
      if (neighbors[1] === neighbors[2]) return neighbors[1]
      // if none has a majority, it dies 🤷‍♂️
      return null
    }
    // otherwise, it stays the same (alive or dead)
    return color
  }),
})
