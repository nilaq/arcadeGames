import { useEffect, useRef } from 'react';
import {Cell, BoardDimensions, Direction, getRandomPosition} from '../lib/gameUtils';


export function getNextFoodCell(boardDimensions: BoardDimensions, snakeBody: Cell[]): Cell {
  let foodCell = getRandomPosition(boardDimensions);
  while (snakeBody.some(cell => cell.row === foodCell.row && cell.col === foodCell.col)) {
    foodCell = getRandomPosition(boardDimensions);
  }
  return foodCell;
}
