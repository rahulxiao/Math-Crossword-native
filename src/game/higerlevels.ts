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

// Level 21: Multi-digit multiplication challenge
// R0: 3 * 4 = 12
// C0: 3 * 5 = 15
// R2: 5 * 3 = 15
// C2: 4 * 3 = 12
// R4: 15 - 12 = 3
// C4: 12 - 15 = -3 (No negatives, so use addition)
// Fixed: R4: 15 + 12 = 27, C4: 12 + 15 = 27
export const getLevel21 = () => {
  const cells: Cell[][] = [];
  for (let r = 0; r < 5; r++) {
    const row: Cell[] = [];
    for (let c = 0; c < 5; c++) row.push(createCell(r, c, null, 'BLOCK', true));
    cells.push(row);
  }

  cells[0] = [
    createCell(0, 0, 3, 'NUMBER', false),
    createCell(0, 1, null, 'OPERATOR', true, '*'),
    createCell(0, 2, 4, 'NUMBER', true),
    createCell(0, 3, null, 'EQUALS', true, '='),
    createCell(0, 4, 12, 'NUMBER', false)
  ];

  cells[1] = [
    createCell(1, 0, null, 'OPERATOR', true, '*'),
    createCell(1, 1, null, 'BLOCK', true),
    createCell(1, 2, null, 'OPERATOR', true, '*'),
    createCell(1, 3, null, 'BLOCK', true),
    createCell(1, 4, null, 'OPERATOR', true, '+')
  ];

  cells[2] = [
    createCell(2, 0, 5, 'NUMBER', true),
    createCell(2, 1, null, 'OPERATOR', true, '*'),
    createCell(2, 2, 3, 'NUMBER', false),
    createCell(2, 3, null, 'EQUALS', true, '='),
    createCell(2, 4, 15, 'NUMBER', false)
  ];

  cells[3] = [
    createCell(3, 0, null, 'EQUALS', true, '='),
    createCell(3, 1, null, 'BLOCK', true),
    createCell(3, 2, null, 'EQUALS', true, '='),
    createCell(3, 3, null, 'BLOCK', true),
    createCell(3, 4, null, 'EQUALS', true, '=')
  ];

  cells[4] = [
    createCell(4, 0, 15, 'NUMBER', false),
    createCell(4, 1, null, 'OPERATOR', true, '+'),
    createCell(4, 2, 12, 'NUMBER', true),
    createCell(4, 3, null, 'EQUALS', true, '='),
    createCell(4, 4, 27, 'NUMBER', true)
  ];

  return prepareLevel(cells);
};
export const getLevel22 = () => {
    const cells: Cell[][] = [];
    for (let r = 0; r < 5; r++) {
      const row: Cell[] = [];
      for (let c = 0; c < 5; c++) row.push(createCell(r, c, null, 'BLOCK', true));
      cells.push(row);
    }
  
    // Row 0: 16 / 2 = 8
    cells[0] = [
      createCell(0, 0, 16, 'NUMBER', true),
      createCell(0, 1, null, 'OPERATOR', true, '/'),
      createCell(0, 2, 2, 'NUMBER', false),
      createCell(0, 3, null, 'EQUALS', true, '='),
      createCell(0, 4, 8, 'NUMBER', false)
    ];
  
    // Row 1 (operators / blocks)
    cells[1] = [
      createCell(1, 0, null, 'OPERATOR', true, '/'),
      createCell(1, 1, null, 'BLOCK', true),
      createCell(1, 2, null, 'OPERATOR', true, '*'),
      createCell(1, 3, null, 'BLOCK', true),
      createCell(1, 4, null, 'OPERATOR', true, '+')
    ];
  
    // Row 2: 2 * 4 = 8  (changed to make vertical & horizontal consistent)
    cells[2] = [
      createCell(2, 0, 2, 'NUMBER', false),   // was 4 -> now 2
      createCell(2, 1, null, 'OPERATOR', true, '*'),
      createCell(2, 2, 4, 'NUMBER', true),    // was 2 -> now 4
      createCell(2, 3, null, 'EQUALS', true, '='),
      createCell(2, 4, 8, 'NUMBER', true)
    ];
  
    // Row 3 (equals row for columns)
    cells[3] = [
      createCell(3, 0, null, 'EQUALS', true, '='),
      createCell(3, 1, null, 'BLOCK', true),
      createCell(3, 2, null, 'EQUALS', true, '='),
      createCell(3, 3, null, 'BLOCK', true),
      createCell(3, 4, null, 'EQUALS', true, '=')
    ];
  
    // Row 4: 8 + 8 = 16
    cells[4] = [
      createCell(4, 0, 8, 'NUMBER', true),    // was 4 -> now 8
      createCell(4, 1, null, 'OPERATOR', true, '+'),
      createCell(4, 2, 8, 'NUMBER', false),   // keep 8 (column/result)
      createCell(4, 3, null, 'EQUALS', true, '='),
      createCell(4, 4, 16, 'NUMBER', false)   // was 12 -> now 16
    ];
  
    return prepareLevel(cells);
  };
  
  export const getLevel23 = () => {
    const cells: Cell[][] = [];
    for (let r = 0; r < 5; r++) {
      const row: Cell[] = [];
      for (let c = 0; c < 5; c++) row.push(createCell(r, c, null, 'BLOCK', true));
      cells.push(row);
    }
  
    // Row 0: 2 * 4 = 8
    cells[0] = [
      createCell(0, 0, 2, 'NUMBER', false),
      createCell(0, 1, null, 'OPERATOR', true, '*'),
      createCell(0, 2, 4, 'NUMBER', true),
      createCell(0, 3, null, 'EQUALS', true, '='),
      createCell(0, 4, 8, 'NUMBER', false)
    ];
  
    // Row 1 (operators / blocks)
    cells[1] = [
      createCell(1, 0, null, 'OPERATOR', true, '+'),
      createCell(1, 1, null, 'BLOCK', true),
      createCell(1, 2, null, 'OPERATOR', true, '+'),
      createCell(1, 3, null, 'BLOCK', true),
      createCell(1, 4, null, 'OPERATOR', true, '-')
    ];
  
    // Row 2: 1 - 1 = 0
    cells[2] = [
      createCell(2, 0, 1, 'NUMBER', true),
      createCell(2, 1, null, 'OPERATOR', true, '-'),
      createCell(2, 2, 1, 'NUMBER', false),
      createCell(2, 3, null, 'EQUALS', true, '='),
      createCell(2, 4, 0, 'NUMBER', true)
    ];
  
    // Row 3 (equals row for columns)
    cells[3] = [
      createCell(3, 0, null, 'EQUALS', true, '='),
      createCell(3, 1, null, 'BLOCK', true),
      createCell(3, 2, null, 'EQUALS', true, '='),
      createCell(3, 3, null, 'BLOCK', true),
      createCell(3, 4, null, 'EQUALS', true, '=')
    ];
  
    // Row 4: 3 + 5 = 8
    cells[4] = [
      createCell(4, 0, 3, 'NUMBER', false),
      createCell(4, 1, null, 'OPERATOR', true, '+'),
      createCell(4, 2, 5, 'NUMBER', true),
      createCell(4, 3, null, 'EQUALS', true, '='),
      createCell(4, 4, 8, 'NUMBER', false)
    ];
  
    return prepareLevel(cells);
  };
  
