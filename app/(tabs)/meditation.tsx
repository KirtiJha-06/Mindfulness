import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import type { IconProps } from '@expo/vector-icons/build/createIconSet';
// Removed invalid import of IconName

type MeditationOption = {
  title: string;
  description: string;
  icon: 'leaf-outline' | 'walk-outline' | 'body-outline'; // restrict to allowed Ionicons names
};

const MeditationScreen = () => {
  const meditationOptions: MeditationOption[] = [
    { title: 'Guided Breathing', description: 'A 5-minute session to calm your mind.', icon: 'leaf-outline' },
    { title: 'Mindful Walk', description: 'Focus on your senses and surroundings.', icon: 'walk-outline' },
    { title: 'Body Scan', description: 'Release tension throughout your body.', icon: 'body-outline' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Meditation & Mindfulness</Text>
      {meditationOptions.map((item, index) => (
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
    // The background color is changed to a light pink
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

export default MeditationScreen;