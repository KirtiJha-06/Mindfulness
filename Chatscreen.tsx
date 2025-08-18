import 'react-native-gesture-handler';
import React, { useState, useEffect, useRef } from 'react';
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
  Animated,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { LinearGradient } from 'expo-linear-gradient';

const API_KEY = 'AIzaSyBPcu7ylZSkALRAHFoR-01gbHWBtTaSTDA'; // ⚠️ Add your Gemini API Key here
const genAI = new GoogleGenerativeAI(API_KEY);

type Message = {
  text: string;
  sender: 'user' | 'bot';
};

// =====================================================
// Typing Dots
// =====================================================
const TypingDots = () => {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateDot = (dot: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(dot, { toValue: 1, duration: 400, delay, useNativeDriver: true }),
          Animated.timing(dot, { toValue: 0.3, duration: 400, useNativeDriver: true }),
        ])
      ).start();
    };
    animateDot(dot1, 0);
    animateDot(dot2, 200);
    animateDot(dot3, 400);
  }, []);

  return (
    <View style={styles.dotsContainer}>
      <Animated.Text style={[styles.dot, { opacity: dot1 }]}>•</Animated.Text>
      <Animated.Text style={[styles.dot, { opacity: dot2 }]}>•</Animated.Text>
      <Animated.Text style={[styles.dot, { opacity: dot3 }]}>•</Animated.Text>
    </View>
  );
};

// =====================================================
// Animated Message Bubble
// =====================================================
const AnimatedMessage = ({ msg }: { msg: Message }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.messageBubble,
        msg.sender === 'user' ? styles.userBubble : styles.botBubble,
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
      ]}
    >
      <Text style={msg.sender === 'user' ? styles.userMessageText : styles.botMessageText}>
        {msg.text}
      </Text>
    </Animated.View>
  );
};

// =====================================================
// Chatbot Screen
// =====================================================
const ChatbotScreen = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isChatEmpty, setIsChatEmpty] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSendMessage = async () => {
    if (inputText.trim()) {
      const userMessage: Message = { text: inputText, sender: 'user' };
      setMessages(prev => [...prev, userMessage]);
      setInputText('');
      setIsChatEmpty(false);
      setIsLoading(true);

      try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContent(userMessage.text);
        const botResponseText = result.response.text();

        const botResponse: Message = { text: botResponseText, sender: 'bot' };
        setMessages(prev => [...prev, botResponse]);
      } catch (error) {
        console.error('Gemini API Error:', error);
        Alert.alert('Error', 'Could not fetch AI response.');
        const errorMessage: Message = { text: 'Sorry, I am unavailable right now.', sender: 'bot' };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <LinearGradient colors={['#fde2e4', '#f8bbd0', '#f48fb1']} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
          keyboardVerticalOffset={80}
        >
          {/* Header */}
          <View style={styles.header}>
            <MaterialIcons name="spa" size={26} color="#6D4C41" style={{ marginRight: 8 }} />
            <Text style={styles.headerTitle}>Mindfulness</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/settings')} style={{ marginLeft: 'auto' }}>
              <Ionicons name="settings-outline" size={23} color="#6D4C41" />
            </TouchableOpacity>
          </View>

          {/* Chat Area */}
          <ScrollView
            style={styles.chatArea}
            ref={scrollViewRef}
            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
          >
            {isChatEmpty ? (
              <View style={styles.welcomeSection}>
                <Text style={styles.welcomeText}>🌸 Welcome to Mindfulness 🌸</Text>
                <Text style={styles.subWelcomeText}>How are you feeling today? 🌿</Text>
              </View>
            ) : (
              messages.map((msg, index) => <AnimatedMessage key={index} msg={msg} />)
            )}

            {isLoading && (
              <View style={styles.loadingBubble}>
                <TypingDots />
              </View>
            )}
          </ScrollView>

          {/* Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Share your thoughts..."
              placeholderTextColor="#999"
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={handleSendMessage}
              editable={!isLoading}
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage} disabled={isLoading}>
              <Ionicons name="send" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ChatbotScreen;

// =====================================================
// Styles
// =====================================================
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8bbd0',
    borderBottomWidth: 0.5,
    borderColor: '#e57373',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerTitle: { fontSize: 20, fontWeight: '600', color: '#5D4037' },

  chatArea: { flex: 1, padding: 14 },

  welcomeSection: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 40 },
  welcomeText: { fontSize: 22, fontWeight: '600', color: '#333', textAlign: 'center' },
  subWelcomeText: { marginTop: 8, fontSize: 15, color: '#666', textAlign: 'center' },

  messageBubble: {
    padding: 14,
    borderRadius: 18,
    marginVertical: 6,
    maxWidth: '78%',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  userBubble: { backgroundColor: '#f48fb1', alignSelf: 'flex-end', borderBottomRightRadius: 6 },
  botBubble: { backgroundColor: '#fce4ec', alignSelf: 'flex-start', borderBottomLeftRadius: 6 },

  userMessageText: { color: '#fff', fontSize: 16, lineHeight: 22 },
  botMessageText: { color: '#880e4f', fontSize: 16, lineHeight: 22 },

  loadingBubble: {
    backgroundColor: '#fce4ec',
    alignSelf: 'flex-start',
    borderRadius: 18,
    marginVertical: 5,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },

  dotsContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', height: 20 },
  dot: { fontSize: 26, color: '#d81b60', marginHorizontal: 2 },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 10,
    borderTopWidth: 0.5,
    borderColor: '#E0E0E0',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#F1F1F1',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginRight: 6,
  },
  sendButton: {
    backgroundColor: '#ec407a',
    borderRadius: 25,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});