// Level 24: original grid kept, numbers adjusted so all equations are consistent
export const getLevel24 = () => {
    const cells: Cell[][] = [];
    for (let r = 0; r < 5; r++) {
      const row: Cell[] = [];
      for (let c = 0; c < 5; c++) row.push(createCell(r, c, null, 'BLOCK', true));
      cells.push(row);
    }
  
    // Row 0: A * B = R0  => 1 * 7 = 7
    cells[0] = [
      createCell(0, 0, 1, 'NUMBER', true),        // A
      createCell(0, 1, null, 'OPERATOR', true, '*'),
      createCell(0, 2, null, 'BLOCK', true),
      createCell(0, 3, 7, 'NUMBER', false),       // B
      createCell(0, 4, 7, 'NUMBER', false)        // R0 (result)
    ];
  
    // Row 1: column operators / blocks (kept same positions)
    cells[1] = [
      createCell(1, 0, null, 'OPERATOR', true, '*'), // operator for column 0
      createCell(1, 1, null, 'BLOCK', true),
      createCell(1, 2, null, 'BLOCK', true),
      createCell(1, 3, null, 'OPERATOR', true, '-'), // operator for column 3
      createCell(1, 4, null, 'BLOCK', true)
    ];
  
    // Row 2: C / D = R2  => 8 / 2 = 4
    cells[2] = [
      createCell(2, 0, 8, 'NUMBER', false),       // C
      createCell(2, 1, null, 'OPERATOR', true, '/'),
      createCell(2, 2, null, 'BLOCK', true),
      createCell(2, 3, 2, 'NUMBER', true),        // D
      createCell(2, 4, 4, 'NUMBER', true)         // R2 (result)
    ];
  
    // Row 3: equals / center blocks (kept)
    cells[3] = [
      createCell(3, 0, null, 'EQUALS', true, '='),
      createCell(3, 1, null, 'BLOCK', true),
      createCell(3, 2, null, 'BLOCK', true),
      createCell(3, 3, null, 'EQUALS', true, '='),
      createCell(3, 4, null, 'BLOCK', true)
    ];
  
    // Row 4: E - F = R4  => 8 - 5 = 3  (E = A*C, F = B - D)
    cells[4] = [
      createCell(4, 0, 8, 'NUMBER', false),       // E = 1 * 8
      createCell(4, 1, null, 'OPERATOR', true, '-'),
      createCell(4, 2, null, 'BLOCK', true),
      createCell(4, 3, 5, 'NUMBER', true),        // F = 7 - 2
      createCell(4, 4, 3, 'NUMBER', false)        // R4 (result)
    ];
  
    return prepareLevel(cells);
  };
  
// Level 25: NEW GRID DESIGN - Centered block pattern
// R0: 18 / 3 = 6
// C0: 18 / 2 = 9
// R2: 2 * 4 = 8
// C2: 3 * 4 = 12
// R4: 9 + 8 = 17
// C4: 6 + 12 = 18
export const getLevel25 = () => {
  const cells: Cell[][] = [];
  for (let r = 0; r < 5; r++) {
    const row: Cell[] = [];
    for (let c = 0; c < 5; c++) row.push(createCell(r, c, null, 'BLOCK', true));
    cells.push(row);
  }

  // Row 0: 18 / 3 = 6 (centered blocks)
  cells[0] = [
    createCell(0, 0, 18, 'NUMBER', false),
    createCell(0, 1, null, 'OPERATOR', true, '/'),
    createCell(0, 2, null, 'BLOCK', true),
    createCell(0, 3, 3, 'NUMBER', true),
    createCell(0, 4, null, 'EQUALS', true, '=')
  ];

  // Row 1: operators
  cells[1] = [
    createCell(1, 0, null, 'OPERATOR', true, '/'),
    createCell(1, 1, null, 'BLOCK', true),
    createCell(1, 2, null, 'BLOCK', true),
    createCell(1, 3, null, 'OPERATOR', true, '*'),
    createCell(1, 4, null, 'BLOCK', true)
  ];

  // Row 2: 2 * 4 = 8 (centered blocks)
  cells[2] = [
    createCell(2, 0, 2, 'NUMBER', true),
    createCell(2, 1, null, 'OPERATOR', true, '*'),
    createCell(2, 2, null, 'BLOCK', true),
    createCell(2, 3, 4, 'NUMBER', false),
    createCell(2, 4, null, 'EQUALS', true, '=')
  ];

  // Row 3: equals
  cells[3] = [
    createCell(3, 0, null, 'EQUALS', true, '='),
    createCell(3, 1, null, 'BLOCK', true),
    createCell(3, 2, null, 'BLOCK', true),
    createCell(3, 3, null, 'EQUALS', true, '='),
    createCell(3, 4, null, 'BLOCK', true)
  ];

  // Row 4: 9 + 8 = 17 (centered blocks)
  cells[4] = [
    createCell(4, 0, 9, 'NUMBER', false),
    createCell(4, 1, null, 'OPERATOR', true, '+'),
    createCell(4, 2, null, 'BLOCK', true),
    createCell(4, 3, 8, 'NUMBER', true),
    createCell(4, 4, null, 'EQUALS', true, '=')
  ];

  // Add result cells
  cells[0][4] = createCell(0, 4, 6, 'NUMBER', false);
  cells[2][4] = createCell(2, 4, 8, 'NUMBER', true);
  cells[4][4] = createCell(4, 4, 17, 'NUMBER', false);

  return prepareLevel(cells);
};

