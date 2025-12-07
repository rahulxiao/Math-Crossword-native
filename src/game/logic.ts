import { Levels } from './levels';
import { Grid, Level } from './types';

export const TOTAL_LEVELS = Levels.length;

export const generateLevel = (levelInput: number | /* legacy */ string = 1): Level => {
  let levelIndex = 0;

  if (typeof levelInput === 'number') {
    levelIndex = Math.max(0, Math.min(levelInput - 1, Levels.length - 1));
  } else {
    console.warn('generateLevel called with string/invalid input:', levelInput);
    levelIndex = 0;
  }

  const getLevelData = Levels[levelIndex];
  if (!getLevelData) {
    console.error(`Level data missing for index ${levelIndex}`);
    // Fallback
    return generateLevel(1);
  }

  const levelData = getLevelData();

  return {
    id: `level-${levelIndex + 1}`,
    difficulty: 'EASY',
    grid: { rows: 5, cols: 5, cells: levelData.cells },
    solution: levelData.solution
  };
};

export const getHintForCell = (level: Level, cellId: string): number | null => {
  if (!level.solution) return null;
  return level.solution[cellId] ?? null;
};

export const evaluateEquation = (equation: string[]): boolean => {
  if (!equation.includes('=')) return false;
  const parts = equation.join('').split('=');
  if (parts.length !== 2) return false;

  try {
    const left = Function('"use strict";return (' + parts[0] + ')')();
    const right = Function('"use strict";return (' + parts[1] + ')')();
    return Math.abs(left - right) < 0.0001; // Float tolerance
  } catch (e) {
    return false;
  }
};

export const validateGrid = (grid: Grid): { isComplete: boolean; invalidCells: string[] } => {
  let isComplete = true; // Assume true until fail
  const invalidCells: string[] = [];
  let allFilled = true;

  // Check Rows
  for (let r = 0; r < grid.rows; r += 2) {
    const rowTokens: (string | number)[] = [];
    const rowCellIds: string[] = [];
    let hasEmpty = false;

    for (let c = 0; c < grid.cols; c++) {
      const cell = grid.cells[r][c];
      if (cell.type === 'BLOCK') continue;

      rowCellIds.push(cell.id);

      if (cell.type === 'NUMBER') {
        if (cell.value === null) {
          hasEmpty = true;
          break;
        }
        rowTokens.push(cell.value);
      } else if (cell.displayValue) {
        rowTokens.push(cell.displayValue);
      }
    }

    if (!hasEmpty) {
      const isValid = evaluateEquation(rowTokens.map(String));
      if (!isValid) {
        isComplete = false;
        invalidCells.push(...rowCellIds);
      }
    } else {
      allFilled = false;
      isComplete = false;
    }
  }

  // Check Cols
  for (let c = 0; c < grid.cols; c += 2) {
    const colTokens: (string | number)[] = [];
    const colCellIds: string[] = [];
    let hasEmpty = false;

    for (let r = 0; r < grid.rows; r++) {
      const cell = grid.cells[r][c];
      if (cell.type === 'BLOCK') continue;

      colCellIds.push(cell.id);

      if (cell.type === 'NUMBER') {
        if (cell.value === null) {
          hasEmpty = true;
          break;
        }
        colTokens.push(cell.value);
      } else if (cell.displayValue) {
        colTokens.push(cell.displayValue);
      }
    }

    if (!hasEmpty) {
      const isValid = evaluateEquation(colTokens.map(String));
      if (!isValid) {
        isComplete = false;
        invalidCells.push(...colCellIds);
      }
    } else {
      allFilled = false;
      isComplete = false;
    }
  }

  // If any cell is empty, it's not complete.
  if (!allFilled) isComplete = false;

  return { isComplete, invalidCells };
};
