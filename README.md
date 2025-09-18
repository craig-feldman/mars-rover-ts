## Readme

This project uses nodejs and typescript to solve the "Mars Rover" problem.

It takes a purely functional approach and does not use OOP/classes, but rather relies on pure functions that do not modify a global or internal state. For a different approach, you can see a previous implementation I did of this in Kotlin [here](https://github.com/craig-feldman/mars-rover). The advantage of a functional approach is that it is very testable and easy to reason about state transitions.

Input is provided to the program via a file named `input`. You can modify that as you wish. I have assumed that the file will be formatted correctly so don't have all the validation checks in place that would be required for a production-grade application. If a command will take the rover out of bounds, the command is just ignored. One could easily modify this to log a warning or throw an error in this case.

To run the project, you will require nodejs. From the project directory, simply run `npm install` followed by `node rover.ts`. To run the unit tests, run `npm run test`.

## The brief

A squad of robotic rovers are to be landed by NASA on a plateau on Mars. This plateau, which is curiously rectangular, must be navigated by the rovers so that their on-board cameras can get a complete view of the surrounding terrain to send back to Earth.

A rover's position and location are represented by a combination of x and y co-ordinates and a letter representing one of the four cardinal compass points. The plateau is divided up into a grid to simplify navigation. An example position might be 0, 0, N, which means the rover is in the bottom left corner and facing North.

To control a rover, NASA sends a simple string of letters. The possible letters are 'L', 'R' and 'M'. 'L' and 'R' makes the rover spin 90 degrees left or right respectively, without moving from its current spot. 'M' means move forward one grid point and maintain the same heading.

Assume that the square directly North from (x, y) is (x, y+1).

The first line of input is the upper-right coordinates of the plateau, the lower-left coordinates are assumed to be 0,0. The rest of the input is information pertaining to the rovers that have been deployed. Each rover has two lines of input. The first line gives the rover's position, and the second line is a series of instructions telling the rover how to explore the plateau.

The position is made up of two integers and a letter separated by spaces, corresponding to the x and y coordinates and the rover's orientation.

Each rover will be finished sequentially, which means that the second rover won't start to move until the first one has finished moving.

The output for each rover should be its final coordinates and heading.

Input

5 5

1 2 N

LMLMLMLMM

3 3 E

MMRMMRMRRM

Output

1 3 N

5 1 E