// Level 26: NEW GRID DESIGN - Diagonal block pattern
// R0: 7 * 4 = 28
// C0: 7 + 14 = 21
// R2: 14 / 2 = 7
// C2: 4 * 2 = 8
// R4: 21 - 7 = 14
// C4: 28 - 8 = 20
export const getLevel26 = () => {
  const cells: Cell[][] = [];
  for (let r = 0; r < 5; r++) {
    const row: Cell[] = [];
    for (let c = 0; c < 5; c++) row.push(createCell(r, c, null, 'BLOCK', true));
    cells.push(row);
  }

  // Row 0: 7 * 4 = 28 (diagonal blocks)
  cells[0] = [
    createCell(0, 0, 7, 'NUMBER', true),
    createCell(0, 1, null, 'OPERATOR', true, '*'),
    createCell(0, 2, null, 'BLOCK', true),
    createCell(0, 3, 4, 'NUMBER', false),
    createCell(0, 4, null, 'EQUALS', true, '=')
  ];

  // Row 1: operators
  cells[1] = [
    createCell(1, 0, null, 'OPERATOR', true, '+'),
    createCell(1, 1, null, 'BLOCK', true),
    createCell(1, 2, null, 'BLOCK', true),
    createCell(1, 3, null, 'OPERATOR', true, '*'),
    createCell(1, 4, null, 'BLOCK', true)
  ];

  // Row 2: 14 / 2 = 7 (diagonal blocks)
  cells[2] = [
    createCell(2, 0, 14, 'NUMBER', false),
    createCell(2, 1, null, 'OPERATOR', true, '/'),
    createCell(2, 2, null, 'BLOCK', true),
    createCell(2, 3, 2, 'NUMBER', true),
    createCell(2, 4, null, 'EQUALS', true, '=')
  ];

  // Row 3: equals
  cells[3] = [
    createCell(3, 0, null, 'EQUALS', true, '='),
    createCell(3, 1, null, 'BLOCK', true),
    createCell(3, 2, null, 'BLOCK', true),
    createCell(3, 3, null, 'EQUALS', true, '='),
    createCell(3, 4, null, 'BLOCK', true)
  ];

  // Row 4: 21 - 7 = 14 (diagonal blocks)
  cells[4] = [
    createCell(4, 0, 21, 'NUMBER', false),
    createCell(4, 1, null, 'OPERATOR', true, '-'),
    createCell(4, 2, null, 'BLOCK', true),
    createCell(4, 3, 7, 'NUMBER', true),
    createCell(4, 4, null, 'EQUALS', true, '=')
  ];

  // Add result cells
  cells[0][4] = createCell(0, 4, 28, 'NUMBER', false);
  cells[2][4] = createCell(2, 4, 7, 'NUMBER', true);
  cells[4][4] = createCell(4, 4, 14, 'NUMBER', false);

  return prepareLevel(cells);
};

// Level 27: NEW GRID DESIGN - Sparse block pattern
// R0: 5 * 6 = 30
// C0: 5 * 7 = 35
// R2: 7 - 2 = 5
// C2: 6 - 2 = 4
// R4: 35 - 5 = 30
// C4: 30 - 4 = 26
export const getLevel27 = () => {
  const cells: Cell[][] = [];
  for (let r = 0; r < 5; r++) {
    const row: Cell[] = [];
    for (let c = 0; c < 5; c++) row.push(createCell(r, c, null, 'BLOCK', true));
    cells.push(row);
  }

  // Row 0: 5 * 6 = 30 (sparse blocks)
  cells[0] = [
    createCell(0, 0, 5, 'NUMBER', false),
    createCell(0, 1, null, 'OPERATOR', true, '*'),
    createCell(0, 2, null, 'BLOCK', true),
    createCell(0, 3, 6, 'NUMBER', true),
    createCell(0, 4, null, 'EQUALS', true, '=')
  ];

  // Row 1: operators
  cells[1] = [
    createCell(1, 0, null, 'OPERATOR', true, '*'),
    createCell(1, 1, null, 'BLOCK', true),
    createCell(1, 2, null, 'BLOCK', true),
    createCell(1, 3, null, 'OPERATOR', true, '-'),
    createCell(1, 4, null, 'BLOCK', true)
  ];

  // Row 2: 7 - 2 = 5 (sparse blocks)
  cells[2] = [
    createCell(2, 0, 7, 'NUMBER', true),
    createCell(2, 1, null, 'OPERATOR', true, '-'),
    createCell(2, 2, null, 'BLOCK', true),
    createCell(2, 3, 2, 'NUMBER', false),
    createCell(2, 4, null, 'EQUALS', true, '=')
  ];

  // Row 3: equals
  cells[3] = [
    createCell(3, 0, null, 'EQUALS', true, '='),
    createCell(3, 1, null, 'BLOCK', true),
    createCell(3, 2, null, 'BLOCK', true),
    createCell(3, 3, null, 'EQUALS', true, '='),
    createCell(3, 4, null, 'BLOCK', true)
  ];

  // Row 4: 35 - 5 = 30 (sparse blocks)
  cells[4] = [
    createCell(4, 0, 35, 'NUMBER', false),
    createCell(4, 1, null, 'OPERATOR', true, '-'),
    createCell(4, 2, null, 'BLOCK', true),
    createCell(4, 3, 5, 'NUMBER', true),
    createCell(4, 4, null, 'EQUALS', true, '=')
  ];

  // Add result cells
  cells[0][4] = createCell(0, 4, 30, 'NUMBER', false);
  cells[2][4] = createCell(2, 4, 5, 'NUMBER', true);
  cells[4][4] = createCell(4, 4, 30, 'NUMBER', false);

  return prepareLevel(cells);
};

// Level 28: NEW GRID DESIGN - Alternating block pattern
// R0: 24 / 4 = 6
// C0: 24 / 3 = 8
// R2: 3 * 5 = 15
// C2: 4 * 5 = 20
// R4: 8 + 15 = 23
// C4: 6 + 20 = 26
export const getLevel28 = () => {
  const cells: Cell[][] = [];
  for (let r = 0; r < 5; r++) {
    const row: Cell[] = [];
    for (let c = 0; c < 5; c++) row.push(createCell(r, c, null, 'BLOCK', true));
    cells.push(row);
  }

  // Row 0: 24 / 4 = 6 (alternating blocks)
  cells[0] = [
    createCell(0, 0, 24, 'NUMBER', true),
    createCell(0, 1, null, 'OPERATOR', true, '/'),
    createCell(0, 2, null, 'BLOCK', true),
    createCell(0, 3, 4, 'NUMBER', false),
    createCell(0, 4, null, 'EQUALS', true, '=')
  ];

  // Row 1: operators
  cells[1] = [
    createCell(1, 0, null, 'OPERATOR', true, '/'),
    createCell(1, 1, null, 'BLOCK', true),
    createCell(1, 2, null, 'BLOCK', true),
    createCell(1, 3, null, 'OPERATOR', true, '*'),
    createCell(1, 4, null, 'BLOCK', true)
  ];

  // Row 2: 3 * 5 = 15 (alternating blocks)
  cells[2] = [
    createCell(2, 0, 3, 'NUMBER', false),
    createCell(2, 1, null, 'OPERATOR', true, '*'),
    createCell(2, 2, null, 'BLOCK', true),
    createCell(2, 3, 5, 'NUMBER', true),
    createCell(2, 4, null, 'EQUALS', true, '=')
  ];

  // Row 3: equals
  cells[3] = [
    createCell(3, 0, null, 'EQUALS', true, '='),
    createCell(3, 1, null, 'BLOCK', true),
    createCell(3, 2, null, 'BLOCK', true),
    createCell(3, 3, null, 'EQUALS', true, '='),
    createCell(3, 4, null, 'BLOCK', true)
  ];

  // Row 4: 8 + 15 = 23 (alternating blocks)
  cells[4] = [
    createCell(4, 0, 8, 'NUMBER', false),
    createCell(4, 1, null, 'OPERATOR', true, '+'),
    createCell(4, 2, null, 'BLOCK', true),
    createCell(4, 3, 15, 'NUMBER', true),
    createCell(4, 4, null, 'EQUALS', true, '=')
  ];

  // Add result cells
  cells[0][4] = createCell(0, 4, 6, 'NUMBER', false);
  cells[2][4] = createCell(2, 4, 15, 'NUMBER', false);
  cells[4][4] = createCell(4, 4, 23, 'NUMBER', false);

  return prepareLevel(cells);
};

