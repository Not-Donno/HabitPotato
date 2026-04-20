import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { addHabit } from "../logic/habit.logic";

export default function ModalScreen() {
  const router = useRouter();
  const [habit, setHabit] = useState("");

  return (
    <View className="flex-1 bg-black px-4 pt-12">
      {/* Title */}
      <Text className="text-white text-2xl font-bold mb-6">Add Habit</Text>

      {/* Input */}
      <TextInput
        value={habit}
        onChangeText={setHabit}
        placeholder="Enter habit..."
        placeholderTextColor="#888"
        className="bg-gray-900 text-white p-4 rounded-xl mb-4"
      />

      {/* Save */}
      <Pressable
        onPress={async () => {
          if (!habit.trim()) return;

          await addHabit(habit);
          router.back();
        }}
        className="bg-green-500 py-4 rounded-2xl items-center"
      >
        <Text className="text-black font-semibold text-lg">Save</Text>
      </Pressable>

      {/* Cancel */}
      <Pressable onPress={() => router.back()} className="mt-4 items-center">
        <Text className="text-gray-400">Cancel</Text>
      </Pressable>
    </View>
  );
}
