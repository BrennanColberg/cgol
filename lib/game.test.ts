import { startGame, countNeighbors, tickGame } from "./game"
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
  it("counts left properly", () => {
    expect(countNeighbors(game, 6)).toBe(1)
    expect(countNeighbors(game, 12)).toBe(3)
    expect(countNeighbors(game, 18)).toBe(2)
    expect(countNeighbors(game, 24)).toBe(4)
  })
  it("counts right properly", () => {
    expect(countNeighbors(game, 11)).toBe(3)
    expect(countNeighbors(game, 17)).toBe(2)
    expect(countNeighbors(game, 23)).toBe(1)
    expect(countNeighbors(game, 29)).toBe(1)
  })
  it("counts middle properly", () => {
    expect(countNeighbors(game, 14)).toBe(4)
    expect(countNeighbors(game, 15)).toBe(4)
    expect(countNeighbors(game, 20)).toBe(5)
    expect(countNeighbors(game, 21)).toBe(4)
  })
})

describe(tickGame, () => {
  const centerStateAfterTick = (binary: number): boolean =>
    tickGame({
      width: 3,
      height: 3,
      state: (binary + 0b1000000000)
        .toString(2)
        .split("")
        .map((char) => char === "1")
        .slice(1),
    }).state[4]

  it("kills cells with ≤1 neighbors", () => {
    // 0 neighbors
    expect(centerStateAfterTick(0b000010000)).toBe(false)
    // 1 neighbors
    expect(centerStateAfterTick(0b100010000)).toBe(false)
  })
  it("keeps cells with 2 or 3 neighbors alive", () => {
    // 2 neighbors
    expect(centerStateAfterTick(0b110010000)).toBe(true)
    // 3 neighbors
    expect(centerStateAfterTick(0b111010000)).toBe(true)
  })
  it("kills cells with ≥4 neighbors", () => {
    // 4 neighbors
    expect(centerStateAfterTick(0b111110000)).toBe(false)
    // 5 neighbors
    expect(centerStateAfterTick(0b1111110000)).toBe(false)
    // 6 neighbors
    expect(centerStateAfterTick(0b1111111000)).toBe(false)
    // 7 neighbors
    expect(centerStateAfterTick(0b111111110)).toBe(false)
    // 8 neighbors
    expect(centerStateAfterTick(0b111111111)).toBe(false)
  })
  it("creates a cell in empty spaces with 3 neighbors", () => {
    expect(centerStateAfterTick(0b111000000)).toBe(true)
  })
  it("leaves empty spaces with ≠3 neighbors alone", () => {
    // 0 neighbors
    expect(centerStateAfterTick(0b000000000)).toBe(false)
    // 1 neighbors
    expect(centerStateAfterTick(0b100000000)).toBe(false)
    // 2 neighbors
    expect(centerStateAfterTick(0b110000000)).toBe(false)
    // 4 neighbors
    expect(centerStateAfterTick(0b111100000)).toBe(false)
    // 5 neighbors
    expect(centerStateAfterTick(0b111101000)).toBe(false)
    // 6 neighbors
    expect(centerStateAfterTick(0b111101100)).toBe(false)
    // 7 neighbors
    expect(centerStateAfterTick(0b111101110)).toBe(false)
    // 8 neighbors
    expect(centerStateAfterTick(0b111101111)).toBe(false)
  })
})
