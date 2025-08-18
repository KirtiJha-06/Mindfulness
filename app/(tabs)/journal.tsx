import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

const JournalScreen = () => {
  const [journalEntry, setJournalEntry] = useState<string>('');
  const [savedEntries, setSavedEntries] = useState<string[]>([]);

  const handleSave = () => {
    if (journalEntry.trim()) {
      setSavedEntries([journalEntry, ...savedEntries]);
      Alert.alert('✨ Entry Saved', 'Your journal entry has been saved successfully!');
      setJournalEntry('');
    } else {
      Alert.alert('⚠️ Cannot Save', 'Please write something before saving.');
    }
  };

  return (
    <LinearGradient colors={['#ffe4ec', '#fef6f9']} style={{ flex: 1 }}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          
          {/* Animated Header */}
          <Animatable.Text 
            animation="fadeInDown" 
            duration={1000} 
            style={styles.header}
          >
            📝 Daily Journal
          </Animatable.Text>

          {/* Input Box */}
          <Animatable.View animation="fadeInUp" duration={1000} style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              multiline
              placeholder="Write about your day, feelings, or thoughts..."
              placeholderTextColor="#999"
              value={journalEntry}
              onChangeText={setJournalEntry}
            />
          </Animatable.View>

          {/* Save Button */}
          <Animatable.View animation="bounceIn" delay={800}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>💾 Save Entry</Text>
            </TouchableOpacity>
          </Animatable.View>

          {/* Saved Entries */}
          {savedEntries.length > 0 && (
            <Animatable.View animation="fadeInUp" delay={400} style={styles.savedEntriesContainer}>
              <Text style={styles.subHeader}>📖 Your Saved Entries</Text>
              {savedEntries.map((entry, index) => (
                <View key={index} style={styles.entryCard}>
                  <Text style={styles.entryText}>{entry}</Text>
                </View>
              ))}
            </Animatable.View>
          )}

        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#ff4da6',
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    minHeight: 150,
  },
  textInput: {
    fontSize: 16,
    lineHeight: 22,
    textAlignVertical: 'top',
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#ff4da6',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#ff4da6',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  savedEntriesContainer: {
    marginTop: 10,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  entryCard: {
    backgroundColor: '#fff0f6',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#ff4da6',
  },
  entryText: {
    fontSize: 15,
    color: '#444',
    lineHeight: 20,
  },
});

export default JournalScreen;

