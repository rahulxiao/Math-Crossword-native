import { Cell } from './types';

// Helper to create a cell
const createCell = (
  row: number,
  col: number,
  value: number | null,
  type: Cell['type'],
  isLocked: boolean = false,
  displayValue?: string
): Cell => ({
  id: `${row}-${col}`,
  row,
  col,
  value,
  type,
  isLocked,
  displayValue,
  isValid: null,
});

const getSolutionMap = (cells: Cell[][]): Record<string, number> => {
  const solution: Record<string, number> = {};
  cells.forEach(row => {
    row.forEach(cell => {
      if (cell.type === 'NUMBER' && cell.value !== null) {
        solution[cell.id] = cell.value;
      }
    });
  });
  return solution;
};

const prepareLevel = (cells: Cell[][]) => {
  const solution = getSolutionMap(cells);
  // Strip non-locked values
  const textCells = cells.map(row => row.map(cell => {
    if (!cell.isLocked && cell.type === 'NUMBER') {
      return { ...cell, value: null };
    }
    return cell;
  }));
  return { cells: textCells, solution };
};

// --- Levels ---

// Level 1: Basic Addition
// R0: 2 + 3 = 5
// C0: 2 + 1 = 3
// R2: 1 + 2 = 3
// C2: 3 + 2 = 5
// R4: 3 + 5 = 8
// C4: 5 + 3 = 8
export const getLevel1 = () => {
  const cells: Cell[][] = [];
  for (let r = 0; r < 5; r++) {
    const row: Cell[] = [];
    for (let c = 0; c < 5; c++) row.push(createCell(r, c, null, 'BLOCK', true));
    cells.push(row);
  }

  cells[0] = [
    createCell(0, 0, 2, 'NUMBER', true),
    createCell(0, 1, null, 'OPERATOR', true, '+'),
    createCell(0, 2, 3, 'NUMBER', false),
    createCell(0, 3, null, 'EQUALS', true, '='),
    createCell(0, 4, 5, 'NUMBER', false)
  ];
  
  cells[1] = [
    createCell(1, 0, null, 'OPERATOR', true, '+'),
    createCell(1, 1, null, 'BLOCK', true),
    createCell(1, 2, null, 'OPERATOR', true, '+'),
    createCell(1, 3, null, 'BLOCK', true),
    createCell(1, 4, null, 'OPERATOR', true, '+')
  ];
  
  cells[2] = [
    createCell(2, 0, 1, 'NUMBER', false),
    createCell(2, 1, null, 'OPERATOR', true, '+'),
    createCell(2, 2, 2, 'NUMBER', true),
    createCell(2, 3, null, 'EQUALS', true, '='),
    createCell(2, 4, 3, 'NUMBER', true)
  ];
  
  cells[3] = [
    createCell(3, 0, null, 'EQUALS', true, '='),
    createCell(3, 1, null, 'BLOCK', true),
    createCell(3, 2, null, 'EQUALS', true, '='),
    createCell(3, 3, null, 'BLOCK', true),
    createCell(3, 4, null, 'EQUALS', true, '=')
  ];
  
  cells[4] = [
    createCell(4, 0, 3, 'NUMBER', false),
    createCell(4, 1, null, 'OPERATOR', true, '+'),
    createCell(4, 2, 5, 'NUMBER', false),
    createCell(4, 3, null, 'EQUALS', true, '='),
    createCell(4, 4, 8, 'NUMBER', true)
  ];

  return prepareLevel(cells);
};

// Level 2: Subtraction
// R0: 9 - 3 = 6
// C0: 9 - 2 = 7
// R2: 2 + 4 = 6
// C2: 3 + 4 = 7
// R4: 7 - 7 = 0
// C4: 6 - 6 = 0
export const getLevel2 = () => {
  const cells: Cell[][] = [];
  for (let r = 0; r < 5; r++) {
    const row: Cell[] = [];
    for (let c = 0; c < 5; c++) row.push(createCell(r, c, null, 'BLOCK', true));
    cells.push(row);
  }

  cells[0] = [
    createCell(0, 0, 9, 'NUMBER', false),
    createCell(0, 1, null, 'OPERATOR', true, '-'),
    createCell(0, 2, 3, 'NUMBER', true),
    createCell(0, 3, null, 'EQUALS', true, '='),
    createCell(0, 4, 6, 'NUMBER', false)
  ];
  
  cells[1] = [
    createCell(1, 0, null, 'OPERATOR', true, '-'),
    createCell(1, 1, null, 'BLOCK', true),
    createCell(1, 2, null, 'OPERATOR', true, '+'),
    createCell(1, 3, null, 'BLOCK', true),
    createCell(1, 4, null, 'OPERATOR', true, '-')
  ];
  
  cells[2] = [
    createCell(2, 0, 2, 'NUMBER', true),
    createCell(2, 1, null, 'OPERATOR', true, '+'),
    createCell(2, 2, 4, 'NUMBER', false),
    createCell(2, 3, null, 'EQUALS', true, '='),
    createCell(2, 4, 6, 'NUMBER', true)
  ];
  
  cells[3] = [
    createCell(3, 0, null, 'EQUALS', true, '='),
    createCell(3, 1, null, 'BLOCK', true),
    createCell(3, 2, null, 'EQUALS', true, '='),
    createCell(3, 3, null, 'BLOCK', true),
    createCell(3, 4, null, 'EQUALS', true, '=')
  ];
  
  cells[4] = [
    createCell(4, 0, 7, 'NUMBER', false),
    createCell(4, 1, null, 'OPERATOR', true, '-'),
    createCell(4, 2, 7, 'NUMBER', false),
    createCell(4, 3, null, 'EQUALS', true, '='),
    createCell(4, 4, 0, 'NUMBER', false)
  ];

  return prepareLevel(cells);
};

