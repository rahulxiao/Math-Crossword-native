export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD' | 'EXPERT';

export interface Cell {
  id: string;
  row: number;
  col: number;
  value: number | null; // The number entered or pre-filled
  isLocked: boolean; // True if it's a pre-filled clue number
  type: 'NUMBER' | 'OPERATOR' | 'EQUALS' | 'BLOCK'; 
  // For this game, we might only store Numbers in the grid interaction 
  // and operators might be part of the visual background or a separate layer, 
  // BUT for a crossword style, usually operators are blacked out or separate cells.
  // User request: "Crossword grid... Each row/column has a math clue".
  // Actually, usually in these games, the grid contains numbers, and the operators are implied or between cells.
  // "Players tap a cell and choose a number (0-9)... Intersecting cells must satisfy both equations"
  // Let's assume the grid ONLY contains numbers, and the operators are part of the constraint/clue, 
  // OR the grid includes operators as fixed cells.
  // "12 / [] = []" -> This implies operators MIGHT be visible on grid or just clues.
  // "Crossword-like grid... Each row/column has a math clue".
  // If it's a crossword, usually you fill the WHOLE thing.
  // Let's support an explicit operator cell just in case, but mostly it's numbers.
  
  displayValue?: string; // For operators like '+', '=', or empty for input
  isValid?: boolean | null; // null = neutral, true = correct, false = wrong
}

export interface Grid {
  rows: number;
  cols: number;
  cells: Cell[][];
}

export interface Clue {
  direction: 'ROW' | 'COL';
  index: number; // Row or Col index
  equation: string; // e.g. "x + y = 9"
  // Or maybe structured: parts: (number | string)[]
}

export interface Level {
  id: string;
  difficulty: Difficulty;
  grid: Grid;
  // If the logic is "equations in the grid", we need to know what those equations are.
  // Or we just validate the numbers against a known solution or run a math check.
  // Map of cell ID to correct value
  solution?: Record<string, number>; 
}
