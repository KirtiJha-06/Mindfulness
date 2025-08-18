import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

type MeditationOption = {
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  steps: string[];
  duration: number; // meditation time in minutes
};

const MeditationScreen = () => {
  const [selected, setSelected] = useState<MeditationOption | null>(null);

  const meditationOptions: MeditationOption[] = [
    { 
      title: 'Guided Breathing', 
      description: 'A 5-minute session to calm your mind.', 
      icon: 'leaf-outline',
      steps: [
        "Sit comfortably with your eyes closed.",
        "Inhale deeply for 4 seconds.",
        "Hold your breath for 2 seconds.",
        "Exhale slowly for 6 seconds.",
        "Repeat this cycle for the full session."
      ],
      duration: 5
    },
    { 
      title: 'Mindful Walk', 
      description: 'Focus on your senses and surroundings.', 
      icon: 'walk-outline',
      steps: [
        "Walk slowly at a natural pace.",
        "Notice the ground under your feet.",
        "Observe sounds, sights, and smells.",
        "Breathe deeply and stay present.",
        "Continue for the full duration."
      ],
      duration: 10
    },
    { 
      title: 'Body Scan', 
      description: 'Release tension throughout your body.', 
      icon: 'body-outline',
      steps: [
        "Lie down or sit in a relaxed position.",
        "Close your eyes and take a few deep breaths.",
        "Bring awareness to your toes, relaxing them.",
        "Slowly move attention up through legs, torso, arms, and head.",
        "End with a full-body awareness and calm breathing."
      ],
      duration: 15
    },
  ];

  return (
    <LinearGradient colors={['#fdfbfb', '#ffe4ec']} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Meditation & Mindfulness</Text>

        {!selected ? (
          // Meditation List
          meditationOptions.map((item, index) => (
            <Animatable.View key={index} animation="fadeInUp" delay={index * 150}>
              <TouchableOpacity 
                style={styles.card}
                onPress={() => setSelected(item)}
              >
                <Ionicons name={item.icon} size={30} color="#6a5acd" style={styles.icon} />
                <View style={styles.textContainer}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardDescription}>{item.description}</Text>
                </View>
              </TouchableOpacity>
            </Animatable.View>
          ))
        ) : (
          // Meditation Detail View
          <Animatable.View animation="fadeInUp" style={styles.detailContainer}>
            <Text style={styles.detailTitle}>{selected.title}</Text>
            <Text style={styles.detailDuration}>⏱ {selected.duration} min session</Text>

            {selected.steps.map((step, idx) => (
              <Animatable.Text 
                key={idx} 
                animation="fadeInLeft" 
                delay={idx * 300} 
                style={styles.stepText}
              >
                {idx + 1}. {step}
              </Animatable.Text>
            ))}

            <TouchableOpacity style={styles.backButton} onPress={() => setSelected(null)}>
              <Text style={styles.backButtonText}>← Back to Meditations</Text>
            </TouchableOpacity>
          </Animatable.View>
        )}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
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
    color: '#111',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  detailContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  detailTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6a5acd',
    marginBottom: 10,
    textAlign: 'center',
  },
  detailDuration: {
    fontSize: 16,
    color: '#444',
    marginBottom: 20,
    textAlign: 'center',
  },
  stepText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
    lineHeight: 22,
  },
  backButton: {
    marginTop: 20,
    backgroundColor: '#6a5acd',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MeditationScreen;