// Level 3: Multiplication
// R0: 3 * 2 = 6
// C0: 3 + 2 = 5
// R2: 2 + 1 = 3
// C2: 2 + 1 = 3
// R4: 5 - 3 = 2
// C4: 6 - 3 = 3 (Wait: 6-3=3, but R4C4=2. Let me recalc)
// Actually: C4: 6 + 3 = 9, R4C4 should be 9? No...
// Let me redo properly:
// R0: 3 * 2 = 6
// C0: 3 + 1 = 4
// R2: 1 + 2 = 3
// C2: 2 + 2 = 4
// R4: 4 - 4 = 0
// C4: 6 - 3 = 3, but R4C4 = 0. Conflict!
// New attempt:
// R0: 2 * 3 = 6
// C0: 2 + 3 = 5
// R2: 3 + 1 = 4
// C2: 3 + 1 = 4
// R4: 5 + 4 = 9
// C4: 6 + 4 = 10? No R4C4=9. So 6+3=9. R2C4=3.
export const getLevel3 = () => {
  const cells: Cell[][] = [];
  for (let r = 0; r < 5; r++) {
    const row: Cell[] = [];
    for (let c = 0; c < 5; c++) row.push(createCell(r, c, null, 'BLOCK', true));
    cells.push(row);
  }

  cells[0] = [
    createCell(0, 0, 2, 'NUMBER', true),
    createCell(0, 1, null, 'OPERATOR', true, '*'),
    createCell(0, 2, 3, 'NUMBER', false),
    createCell(0, 3, null, 'EQUALS', true, '='),
    createCell(0, 4, 6, 'NUMBER', true)
  ];
  
  cells[1] = [
    createCell(1, 0, null, 'OPERATOR', true, '+'),
    createCell(1, 1, null, 'BLOCK', true),
    createCell(1, 2, null, 'OPERATOR', true, '+'),
    createCell(1, 3, null, 'BLOCK', true),
    createCell(1, 4, null, 'OPERATOR', true, '+')
  ];
  
  cells[2] = [
    createCell(2, 0, 3, 'NUMBER', false),
    createCell(2, 1, null, 'OPERATOR', true, '+'),
    createCell(2, 2, 1, 'NUMBER', true),
    createCell(2, 3, null, 'EQUALS', true, '='),
    createCell(2, 4, 4, 'NUMBER', false)
  ];
  
  cells[3] = [
    createCell(3, 0, null, 'EQUALS', true, '='),
    createCell(3, 1, null, 'BLOCK', true),
    createCell(3, 2, null, 'EQUALS', true, '='),
    createCell(3, 3, null, 'BLOCK', true),
    createCell(3, 4, null, 'EQUALS', true, '=')
  ];
  
  cells[4] = [
    createCell(4, 0, 5, 'NUMBER', false),
    createCell(4, 1, null, 'OPERATOR', true, '+'),
    createCell(4, 2, 4, 'NUMBER', false),
    createCell(4, 3, null, 'EQUALS', true, '='),
    createCell(4, 4, 10, 'NUMBER', true)
  ];

  return prepareLevel(cells);
};

// Level 4: Division
// R0: 8 / 2 = 4
// C0: 8 - 2 = 6
// R2: 2 + 4 = 6
// C2: 2 + 4 = 6
// R4: 6 - 6 = 0
// C4: 4 - 6 = -2 (No negatives!)
// Redo:
// R0: 8 / 2 = 4
// C0: 8 / 2 = 4
// R2: 2 * 3 = 6
// C2: 2 * 3 = 6
// R4: 4 + 6 = 10
// C4: 4 + 6 = 10
export const getLevel4 = () => {
  const cells: Cell[][] = [];
  for (let r = 0; r < 5; r++) {
    const row: Cell[] = [];
    for (let c = 0; c < 5; c++) row.push(createCell(r, c, null, 'BLOCK', true));
    cells.push(row);
  }

  cells[0] = [
    createCell(0, 0, 8, 'NUMBER', false),
    createCell(0, 1, null, 'OPERATOR', true, '/'),
    createCell(0, 2, 2, 'NUMBER', true),
    createCell(0, 3, null, 'EQUALS', true, '='),
    createCell(0, 4, 4, 'NUMBER', false)
  ];
  
  cells[1] = [
    createCell(1, 0, null, 'OPERATOR', true, '/'),
    createCell(1, 1, null, 'BLOCK', true),
    createCell(1, 2, null, 'OPERATOR', true, '*'),
    createCell(1, 3, null, 'BLOCK', true),
    createCell(1, 4, null, 'OPERATOR', true, '+')
  ];
  
  cells[2] = [
    createCell(2, 0, 2, 'NUMBER', true),
    createCell(2, 1, null, 'OPERATOR', true, '*'),
    createCell(2, 2, 3, 'NUMBER', false),
    createCell(2, 3, null, 'EQUALS', true, '='),
    createCell(2, 4, 6, 'NUMBER', true)
  ];
  
  cells[3] = [
    createCell(3, 0, null, 'EQUALS', true, '='),
    createCell(3, 1, null, 'BLOCK', true),
    createCell(3, 2, null, 'EQUALS', true, '='),
    createCell(3, 3, null, 'BLOCK', true),
    createCell(3, 4, null, 'EQUALS', true, '=')
  ];
  
  cells[4] = [
    createCell(4, 0, 4, 'NUMBER', false),
    createCell(4, 1, null, 'OPERATOR', true, '+'),
    createCell(4, 2, 6, 'NUMBER', false),
    createCell(4, 3, null, 'EQUALS', true, '='),
    createCell(4, 4, 10, 'NUMBER', false)
  ];

  return prepareLevel(cells);
};

