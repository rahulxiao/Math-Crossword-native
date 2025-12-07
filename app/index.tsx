import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GameColors } from '../constants/theme';
import { useGamePersistence } from '../hooks/useGamePersistence';
import { TOTAL_LEVELS } from '../src/game/logic';

export default function LandingPage() {
    const router = useRouter();
    const { completedLevels, coins } = useGamePersistence();

    // Calculate next level
    const nextLevel = Math.min(completedLevels.length + 1, TOTAL_LEVELS);
    const progress = (completedLevels.length / TOTAL_LEVELS) * 100;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {/* Header Section */}
                <View style={styles.headerSection}>
                    <View style={styles.logoContainer}>
                        <Text style={styles.title}>MATH</Text>
                        <Text style={styles.titleAccent}>CROSSWORD</Text>
                    </View>
                    <View style={styles.coinContainer}>
                        <Text style={styles.coinIcon}>💰</Text>
                        <Text style={styles.coinText}>{coins}</Text>
                    </View>
                </View>

                {/* Progress Card */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.subtitle}>Current Progress</Text>
                        <Text style={styles.progressText}>{completedLevels.length}/{TOTAL_LEVELS}</Text>
                    </View>
                    
                    <View style={styles.progressBarContainer}>
                        <View style={styles.progressBarBackground}>
                            <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
                        </View>
                    </View>

                    <View style={styles.levelContainer}>
                        <Text style={styles.levelLabel}>Next Level</Text>
                        <Text style={styles.level}>LEVEL {nextLevel}</Text>
                    </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.playButton}
                        onPress={() => router.push('/game')}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.playIcon}>▶</Text>
                        <Text style={styles.playText}>PLAY NOW</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.secondaryButton}
                        onPress={() => router.push('/(tabs)/levels')}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.secondaryIcon}>📋</Text>
                        <Text style={styles.secondaryText}>SELECT LEVEL</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GameColors.background,
    },
    content: {
        flex: 1,
        padding: 24,
        paddingTop: 40,
    },
    headerSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 40,
    },
    logoContainer: {
        flex: 1,
    },
    title: {
        fontSize: 52,
        fontWeight: '900',
        color: GameColors.accent,
        letterSpacing: 3,
        textShadowColor: 'rgba(246, 173, 85, 0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 8,
    },
    titleAccent: {
        fontSize: 52,
        fontWeight: '900',
        color: GameColors.primary,
        letterSpacing: 3,
        marginTop: -8,
        textShadowColor: 'rgba(56, 178, 172, 0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 8,
    },
    coinContainer: {
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
        fontSize: 20,
        marginRight: 8,
    },
    coinText: {
        color: GameColors.primary,
        fontSize: 18,
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: GameColors.surface,
        padding: 28,
        borderRadius: 24,
        width: '100%',
        marginBottom: 32,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 12,
        borderWidth: 1,
        borderColor: 'rgba(113, 128, 150, 0.2)',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    subtitle: {
        color: GameColors.text.secondary,
        fontSize: 14,
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        fontWeight: '600',
    },
    progressText: {
        color: GameColors.accent,
        fontSize: 16,
        fontWeight: 'bold',
    },
    progressBarContainer: {
        marginBottom: 24,
    },
    progressBarBackground: {
        height: 8,
        backgroundColor: 'rgba(113, 128, 150, 0.2)',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: GameColors.primary,
        borderRadius: 4,
        shadowColor: GameColors.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 4,
    },
    levelContainer: {
        alignItems: 'center',
    },
    levelLabel: {
        color: GameColors.text.secondary,
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 8,
    },
    level: {
        color: '#FFF',
        fontSize: 48,
        fontWeight: '900',
        letterSpacing: 2,
    },
    buttonContainer: {
        gap: 16,
        width: '100%',
    },
    playButton: {
        backgroundColor: GameColors.primary,
        paddingVertical: 18,
        paddingHorizontal: 32,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: GameColors.primary,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.5,
        shadowRadius: 12,
        elevation: 12,
        borderWidth: 2,
        borderColor: 'rgba(56, 178, 172, 0.3)',
    },
    playIcon: {
        color: '#FFF',
        fontSize: 20,
        marginRight: 12,
    },
    playText: {
        color: '#FFF',
        fontSize: 22,
        fontWeight: 'bold',
        letterSpacing: 1.5,
    },
    secondaryButton: {
        backgroundColor: 'rgba(74, 85, 104, 0.6)',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(113, 128, 150, 0.3)',
    },
    secondaryIcon: {
        fontSize: 18,
        marginRight: 10,
    },
    secondaryText: {
        color: GameColors.text.primary,
        fontSize: 18,
        fontWeight: '600',
        letterSpacing: 1,
    }
});
