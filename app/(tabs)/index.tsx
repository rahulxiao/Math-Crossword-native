import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GameGrid } from '../../components/game/GameGrid';
import { GameHeader } from '../../components/game/GameHeader';
import { NumberPad } from '../../components/game/NumberPad';
import { GameColors } from '../../constants/theme';
import { generateLevel, validateGrid } from '../../src/game/logic';
import { Cell, Grid, Level } from '../../src/game/types';

import { useGamePersistence } from '../../hooks/useGamePersistence';

export default function GameScreen() {
  const { width } = useWindowDimensions();
  const [level, setLevel] = useState<Level | null>(null);
  const [grid, setGrid] = useState<Grid | null>(null);
  const [selectedCellId, setSelectedCellId] = useState<string | null>(null);
  const [isSolved, setIsSolved] = useState(false);

  const { coins, spendCoins, addCoins, markLevelComplete, isLoading } = useGamePersistence();

  // Load level on mount
  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const newLevel = generateLevel('EASY');
    setLevel(newLevel);
    setGrid(newLevel.grid);
    setSelectedCellId(null);
    setIsSolved(false);
  };

  const handleCellPress = (cell: Cell) => {
    if (cell.isLocked || isSolved) return;
    setSelectedCellId(cell.id);
  };

  const handleNumberPress = (num: number) => {
    if (!grid || !selectedCellId || isSolved) return;

    // Update grid
    const newGrid = { ...grid };
    newGrid.cells = newGrid.cells.map(row =>
      row.map(cell => {
        if (cell.id === selectedCellId) {
          return { ...cell, value: num };
        }
        return cell;
      })
    );

    updateGridAndCheck(newGrid);
  };

  const handleDelete = () => {
    if (!grid || !selectedCellId || isSolved) return;

    const newGrid = { ...grid };
    newGrid.cells = newGrid.cells.map(row =>
      row.map(cell => {
        if (cell.id === selectedCellId) {
          return { ...cell, value: null };
        }
        return cell;
      })
    );

    updateGridAndCheck(newGrid);
  };

  const updateGridAndCheck = (currentGrid: Grid) => {
    // Validate
    const { isComplete, invalidCells } = validateGrid(currentGrid);

    // Update validity state for UI feedback
    // If validation is strictly "invalid cells are those that break equations",
    // we can mark them. 
    // However, my validateGrid currently returns invalidCells only if a full row/col is wrong.
    // Let's reset validity first.
    currentGrid.cells = currentGrid.cells.map(row =>
      row.map(cell => {
        let isValid: boolean | null | undefined = null; // neutral
        if (invalidCells.includes(cell.id)) {
          isValid = false;
          // Note: My GridCell doesn't explicitly handle 'isValid = false' with red background yet, 
          // but I can add that to GridCell if I want distinct feedback.
          // Currently GridCell uses GameColors.cell.error if I map it? 
          // Wait, GridCell logic: "backgroundColor = GameColors.cell.default... if (isSelected)..."
          // I haven't implemented 'isValid' visual feedback in GridCell fully aside from types.
        } else if (isComplete) {
          isValid = true;
        }
        return { ...cell, isValid };
      })
    );

    setGrid(currentGrid);

    if (isComplete) {
      if (!isSolved) {
        setIsSolved(true);
        // Award coins
        addCoins(50);
        if (level) markLevelComplete(level.id);

        Alert.alert("Puzzle Solved!", "Great job! +50 Coins", [
          { text: "Next Level", onPress: startNewGame }
        ]);
      }
    }
  };

  const handleHint = async () => {
    const HINT_COST = 10;

    if (coins < HINT_COST) {
      Alert.alert("Not enough coins!", `Hints cost ${HINT_COST} coins.`);
      return;
    }

    if (!selectedCellId) {
      Alert.alert("Select a cell to get a hint!");
      return;
    }

    const success = await spendCoins(HINT_COST);
    if (!success) return;

    if (!grid) return;

    // Use the solution map from the level object
    // Note: TypeScript might not know about 'solution' if we didn't update the type definition in this file context yet?
    // We updated types.ts. We need to import helper.

    // We need to import { getHintForCell } but I can't add imports easily with replace_file_content if top is far away.
    // I shall do it in a separate step or assume I added it?
    // Actually, I can use a multi-replace to add import.
    // But for this chunk:
    // We need to access level.solution.

    if (level && level.solution) {
      const correctValue = level.solution[selectedCellId];
      if (correctValue !== undefined) {
        // Update logic to fill cell
        const newGrid: Grid = { ...grid };
        newGrid.cells = newGrid.cells.map(row =>
          row.map(cell => {
            if (cell.id === selectedCellId) {
              return { ...cell, value: correctValue };
            }
            return cell;
          })
        );
        updateGridAndCheck(newGrid);
        Alert.alert("Hint", `The number is ${correctValue}`);
      } else {
        Alert.alert("Hint", "No solution found for this cell.");
      }
    } else {
      Alert.alert("Error", "Level data missing solution.");
    }
  };

  if (!grid) return <View style={styles.container} />;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <GameHeader
        level={1}
        coins={coins}
        onBack={() => { }}
        onHint={handleHint}
      />

      <View style={styles.content}>
        <GameGrid
          grid={grid}
          width={width}
          selectedCellId={selectedCellId}
          onCellPress={handleCellPress}
        />
      </View>

      <View style={styles.footer}>
        <NumberPad
          onNumberPress={handleNumberPress}
          onDelete={handleDelete}
          disabled={isSolved}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GameColors.background, // Matches #1A202C
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    paddingBottom: 20,
  }
});
