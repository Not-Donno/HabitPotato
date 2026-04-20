import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Text, View } from "react-native";

import { loadHabits } from "../../logic/habit.logic";
import { Habit } from "../../types/habit";

export default function StatsScreen() {
  const [habits, setHabits] = useState<Habit[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadHabits().then(setHabits);
    }, []),
  );

  // 📊 calculations
  const totalHabits = habits.length;
  const completedToday = habits.filter((h) => h.completedToday).length;
  const totalStreak = habits.reduce((sum, h) => sum + h.streak, 0);

  return (
    <View className="flex-1 bg-black px-4 pt-12">
      <Text className="text-white text-3xl font-bold mb-6">Stats 📊</Text>

      {/* Cards */}
      <View className="space-y-4">
        <View className="bg-gray-900 p-5 rounded-xl">
          <Text className="text-gray-400">Total Habits</Text>
          <Text className="text-white text-2xl font-bold">{totalHabits}</Text>
        </View>

        <View className="bg-gray-900 p-5 rounded-xl">
          <Text className="text-gray-400">Completed Today</Text>
          <Text className="text-green-400 text-2xl font-bold">
            {completedToday}
          </Text>
        </View>

        <View className="bg-gray-900 p-5 rounded-xl">
          <Text className="text-gray-400">Total Streak Points</Text>
          <Text className="text-white text-2xl font-bold">{totalStreak}</Text>
        </View>
      </View>
    </View>
  );
}
