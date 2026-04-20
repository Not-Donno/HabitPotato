import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, Text, View } from "react-native";

import { deleteHabit, loadHabits, toggleHabit } from "../../logic/habit.logic";

import { Habit } from "../../types/habit";

export default function HomeScreen() {
  const router = useRouter();
  const [habits, setHabits] = useState<Habit[]>([]);

  // Reload + auto-reset on focus
  useFocusEffect(
    useCallback(() => {
      loadHabits().then(setHabits);
    }, []),
  );

  return (
    <View className="flex-1 bg-black px-4 pt-12">
      {/* Title */}
      <Text className="text-white text-3xl font-bold mb-6">HabitPotato 🥔</Text>

      {/* Habit List */}
      <View className="flex-1">
        {habits.length === 0 ? (
          <Text className="text-gray-400 text-lg">No habits yet</Text>
        ) : (
          habits.map((h) => (
            <View
              key={h.id}
              className={`p-4 rounded-xl mb-3 ${
                h.completedToday ? "bg-green-600" : "bg-gray-900"
              }`}
            >
              {/* Tap to toggle complete */}
              <Pressable
                onPress={async () => {
                  const updated = await toggleHabit(h.id);
                  setHabits(updated);
                }}
              >
                <Text className="text-white text-lg font-semibold">
                  {h.name}
                </Text>

                <Text className="text-gray-200">
                  {h.completedToday ? "Completed ✅" : "Not done"}
                </Text>

                <Text className="text-gray-300">Streak: {h.streak}</Text>
              </Pressable>

              {/* Delete button */}
              <Pressable
                onPress={async () => {
                  const updated = await deleteHabit(h.id);
                  setHabits(updated);
                }}
                className="mt-3 bg-red-600 py-2 rounded-lg items-center"
              >
                <Text className="text-white font-semibold">Delete</Text>
              </Pressable>
            </View>
          ))
        )}
      </View>

      {/* Add Habit Button */}
      <Pressable
        onPress={() => router.push("/modal")}
        className="bg-green-500 py-4 rounded-2xl mb-6 items-center"
      >
        <Text className="text-black text-lg font-semibold">+ Add Habit</Text>
      </Pressable>
    </View>
  );
}
