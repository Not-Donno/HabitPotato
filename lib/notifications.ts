// import * as Notifications from "expo-notifications";

// // show notifications even when app is foregrounded
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: false,
//   }),
// });

// /**
//  * Ask permission
//  */
// export async function requestNotificationPermission() {
//   const { status } = await Notifications.requestPermissionsAsync();
//   return status === "granted";
// }

// export async function scheduleDailyReminder() {
//   await Notifications.cancelAllScheduledNotificationsAsync();

//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: "HabitPotato 🥔",
//       body: "Don’t break your streak today!",
//     },
//     trigger: {
//       hour: 20, // 8 PM daily
//       minute: 0,
//       repeats: true,
//     },
//   });
// }
