import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GameColors } from '../constants/theme';
import { useGamePersistence } from '../hooks/useGamePersistence';

export default function LandingPage() {
    const router = useRouter();
    const { completedLevels } = useGamePersistence();

    // Calculate next level
    // completedLevels is a list of methods? No, it's string[] of IDs e.g. 'level-1', 'level-2'.
    // Simple count:
    const nextLevel = completedLevels.length + 1;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>MATH{'\n'}CROSSWORD</Text>

                <View style={styles.card}>
                    <Text style={styles.subtitle}>Current Progress</Text>
                    <Text style={styles.level}>LEVEL {nextLevel}</Text>
                </View>

                <TouchableOpacity
                    style={styles.playButton}
                    onPress={() => router.push('/game')}
                    activeOpacity={0.8}
                >
                    <Text style={styles.playText}>PLAY</Text>
                </TouchableOpacity>

                {/* <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryText}>SELECT LEVEL</Text>
        </TouchableOpacity> */}
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
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        gap: 40,
    },
    title: {
        fontSize: 48,
        fontWeight: '900',
        color: GameColors.accent,
        textAlign: 'center',
        marginBottom: 20,
        letterSpacing: 2,
    },
    card: {
        backgroundColor: GameColors.surface,
        padding: 30,
        borderRadius: 20,
        alignItems: 'center',
        width: '80%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    subtitle: {
        color: GameColors.text.secondary,
        fontSize: 16,
        textTransform: 'uppercase',
        marginBottom: 8,
        letterSpacing: 1,
    },
    level: {
        color: '#FFF',
        fontSize: 42,
        fontWeight: 'bold',
    },
    playButton: {
        backgroundColor: GameColors.primary,
        paddingVertical: 16,
        paddingHorizontal: 60,
        borderRadius: 50,
        shadowColor: GameColors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 8,
    },
    playText: {
        color: '#FFF', // White text on teal
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    secondaryButton: {
        padding: 12,
    },
    secondaryText: {
        color: GameColors.text.secondary,
        fontSize: 16,
        fontWeight: '600',
    }
});
