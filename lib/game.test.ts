import { startGame, extractNeighbors, tickGame } from "./game"
describe(startGame, () => {
  it("works with zeroes", () => {
    expect(startGame({ width: 0, height: 0 }, ["black"]).state.length).toBe(0)
  })
  it("works with a square", () => {
    expect(startGame({ width: 2, height: 2 }, ["black"]).state.length).toBe(4)
  })
  it("works when the width is larger", () => {
    expect(startGame({ width: 3, height: 2 }, ["black"]).state.length).toBe(6)
  })
  it("works when the height is larger", () => {
    expect(startGame({ width: 2, height: 3 }, ["black"]).state.length).toBe(6)
  })
})

describe(extractNeighbors, () => {
  const state = [
    "001111", // long comment so prettier keeps it in multiple lines
    "101010",
    "011100",
    "101001",
    "011001",
    "110000",
  ].flatMap((row) => [...row].map((char) => (char === "1" ? "black" : null)))
  const game = {
    width: 6,
    height: 6,
    colors: ["black"],
    state,
  }

  it("counts corners properly", () => {
    expect(extractNeighbors(game, 0).length).toBe(1)
    expect(extractNeighbors(game, 5).length).toBe(2)
    expect(extractNeighbors(game, 30).length).toBe(2)
    expect(extractNeighbors(game, 35).length).toBe(1)
  })
  it("counts top properly", () => {
    expect(extractNeighbors(game, 1).length).toBe(3)
    expect(extractNeighbors(game, 2).length).toBe(2)
    expect(extractNeighbors(game, 3).length).toBe(4)
    expect(extractNeighbors(game, 4).length).toBe(3)
  })
  it("counts bottom properly", () => {
    expect(extractNeighbors(game, 31).length).toBe(3)
    expect(extractNeighbors(game, 32).length).toBe(3)
    expect(extractNeighbors(game, 33).length).toBe(1)
    expect(extractNeighbors(game, 34).length).toBe(1)
  })
  it("counts left properly", () => {
    expect(extractNeighbors(game, 6).length).toBe(1)
    expect(extractNeighbors(game, 12).length).toBe(3)
    expect(extractNeighbors(game, 18).length).toBe(2)
    expect(extractNeighbors(game, 24).length).toBe(4)
  })
  it("counts right properly", () => {
    expect(extractNeighbors(game, 11).length).toBe(3)
    expect(extractNeighbors(game, 17).length).toBe(2)
    expect(extractNeighbors(game, 23).length).toBe(1)
    expect(extractNeighbors(game, 29).length).toBe(1)
  })
  it("counts middle properly", () => {
    expect(extractNeighbors(game, 14).length).toBe(4)
    expect(extractNeighbors(game, 15).length).toBe(4)
    expect(extractNeighbors(game, 20).length).toBe(5)
    expect(extractNeighbors(game, 21).length).toBe(4)
  })
})

describe(tickGame, () => {
  const centerStateAfterTick = (binary: number): string | null =>
    tickGame({
      width: 3,
      height: 3,
      colors: ["black"],
      state: (binary + 0b1000000000)
        .toString(2)
        .split("")
        .map((char) => (char === "1" ? "black" : null))
        .slice(1),
    }).state[4]

  it("kills cells with ≤1 neighbors", () => {
    // 0 neighbors
    expect(centerStateAfterTick(0b000010000)).toBe(null)
    // 1 neighbors
    expect(centerStateAfterTick(0b100010000)).toBe(null)
  })
  it("keeps cells with 2 or 3 neighbors alive", () => {
    // 2 neighbors
    expect(centerStateAfterTick(0b110010000)).toBe("black")
    // 3 neighbors
    expect(centerStateAfterTick(0b111010000)).toBe("black")
  })
  it("kills cells with ≥4 neighbors", () => {
    // 4 neighbors
    expect(centerStateAfterTick(0b111110000)).toBe(null)
    // 5 neighbors
    expect(centerStateAfterTick(0b1111110000)).toBe(null)
    // 6 neighbors
    expect(centerStateAfterTick(0b1111111000)).toBe(null)
    // 7 neighbors
    expect(centerStateAfterTick(0b111111110)).toBe(null)
    // 8 neighbors
    expect(centerStateAfterTick(0b111111111)).toBe(null)
  })
  it("creates a cell in empty spaces with 3 neighbors", () => {
    expect(centerStateAfterTick(0b111000000)).toBe("black")
  })
  it("leaves empty spaces with ≠3 neighbors alone", () => {
    // 0 neighbors
    expect(centerStateAfterTick(0b000000000)).toBe(null)
    // 1 neighbors
    expect(centerStateAfterTick(0b100000000)).toBe(null)
    // 2 neighbors
    expect(centerStateAfterTick(0b110000000)).toBe(null)
    // 4 neighbors
    expect(centerStateAfterTick(0b111100000)).toBe(null)
    // 5 neighbors
    expect(centerStateAfterTick(0b111101000)).toBe(null)
    // 6 neighbors
    expect(centerStateAfterTick(0b111101100)).toBe(null)
    // 7 neighbors
    expect(centerStateAfterTick(0b111101110)).toBe(null)
    // 8 neighbors
    expect(centerStateAfterTick(0b111101111)).toBe(null)
  })
})
