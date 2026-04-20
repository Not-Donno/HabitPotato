import { getToday, getYesterday } from "../lib/date";
import { getHabits, saveHabits } from "../storage/habits.storage";
import { Habit } from "../types/habit";

/**
 * Load habits + daily reset (UI consistency fix)
 */
export async function loadHabits(): Promise<Habit[]> {
  const habits = await getHabits();
  const today = getToday();

  let changed = false;

  const updated = habits.map((h) => {
    if (h.lastCompletedDate !== today) {
      changed = true;
      return {
        ...h,
        completedToday: false,
      };
    }
    return h;
  });

  if (changed) {
    await saveHabits(updated);
  }

  return updated;
}

/**
 * Add new habit
 */
export async function addHabit(name: string) {
  const habits = await getHabits();

  const newHabit: Habit = {
    id: Date.now().toString(),
    name,
    completedToday: false,
    streak: 0,
    lastCompletedDate: null,
  };

  const updated = [...habits, newHabit];
  await saveHabits(updated);

  return updated;
}

/**
 * Toggle completion + streak logic
 */
export async function toggleHabit(id: string) {
  const habits = await getHabits();

  const today = getToday();
  const yesterday = getYesterday();

  const updated = habits.map((h) => {
    if (h.id !== id) return h;

    // Undo if already completed today
    if (h.completedToday && h.lastCompletedDate === today) {
      return {
        ...h,
        completedToday: false,
        streak: Math.max(0, h.streak - 1),
        lastCompletedDate: null,
      };
    }

    // First ever completion
    if (!h.lastCompletedDate) {
      return {
        ...h,
        completedToday: true,
        streak: 1,
        lastCompletedDate: today,
      };
    }

    // Continue streak
    if (h.lastCompletedDate === yesterday) {
      return {
        ...h,
        completedToday: true,
        streak: h.streak + 1,
        lastCompletedDate: today,
      };
    }

    // Already done today
    if (h.lastCompletedDate === today) {
      return h;
    }

    // Missed day → reset streak
    return {
      ...h,
      completedToday: true,
      streak: 1,
      lastCompletedDate: today,
    };
  });

  await saveHabits(updated);
  return updated;
}

/**
 * Delete habit
 */
export async function deleteHabit(id: string) {
  const habits = await getHabits();

  const updated = habits.filter((h) => h.id !== id);

  await saveHabits(updated);
  return updated;
}
