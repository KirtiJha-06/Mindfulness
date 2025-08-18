// app/index.tsx
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import ChatScreen from "../../Chatscreen"; // adjust path according to your folder structure

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ChatScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default App;
