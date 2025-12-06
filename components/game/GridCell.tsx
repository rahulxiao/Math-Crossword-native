import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GameColors } from '../../constants/theme';
import { Cell } from '../../src/game/types';

interface GridCellProps {
    cell: Cell;
    isSelected?: boolean;
    onPress: (cell: Cell) => void;
    cellSize?: number;
}

export const GridCell: React.FC<GridCellProps> = ({
    cell,
    isSelected,
    onPress,
    cellSize = 50
}) => {
    if (cell.type === 'BLOCK') {
        return <View style={[styles.cell, styles.block, { width: cellSize, height: cellSize }]} />;
    }

    const isLocked = cell.isLocked;
    const isOperator = cell.type === 'OPERATOR' || cell.type === 'EQUALS';

    // Decide background color
    let backgroundColor = GameColors.cell.default;
    let textColor = GameColors.cell.text;

    if (isLocked) {
        if (isOperator) {
            // Operators: Transparent or subtle background? 
            // Let's keep them unified but distinct text color?
            // Or separate background.
            backgroundColor = GameColors.cell.locked;
            textColor = GameColors.accent; // Accent color for operators
        } else {
            // Locked Numbers
            backgroundColor = GameColors.cell.locked;
            textColor = GameColors.cell.lockedText;
        }
    }

    if (cell.isValid === true) {
        backgroundColor = GameColors.cell.correct;
        textColor = '#FFF';
    } else if (cell.isValid === false) {
        backgroundColor = GameColors.cell.error;
        textColor = '#FFF';
    } else if (isSelected) {
        backgroundColor = GameColors.cell.selected;
        textColor = '#FFF';
    }

    // Use displayValue for operators, value for numbers
    const display = cell.type === 'NUMBER' ? (cell.value !== null ? cell.value.toString() : '') : cell.displayValue;

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => !isLocked && onPress(cell)}
            disabled={isLocked}
            style={[
                styles.cell,
                {
                    width: cellSize,
                    height: cellSize,
                    backgroundColor,
                    borderColor: isSelected ? GameColors.primary : GameColors.cell.border,
                    borderWidth: isSelected ? 3 : 1
                }
            ]}
        >
            <Text style={[
                styles.text,
                { color: textColor, fontSize: cellSize * 0.5 }
            ]}>
                {display}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cell: {
        margin: 2,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        // shadow for depth
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 4,
    },
    block: {
        backgroundColor: 'transparent',
        shadowOpacity: 0,
        elevation: 0,
        borderWidth: 0, // Ensure no border for blocks
    },
    text: {
        fontWeight: 'bold',
    }
});
