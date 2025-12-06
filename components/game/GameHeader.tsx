import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GameColors } from '../../constants/theme';

interface GameHeaderProps {
    level: number;
    coins: number;
    onBack: () => void;
    onHint: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({ level, coins, onBack, onHint }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onBack} style={styles.button}>
                <Text style={styles.buttonText}>←</Text>
            </TouchableOpacity>

            <View style={styles.center}>
                <Text style={styles.levelLabel}>LEVEL</Text>
                <Text style={styles.levelText}>{level}</Text>
            </View>

            <View style={styles.right}>
                <View style={styles.coinBadge}>
                    <Text style={styles.coinText}>💰 {coins}</Text>
                </View>
                <TouchableOpacity onPress={onHint} style={styles.hintButton}>
                    <Text style={styles.hintText}>💡</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: GameColors.surface,
        borderBottomWidth: 1,
        borderBottomColor: GameColors.cell.border,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    button: {
        padding: 8,
        width: 40,
    },
    buttonText: {
        fontSize: 28,
        color: GameColors.text.primary,
        fontWeight: 'bold',
    },
    center: {
        alignItems: 'center',
    },
    levelLabel: {
        fontSize: 12,
        color: GameColors.text.secondary,
        fontWeight: '600',
        letterSpacing: 1,
    },
    levelText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: GameColors.accent,
    },
    right: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    hintButton: {
        padding: 10,
        backgroundColor: GameColors.button.background,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#4A5568',
    },
    hintText: {
        fontSize: 20,
    },
    coinBadge: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: GameColors.accent,
    },
    coinText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: GameColors.accent,
    },
});