// Level 29: NEW GRID DESIGN - Edge block pattern
// R0: 8 * 4 = 32
// C0: 8 + 16 = 24
// R2: 16 / 4 = 4
// C2: 4 / 4 = 1
// R4: 24 - 4 = 20
// C4: 32 - 1 = 31
export const getLevel29 = () => {
  const cells: Cell[][] = [];
  for (let r = 0; r < 5; r++) {
    const row: Cell[] = [];
    for (let c = 0; c < 5; c++) row.push(createCell(r, c, null, 'BLOCK', true));
    cells.push(row);
  }

  // Row 0: 8 * 4 = 32 (edge blocks)
  cells[0] = [
    createCell(0, 0, 8, 'NUMBER', false),
    createCell(0, 1, null, 'OPERATOR', true, '*'),
    createCell(0, 2, null, 'BLOCK', true),
    createCell(0, 3, 4, 'NUMBER', true),
    createCell(0, 4, null, 'EQUALS', true, '=')
  ];

  // Row 1: operators
  cells[1] = [
    createCell(1, 0, null, 'OPERATOR', true, '+'),
    createCell(1, 1, null, 'BLOCK', true),
    createCell(1, 2, null, 'BLOCK', true),
    createCell(1, 3, null, 'OPERATOR', true, '/'),
    createCell(1, 4, null, 'BLOCK', true)
  ];

  // Row 2: 16 / 4 = 4 (edge blocks)
  cells[2] = [
    createCell(2, 0, 16, 'NUMBER', true),
    createCell(2, 1, null, 'OPERATOR', true, '/'),
    createCell(2, 2, null, 'BLOCK', true),
    createCell(2, 3, 4, 'NUMBER', false),
    createCell(2, 4, null, 'EQUALS', true, '=')
  ];

  // Row 3: equals
  cells[3] = [
    createCell(3, 0, null, 'EQUALS', true, '='),
    createCell(3, 1, null, 'BLOCK', true),
    createCell(3, 2, null, 'BLOCK', true),
    createCell(3, 3, null, 'EQUALS', true, '='),
    createCell(3, 4, null, 'BLOCK', true)
  ];

  // Row 4: 24 - 4 = 20 (edge blocks)
  cells[4] = [
    createCell(4, 0, 24, 'NUMBER', false),
    createCell(4, 1, null, 'OPERATOR', true, '-'),
    createCell(4, 2, null, 'BLOCK', true),
    createCell(4, 3, 4, 'NUMBER', true),
    createCell(4, 4, null, 'EQUALS', true, '=')
  ];

  // Add result cells
  cells[0][4] = createCell(0, 4, 32, 'NUMBER', false);
  cells[2][4] = createCell(2, 4, 4, 'NUMBER', true);
  cells[4][4] = createCell(4, 4, 20, 'NUMBER', false);

  return prepareLevel(cells);
};

// Level 30: NEW GRID DESIGN - Cross pattern blocks
// R0: 9 * 3 = 27
// C0: 9 * 4 = 36
// R2: 4 * 8 = 32
// C2: 3 * 8 = 24
// R4: 36 - 32 = 4
// C4: 27 - 24 = 3
export const getLevel30 = () => {
  const cells: Cell[][] = [];
  for (let r = 0; r < 5; r++) {
    const row: Cell[] = [];
    for (let c = 0; c < 5; c++) row.push(createCell(r, c, null, 'BLOCK', true));
    cells.push(row);
  }

  // Row 0: 9 * 3 = 27 (cross pattern)
  cells[0] = [
    createCell(0, 0, 9, 'NUMBER', true),
    createCell(0, 1, null, 'OPERATOR', true, '*'),
    createCell(0, 2, null, 'BLOCK', true),
    createCell(0, 3, 3, 'NUMBER', false),
    createCell(0, 4, null, 'EQUALS', true, '=')
  ];

  // Row 1: operators
  cells[1] = [
    createCell(1, 0, null, 'OPERATOR', true, '*'),
    createCell(1, 1, null, 'BLOCK', true),
    createCell(1, 2, null, 'BLOCK', true),
    createCell(1, 3, null, 'OPERATOR', true, '*'),
    createCell(1, 4, null, 'BLOCK', true)
  ];

  // Row 2: 4 * 8 = 32 (cross pattern)
  cells[2] = [
    createCell(2, 0, 4, 'NUMBER', false),
    createCell(2, 1, null, 'OPERATOR', true, '*'),
    createCell(2, 2, null, 'BLOCK', true),
    createCell(2, 3, 8, 'NUMBER', true),
    createCell(2, 4, null, 'EQUALS', true, '=')
  ];

  // Row 3: equals
  cells[3] = [
    createCell(3, 0, null, 'EQUALS', true, '='),
    createCell(3, 1, null, 'BLOCK', true),
    createCell(3, 2, null, 'BLOCK', true),
    createCell(3, 3, null, 'EQUALS', true, '='),
    createCell(3, 4, null, 'BLOCK', true)
  ];

  // Row 4: 36 - 32 = 4 (cross pattern)
  cells[4] = [
    createCell(4, 0, 36, 'NUMBER', false),
    createCell(4, 1, null, 'OPERATOR', true, '-'),
    createCell(4, 2, null, 'BLOCK', true),
    createCell(4, 3, 32, 'NUMBER', true),
    createCell(4, 4, null, 'EQUALS', true, '=')
  ];

  // Add result cells
  cells[0][4] = createCell(0, 4, 27, 'NUMBER', false);
  cells[2][4] = createCell(2, 4, 32, 'NUMBER', false);
  cells[4][4] = createCell(4, 4, 4, 'NUMBER', false);

  return prepareLevel(cells);
};

