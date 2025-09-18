import fs from "fs";

type Position = {
  x: number;
  y: number;
};

export type Plateau = { maxX: number; maxY: number };

type Direction = "N" | "E" | "S" | "W";

export type Rover = {
  position: Position;
  direction: Direction;
};

const leftOf: Record<Direction, Direction> = {
  N: "W",
  E: "N",
  S: "E",
  W: "S",
};

const rightOf: Record<Direction, Direction> = {
  N: "E",
  E: "S",
  S: "W",
  W: "N",
};

function turnLeft(rover: Rover): Rover {
  return { ...rover, direction: leftOf[rover.direction] };
}

function turnRight(rover: Rover): Rover {
  return { ...rover, direction: rightOf[rover.direction] };
}

function move(rover: Rover, plateau: Plateau): Rover {
  let { x, y } = rover.position;

  switch (rover.direction) {
    case "N":
      ++y;
      break;
    case "E":
      ++x;
      break;
    case "S":
      --y;
      break;
    case "W":
      --x;
      break;
  }

  const wouldRoverBeOutOfBounds =
    x < 0 || y < 0 || x > plateau.maxX || y > plateau.maxY;
  if (wouldRoverBeOutOfBounds) {
    // ignore the move and keep current state
    return rover;
    // or: throw new Error("Out of bounds")
  }

  return { ...rover, position: { x, y } };
}

export function isValidPosition(position: Position, plateau: Plateau) {
  const wouldRoverBeOutOfBounds =
    position.x < 0 ||
    position.y < 0 ||
    position.x > plateau.maxX ||
    position.y > plateau.maxY;

  return !wouldRoverBeOutOfBounds;
}

function processCommand(
  rover: Rover,
  plateau: Plateau,
  command: string // or we could do "M" | "L" | "R" if we validate the input first
): Rover {
  switch (command) {
    case "M":
      return move(rover, plateau);
    case "L":
      return turnLeft(rover);
    case "R":
      return turnRight(rover);
    default:
      throw new Error(`Invalid command detected - '${command}'`);
  }
}

export function runCommands(
  rover: Rover,
  commands: string,
  plateau: Plateau
): Rover {
  for (const command of [...commands]) {
    rover = processCommand(rover, plateau, command);
  }

  return rover;
}

function main() {
  const lines = fs
    .readFileSync("input", "utf-8")
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  console.log(lines);

  // For now we will just assume the file is formatted correctly.
  // In a real-world scenario, we would want to validate these inputs
  const [maxX, maxY] = lines[0].split(" ").map(Number);
  const plateau: Plateau = { maxX, maxY };

  for (let i = 1; i < lines.length; i += 2) {
    const [xStart, yStart, dirStart] = lines[i].split(" ");
    const startPosition: Position = { x: Number(xStart), y: Number(yStart) };

    if (!isValidPosition(startPosition, plateau)) {
      throw new Error(
        `Invalid start position: ${JSON.stringify(
          startPosition
        )}. Plateau: ${JSON.stringify(plateau)}`
      );
    }
    let rover: Rover = {
      position: { x: Number(xStart), y: Number(yStart) },
      direction: dirStart as Direction,
    };

    const commands = lines[i + 1];
    rover = runCommands(rover, commands, plateau);
    console.log(`${rover.position.x} ${rover.position.y} ${rover.direction}`);
  }
}

main();