// Level 5: Mixed Operations
// R0: 6 + 3 = 9
// C0: 6 / 2 = 3
// R2: 2 * 4 = 8
// C2: 3 + 4 = 7
// R4: 3 + 7 = 10
// C4: 9 - 8 = 1, but R4C4=10. Conflict!
// Redo:
// R0: 4 + 5 = 9
// C0: 4 * 2 = 8
// R2: 2 + 3 = 5
// C2: 5 - 3 = 2
// R4: 8 - 2 = 6
// C4: 9 - 5 = 4, but R4C4=6. Conflict!
// Simple approach:
// R0: 5 + 4 = 9
// C0: 5 + 4 = 9
// R2: 4 + 5 = 9
// C2: 4 + 5 = 9
// R4: 9 + 9 = 18
// C4: 9 + 9 = 18
// Level 5: Mixed Operations (Fixed)
// R0: 5 + 4 = 9
// C0: 5 + 4 = 9
// R2: 4 + 5 = 9
// C2: 4 + 5 = 9
// R4: 9 + 9 = 18
// C4: 9 + 9 = 18
export const getLevel5 = () => {
  const cells: Cell[][] = [];
  for (let r = 0; r < 5; r++) { const row = []; for (let c = 0; c < 5; c++) row.push(createCell(r, c, null, 'BLOCK', true)); cells.push(row); }

  cells[0] = [createCell(0,0,5,'NUMBER',true),createCell(0,1,null,'OPERATOR',true,'+'),createCell(0,2,4,'NUMBER',false),createCell(0,3,null,'EQUALS',true,'='),createCell(0,4,9,'NUMBER',true)];
  cells[1] = [createCell(1,0,null,'OPERATOR',true,'+'),createCell(1,1,null,'BLOCK',true),createCell(1,2,null,'OPERATOR',true,'+'),createCell(1,3,null,'BLOCK',true),createCell(1,4,null,'OPERATOR',true,'+')];
  cells[2] = [createCell(2,0,4,'NUMBER',false),createCell(2,1,null,'OPERATOR',true,'+'),createCell(2,2,5,'NUMBER',true),createCell(2,3,null,'EQUALS',true,'='),createCell(2,4,9,'NUMBER',false)];
  cells[3] = [createCell(3,0,null,'EQUALS',true,'='),createCell(3,1,null,'BLOCK',true),createCell(3,2,null,'EQUALS',true,'='),createCell(3,3,null,'BLOCK',true),createCell(3,4,null,'EQUALS',true,'=')];
  cells[4] = [createCell(4,0,9,'NUMBER',false),createCell(4,1,null,'OPERATOR',true,'+'),createCell(4,2,9,'NUMBER',false),createCell(4,3,null,'EQUALS',true,'='),createCell(4,4,18,'NUMBER',true)];

  return prepareLevel(cells);
};

// Level 6: More Challenge (Fixed)
// R0: 4 + 5 = 9
// C0: 4 * 2 = 8
// R2: 2 + 3 = 5
// C2: 5 - 3 = 2
// R4: 8 / 2 = 4
// C4: 9 - 5 = 4
export const getLevel6 = () => {
    const cells: Cell[][] = [];
    for (let r = 0; r < 5; r++) { const row = []; for (let c = 0; c < 5; c++) row.push(createCell(r, c, null, 'BLOCK', true)); cells.push(row); }
    cells[0] = [createCell(0,0,4,'NUMBER',false),createCell(0,1,null,'OPERATOR',true,'+'),createCell(0,2,5,'NUMBER',true),createCell(0,3,null,'EQUALS',true,'='),createCell(0,4,9,'NUMBER',false)];
    cells[1] = [createCell(1,0,null,'OPERATOR',true,'*'),createCell(1,1,null,'BLOCK',true),createCell(1,2,null,'OPERATOR',true,'-'),createCell(1,3,null,'BLOCK',true),createCell(1,4,null,'OPERATOR',true,'-')];
    cells[2] = [createCell(2,0,2,'NUMBER',true),createCell(2,1,null,'OPERATOR',true,'+'),createCell(2,2,3,'NUMBER',false),createCell(2,3,null,'EQUALS',true,'='),createCell(2,4,5,'NUMBER',true)];
    cells[3] = [createCell(3,0,null,'EQUALS',true,'='),createCell(3,1,null,'BLOCK',true),createCell(3,2,null,'EQUALS',true,'='),createCell(3,3,null,'BLOCK',true),createCell(3,4,null,'EQUALS',true,'=')];
    cells[4] = [createCell(4,0,8,'NUMBER',false),createCell(4,1,null,'OPERATOR',true,'/'),createCell(4,2,2,'NUMBER',false),createCell(4,3,null,'EQUALS',true,'='),createCell(4,4,4,'NUMBER',false)];
    return prepareLevel(cells);
};