// Level 31: NEW GRID DESIGN - Corner block pattern
// R0: 6 * 7 = 42
// C0: 6 + 18 = 24
// R2: 18 / 3 = 6
// C2: 7 - 3 = 4
// R4: 24 + 6 = 30
// C4: 42 - 4 = 38
export const getLevel31 = () => {
  const cells: Cell[][] = [];
  for (let r = 0; r < 5; r++) {
    const row: Cell[] = [];
    for (let c = 0; c < 5; c++) row.push(createCell(r, c, null, 'BLOCK', true));
    cells.push(row);
  }

  // Row 0: 6 * 7 = 42 (corner blocks)
  cells[0] = [
    createCell(0, 0, 6, 'NUMBER', false),
    createCell(0, 1, null, 'OPERATOR', true, '*'),
    createCell(0, 2, null, 'BLOCK', true),
    createCell(0, 3, 7, 'NUMBER', true),
    createCell(0, 4, null, 'EQUALS', true, '=')
  ];

  // Row 1: operators
  cells[1] = [
    createCell(1, 0, null, 'OPERATOR', true, '+'),
    createCell(1, 1, null, 'BLOCK', true),
    createCell(1, 2, null, 'BLOCK', true),
    createCell(1, 3, null, 'OPERATOR', true, '-'),
    createCell(1, 4, null, 'BLOCK', true)
  ];

  // Row 2: 18 / 3 = 6 (corner blocks)
  cells[2] = [
    createCell(2, 0, 18, 'NUMBER', true),
    createCell(2, 1, null, 'OPERATOR', true, '/'),
    createCell(2, 2, null, 'BLOCK', true),
    createCell(2, 3, 3, 'NUMBER', false),
    createCell(2, 4, null, 'EQUALS', true, '=')
  ];

  // Row 3: equals
  cells[3] = [
    createCell(3, 0, null, 'EQUALS', true, '='),
    createCell(3, 1, null, 'BLOCK', true),
    createCell(3, 2, null, 'BLOCK', true),
    createCell(3, 3, null, 'EQUALS', true, '='),
    createCell(3, 4, null, 'BLOCK', true)
  ];

  // Row 4: 24 + 6 = 30 (corner blocks)
  cells[4] = [
    createCell(4, 0, 24, 'NUMBER', false),
    createCell(4, 1, null, 'OPERATOR', true, '+'),
    createCell(4, 2, null, 'BLOCK', true),
    createCell(4, 3, 6, 'NUMBER', true),
    createCell(4, 4, null, 'EQUALS', true, '=')
  ];

  // Add result cells
  cells[0][4] = createCell(0, 4, 42, 'NUMBER', false);
  cells[2][4] = createCell(2, 4, 6, 'NUMBER', true);
  cells[4][4] = createCell(4, 4, 30, 'NUMBER', false);

  return prepareLevel(cells);
};

// Level 32: Complex operations mix
// R0: 10 * 3 = 30
// C0: 10 + 20 = 30
// R2: 20 / 5 = 4
// C2: 3 * 5 = 15
// R4: 30 - 4 = 26
// C4: 30 - 15 = 15
export const getLevel32 = () => {
  const cells: Cell[][] = [];
  for (let r = 0; r < 5; r++) {
    const row: Cell[] = [];
    for (let c = 0; c < 5; c++) row.push(createCell(r, c, null, 'BLOCK', true));
    cells.push(row);
  }

  // Row 0: 10 * 3 = 30 (NEW DESIGN: L-shaped blocks)
  cells[0] = [
    createCell(0, 0, 10, 'NUMBER', true),
    createCell(0, 1, null, 'OPERATOR', true, '*'),
    createCell(0, 2, null, 'BLOCK', true),
    createCell(0, 3, 3, 'NUMBER', false),
    createCell(0, 4, null, 'EQUALS', true, '=')
  ];

  // Row 1: operators
  cells[1] = [
    createCell(1, 0, null, 'OPERATOR', true, '+'),
    createCell(1, 1, null, 'BLOCK', true),
    createCell(1, 2, null, 'BLOCK', true),
    createCell(1, 3, null, 'OPERATOR', true, '*'),
    createCell(1, 4, null, 'BLOCK', true)
  ];

  // Row 2: 20 / 5 = 4 (L-shaped blocks)
  cells[2] = [
    createCell(2, 0, 20, 'NUMBER', false),
    createCell(2, 1, null, 'OPERATOR', true, '/'),
    createCell(2, 2, null, 'BLOCK', true),
    createCell(2, 3, 5, 'NUMBER', true),
    createCell(2, 4, null, 'EQUALS', true, '=')
  ];

  // Row 3: equals
  cells[3] = [
    createCell(3, 0, null, 'EQUALS', true, '='),
    createCell(3, 1, null, 'BLOCK', true),
    createCell(3, 2, null, 'BLOCK', true),
    createCell(3, 3, null, 'EQUALS', true, '='),
    createCell(3, 4, null, 'BLOCK', true)
  ];

  // Row 4: 30 - 4 = 26 (L-shaped blocks)
  cells[4] = [
    createCell(4, 0, 30, 'NUMBER', false),
    createCell(4, 1, null, 'OPERATOR', true, '-'),
    createCell(4, 2, null, 'BLOCK', true),
    createCell(4, 3, 4, 'NUMBER', true),
    createCell(4, 4, null, 'EQUALS', true, '=')
  ];

  // Add result cells
  cells[0][4] = createCell(0, 4, 30, 'NUMBER', false);
  cells[2][4] = createCell(2, 4, 4, 'NUMBER', true);
  cells[4][4] = createCell(4, 4, 26, 'NUMBER', false);

  return prepareLevel(cells);
};

// Level 33: Advanced division
// R0: 28 / 4 = 7
// C0: 28 / 7 = 4
// R2: 7 * 6 = 42
// C2: 4 * 6 = 24
// R4: 4 + 42 = 46
// C4: 7 + 24 = 31
export const getLevel33 = () => {
  const cells: Cell[][] = [];
  for (let r = 0; r < 5; r++) {
    const row: Cell[] = [];
    for (let c = 0; c < 5; c++) row.push(createCell(r, c, null, 'BLOCK', true));
    cells.push(row);
  }

  // Row 0: 28 / 4 = 7 (NEW DESIGN: T-shaped blocks)
  cells[0] = [
    createCell(0, 0, 28, 'NUMBER', false),
    createCell(0, 1, null, 'OPERATOR', true, '/'),
    createCell(0, 2, null, 'BLOCK', true),
    createCell(0, 3, 4, 'NUMBER', true),
    createCell(0, 4, null, 'EQUALS', true, '=')
  ];

  // Row 1: operators
  cells[1] = [
    createCell(1, 0, null, 'OPERATOR', true, '/'),
    createCell(1, 1, null, 'BLOCK', true),
    createCell(1, 2, null, 'BLOCK', true),
    createCell(1, 3, null, 'OPERATOR', true, '*'),
    createCell(1, 4, null, 'BLOCK', true)
  ];

  // Row 2: 7 * 6 = 42 (T-shaped blocks)
  cells[2] = [
    createCell(2, 0, 7, 'NUMBER', true),
    createCell(2, 1, null, 'OPERATOR', true, '*'),
    createCell(2, 2, null, 'BLOCK', true),
    createCell(2, 3, 6, 'NUMBER', false),
    createCell(2, 4, null, 'EQUALS', true, '=')
  ];

  // Row 3: equals
  cells[3] = [
    createCell(3, 0, null, 'EQUALS', true, '='),
    createCell(3, 1, null, 'BLOCK', true),
    createCell(3, 2, null, 'BLOCK', true),
    createCell(3, 3, null, 'EQUALS', true, '='),
    createCell(3, 4, null, 'BLOCK', true)
  ];

  // Row 4: 4 + 42 = 46 (T-shaped blocks)
  cells[4] = [
    createCell(4, 0, 4, 'NUMBER', false),
    createCell(4, 1, null, 'OPERATOR', true, '+'),
    createCell(4, 2, null, 'BLOCK', true),
    createCell(4, 3, 42, 'NUMBER', true),
    createCell(4, 4, null, 'EQUALS', true, '=')
  ];

  // Add result cells
  cells[0][4] = createCell(0, 4, 7, 'NUMBER', false);
  cells[2][4] = createCell(2, 4, 42, 'NUMBER', false);
  cells[4][4] = createCell(4, 4, 46, 'NUMBER', false);

  return prepareLevel(cells);
};

