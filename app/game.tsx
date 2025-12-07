import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GameGrid } from '../components/game/GameGrid';
import { GameHeader } from '../components/game/GameHeader';
import { NumberPad } from '../components/game/NumberPad';
import { GameColors } from '../constants/theme';
import { generateLevel, getHintForCell, TOTAL_LEVELS, validateGrid } from '../src/game/logic';
import { Cell, Grid, Level } from '../src/game/types';

import { useGamePersistence } from '../hooks/useGamePersistence';

export default function GameScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { width } = useWindowDimensions();
    const [level, setLevel] = useState<Level | null>(null);
    const [grid, setGrid] = useState<Grid | null>(null);
    const [selectedCellId, setSelectedCellId] = useState<string | null>(null);
    const [isSolved, setIsSolved] = useState(false);

    const { coins, spendCoins, addCoins, markLevelComplete, completedLevels, isLoading } = useGamePersistence();

    // Load level on mount
    // Load level on mount
    useEffect(() => {
        if (!isLoading) {
            if (params.level) {
                // If specific level requested via navigation
                startNewGame(parseInt(params.level as string, 10));
            } else {
                // Determine next level automatically
                startNewGame();
            }
        }
    }, [isLoading, params.level]);

    const startNewGame = (specificLevel?: number) => {
        let targetLevel = 1;

        if (specificLevel) {
            targetLevel = specificLevel;
        } else {
            // Auto-detect based on progress
            let maxLevel = 0;
            completedLevels.forEach(id => {
                const match = id.match(/level-(\d+)/);
                if (match) {
                    const num = parseInt(match[1], 10);
                    if (num > maxLevel) maxLevel = num;
                }
            });
            targetLevel = maxLevel + 1;
        }

        // Clamp to total levels
        if (targetLevel > TOTAL_LEVELS) {
            targetLevel = TOTAL_LEVELS;
        }

        const newLevel = generateLevel(targetLevel);
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
                    // Allow multi-digit input
                    let newValue = num;
                    if (cell.value !== null) {
                        const strVal = cell.value.toString() + num.toString();
                        if (strVal.length <= 5) {
                            newValue = parseInt(strVal, 10);
                        } else {
                            return cell;
                        }
                    }
                    return { ...cell, value: newValue };
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
                    if (cell.value === null) return cell;
                    const strVal = cell.value.toString();
                    if (strVal.length <= 1) {
                        return { ...cell, value: null };
                    } else {
                        return { ...cell, value: parseInt(strVal.slice(0, -1), 10) };
                    }
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
                
                if (level) {
                    const currentLevelNum = parseInt(level.id.replace('level-', ''), 10);
                    
                    // Check if this level can be completed (must be sequential)
                    // Level 1 can always be completed
                    // Other levels can only be completed if previous level is completed
                    const canComplete = currentLevelNum === 1 || 
                        completedLevels.includes(`level-${currentLevelNum - 1}`);
                    
                    if (canComplete) {
                        // Award coins
                        addCoins(50);
                        markLevelComplete(level.id);

                        Alert.alert("Puzzle Solved!", "Great job! +50 Coins", [
                            { text: "Menu", onPress: () => router.back() },
                            {
                                text: "Next Level",
                                onPress: () => {
                                    if (level) {
                                        const currentNum = parseInt(level.id.replace('level-', ''), 10);
                                        startNewGame(currentNum + 1);
                                    } else {
                                        startNewGame();
                                    }
                                }
                            }
                        ]);
                    } else {
                        Alert.alert(
                            "Complete Previous Levels First", 
                            `Please complete Level ${currentLevelNum - 1} before completing this level.`,
                            [{ text: "OK", onPress: () => router.back() }]
                        );
                    }
                }
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

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <GameHeader
                level={level ? parseInt(level.id.replace('level-', ''), 10) : 1}
                totalLevels={TOTAL_LEVELS}
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
        </SafeAreaView >
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
