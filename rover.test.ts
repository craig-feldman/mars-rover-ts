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

  it("moves north correctly", () => {
    const rover = makeRover(1, 2, "N");
    const result = runCommands(rover, "M", plateau);
    expect(result).toEqual(makeRover(1, 3, "N"));
  });

  it("moves east correctly", () => {
    const rover = makeRover(1, 2, "E");
    const result = runCommands(rover, "M", plateau);
    expect(result).toEqual(makeRover(2, 2, "E"));
  });

  it("moves south correctly", () => {
    const rover = makeRover(1, 2, "S");
    const result = runCommands(rover, "M", plateau);
    expect(result).toEqual(makeRover(1, 1, "S"));
  });

  it("moves west correctly", () => {
    const rover = makeRover(1, 2, "W");
    const result = runCommands(rover, "M", plateau);
    expect(result).toEqual(makeRover(0, 2, "W"));
  });

  it("turns left correctly", () => {
    const rover = makeRover(1, 2, "N");
    const result = runCommands(rover, "L", plateau);
    expect(result.direction).toBe("W");
  });

  it("turns right correctly", () => {
    const rover = makeRover(1, 2, "N");
    const result = runCommands(rover, "R", plateau);
    expect(result.direction).toBe("E");
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

  it("should not move out of bounds north", () => {
    const rover: Rover = { position: { x: 0, y: 5 }, direction: "N" };
    const result = runCommands(rover, "M", plateau);
    expect(result).toEqual({ position: { x: 0, y: 5 }, direction: "N" });
  });

  it("should not move out of bounds west", () => {
    const rover: Rover = { position: { x: 0, y: 0 }, direction: "W" };
    const result = runCommands(rover, "M", plateau);
    expect(result).toEqual({ position: { x: 0, y: 0 }, direction: "W" });
  });
});