// Level 34: Large multiplication challenge
// R0: 7 * 8 = 56
// C0: 7 + 21 = 28
// R2: 21 / 3 = 7
// C2: 8 - 3 = 5
// R4: 28 + 7 = 35
// C4: 56 - 5 = 51
export const getLevel34 = () => {
  const cells: Cell[][] = [];
  for (let r = 0; r < 5; r++) {
    const row: Cell[] = [];
    for (let c = 0; c < 5; c++) row.push(createCell(r, c, null, 'BLOCK', true));
    cells.push(row);
  }

  // Row 0: 7 * 8 = 56 (NEW DESIGN: Z-shaped blocks)
  cells[0] = [
    createCell(0, 0, 7, 'NUMBER', true),
    createCell(0, 1, null, 'OPERATOR', true, '*'),
    createCell(0, 2, null, 'BLOCK', true),
    createCell(0, 3, 8, 'NUMBER', false),
    createCell(0, 4, null, 'EQUALS', true, '=')
  ];

  // Row 1: operators
  cells[1] = [
    createCell(1, 0, null, 'OPERATOR', true, '+'),
    createCell(1, 1, null, 'BLOCK', true),
    createCell(1, 2, null, 'BLOCK', true),
    createCell(1, 3, null, 'OPERATOR', true, '-'),
    createCell(1, 4, null, 'BLOCK', true)
  ];

  // Row 2: 21 / 3 = 7 (Z-shaped blocks)
  cells[2] = [
    createCell(2, 0, 21, 'NUMBER', false),
    createCell(2, 1, null, 'OPERATOR', true, '/'),
    createCell(2, 2, null, 'BLOCK', true),
    createCell(2, 3, 3, 'NUMBER', true),
    createCell(2, 4, null, 'EQUALS', true, '=')
  ];

  // Row 3: equals
  cells[3] = [
    createCell(3, 0, null, 'EQUALS', true, '='),
    createCell(3, 1, null, 'BLOCK', true),
    createCell(3, 2, null, 'BLOCK', true),
    createCell(3, 3, null, 'EQUALS', true, '='),
    createCell(3, 4, null, 'BLOCK', true)
  ];

  // Row 4: 28 + 7 = 35 (Z-shaped blocks)
  cells[4] = [
    createCell(4, 0, 28, 'NUMBER', false),
    createCell(4, 1, null, 'OPERATOR', true, '+'),
    createCell(4, 2, null, 'BLOCK', true),
    createCell(4, 3, 7, 'NUMBER', true),
    createCell(4, 4, null, 'EQUALS', true, '=')
  ];

  // Add result cells
  cells[0][4] = createCell(0, 4, 56, 'NUMBER', false);
  cells[2][4] = createCell(2, 4, 7, 'NUMBER', true);
  cells[4][4] = createCell(4, 4, 35, 'NUMBER', false);

  return prepareLevel(cells);
};

// Level 35: Expert multiplication
// R0: 9 * 5 = 45
// C0: 9 * 6 = 54
// R2: 6 / 2 = 3
// C2: 5 - 2 = 3
// R4: 54 - 3 = 51
// C4: 45 - 3 = 42
export const getLevel35 = () => {
  const cells: Cell[][] = [];
  for (let r = 0; r < 5; r++) {
    const row: Cell[] = [];
    for (let c = 0; c < 5; c++) row.push(createCell(r, c, null, 'BLOCK', true));
    cells.push(row);
  }

  // Row 0: 9 * 5 = 45 (NEW DESIGN: H-shaped blocks)
  cells[0] = [
    createCell(0, 0, 9, 'NUMBER', false),
    createCell(0, 1, null, 'OPERATOR', true, '*'),
    createCell(0, 2, null, 'BLOCK', true),
    createCell(0, 3, 5, 'NUMBER', true),
    createCell(0, 4, null, 'EQUALS', true, '=')
  ];

  // Row 1: operators
  cells[1] = [
    createCell(1, 0, null, 'OPERATOR', true, '*'),
    createCell(1, 1, null, 'BLOCK', true),
    createCell(1, 2, null, 'BLOCK', true),
    createCell(1, 3, null, 'OPERATOR', true, '-'),
    createCell(1, 4, null, 'BLOCK', true)
  ];

  // Row 2: 6 / 2 = 3 (H-shaped blocks)
  cells[2] = [
    createCell(2, 0, 6, 'NUMBER', true),
    createCell(2, 1, null, 'OPERATOR', true, '/'),
    createCell(2, 2, null, 'BLOCK', true),
    createCell(2, 3, 2, 'NUMBER', false),
    createCell(2, 4, null, 'EQUALS', true, '=')
  ];

  // Row 3: equals
  cells[3] = [
    createCell(3, 0, null, 'EQUALS', true, '='),
    createCell(3, 1, null, 'BLOCK', true),
    createCell(3, 2, null, 'BLOCK', true),
    createCell(3, 3, null, 'EQUALS', true, '='),
    createCell(3, 4, null, 'BLOCK', true)
  ];

  // Row 4: 54 - 3 = 51 (H-shaped blocks)
  cells[4] = [
    createCell(4, 0, 54, 'NUMBER', false),
    createCell(4, 1, null, 'OPERATOR', true, '-'),
    createCell(4, 2, null, 'BLOCK', true),
    createCell(4, 3, 3, 'NUMBER', true),
    createCell(4, 4, null, 'EQUALS', true, '=')
  ];

  // Add result cells
  cells[0][4] = createCell(0, 4, 45, 'NUMBER', false);
  cells[2][4] = createCell(2, 4, 3, 'NUMBER', true);
  cells[4][4] = createCell(4, 4, 51, 'NUMBER', false);

  return prepareLevel(cells);
};

