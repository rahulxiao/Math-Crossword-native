import { Link, useFocusEffect } from 'expo-router';
import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GameColors } from '../../constants/theme';
import { useGamePersistence } from '../../hooks/useGamePersistence';
import { TOTAL_LEVELS } from '../../src/game/logic';

export default function HomeScreen() {
  const { coins, completedLevels, refreshData } = useGamePersistence();

  // Refresh data when screen comes into focus to show latest progress
  useFocusEffect(
    useCallback(() => {
      refreshData();
    }, [refreshData])
  );

  const formattedLevelCount = completedLevels.length;
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

        <Text style={styles.subtitle}>Train your brain!</Text>

        {/* Stats Card */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <View style={styles.statIconContainer}>
              <Text style={styles.statIcon}>✓</Text>
            </View>
            <Text style={styles.statLabel}>Solved</Text>
            <Text style={styles.statValue}>{formattedLevelCount}</Text>
            <Text style={styles.statSubtext}>levels</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <View style={styles.statIconContainer}>
              <Text style={styles.statIcon}>💰</Text>
            </View>
            <Text style={styles.statLabel}>Coins</Text>
            <Text style={styles.statValue}>{coins}</Text>
            <Text style={styles.statSubtext}>earned</Text>
          </View>
        </View>

        {/* Progress Section */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Progress</Text>
            <Text style={styles.progressPercent}>{Math.round(progress)}%</Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
            </View>
          </View>
          <Text style={styles.nextLevelText}>Next: Level {nextLevel}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <Link href="/game" asChild>
            <TouchableOpacity style={styles.playButton} activeOpacity={0.8}>
              <Text style={styles.playIcon}>▶</Text>
              <Text style={styles.playText}>PLAY NOW</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/levels" asChild>
            <TouchableOpacity style={styles.levelsButton} activeOpacity={0.8}>
              <Text style={styles.levelsIcon}>📋</Text>
              <Text style={styles.levelsText}>SELECT LEVEL</Text>
            </TouchableOpacity>
          </Link>
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
    paddingTop: 20,
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  logoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 48,
    fontWeight: '900',
    color: GameColors.accent,
    letterSpacing: 2,
    textShadowColor: 'rgba(246, 173, 85, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  titleAccent: {
    fontSize: 48,
    fontWeight: '900',
    color: GameColors.primary,
    letterSpacing: 2,
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
  subtitle: {
    fontSize: 16,
    color: GameColors.text.secondary,
    marginBottom: 24,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: GameColors.surface,
    padding: 24,
    borderRadius: 20,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(113, 128, 150, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(56, 178, 172, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statIcon: {
    fontSize: 20,
  },
  statLabel: {
    fontSize: 12,
    color: GameColors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    fontWeight: '600',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 36,
    fontWeight: '900',
    color: GameColors.accent,
    marginBottom: 2,
  },
  statSubtext: {
    fontSize: 11,
    color: GameColors.text.secondary,
    opacity: 0.7,
  },
  divider: {
    width: 1,
    height: 60,
    backgroundColor: 'rgba(113, 128, 150, 0.3)',
    marginHorizontal: 8,
  },
  progressCard: {
    backgroundColor: GameColors.surface,
    padding: 20,
    borderRadius: 20,
    width: '100%',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(113, 128, 150, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 14,
    color: GameColors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    fontWeight: '600',
  },
  progressPercent: {
    fontSize: 18,
    fontWeight: 'bold',
    color: GameColors.primary,
  },
  progressBarContainer: {
    marginBottom: 12,
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
  nextLevelText: {
    fontSize: 14,
    color: GameColors.text.secondary,
    textAlign: 'center',
    fontWeight: '500',
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
  levelsButton: {
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
  levelsIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  levelsText: {
    color: GameColors.text.primary,
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 1,
  }
});
