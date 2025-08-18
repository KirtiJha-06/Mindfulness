
import { Tabs } from 'expo-router';
import Feather from 'react-native-vector-icons/Feather';
import React from 'react';

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarStyle: {
					backgroundColor: '#fff5f5', // light pink
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Chat',
					tabBarIcon: ({ color, size }) => <Feather name="message-circle" color={color} size={size} />,
				}}
			/>
			<Tabs.Screen
				name="calenderscreen"
				options={{
					title: 'Calendar',
					tabBarIcon: ({ color, size }) => <Feather name="calendar" color={color} size={size} />,
				}}
			/>
			<Tabs.Screen
				name="exercise"
				options={{
					title: 'Exercise',
					tabBarIcon: ({ color, size }) => <Feather name="activity" color={color} size={size} />,
				}}
			/>
			<Tabs.Screen
				name="journal"
				options={{
					title: 'Journal',
					tabBarIcon: ({ color, size }) => <Feather name="book" color={color} size={size} />,
				}}
			/>
			<Tabs.Screen
				name="meditation"
				options={{
					title: 'Meditation',
					tabBarIcon: ({ color, size }) => <Feather name="cloud" color={color} size={size} />,
				}}
			/>
            <Tabs.Screen
				name="setting"
				options={{
					title: 'Setting',
					tabBarIcon: ({ color, size }) => <Feather name="setting" color={color} size={size} />,
				}}
			/>
		</Tabs>
	);
}