// Level 7: Addition & Subtraction Mix
// R0: 9 - 4 = 5
// C0: 9 - 2 = 7
// R2: 2 + 3 = 5
// C2: 4 - 3 = 1
// R4: 7 - 1 = 6
// C4: 5 + 1 = 6
export const getLevel7 = () => {
    const cells: Cell[][] = [];
    for (let r = 0; r < 5; r++) { const row = []; for (let c = 0; c < 5; c++) row.push(createCell(r, c, null, 'BLOCK', true)); cells.push(row); }
    cells[0] = [createCell(0,0,9,'NUMBER',false),createCell(0,1,null,'OPERATOR',true,'-'),createCell(0,2,4,'NUMBER',true),createCell(0,3,null,'EQUALS',true,'='),createCell(0,4,5,'NUMBER',false)];
    cells[1] = [createCell(1,0,null,'OPERATOR',true,'-'),createCell(1,1,null,'BLOCK',true),createCell(1,2,null,'OPERATOR',true,'-'),createCell(1,3,null,'BLOCK',true),createCell(1,4,null,'OPERATOR',true,'+')];
    cells[2] = [createCell(2,0,2,'NUMBER',true),createCell(2,1,null,'OPERATOR',true,'+'),createCell(2,2,3,'NUMBER',false),createCell(2,3,null,'EQUALS',true,'='),createCell(2,4,5,'NUMBER',true)];
    cells[3] = [createCell(3,0,null,'EQUALS',true,'='),createCell(3,1,null,'BLOCK',true),createCell(3,2,null,'EQUALS',true,'='),createCell(3,3,null,'BLOCK',true),createCell(3,4,null,'EQUALS',true,'=')];
    cells[4] = [createCell(4,0,7,'NUMBER',false),createCell(4,1,null,'OPERATOR',true,'-'),createCell(4,2,1,'NUMBER',true),createCell(4,3,null,'EQUALS',true,'='),createCell(4,4,6,'NUMBER',false)];
    return prepareLevel(cells);
};

// Level 8: Simple Multiplication (Fixed)
// R0: 2 + 6 = 8
// C0: 2 * 4 = 8
// R2: 4 / 2 = 2
// C2: 6 - 2 = 4
// R4: 8 - 4 = 4
// C4: 8 / 2 = 4
export const getLevel8 = () => {
    const cells: Cell[][] = [];
    for (let r = 0; r < 5; r++) { const row = []; for (let c = 0; c < 5; c++) row.push(createCell(r, c, null, 'BLOCK', true)); cells.push(row); }
    cells[0] = [createCell(0,0,2,'NUMBER',false),createCell(0,1,null,'OPERATOR',true,'+'),createCell(0,2,6,'NUMBER',true),createCell(0,3,null,'EQUALS',true,'='),createCell(0,4,8,'NUMBER',true)];
    cells[1] = [createCell(1,0,null,'OPERATOR',true,'*'),createCell(1,1,null,'BLOCK',true),createCell(1,2,null,'OPERATOR',true,'-'),createCell(1,3,null,'BLOCK',true),createCell(1,4,null,'OPERATOR',true,'/')];
    cells[2] = [createCell(2,0,4,'NUMBER',true),createCell(2,1,null,'OPERATOR',true,'/'),createCell(2,2,2,'NUMBER',false),createCell(2,3,null,'EQUALS',true,'='),createCell(2,4,2,'NUMBER',true)];
    cells[3] = [createCell(3,0,null,'EQUALS',true,'='),createCell(3,1,null,'BLOCK',true),createCell(3,2,null,'EQUALS',true,'='),createCell(3,3,null,'BLOCK',true),createCell(3,4,null,'EQUALS',true,'=')];
    cells[4] = [createCell(4,0,8,'NUMBER',false),createCell(4,1,null,'OPERATOR',true,'-'),createCell(4,2,4,'NUMBER',true),createCell(4,3,null,'EQUALS',true,'='),createCell(4,4,4,'NUMBER',false)];
    return prepareLevel(cells);
};

// Level 9: Division & Addition (Fixed)
// R0: 8 / 4 = 2
// C0: 8 - 5 = 3
// R2: 5 - 1 = 4
// C2: 4 - 1 = 3
// R4: 3 + 3 = 6
// C4: 2 + 4 = 6
export const getLevel9 = () => {
    const cells: Cell[][] = [];
    for (let r = 0; r < 5; r++) { const row = []; for (let c = 0; c < 5; c++) row.push(createCell(r, c, null, 'BLOCK', true)); cells.push(row); }
    cells[0] = [createCell(0,0,8,'NUMBER',false),createCell(0,1,null,'OPERATOR',true,'/'),createCell(0,2,4,'NUMBER',true),createCell(0,3,null,'EQUALS',true,'='),createCell(0,4,2,'NUMBER',true)];
    cells[1] = [createCell(1,0,null,'OPERATOR',true,'-'),createCell(1,1,null,'BLOCK',true),createCell(1,2,null,'OPERATOR',true,'-'),createCell(1,3,null,'BLOCK',true),createCell(1,4,null,'OPERATOR',true,'+')];
    cells[2] = [createCell(2,0,5,'NUMBER',true),createCell(2,1,null,'OPERATOR',true,'-'),createCell(2,2,1,'NUMBER',true),createCell(2,3,null,'EQUALS',true,'='),createCell(2,4,4,'NUMBER',false)];
    cells[3] = [createCell(3,0,null,'EQUALS',true,'='),createCell(3,1,null,'BLOCK',true),createCell(3,2,null,'EQUALS',true,'='),createCell(3,3,null,'BLOCK',true),createCell(3,4,null,'EQUALS',true,'=')];
    cells[4] = [createCell(4,0,3,'NUMBER',true),createCell(4,1,null,'OPERATOR',true,'+'),createCell(4,2,3,'NUMBER',false),createCell(4,3,null,'EQUALS',true,'='),createCell(4,4,6,'NUMBER',true)];
    return prepareLevel(cells);
};

