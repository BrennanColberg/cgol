import { startGame, countNeighbors } from "./game"
describe(startGame, () => {
  it("works with zeroes", () => {
    expect(startGame({ width: 0, height: 0 }).state.length).toBe(0)
  })
  it("works with a square", () => {
    expect(startGame({ width: 2, height: 2 }).state.length).toBe(4)
  })
  it("works when the width is larger", () => {
    expect(startGame({ width: 3, height: 2 }).state.length).toBe(6)
  })
  it("works when the height is larger", () => {
    expect(startGame({ width: 2, height: 3 }).state.length).toBe(6)
  })
})

describe(countNeighbors, () => {
  const state = [
    "001111", // long comment so prettier keeps it in multiple lines
    "101010",
    "011100",
    "101001",
    "011001",
    "110000",
  ].flatMap((row) => [...row].map((char) => char === "1"))
  const game = {
    width: 6,
    height: 6,
    state,
  }

  it("counts corners properly", () => {
    expect(countNeighbors(game, 0)).toBe(1)
    expect(countNeighbors(game, 5)).toBe(2)
    expect(countNeighbors(game, 30)).toBe(2)
    expect(countNeighbors(game, 35)).toBe(1)
  })
  it("counts top properly", () => {
    expect(countNeighbors(game, 1)).toBe(3)
    expect(countNeighbors(game, 2)).toBe(2)
    expect(countNeighbors(game, 3)).toBe(4)
    expect(countNeighbors(game, 4)).toBe(3)
  })
  it("counts bottom properly", () => {
    expect(countNeighbors(game, 31)).toBe(3)
    expect(countNeighbors(game, 32)).toBe(3)
    expect(countNeighbors(game, 33)).toBe(1)
    expect(countNeighbors(game, 34)).toBe(1)
  })
  it("counts sides properly", () => {
    // left
    expect(countNeighbors(game, 6)).toBe(1)
    expect(countNeighbors(game, 12)).toBe(3)
    expect(countNeighbors(game, 18)).toBe(2)
    expect(countNeighbors(game, 24)).toBe(3)
    // right
    expect(countNeighbors(game, 7)).toBe(3)
    expect(countNeighbors(game, 13)).toBe(2)
    expect(countNeighbors(game, 19)).toBe(1)
    expect(countNeighbors(game, 25)).toBe(1)
  })
  it("counts middle properly", () => {
    expect(countNeighbors(game, 14)).toBe(4)
    expect(countNeighbors(game, 15)).toBe(4)
    expect(countNeighbors(game, 20)).toBe(5)
    expect(countNeighbors(game, 21)).toBe(4)
  })
})
