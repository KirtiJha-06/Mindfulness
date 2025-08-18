import 'react-native-gesture-handler';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { GoogleGenerativeAI } from '@google/generative-ai';

// =========================================================================
//                                  GEMINI INTEGRATION SETUP
// =========================================================================

const API_KEY = 'AIzaSyDBWZrNDvmO-LXVlnzluMhgwm-KOaHKxq0'; 
const genAI = new GoogleGenerativeAI(API_KEY);

// Define the Message type
type Message = {
  text: string;
  sender: 'user' | 'bot';
};

// =========================================================================
//                                 CHATBOT SCREEN
// =========================================================================

const ChatbotScreen = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [isChatEmpty, setIsChatEmpty] = useState(true);
  const [showSettingsBox, setShowSettingsBox] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const historyList = [
    'Fixing React update depth error',
    'JEE study schedule',
    'Admiration in family',
    'Math expression',
    'Ease meaning explanation',
    'PwC data consent guidance',
    'Interview question response tips',
    'Career field suggestions',
    'React developer about me',
    'Resume LaTeX Formatting',
    'Resume Formatting Assistance',
  ];

  const handleSendMessage = async () => {
    if (inputText.trim()) {
      const userMessage: Message = { text: inputText, sender: 'user' };
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setInputText('');
      setIsChatEmpty(false);
      setIsLoading(true);

      try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContent(userMessage.text);
        const botResponseText = result.response.text();

        const botResponse: Message = { text: botResponseText, sender: 'bot' };
        setMessages(prevMessages => [...prevMessages, botResponse]);
      } catch (error) {
        console.error('Gemini API Error:', error);
        Alert.alert('Error', 'Failed to get a response from the AI. Please try again later.');
        const errorMessage: Message = { text: 'Sorry, I am unable to connect to the AI right now. Please try again later.', sender: 'bot' };
        setMessages(prevMessages => [...prevMessages, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleMicPress = () => {
    Alert.alert('Microphone Activated', 'Listening for your voice input.');
  };

  const handleImagePress = () => {
    Alert.alert('Upload Image', 'You can now upload an image from your device.');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setDrawerOpen(true)} style={{ marginRight: 16 }}>
            <MaterialIcons name="menu" size={28} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>AI Mental Health</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/settings')} style={{ marginLeft: 'auto' }}>
            <Ionicons name="settings-outline" size={25} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Drawer Overlay */}
        {drawerOpen && (
          <View style={styles.drawerOverlay}>
            <View style={styles.drawerContainer}>
              <View>
                <View style={styles.drawerHeader}>
                  <Text style={styles.drawerTitle}>Menu</Text>
                  <TouchableOpacity onPress={() => setDrawerOpen(false)}>
                    <MaterialIcons name="close" size={28} color="#333" />
                  </TouchableOpacity>
                </View>
                <View style={styles.drawerItemRow}>
                  <MaterialIcons name="chat" size={22} color="#333" style={{ marginRight: 8 }} />
                  <TouchableOpacity onPress={() => { setMessages([]); setIsChatEmpty(true); setDrawerOpen(false); }}>
                    <Text style={styles.drawerItemText}>New chat</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.drawerItemRow}>
                  <MaterialIcons name="library-books" size={22} color="#333" style={{ marginRight: 8 }} />
                  <TouchableOpacity onPress={() => { router.push('/(tabs)/resources'); setDrawerOpen(false); }}>
                    <Text style={styles.drawerItemText}>Resources</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.drawerItemRow}>
                  <MaterialIcons name="history" size={22} color="#333" style={{ marginRight: 8 }} />
                  <TouchableOpacity onPress={() => setShowHistory(!showHistory)}>
                    <Text style={styles.drawerItemText}>Switch History</Text>
                  </TouchableOpacity>
                </View>
                {showHistory && (
                  <View style={{ marginLeft: 32, marginTop: 8 }}>
                    {historyList.map((item, idx) => (
                      <Text key={idx} style={{ color: '#333', fontSize: 15, marginBottom: 4 }}>{item}</Text>
                    ))}
                  </View>
                )}
              </View>
              <View>
                <View style={styles.drawerUserInfo}>
                  <View style={styles.drawerAvatar}>
                    <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 20 }}>K</Text>
                  </View>
                  <View>
                    <Text style={styles.drawerUserName}>Kirti Jha</Text>
                    <Text style={styles.drawerUserId}>ID: 12345</Text>
                    <Text style={styles.drawerUserId}>Usage: 10 hrs</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.drawerSettingsIcon} onPress={() => setShowSettingsBox(true)}>
                  <Ionicons name="settings-outline" size={28} color="#333" />
                </TouchableOpacity>
              </View>
              {showSettingsBox && (
                <View style={styles.drawerSettingsBox}>
                  <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 12 }}>Settings</Text>
                  <Text style={{ fontSize: 16, color: '#666' }}>Font: Default</Text>
                  <Text style={{ fontSize: 16, color: '#666' }}>Background: Light Pink</Text>
                  <TouchableOpacity onPress={() => setShowSettingsBox(false)} style={{ marginTop: 16 }}>
                    <Text style={{ color: '#007bff', fontWeight: 'bold' }}>Close</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Main Chat Area */}
        <ScrollView style={styles.chatArea}>
          {isChatEmpty ? (
            <View style={styles.welcomeSection}>
              <Text style={styles.welcomeText}>How was your mental health?</Text>
            </View>
          ) : (
            messages.map((msg, index) => (
              <View key={index} style={[styles.messageBubble, msg.sender === 'user' ? styles.userBubble : styles.botBubble]}>
                <Text style={msg.sender === 'user' ? styles.userMessageText : styles.botMessageText}>
                  {msg.text}
                </Text>
              </View>
            ))
          )}
          {isLoading && (
            <View style={styles.loadingBubble}>
              <Text style={styles.loadingText}>...</Text>
            </View>
          )}
        </ScrollView>

        {/* Bottom Input Bar with Send Button */}
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={handleImagePress}>
            <Ionicons name="image-outline" size={24} color="gray" />
          </TouchableOpacity>
          <TextInput
            style={styles.textInput}
            placeholder="Ask anything"
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={handleSendMessage}
            editable={!isLoading}
          />
          <TouchableOpacity style={styles.iconButton} onPress={handleMicPress} disabled={isLoading}>
            <Ionicons name="mic-outline" size={24} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage} disabled={isLoading}>
            <Ionicons name="pulse-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFD1E0',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  chatArea: {
    flex: 1,
    padding: 10,
  },
  welcomeSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  messageBubble: {
    padding: 12,
    borderRadius: 20,
    marginVertical: 5,
    maxWidth: '80%',
  },
  userBubble: {
    backgroundColor: '#007bff',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 5,
  },
  botBubble: {
    backgroundColor: '#e5e5e5',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 5,
  },
  loadingBubble: {
    backgroundColor: '#e5e5e5',
    alignSelf: 'flex-start',
    borderRadius: 20,
    marginVertical: 5,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  userMessageText: {
    color: '#fff',
  },
  botMessageText: {
    color: '#333',
  },
  loadingText: {
    color: '#333',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    padding: 10,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  iconButton: {
    padding: 5,
  },
  sendButton: {
    backgroundColor: '#6a0dad',
    borderRadius: 25,
    padding: 10,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Drawer-specific styles
  drawerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 100,
    justifyContent: 'flex-start',
  },
  drawerContainer: {
    width: 280,
    backgroundColor: '#fff5f5',
    height: '100%',
    paddingTop: 40,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    justifyContent: 'space-between',
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  drawerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  drawerItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  drawerItemText: {
    fontSize: 16,
    color: '#333',
  },
  drawerUserInfo: {
    alignItems: 'center',
    marginBottom: 24,
  },
  drawerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e0b3c6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  drawerUserName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  drawerUserId: {
    fontSize: 13,
    color: '#666',
  },
  drawerSettingsBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    position: 'absolute',
    bottom: 80,
    left: 30,
    right: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  drawerSettingsIcon: {
    alignItems: 'center',
    marginBottom: 24,
  },
});

export default ChatbotScreen;