// Level 36: Complex division and multiplication
// R0: 32 / 4 = 8
// C0: 32 / 8 = 4
// R2: 8 * 7 = 56
// C2: 4 * 7 = 28
// R4: 4 + 56 = 60
// C4: 8 + 28 = 36
export const getLevel36 = () => {
  const cells: Cell[][] = [];
  for (let r = 0; r < 5; r++) {
    const row: Cell[] = [];
    for (let c = 0; c < 5; c++) row.push(createCell(r, c, null, 'BLOCK', true));
    cells.push(row);
  }

  // Row 0: 32 / 4 = 8 (NEW DESIGN: Plus-shaped blocks)
  cells[0] = [
    createCell(0, 0, 32, 'NUMBER', true),
    createCell(0, 1, null, 'OPERATOR', true, '/'),
    createCell(0, 2, null, 'BLOCK', true),
    createCell(0, 3, 4, 'NUMBER', false),
    createCell(0, 4, null, 'EQUALS', true, '=')
  ];

  // Row 1: operators
  cells[1] = [
    createCell(1, 0, null, 'OPERATOR', true, '/'),
    createCell(1, 1, null, 'BLOCK', true),
    createCell(1, 2, null, 'BLOCK', true),
    createCell(1, 3, null, 'OPERATOR', true, '*'),
    createCell(1, 4, null, 'BLOCK', true)
  ];

  // Row 2: 8 * 7 = 56 (Plus-shaped blocks)
  cells[2] = [
    createCell(2, 0, 8, 'NUMBER', false),
    createCell(2, 1, null, 'OPERATOR', true, '*'),
    createCell(2, 2, null, 'BLOCK', true),
    createCell(2, 3, 7, 'NUMBER', true),
    createCell(2, 4, null, 'EQUALS', true, '=')
  ];

  // Row 3: equals
  cells[3] = [
    createCell(3, 0, null, 'EQUALS', true, '='),
    createCell(3, 1, null, 'BLOCK', true),
    createCell(3, 2, null, 'BLOCK', true),
    createCell(3, 3, null, 'EQUALS', true, '='),
    createCell(3, 4, null, 'BLOCK', true)
  ];

  // Row 4: 4 + 56 = 60 (Plus-shaped blocks)
  cells[4] = [
    createCell(4, 0, 4, 'NUMBER', false),
    createCell(4, 1, null, 'OPERATOR', true, '+'),
    createCell(4, 2, null, 'BLOCK', true),
    createCell(4, 3, 56, 'NUMBER', true),
    createCell(4, 4, null, 'EQUALS', true, '=')
  ];

  // Add result cells
  cells[0][4] = createCell(0, 4, 8, 'NUMBER', false);
  cells[2][4] = createCell(2, 4, 56, 'NUMBER', false);
  cells[4][4] = createCell(4, 4, 60, 'NUMBER', false);

  return prepareLevel(cells);
};

// Level 37: Very large numbers
// R0: 8 * 9 = 72
// C0: 8 + 24 = 32
// R2: 24 / 4 = 6
// C2: 9 - 4 = 5
// R4: 32 + 6 = 38
// C4: 72 - 5 = 67
export const getLevel37 = () => {
  const cells: Cell[][] = [];
  for (let r = 0; r < 5; r++) {
    const row: Cell[] = [];
    for (let c = 0; c < 5; c++) row.push(createCell(r, c, null, 'BLOCK', true));
    cells.push(row);
  }

  // Row 0: 8 * 9 = 72 (NEW DESIGN: X-shaped blocks)
  cells[0] = [
    createCell(0, 0, 8, 'NUMBER', false),
    createCell(0, 1, null, 'OPERATOR', true, '*'),
    createCell(0, 2, null, 'BLOCK', true),
    createCell(0, 3, 9, 'NUMBER', true),
    createCell(0, 4, null, 'EQUALS', true, '=')
  ];

  // Row 1: operators
  cells[1] = [
    createCell(1, 0, null, 'OPERATOR', true, '+'),
    createCell(1, 1, null, 'BLOCK', true),
    createCell(1, 2, null, 'BLOCK', true),
    createCell(1, 3, null, 'OPERATOR', true, '-'),
    createCell(1, 4, null, 'BLOCK', true)
  ];

  // Row 2: 24 / 4 = 6 (X-shaped blocks)
  cells[2] = [
    createCell(2, 0, 24, 'NUMBER', true),
    createCell(2, 1, null, 'OPERATOR', true, '/'),
    createCell(2, 2, null, 'BLOCK', true),
    createCell(2, 3, 4, 'NUMBER', false),
    createCell(2, 4, null, 'EQUALS', true, '=')
  ];

  // Row 3: equals
  cells[3] = [
    createCell(3, 0, null, 'EQUALS', true, '='),
    createCell(3, 1, null, 'BLOCK', true),
    createCell(3, 2, null, 'BLOCK', true),
    createCell(3, 3, null, 'EQUALS', true, '='),
    createCell(3, 4, null, 'BLOCK', true)
  ];

  // Row 4: 32 + 6 = 38 (X-shaped blocks)
  cells[4] = [
    createCell(4, 0, 32, 'NUMBER', false),
    createCell(4, 1, null, 'OPERATOR', true, '+'),
    createCell(4, 2, null, 'BLOCK', true),
    createCell(4, 3, 6, 'NUMBER', true),
    createCell(4, 4, null, 'EQUALS', true, '=')
  ];

  // Add result cells
  cells[0][4] = createCell(0, 4, 72, 'NUMBER', false);
  cells[2][4] = createCell(2, 4, 6, 'NUMBER', true);
  cells[4][4] = createCell(4, 4, 38, 'NUMBER', false);

  return prepareLevel(cells);
};

// Level 38: Advanced operations
// R0: 12 * 4 = 48
// C0: 12 + 36 = 48
// R2: 36 / 6 = 6
// C2: 4 * 6 = 24
// R4: 48 - 6 = 42
// C4: 48 - 24 = 24
export const getLevel38 = () => {
  const cells: Cell[][] = [];
  for (let r = 0; r < 5; r++) {
    const row: Cell[] = [];
    for (let c = 0; c < 5; c++) row.push(createCell(r, c, null, 'BLOCK', true));
    cells.push(row);
  }

  // Row 0: 12 * 4 = 48 (NEW DESIGN: Square pattern blocks)
  cells[0] = [
    createCell(0, 0, 12, 'NUMBER', true),
    createCell(0, 1, null, 'OPERATOR', true, '*'),
    createCell(0, 2, null, 'BLOCK', true),
    createCell(0, 3, 4, 'NUMBER', false),
    createCell(0, 4, null, 'EQUALS', true, '=')
  ];

  // Row 1: operators
  cells[1] = [
    createCell(1, 0, null, 'OPERATOR', true, '+'),
    createCell(1, 1, null, 'BLOCK', true),
    createCell(1, 2, null, 'BLOCK', true),
    createCell(1, 3, null, 'OPERATOR', true, '*'),
    createCell(1, 4, null, 'BLOCK', true)
  ];

  // Row 2: 36 / 6 = 6 (Square pattern blocks)
  cells[2] = [
    createCell(2, 0, 36, 'NUMBER', false),
    createCell(2, 1, null, 'OPERATOR', true, '/'),
    createCell(2, 2, null, 'BLOCK', true),
    createCell(2, 3, 6, 'NUMBER', true),
    createCell(2, 4, null, 'EQUALS', true, '=')
  ];

  // Row 3: equals
  cells[3] = [
    createCell(3, 0, null, 'EQUALS', true, '='),
    createCell(3, 1, null, 'BLOCK', true),
    createCell(3, 2, null, 'BLOCK', true),
    createCell(3, 3, null, 'EQUALS', true, '='),
    createCell(3, 4, null, 'BLOCK', true)
  ];

  // Row 4: 48 - 6 = 42 (Square pattern blocks)
  cells[4] = [
    createCell(4, 0, 48, 'NUMBER', false),
    createCell(4, 1, null, 'OPERATOR', true, '-'),
    createCell(4, 2, null, 'BLOCK', true),
    createCell(4, 3, 6, 'NUMBER', true),
    createCell(4, 4, null, 'EQUALS', true, '=')
  ];

  // Add result cells
  cells[0][4] = createCell(0, 4, 48, 'NUMBER', false);
  cells[2][4] = createCell(2, 4, 6, 'NUMBER', true);
  cells[4][4] = createCell(4, 4, 42, 'NUMBER', false);

  return prepareLevel(cells);
};

