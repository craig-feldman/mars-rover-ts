import { describe, it, expect } from "vitest";
import {
  runCommands,
  Rover,
  Plateau,
  isValidPosition,
  type Direction,
} from "./rover";

function makeRover(x: number, y: number, direction: Direction): Rover {
  return { position: { x, y }, direction };
}

// note - could also do table tests like these:
// describe(`${isValidPosition.name} - correctly returns whether a position is valid`, () => {
//   const plateau: Plateau = { maxX: 3, maxY: 5 };

//   it.each([
//     [{ x: 2, y: 2 }, true, "inside plateau"],
//     [{ x: 0, y: 0 }, true, "at bottom-left edge"],
//     [{ x: 3, y: 5 }, true, "at top-right edge"],
//     [{ x: 0, y: 5 }, true, "at top-left edge"],
//     [{ x: 3, y: 0 }, true, "at bottom-right edge"],
//     [{ x: -1, y: 0 }, false, "negative x"],
//     [{ x: 4, y: 5 }, false, "x beyond maxX"],
//     [{ x: 3, y: 6 }, false, "y beyond maxY"],
//   ])("returns %s for %s", (pos, expected, desc) => {
//     expect(isValidPosition(pos, plateau), desc).toBe(expected);
//   });
// });

describe(`${isValidPosition.name} correctly returns whether a position is valid`, () => {
  const plateau: Plateau = { maxX: 3, maxY: 5 };

  it("accepts position inside plateau", () => {
    expect(isValidPosition({ x: 2, y: 2 }, plateau)).toBe(true);
  });

  it("accepts edge positions", () => {
    expect(isValidPosition({ x: 0, y: 0 }, plateau)).toBe(true);
    expect(isValidPosition({ x: 3, y: 5 }, plateau)).toBe(true);
    expect(isValidPosition({ x: 0, y: 5 }, plateau)).toBe(true);
    expect(isValidPosition({ x: 3, y: 0 }, plateau)).toBe(true);
  });

  it("rejects negative coordinates", () => {
    expect(isValidPosition({ x: -1, y: 0 }, plateau)).toBe(false);
  });

  it("rejects coordinates beyond max", () => {
    expect(isValidPosition({ x: 4, y: 5 }, plateau)).toBe(false);
    expect(isValidPosition({ x: 3, y: 6 }, plateau)).toBe(false);
  });
});

describe(`${runCommands.name} executes commands as expected`, () => {
  const plateau: Plateau = { maxX: 5, maxY: 5 };

  it.each([
    ["N", makeRover(1, 2, "N"), makeRover(1, 3, "N")],
    ["E", makeRover(1, 2, "E"), makeRover(2, 2, "E")],
    ["S", makeRover(1, 2, "S"), makeRover(1, 1, "S")],
    ["W", makeRover(1, 2, "W"), makeRover(0, 2, "W")],
  ] as const)(
    "moving %s results in correct position",
    (_dir, startRover, expectedRover) => {
      const result = runCommands(startRover, "M", plateau);
      expect(result).toEqual(expectedRover);
    }
  );

  it.each([
    ["N", "W"],
    ["W", "S"],
    ["S", "E"],
    ["E", "N"],
  ] as const)("turnLeft: from %s -> %s", (startDir, expectedDir) => {
    const rover = makeRover(0, 0, startDir);
    const result = runCommands(rover, "L", plateau);
    expect(result.direction).toBe(expectedDir);
  });

  it.each([
    ["N", "E"],
    ["E", "S"],
    ["S", "W"],
    ["W", "N"],
  ] as const)("turnRight: from %s -> %s", (startDir, expectedDir) => {
    const rover = makeRover(0, 0, startDir);
    const result = runCommands(rover, "R", plateau);
    expect(result.direction).toBe(expectedDir);
  });

  it("ignores moves that go out of bounds", () => {
    const rover = makeRover(0, 0, "S");
    const result = runCommands(rover, "M", plateau);
    expect(result).toEqual(makeRover(0, 0, "S"));
  });

  it("handles empty commands", () => {
    const rover = makeRover(2, 2, "E");
    const result = runCommands(rover, "", plateau);
    expect(result).toEqual(makeRover(2, 2, "E"));
  });

  it("throws an error on invalid commands", () => {
    const rover = makeRover(2, 2, "E");
    expect(() => runCommands(rover, "MLZ", plateau)).toThrowError(
      "Invalid command detected - 'Z'"
    );
  });

  it("should handle the first example rover", () => {
    const rover: Rover = { position: { x: 1, y: 2 }, direction: "N" };
    const result = runCommands(rover, "LMLMLMLMM", plateau);
    expect(result).toEqual({ position: { x: 1, y: 3 }, direction: "N" });
  });

  it("should handle the second example rover", () => {
    const rover: Rover = { position: { x: 3, y: 3 }, direction: "E" };
    const result = runCommands(rover, "MMRMMRMRRM", plateau);
    expect(result).toEqual({ position: { x: 5, y: 1 }, direction: "E" });
  });
});