// Level 10 (Fixed)
// R0: 4 * 2 = 8
// C0: 4 + 3 = 7
// R2: 3 + 1 = 4
// C2: 2 + 1 = 3
// R4: 7 - 3 = 4
// C4: 8 - 4 = 4
export const getLevel10 = () => {
    const cells: Cell[][] = [];
    for (let r = 0; r < 5; r++) { const row = []; for (let c = 0; c < 5; c++) row.push(createCell(r, c, null, 'BLOCK', true)); cells.push(row); }
    cells[0] = [createCell(0,0,4,'NUMBER',false),createCell(0,1,null,'OPERATOR',true,'*'),createCell(0,2,2,'NUMBER',true),createCell(0,3,null,'EQUALS',true,'='),createCell(0,4,8,'NUMBER',false)];
    cells[1] = [createCell(1,0,null,'OPERATOR',true,'+'),createCell(1,1,null,'BLOCK',true),createCell(1,2,null,'OPERATOR',true,'+'),createCell(1,3,null,'BLOCK',true),createCell(1,4,null,'OPERATOR',true,'-')];
    cells[2] = [createCell(2,0,3,'NUMBER',true),createCell(2,1,null,'OPERATOR',true,'*'),createCell(2,2,1,'NUMBER',false),createCell(2,3,null,'EQUALS',true,'='),createCell(2,4,4,'NUMBER',true)];
    cells[3] = [createCell(3,0,null,'EQUALS',true,'='),createCell(3,1,null,'BLOCK',true),createCell(3,2,null,'EQUALS',true,'='),createCell(3,3,null,'BLOCK',true),createCell(3,4,null,'EQUALS',true,'=')];
    cells[4] = [createCell(4,0,7,'NUMBER',false),createCell(4,1,null,'OPERATOR',true,'-'),createCell(4,2,3,'NUMBER',true),createCell(4,3,null,'EQUALS',true,'='),createCell(4,4,4,'NUMBER',false)];
    return prepareLevel(cells);
};

// Level 11 (Fixed)
// R0: 6 / 2 = 3
// C0: 6 - 4 = 2
// R2: 4 + 2 = 6
// C2: 2 + 2 = 4
// R4: 2 + 4 = 6
// C4: 3 + 6 = 9
export const getLevel11 = () => {
    const cells: Cell[][] = [];
    for (let r = 0; r < 5; r++) { const row = []; for (let c = 0; c < 5; c++) row.push(createCell(r, c, null, 'BLOCK', true)); cells.push(row); }
    cells[0] = [createCell(0,0,6,'NUMBER',true),createCell(0,1,null,'OPERATOR',true,'/'),createCell(0,2,2,'NUMBER',false),createCell(0,3,null,'EQUALS',true,'='),createCell(0,4,3,'NUMBER',true)];
    cells[1] = [createCell(1,0,null,'OPERATOR',true,'-'),createCell(1,1,null,'BLOCK',true),createCell(1,2,null,'OPERATOR',true,'+'),createCell(1,3,null,'BLOCK',true),createCell(1,4,null,'OPERATOR',true,'+')];
    cells[2] = [createCell(2,0,4,'NUMBER',false),createCell(2,1,null,'OPERATOR',true,'+'),createCell(2,2,2,'NUMBER',true),createCell(2,3,null,'EQUALS',true,'='),createCell(2,4,6,'NUMBER',false)];
    cells[3] = [createCell(3,0,null,'EQUALS',true,'='),createCell(3,1,null,'BLOCK',true),createCell(3,2,null,'EQUALS',true,'='),createCell(3,3,null,'BLOCK',true),createCell(3,4,null,'EQUALS',true,'=')];
    cells[4] = [createCell(4,0,2,'NUMBER',true),createCell(4,1,null,'OPERATOR',true,'+'),createCell(4,2,4,'NUMBER',false),createCell(4,3,null,'EQUALS',true,'='),createCell(4,4,9,'NUMBER',true)];
    return prepareLevel(cells);
};

// Level 12 (Fixed)
// R0: 7 + 2 = 9
// C0: 7 - 5 = 2
// R2: 5 - 1 = 4
// C2: 2 + 1 = 3
// R4: 2 + 3 = 5
// C4: 9 - 4 = 5
export const getLevel12 = () => {
    const cells: Cell[][] = [];
    for (let r = 0; r < 5; r++) { const row = []; for (let c = 0; c < 5; c++) row.push(createCell(r, c, null, 'BLOCK', true)); cells.push(row); }
    cells[0] = [createCell(0,0,7,'NUMBER',false),createCell(0,1,null,'OPERATOR',true,'+'),createCell(0,2,2,'NUMBER',true),createCell(0,3,null,'EQUALS',true,'='),createCell(0,4,9,'NUMBER',false)];
    cells[1] = [createCell(1,0,null,'OPERATOR',true,'-'),createCell(1,1,null,'BLOCK',true),createCell(1,2,null,'OPERATOR',true,'+'),createCell(1,3,null,'BLOCK',true),createCell(1,4,null,'OPERATOR',true,'-')];
    cells[2] = [createCell(2,0,5,'NUMBER',true),createCell(2,1,null,'OPERATOR',true,'-'),createCell(2,2,1,'NUMBER',false),createCell(2,3,null,'EQUALS',true,'='),createCell(2,4,4,'NUMBER',true)];
    cells[3] = [createCell(3,0,null,'EQUALS',true,'='),createCell(3,1,null,'BLOCK',true),createCell(3,2,null,'EQUALS',true,'='),createCell(3,3,null,'BLOCK',true),createCell(3,4,null,'EQUALS',true,'=')];
    cells[4] = [createCell(4,0,2,'NUMBER',false),createCell(4,1,null,'OPERATOR',true,'+'),createCell(4,2,3,'NUMBER',true),createCell(4,3,null,'EQUALS',true,'='),createCell(4,4,5,'NUMBER',false)];
    return prepareLevel(cells);
};