// Level 39: Master level
// R0: 14 * 3 = 42
// C0: 14 + 28 = 42
// R2: 28 / 4 = 7
// C2: 3 * 4 = 12
// R4: 42 + 7 = 49
// C4: 42 + 12 = 54
export const getLevel39 = () => {
  const cells: Cell[][] = [];
  for (let r = 0; r < 5; r++) {
    const row: Cell[] = [];
    for (let c = 0; c < 5; c++) row.push(createCell(r, c, null, 'BLOCK', true));
    cells.push(row);
  }

  // Row 0: 14 * 3 = 42 (NEW DESIGN: Frame pattern blocks)
  cells[0] = [
    createCell(0, 0, 14, 'NUMBER', false),
    createCell(0, 1, null, 'OPERATOR', true, '*'),
    createCell(0, 2, null, 'BLOCK', true),
    createCell(0, 3, 3, 'NUMBER', true),
    createCell(0, 4, null, 'EQUALS', true, '=')
  ];

  // Row 1: operators
  cells[1] = [
    createCell(1, 0, null, 'OPERATOR', true, '+'),
    createCell(1, 1, null, 'BLOCK', true),
    createCell(1, 2, null, 'BLOCK', true),
    createCell(1, 3, null, 'OPERATOR', true, '*'),
    createCell(1, 4, null, 'BLOCK', true)
  ];

  // Row 2: 28 / 4 = 7 (Frame pattern blocks)
  cells[2] = [
    createCell(2, 0, 28, 'NUMBER', true),
    createCell(2, 1, null, 'OPERATOR', true, '/'),
    createCell(2, 2, null, 'BLOCK', true),
    createCell(2, 3, 4, 'NUMBER', false),
    createCell(2, 4, null, 'EQUALS', true, '=')
  ];

  // Row 3: equals
  cells[3] = [
    createCell(3, 0, null, 'EQUALS', true, '='),
    createCell(3, 1, null, 'BLOCK', true),
    createCell(3, 2, null, 'BLOCK', true),
    createCell(3, 3, null, 'EQUALS', true, '='),
    createCell(3, 4, null, 'BLOCK', true)
  ];

  // Row 4: 42 + 7 = 49 (Frame pattern blocks)
  cells[4] = [
    createCell(4, 0, 42, 'NUMBER', false),
    createCell(4, 1, null, 'OPERATOR', true, '+'),
    createCell(4, 2, null, 'BLOCK', true),
    createCell(4, 3, 7, 'NUMBER', true),
    createCell(4, 4, null, 'EQUALS', true, '=')
  ];

  // Add result cells
  cells[0][4] = createCell(0, 4, 42, 'NUMBER', false);
  cells[2][4] = createCell(2, 4, 7, 'NUMBER', true);
  cells[4][4] = createCell(4, 4, 49, 'NUMBER', false);

  return prepareLevel(cells);
};

// Level 40: Ultimate challenge
// R0: 15 * 4 = 60
// C0: 15 + 45 = 60
// R2: 45 / 5 = 9
// C2: 4 * 5 = 20
// R4: 60 - 9 = 51
// C4: 60 - 20 = 40
export const getLevel40 = () => {
  const cells: Cell[][] = [];
  for (let r = 0; r < 5; r++) {
    const row: Cell[] = [];
    for (let c = 0; c < 5; c++) row.push(createCell(r, c, null, 'BLOCK', true));
    cells.push(row);
  }

  // Row 0: 15 * 4 = 60 (NEW DESIGN: Ultimate challenge - checkerboard blocks)
  cells[0] = [
    createCell(0, 0, 15, 'NUMBER', true),
    createCell(0, 1, null, 'OPERATOR', true, '*'),
    createCell(0, 2, null, 'BLOCK', true),
    createCell(0, 3, 4, 'NUMBER', false),
    createCell(0, 4, null, 'EQUALS', true, '=')
  ];

  // Row 1: operators
  cells[1] = [
    createCell(1, 0, null, 'OPERATOR', true, '+'),
    createCell(1, 1, null, 'BLOCK', true),
    createCell(1, 2, null, 'BLOCK', true),
    createCell(1, 3, null, 'OPERATOR', true, '*'),
    createCell(1, 4, null, 'BLOCK', true)
  ];

  // Row 2: 45 / 5 = 9 (Checkerboard blocks)
  cells[2] = [
    createCell(2, 0, 45, 'NUMBER', false),
    createCell(2, 1, null, 'OPERATOR', true, '/'),
    createCell(2, 2, null, 'BLOCK', true),
    createCell(2, 3, 5, 'NUMBER', true),
    createCell(2, 4, null, 'EQUALS', true, '=')
  ];

  // Row 3: equals
  cells[3] = [
    createCell(3, 0, null, 'EQUALS', true, '='),
    createCell(3, 1, null, 'BLOCK', true),
    createCell(3, 2, null, 'BLOCK', true),
    createCell(3, 3, null, 'EQUALS', true, '='),
    createCell(3, 4, null, 'BLOCK', true)
  ];

  // Row 4: 60 - 9 = 51 (Checkerboard blocks)
  cells[4] = [
    createCell(4, 0, 60, 'NUMBER', false),
    createCell(4, 1, null, 'OPERATOR', true, '-'),
    createCell(4, 2, null, 'BLOCK', true),
    createCell(4, 3, 9, 'NUMBER', true),
    createCell(4, 4, null, 'EQUALS', true, '=')
  ];

  // Add result cells
  cells[0][4] = createCell(0, 4, 60, 'NUMBER', false);
  cells[2][4] = createCell(2, 4, 9, 'NUMBER', true);
  cells[4][4] = createCell(4, 4, 51, 'NUMBER', false);

  return prepareLevel(cells);
};

