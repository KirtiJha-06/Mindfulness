
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function SettingsScreen() {
  return (
    <LinearGradient
      colors={["#ff9a9e", "#fad0c4", "#fbc2eb"]}
      style={styles.container}
    >
      {/* Profile Section */}
      <View style={styles.profileBox}>
        <Image
          source={{
            uri: "https://i.pravatar.cc/150?img=47", // random girl avatar
          }}
          style={styles.avatar}
        />
        <Text style={styles.username}>somya singh</Text>
        <Text style={styles.userInfo}>📧 somya.singh@example.com</Text>
        <Text style={styles.userInfo}>📞 +91 9876543210</Text>
      </View>

      {/* Options */}
      <View style={styles.optionBox}>
        <Text style={styles.optionTitle}>Font</Text>
        <Text style={styles.optionValue}>Default</Text>
      </View>
      <View style={styles.optionBox}>
        <Text style={styles.optionTitle}>Background Color</Text>
        <Text style={styles.optionValue}>Gradient Pink</Text>
      </View>
      <View style={styles.optionBox}>
        <Text style={styles.optionTitle}>History</Text>
        <Text style={styles.optionValue}>View Past Activity</Text>
      </View>

      {/* Feedback Button */}
      <TouchableOpacity style={styles.feedbackButton}>
        <Text style={styles.feedbackText}>💌 Give Feedback</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileBox: {
    alignItems: "center",
    marginBottom: 24,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 20,
    padding: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: "#fff",
  },
  username: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  userInfo: {
    fontSize: 14,
    color: "#f9f9f9",
  },
  optionBox: {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 4,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  optionValue: {
    fontSize: 16,
    color: "#555",
    marginTop: 4,
  },
  feedbackButton: {
    backgroundColor: "#ff6f91",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  feedbackText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
