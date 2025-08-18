import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

// You can customize the calendar's language settings
LocaleConfig.locales['en'] = {
  monthNames: [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ],
  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  today: 'Today',
};
LocaleConfig.defaultLocale = 'en';

type DayType = {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
};

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState<DayType | null>(null);

  // Example of marked dates to show a mood or journal entry.
  const markedDates: {
    [key: string]: {
      selected?: boolean;
      marked?: boolean;
      dotColor?: string;
      selectedColor?: string;
    };
  } = {
    '2025-08-15': { selected: true, marked: true, dotColor: 'blue' },
    '2025-08-20': { marked: true, dotColor: 'red' },
    '2025-08-25': { marked: true, dotColor: 'green' },
  };

  const getMarkedDates = () => {
    if (selectedDate) {
      return {
        ...markedDates,
        [selectedDate.dateString]: {
          ...(markedDates[selectedDate.dateString] || {}),
          selected: true,
          selectedColor: '#007bff',
        },
      };
    }
    return markedDates;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Calendar & Insights</Text>
      <Calendar
        style={styles.calendar}
        onDayPress={(day: DayType) => {
          setSelectedDate(day);
          console.log('Selected date:', day);
        }}
        markedDates={getMarkedDates()}
        theme={{
          selectedDayBackgroundColor: '#007bff',
          todayTextColor: '#007bff',
          arrowColor: '#007bff',
          dotColor: '#007bff',
        }}
      />
      <View style={styles.infoContainer}>
        {selectedDate ? (
          <Text style={styles.infoText}>
            Selected Date: {selectedDate.dateString}
          </Text>
        ) : (
          <Text style={styles.infoText}>Tap a date to see details.</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  calendar: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    marginBottom: 20,
  },
  infoContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
  },
});

export default CalendarScreen;
