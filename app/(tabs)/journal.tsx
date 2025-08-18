import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';

const JournalScreen = () => {
  const [journalEntry, setJournalEntry] = useState<string>('');

  const handleSave = () => {
    if (journalEntry.trim()) {
      Alert.alert('Entry Saved', 'Your journal entry has been saved successfully!');
      setJournalEntry('');
    } else {
      Alert.alert('Cannot Save', 'Please write something before saving.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Daily Journal</Text>
      <ScrollView style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          multiline
          placeholder="Write about your day, your feelings, or anything on your mind..."
          value={journalEntry}
          onChangeText={setJournalEntry}
        />
      </ScrollView>
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Entry</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // Change this line to set the background color to light pink
    backgroundColor: '#FFD1E0', 
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  textInput: {
    fontSize: 16,
    lineHeight: 24,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default JournalScreen;

