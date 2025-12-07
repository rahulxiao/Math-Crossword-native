import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GameColors } from '../../constants/theme';
import { useGamePersistence } from '../../hooks/useGamePersistence';
import { TOTAL_LEVELS } from '../../src/game/logic';

export default function LevelSelectScreen() {
    const router = useRouter();
    const { coins, completedLevels, refreshData } = useGamePersistence();

    // Refresh data when screen comes into focus to show latest progress
    useFocusEffect(
        useCallback(() => {
            refreshData();
        }, [refreshData])
    );

    const handleLevelPress = (levelNum: number) => {
        router.push({
            pathname: '/game',
            params: { level: levelNum }
        });
    };

    const progress = (completedLevels.length / TOTAL_LEVELS) * 100;

    const renderLevels = () => {
        const levels = [];
        
        // Get all completed level numbers and sort them
        const completedLevelNumbers = completedLevels
            .map(id => {
                const match = id.match(/level-(\d+)/);
                return match ? parseInt(match[1], 10) : 0;
            })
            .filter(num => num > 0)
            .sort((a, b) => a - b);
        
        const maxCompleted = completedLevelNumbers.length > 0 
            ? Math.max(...completedLevelNumbers) 
            : 0;

        for (let i = 1; i <= TOTAL_LEVELS; i++) {
            const isCompleted = completedLevels.includes(`level-${i}`);
            // Level 1 is always unlocked, other levels unlock only if previous level is completed
            // This ensures strict sequential unlocking
            const isUnlocked = i === 1 || completedLevels.includes(`level-${i - 1}`);
            // Current level is the first incomplete level after the highest completed level
            const isCurrent = !isCompleted && i === maxCompleted + 1;

            levels.push(
                <TouchableOpacity
                    key={i}
                    style={[
                        styles.levelButton,
                        isCompleted && styles.completedButton,
                        isCurrent && styles.currentButton,
                        !isUnlocked && styles.lockedButton
                    ]}
                    disabled={!isUnlocked}
                    onPress={() => handleLevelPress(i)}
                    activeOpacity={0.7}
                >
                    {!isUnlocked ? (
                        <View style={styles.lockedContent}>
                            <Text style={styles.lockIcon}>🔒</Text>
                        </View>
                    ) : (
                        <>
                            <Text style={[
                                styles.levelText,
                                isCurrent && styles.currentText,
                                isCompleted && styles.completedText
                            ]}>
                                {i}
                            </Text>
                            {isCompleted && (
                                <View style={styles.checkMarkContainer}>
                                    <Text style={styles.checkMark}>✓</Text>
                                </View>
                            )}
                            {isCompleted && (
                                <View style={styles.completedOverlay} />
                            )}
                            {isCurrent && (
                                <View style={styles.currentIndicator}>
                                    <View style={styles.pulseDot} />
                                </View>
                            )}
                        </>
                    )}
                </TouchableOpacity>
            );
        }
        return levels;
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>Level Selection</Text>
                    <Text style={styles.subtitle}>{completedLevels.length} of {TOTAL_LEVELS} Completed</Text>
                </View>
                <View style={styles.coinBadge}>
                    <Text style={styles.coinIcon}>💰</Text>
                    <Text style={styles.coinText}>{coins}</Text>
                </View>
            </View>

            <View style={styles.progressSection}>
                <View style={styles.progressBarContainer}>
                    <View style={styles.progressBarBackground}>
                        <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
                    </View>
                </View>
                <Text style={styles.progressText}>{Math.round(progress)}%</Text>
            </View>

            <ScrollView 
                contentContainerStyle={styles.grid}
                showsVerticalScrollIndicator={false}
            >
                {renderLevels()}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GameColors.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 24,
        paddingBottom: 16,
    },
    title: {
        fontSize: 32,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: GameColors.text.secondary,
        fontWeight: '500',
    },
    coinBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(56, 178, 172, 0.15)',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: GameColors.primary,
    },
    coinIcon: {
        fontSize: 18,
        marginRight: 8,
    },
    coinText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: GameColors.primary,
    },
    progressSection: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingBottom: 20,
        gap: 12,
    },
    progressBarContainer: {
        flex: 1,
    },
    progressBarBackground: {
        height: 10,
        backgroundColor: 'rgba(113, 128, 150, 0.2)',
        borderRadius: 5,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: GameColors.primary,
        borderRadius: 5,
        shadowColor: GameColors.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 4,
    },
    progressText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: GameColors.accent,
        minWidth: 45,
        textAlign: 'right',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 16,
        paddingTop: 8,
        justifyContent: 'center',
        gap: 12,
    },
    levelButton: {
        width: 80,
        height: 80,
        borderRadius: 16,
        backgroundColor: GameColors.surface,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: GameColors.cell.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
        position: 'relative',
    },
    completedButton: {
        backgroundColor: 'rgba(72, 187, 120, 0.15)',
        borderColor: GameColors.success,
        borderWidth: 2,
    },
    currentButton: {
        backgroundColor: 'rgba(246, 173, 85, 0.2)',
        borderColor: GameColors.accent,
        borderWidth: 3,
        shadowColor: GameColors.accent,
        shadowOpacity: 0.6,
        shadowRadius: 8,
        elevation: 8,
    },
    lockedButton: {
        backgroundColor: '#0F1419',
        borderColor: '#1A1F2E',
        opacity: 0.6,
    },
    levelText: {
        fontSize: 28,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 0.5,
    },
    currentText: {
        color: GameColors.accent,
    },
    completedText: {
        color: GameColors.success,
    },
    lockedContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    lockIcon: {
        fontSize: 32,
        opacity: 0.5,
    },
    checkMarkContainer: {
        position: 'absolute',
        bottom: 4,
        right: 4,
        backgroundColor: GameColors.success,
        width: 28,
        height: 28,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: '#FFF',
        shadowColor: GameColors.success,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 6,
        zIndex: 10,
    },
    checkMark: {
        fontSize: 16,
        color: '#FFF',
        fontWeight: '900',
        lineHeight: 18,
    },
    completedOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(72, 187, 120, 0.1)',
        borderRadius: 16,
        zIndex: 1,
    },
    currentIndicator: {
        position: 'absolute',
        top: 6,
        right: 6,
    },
    pulseDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: GameColors.accent,
        shadowColor: GameColors.accent,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 4,
    }
});