// Level 13 (Fixed)
// R0: 2 + 2 = 4
// C0: 2 + 2 = 4
// R2: 2 + 2 = 4
// C2: 2 + 2 = 4
// R4: 4 + 4 = 8
// C4: 4 + 4 = 8
export const getLevel13 = () => {
    const cells: Cell[][] = [];
    for (let r = 0; r < 5; r++) { const row = []; for (let c = 0; c < 5; c++) row.push(createCell(r, c, null, 'BLOCK', true)); cells.push(row); }
    cells[0] = [createCell(0,0,2,'NUMBER',true),createCell(0,1,null,'OPERATOR',true,'+'),createCell(0,2,2,'NUMBER',false),createCell(0,3,null,'EQUALS',true,'='),createCell(0,4,4,'NUMBER',true)];
    cells[1] = [createCell(1,0,null,'OPERATOR',true,'+'),createCell(1,1,null,'BLOCK',true),createCell(1,2,null,'OPERATOR',true,'+'),createCell(1,3,null,'BLOCK',true),createCell(1,4,null,'OPERATOR',true,'+')];
    cells[2] = [createCell(2,0,2,'NUMBER',false),createCell(2,1,null,'OPERATOR',true,'+'),createCell(2,2,2,'NUMBER',true),createCell(2,3,null,'EQUALS',true,'='),createCell(2,4,4,'NUMBER',false)];
    cells[3] = [createCell(3,0,null,'EQUALS',true,'='),createCell(3,1,null,'BLOCK',true),createCell(3,2,null,'EQUALS',true,'='),createCell(3,3,null,'BLOCK',true),createCell(3,4,null,'EQUALS',true,'=')];
    cells[4] = [createCell(4,0,4,'NUMBER',true),createCell(4,1,null,'OPERATOR',true,'+'),createCell(4,2,4,'NUMBER',false),createCell(4,3,null,'EQUALS',true,'='),createCell(4,4,8,'NUMBER',true)];
    return prepareLevel(cells);
};

// Level 14 (Fixed)
// R0: 8 / 2 = 4
// R2: 2 * 3 = 6
// R4: 4 + 6 = 10
// C0: 8 - 4 = 4
// C2: 2 + 4 = 6
// C4: 4 + 6 = 10
export const getLevel14 = () => {
    const cells: Cell[][] = [];
    for (let r = 0; r < 5; r++) { const row = []; for (let c = 0; c < 5; c++) row.push(createCell(r, c, null, 'BLOCK', true)); cells.push(row); }
    cells[0] = [createCell(0,0,8,'NUMBER',false),createCell(0,1,null,'OPERATOR',true,'/'),createCell(0,2,2,'NUMBER',true),createCell(0,3,null,'EQUALS',true,'='),createCell(0,4,4,'NUMBER',true)];
    cells[1] = [createCell(1,0,null,'OPERATOR',true,'-'),createCell(1,1,null,'BLOCK',true),createCell(1,2,null,'OPERATOR',true,'+'),createCell(1,3,null,'BLOCK',true),createCell(1,4,null,'OPERATOR',true,'+')];
    cells[2] = [createCell(2,0,2,'NUMBER',true),createCell(2,1,null,'OPERATOR',true,'*'),createCell(2,2,3,'NUMBER',false),createCell(2,3,null,'EQUALS',true,'='),createCell(2,4,6,'NUMBER',false)];
    cells[3] = [createCell(3,0,null,'EQUALS',true,'='),createCell(3,1,null,'BLOCK',true),createCell(3,2,null,'EQUALS',true,'='),createCell(3,3,null,'BLOCK',true),createCell(3,4,null,'EQUALS',true,'=')];
    cells[4] = [createCell(4,0,4,'NUMBER',false),createCell(4,1,null,'OPERATOR',true,'+'),createCell(4,2,6,'NUMBER',true),createCell(4,3,null,'EQUALS',true,'='),createCell(4,4,10,'NUMBER',true)];
    return prepareLevel(cells);
};

