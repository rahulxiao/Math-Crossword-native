import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GameColors } from '../../constants/theme';

interface NumberPadProps {
    onNumberPress: (num: number) => void;
    onDelete: () => void;
    disabled?: boolean;
}

export const NumberPad: React.FC<NumberPadProps> = ({ onNumberPress, onDelete, disabled }) => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                {[1, 2, 3].map((num) => (
                    <PadButton key={num} number={num} onPress={onNumberPress} disabled={disabled} />
                ))}
            </View>
            <View style={styles.row}>
                {[4, 5, 6].map((num) => (
                    <PadButton key={num} number={num} onPress={onNumberPress} disabled={disabled} />
                ))}
            </View>
            <View style={styles.row}>
                {[7, 8, 9].map((num) => (
                    <PadButton key={num} number={num} onPress={onNumberPress} disabled={disabled} />
                ))}
            </View>
            <View style={styles.row}>
                <View style={styles.spacer} />
                <PadButton number={0} onPress={onNumberPress} disabled={disabled} />
                <TouchableOpacity
                    style={[styles.button, styles.deleteButton]}
                    onPress={onDelete}
                    disabled={disabled}
                >
                    <Text style={styles.deleteText}>⌫</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const PadButton: React.FC<{ number: number; onPress: (n: number) => void; disabled?: boolean }> = ({ number, onPress, disabled }) => (
    <TouchableOpacity
        style={styles.button}
        onPress={() => onPress(number)}
        disabled={disabled}
        activeOpacity={0.7}
    >
        <Text style={styles.number}>{number}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        padding: 16,
        gap: 12,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 16,
        marginBottom: 8,
    },
    button: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: GameColors.button.background,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#4A5568',
    },
    deleteButton: {
        backgroundColor: '#C53030', // Red 600
        borderColor: '#9B2C2C',
    },
    number: {
        fontSize: 32,
        fontWeight: '600',
        color: GameColors.button.text,
    },
    deleteText: {
        fontSize: 28,
        color: '#FFF',
    },
    spacer: {
        width: 72,
    }
});
