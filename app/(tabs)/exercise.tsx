import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ExerciseScreen = () => {
  const exerciseOptions: {
    title: string;
    description: string;
    icon: React.ComponentProps<typeof Ionicons>['name'];
  }[] = [
    { title: 'Stretching & Flexibility', description: 'Gentle stretches to release tension.', icon: 'body-outline' },
    { title: 'Mindful Yoga Flow', description: 'Yoga poses focused on breath and movement.', icon: 'leaf-outline' },
    { title: 'Walking Meditation', description: 'A guided walk to clear your mind.', icon: 'walk-outline' },
    { title: 'Core Strength', description: 'Exercises to build a strong core.', icon: 'barbell-outline' },
    { title: 'Cardio Blast', description: 'A high-energy routine to boost your mood.', icon: 'heart-outline' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Exercise & Yoga</Text>
      {exerciseOptions.map((item, index) => (
        <TouchableOpacity key={index} style={styles.card}>
          <Ionicons name={item.icon} size={30} color="#007bff" style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // The background color is changed here
    backgroundColor: '#FFD1E0',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  icon: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});

export default ExerciseScreen;