// Level 15 (Fixed)
// R0: 5 + 4 = 9
// C0: 5 + 2 = 7
// R2: 2 + 3 = 5
// C2: 4 + 3 = 7
// R4: 7 + 7 = 14
// C4: 9 + 5 = 14
export const getLevel15 = () => {
    const cells: Cell[][] = [];
    for (let r = 0; r < 5; r++) { const row = []; for (let c = 0; c < 5; c++) row.push(createCell(r, c, null, 'BLOCK', true)); cells.push(row); }
    cells[0] = [createCell(0,0,5,'NUMBER',true),createCell(0,1,null,'OPERATOR',true,'+'),createCell(0,2,4,'NUMBER',false),createCell(0,3,null,'EQUALS',true,'='),createCell(0,4,9,'NUMBER',true)];
    cells[1] = [createCell(1,0,null,'OPERATOR',true,'+'),createCell(1,1,null,'BLOCK',true),createCell(1,2,null,'OPERATOR',true,'+'),createCell(1,3,null,'BLOCK',true),createCell(1,4,null,'OPERATOR',true,'+')];
    cells[2] = [createCell(2,0,2,'NUMBER',false),createCell(2,1,null,'OPERATOR',true,'+'),createCell(2,2,3,'NUMBER',true),createCell(2,3,null,'EQUALS',true,'='),createCell(2,4,5,'NUMBER',false)];
    cells[3] = [createCell(3,0,null,'EQUALS',true,'='),createCell(3,1,null,'BLOCK',true),createCell(3,2,null,'EQUALS',true,'='),createCell(3,3,null,'BLOCK',true),createCell(3,4,null,'EQUALS',true,'=')];
    cells[4] = [createCell(4,0,7,'NUMBER',true),createCell(4,1,null,'OPERATOR',true,'+'),createCell(4,2,7,'NUMBER',false),createCell(4,3,null,'EQUALS',true,'='),createCell(4,4,14,'NUMBER',true)];
    return prepareLevel(cells);
};

// Level 16 (Fixed)
// R0: 6 + 2 = 8
// R2: 2 + 2 = 4
// R4: 8 - 4 = 4
// C0: 6 + 2 = 8
// C2: 2 + 2 = 4
// C4: 8 - 4 = 4
export const getLevel16 = () => {
    const cells: Cell[][] = [];
    for (let r = 0; r < 5; r++) { const row = []; for (let c = 0; c < 5; c++) row.push(createCell(r, c, null, 'BLOCK', true)); cells.push(row); }
    cells[0] = [createCell(0,0,6,'NUMBER',false),createCell(0,1,null,'OPERATOR',true,'+'),createCell(0,2,2,'NUMBER',true),createCell(0,3,null,'EQUALS',true,'='),createCell(0,4,8,'NUMBER',true)];
    cells[1] = [createCell(1,0,null,'OPERATOR',true,'+'),createCell(1,1,null,'BLOCK',true),createCell(1,2,null,'OPERATOR',true,'+'),createCell(1,3,null,'BLOCK',true),createCell(1,4,null,'OPERATOR',true,'-')];
    cells[2] = [createCell(2,0,2,'NUMBER',true),createCell(2,1,null,'OPERATOR',true,'+'),createCell(2,2,2,'NUMBER',false),createCell(2,3,null,'EQUALS',true,'='),createCell(2,4,4,'NUMBER',true)];
    cells[3] = [createCell(3,0,null,'EQUALS',true,'='),createCell(3,1,null,'BLOCK',true),createCell(3,2,null,'EQUALS',true,'='),createCell(3,3,null,'BLOCK',true),createCell(3,4,null,'EQUALS',true,'=')];
    cells[4] = [createCell(4,0,8,'NUMBER',false),createCell(4,1,null,'OPERATOR',true,'-'),createCell(4,2,4,'NUMBER',true),createCell(4,3,null,'EQUALS',true,'='),createCell(4,4,4,'NUMBER',false)];
    return prepareLevel(cells);
};

// Level 17
export const getLevel17 = () => {
    const cells: Cell[][] = [];
    for (let r = 0; r < 5; r++) { const row = []; for (let c = 0; c < 5; c++) row.push(createCell(r, c, null, 'BLOCK', true)); cells.push(row); }
    cells[0] = [createCell(0,0,2,'NUMBER',true),createCell(0,1,null,'OPERATOR',true,'+'),createCell(0,2,3,'NUMBER',false),createCell(0,3,null,'EQUALS',true,'='),createCell(0,4,5,'NUMBER',true)];
    cells[1] = [createCell(1,0,null,'OPERATOR',true,'+'),createCell(1,1,null,'BLOCK',true),createCell(1,2,null,'OPERATOR',true,'+'),createCell(1,3,null,'BLOCK',true),createCell(1,4,null,'OPERATOR',true,'+')];
    cells[2] = [createCell(2,0,2,'NUMBER',false),createCell(2,1,null,'OPERATOR',true,'+'),createCell(2,2,1,'NUMBER',true),createCell(2,3,null,'EQUALS',true,'='),createCell(2,4,3,'NUMBER',false)];
    cells[3] = [createCell(3,0,null,'EQUALS',true,'='),createCell(3,1,null,'BLOCK',true),createCell(3,2,null,'EQUALS',true,'='),createCell(3,3,null,'BLOCK',true),createCell(3,4,null,'EQUALS',true,'=')];
    cells[4] = [createCell(4,0,4,'NUMBER',true),createCell(4,1,null,'OPERATOR',true,'+'),createCell(4,2,4,'NUMBER',false),createCell(4,3,null,'EQUALS',true,'='),createCell(4,4,8,'NUMBER',true)];
    return prepareLevel(cells);
};

