import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const STORAGE_KEYS = {
  COINS: 'math-crossword:coins',
  COMPLETED_LEVELS: 'math-crossword:completed-levels',
};

export const useGamePersistence = () => {
  const [coins, setCoins] = useState<number>(100); // Default 100
  const [completedLevels, setCompletedLevels] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const storedCoins = await AsyncStorage.getItem(STORAGE_KEYS.COINS);
      const storedLevels = await AsyncStorage.getItem(STORAGE_KEYS.COMPLETED_LEVELS);

      if (storedCoins !== null) {
        setCoins(parseInt(storedCoins, 10));
      }
      if (storedLevels !== null) {
        setCompletedLevels(JSON.parse(storedLevels));
      }
    } catch (e) {
      console.error('Failed to load game data', e);
    } finally {
      setIsLoading(false);
    }
  };

  const addCoins = async (amount: number) => {
    const newBalance = coins + amount;
    setCoins(newBalance);
    await AsyncStorage.setItem(STORAGE_KEYS.COINS, newBalance.toString());
  };

  const spendCoins = async (amount: number) => {
    if (coins >= amount) {
      const newBalance = coins - amount;
      setCoins(newBalance);
      await AsyncStorage.setItem(STORAGE_KEYS.COINS, newBalance.toString());
      return true;
    }
    return false;
  };

  const markLevelComplete = async (levelId: string) => {
    if (!completedLevels.includes(levelId)) {
      const newLevels = [...completedLevels, levelId];
      setCompletedLevels(newLevels);
      await AsyncStorage.setItem(STORAGE_KEYS.COMPLETED_LEVELS, JSON.stringify(newLevels));
    }
  };

  const refreshData = async () => {
    await loadData();
  };

  return {
    coins,
    completedLevels,
    isLoading,
    addCoins,
    spendCoins,
    markLevelComplete,
    refreshData,
  };
};
