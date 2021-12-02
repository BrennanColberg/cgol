import { startGame } from "./game"
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
