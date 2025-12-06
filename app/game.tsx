import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GameGrid } from '../components/game/GameGrid';
import { GameHeader } from '../components/game/GameHeader';
import { NumberPad } from '../components/game/NumberPad';
import { GameColors } from '../constants/theme';
import { generateLevel, getHintForCell, validateGrid } from '../src/game/logic';
import { Cell, Grid, Level } from '../src/game/types';

import { useGamePersistence } from '../hooks/useGamePersistence';

export default function GameScreen() {
    const router = useRouter();
    const { width } = useWindowDimensions();
    const [level, setLevel] = useState<Level | null>(null);
    const [grid, setGrid] = useState<Grid | null>(null);
    const [selectedCellId, setSelectedCellId] = useState<string | null>(null);
    const [isSolved, setIsSolved] = useState(false);

    const { coins, spendCoins, addCoins, markLevelComplete, completedLevels } = useGamePersistence();

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

        currentGrid.cells = currentGrid.cells.map(row =>
            row.map(cell => {
                let isValid: boolean | null | undefined = null; // neutral
                if (invalidCells.includes(cell.id)) {
                    isValid = false;
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
                    { text: "Menu", onPress: () => router.back() },
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

        if (!grid || !level) return;

        const correctValue = getHintForCell(level, selectedCellId);

        if (correctValue !== null) {
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
            // Alert.alert("Hint", `The number is ${correctValue}`); // Auto-fill is better.
        } else {
            Alert.alert("Hint", "No solution found for this cell.");
        }
    };

    if (!grid) return <View style={styles.container} />;

    // Level Number logic:
    // If we had sequential levels, we'd use level.id or persistence.
    // For now, let's just show "Level X" based on what we just played?
    // Or just "Playing".
    const displayLevel = completedLevels.length + 1; // Simplistic "Next Level" display

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <GameHeader
                level={displayLevel}
                coins={coins}
                onBack={() => router.back()}
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
