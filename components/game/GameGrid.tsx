import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Cell, Grid } from '../../src/game/types';
import { GridCell } from './GridCell';

interface GameGridProps {
    grid: Grid;
    selectedCellId: string | null;
    onCellPress: (cell: Cell) => void;
    width: number; // Available width to calculate cell size
}

export const GameGrid: React.FC<GameGridProps> = ({ grid, selectedCellId, onCellPress, width }) => {
    // Calculate cell size based on width and columns
    const padding = 20;
    const availableWidth = width - padding * 2;
    const cellSize = Math.floor(availableWidth / grid.cols);

    return (
        <View style={styles.container}>
            {grid.cells.map((row, rIndex) => (
                <View key={`row-${rIndex}`} style={styles.row}>
                    {row.map((cell) => (
                        <GridCell
                            key={cell.id}
                            cell={cell}
                            isSelected={selectedCellId === cell.id}
                            onPress={onCellPress}
                            cellSize={cellSize - 4} // Accounting for margin
                        />
                    ))}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    row: {
        flexDirection: 'row',
    }
});
