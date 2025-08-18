import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Android ke liye LayoutAnimation enable
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const ExerciseScreen = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const exerciseOptions = [
    { 
      title: 'Stretching & Flexibility', 
      description: 'Gentle stretches to release tension.', 
      icon: 'body-outline',
      steps: [
        "Stand tall with feet shoulder-width apart.",
        "Slowly raise your arms overhead.",
        "Stretch side to side for 20 seconds.",
        "Hold for 30 seconds, repeat twice."
      ]
    },
    { 
      title: 'Mindful Yoga Flow', 
      description: 'Yoga poses focused on breath and movement.', 
      icon: 'leaf-outline',
      steps: [
        "Start in Mountain Pose.",
        "Inhale and raise arms overhead.",
        "Exhale into Forward Fold.",
        "Repeat 5 times focusing on breath."
      ]
    },
    { 
      title: 'Walking Meditation', 
      description: 'A guided walk to clear your mind.', 
      icon: 'walk-outline',
      steps: [
        "Walk slowly at a natural pace.",
        "Focus on each step you take.",
        "Breathe deeply and observe surroundings.",
        "Continue for 10 minutes."
      ]
    },
    { 
      title: 'Core Strength', 
      description: 'Exercises to build a strong core.', 
      icon: 'barbell-outline',
      steps: [
        "Do 20 crunches.",
        "Hold a plank for 30 seconds.",
        "Do 15 leg raises.",
        "Repeat for 3 rounds."
      ]
    },
    { 
      title: 'Cardio Blast', 
      description: 'A high-energy routine to boost your mood.', 
      icon: 'heart-outline',
      steps: [
        "Jumping jacks - 30 seconds.",
        "High knees - 30 seconds.",
        "Burpees - 10 reps.",
        "Repeat for 3 rounds."
      ]
    },
  ];

  const toggleExpand = (index: number) => {
    LayoutAnimation.easeInEaseOut();
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <LinearGradient colors={['#ffe4ec', '#fef6f9']} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>✨ Exercise & Yoga ✨</Text>
        {exerciseOptions.map((item, index) => {
          const isExpanded = expandedIndex === index;
          return (
            <TouchableOpacity 
              key={index} 
              activeOpacity={0.9}
              style={[styles.card, isExpanded && styles.expandedCard]}
              onPress={() => toggleExpand(index)}
            >
              <View style={styles.row}>
                <Ionicons name={item.icon} size={30} color="#ff4da6" style={styles.icon} />
                <View style={styles.textContainer}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardDescription}>{item.description}</Text>
                </View>
                <Ionicons 
                  name={isExpanded ? "chevron-up-outline" : "chevron-down-outline"} 
                  size={24} 
                  color="#666" 
                />
              </View>

              {isExpanded && (
                <View style={styles.stepsContainer}>
                  {item.steps.map((step, i) => (
                    <Text key={i} style={styles.step}>• {step}</Text>
                  ))}
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
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
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  expandedCard: {
    backgroundColor: '#fff0f6',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
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
  stepsContainer: {
    marginTop: 12,
    paddingLeft: 10,
  },
  step: {
    fontSize: 14,
    color: '#444',
    marginBottom: 6,
  },
});

export default ExerciseScreen;