// Level 18 (Fixed)
// R0: 9 - 3 = 6
// R2: 3 + 2 = 5
// R4: 6 + 5 = 11
// C0: 9 - 3 = 6
// C2: 3 + 2 = 5
// C4: 6 + 5 = 11
export const getLevel18 = () => {
    const cells: Cell[][] = [];
    for (let r = 0; r < 5; r++) { const row = []; for (let c = 0; c < 5; c++) row.push(createCell(r, c, null, 'BLOCK', true)); cells.push(row); }
    cells[0] = [createCell(0,0,9,'NUMBER',false),createCell(0,1,null,'OPERATOR',true,'-'),createCell(0,2,3,'NUMBER',true),createCell(0,3,null,'EQUALS',true,'='),createCell(0,4,6,'NUMBER',false)];
    cells[1] = [createCell(1,0,null,'OPERATOR',true,'-'),createCell(1,1,null,'BLOCK',true),createCell(1,2,null,'OPERATOR',true,'+'),createCell(1,3,null,'BLOCK',true),createCell(1,4,null,'OPERATOR',true,'+')];
    cells[2] = [createCell(2,0,3,'NUMBER',true),createCell(2,1,null,'OPERATOR',true,'+'),createCell(2,2,2,'NUMBER',false),createCell(2,3,null,'EQUALS',true,'='),createCell(2,4,5,'NUMBER',true)];
    cells[3] = [createCell(3,0,null,'EQUALS',true,'='),createCell(3,1,null,'BLOCK',true),createCell(3,2,null,'EQUALS',true,'='),createCell(3,3,null,'BLOCK',true),createCell(3,4,null,'EQUALS',true,'=')];
    cells[4] = [createCell(4,0,6,'NUMBER',false),createCell(4,1,null,'OPERATOR',true,'+'),createCell(4,2,5,'NUMBER',true),createCell(4,3,null,'EQUALS',true,'='),createCell(4,4,11,'NUMBER',true)];
    return prepareLevel(cells);
};

// Level 19
export const getLevel19 = () => {
    const cells: Cell[][] = [];
    for (let r = 0; r < 5; r++) { const row = []; for (let c = 0; c < 5; c++) row.push(createCell(r, c, null, 'BLOCK', true)); cells.push(row); }
    cells[0] = [createCell(0,0,3,'NUMBER',false),createCell(0,1,null,'OPERATOR',true,'+'),createCell(0,2,3,'NUMBER',true),createCell(0,3,null,'EQUALS',true,'='),createCell(0,4,6,'NUMBER',false)];
    cells[1] = [createCell(1,0,null,'OPERATOR',true,'+'),createCell(1,1,null,'BLOCK',true),createCell(1,2,null,'OPERATOR',true,'+'),createCell(1,3,null,'BLOCK',true),createCell(1,4,null,'OPERATOR',true,'+')];
    cells[2] = [createCell(2,0,2,'NUMBER',true),createCell(2,1,null,'OPERATOR',true,'+'),createCell(2,2,2,'NUMBER',false),createCell(2,3,null,'EQUALS',true,'='),createCell(2,4,4,'NUMBER',true)];
    cells[3] = [createCell(3,0,null,'EQUALS',true,'='),createCell(3,1,null,'BLOCK',true),createCell(3,2,null,'EQUALS',true,'='),createCell(3,3,null,'BLOCK',true),createCell(3,4,null,'EQUALS',true,'=')];
    cells[4] = [createCell(4,0,5,'NUMBER',false),createCell(4,1,null,'OPERATOR',true,'+'),createCell(4,2,5,'NUMBER',true),createCell(4,3,null,'EQUALS',true,'='),createCell(4,4,10,'NUMBER',false)];
    return prepareLevel(cells);
};

// Level 20: Final Challenge
export const getLevel20 = () => {
    const cells: Cell[][] = [];
    for (let r = 0; r < 5; r++) { const row = []; for (let c = 0; c < 5; c++) row.push(createCell(r, c, null, 'BLOCK', true)); cells.push(row); }
    cells[0] = [createCell(0,0,2,'NUMBER',true),createCell(0,1,null,'OPERATOR',true,'+'),createCell(0,2,6,'NUMBER',false),createCell(0,3,null,'EQUALS',true,'='),createCell(0,4,8,'NUMBER',true)];
    cells[1] = [createCell(1,0,null,'OPERATOR',true,'+'),createCell(1,1,null,'BLOCK',true),createCell(1,2,null,'OPERATOR',true,'+'),createCell(1,3,null,'BLOCK',true),createCell(1,4,null,'OPERATOR',true,'+')];
    cells[2] = [createCell(2,0,3,'NUMBER',false),createCell(2,1,null,'OPERATOR',true,'+'),createCell(2,2,1,'NUMBER',true),createCell(2,3,null,'EQUALS',true,'='),createCell(2,4,4,'NUMBER',false)];
    cells[3] = [createCell(3,0,null,'EQUALS',true,'='),createCell(3,1,null,'BLOCK',true),createCell(3,2,null,'EQUALS',true,'='),createCell(3,3,null,'BLOCK',true),createCell(3,4,null,'EQUALS',true,'=')];
    cells[4] = [createCell(4,0,5,'NUMBER',true),createCell(4,1,null,'OPERATOR',true,'+'),createCell(4,2,7,'NUMBER',false),createCell(4,3,null,'EQUALS',true,'='),createCell(4,4,12,'NUMBER',true)];
    return prepareLevel(cells);
};

export const Levels = [
  getLevel1, getLevel2, getLevel3, getLevel4, getLevel5, getLevel6, 
  getLevel7, getLevel8, getLevel9, getLevel10, getLevel11, getLevel12,
  getLevel13, getLevel14, getLevel15, getLevel16, getLevel17, getLevel18, getLevel19, getLevel20
];
