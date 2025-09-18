import { describe, it, expect } from "vitest";
import { runCommands, Rover, Plateau } from "./rover";

describe("Mars Rovers", () => {
  const plateau: Plateau = { maxX: 5, maxY: 5 };

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
