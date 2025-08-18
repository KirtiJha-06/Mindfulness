// CalendarMoodScreen.tsx
import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { Calendar } from "react-native-calendars";
import { LinearGradient } from "expo-linear-gradient";

const moodOptions = [
  { emoji: "😊", label: "Happy" },
  { emoji: "😔", label: "Sad" },
  { emoji: "😡", label: "Angry" },
  { emoji: "😌", label: "Calm" },
  { emoji: "🤩", label: "Excited" },
];

export default function CalendarMoodScreen() {
  const [selectedDate, setSelectedDate] = useState("");
  const [moodModal, setMoodModal] = useState(false);
  const [moods, setMoods] = useState<{ [key: string]: string }>({});

  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString);
    setMoodModal(true);
  };

  const handleMoodSelect = (emoji: string) => {
    setMoods((prev) => ({ ...prev, [selectedDate]: emoji }));
    setMoodModal(false);
  };

  return (
    <LinearGradient
      colors={["#E0F7FA", "#EDE7F6"]} // light blue to lavender gradient
      style={styles.gradient}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Mood Calendar</Text>

        <Calendar
          onDayPress={handleDayPress}
          markedDates={Object.keys(moods).reduce((acc: any, date) => {
            acc[date] = {
              marked: true,
              dotColor: "#6200ee",
              customStyles: {
                container: { backgroundColor: "#fff", borderRadius: 6 },
                text: { color: "#000" },
              },
            };
            return acc;
          }, {})}
          theme={{
            backgroundColor: "transparent",
            calendarBackground: "transparent",
            todayTextColor: "#6200ee",
            arrowColor: "#6200ee",
          }}
        />

        <FlatList
          data={Object.keys(moods)}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View style={styles.moodItem}>
              <Text style={styles.date}>{item}</Text>
              <Text style={styles.emoji}>{moods[item]}</Text>
            </View>
          )}
        />

        {/* Mood Selection Modal */}
        <Modal visible={moodModal} transparent animationType="fade">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>How was your mood?</Text>
              <View style={styles.moodOptions}>
                {moodOptions.map((m, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.moodButton}
                    onPress={() => handleMoodSelect(m.emoji)}
                  >
                    <Text style={styles.moodEmoji}>{m.emoji}</Text>
                    <Text style={styles.moodLabel}>{m.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
    marginBottom: 12,
  },
  moodItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    marginVertical: 4,
    backgroundColor: "#ffffffaa",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  date: {
    fontSize: 16,
    color: "#333",
  },
  emoji: {
    fontSize: 22,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalContent: {
    margin: 20,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 16,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
  moodOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  moodButton: {
    alignItems: "center",
    margin: 10,
  },
  moodEmoji: {
    fontSize: 32,
  },
  moodLabel: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
});
