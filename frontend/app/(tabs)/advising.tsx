import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import React, { useState } from "react";
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

// Define the backend URL based on the environment
// Use localhost for iOS simulator and Android emulator
// "https://studenthub-project.onrender.com"
// const BACKEND_URL = "http://10.0.2.2:5001";
const BACKEND_URL = "https://studenthub-project.onrender.com"; // For Android emulator

export default function AdvisingScreen() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [pdfText, setPdfText] = useState("");

  async function testConnection() {
    try {
      const res = await fetch(`${BACKEND_URL}/api/test`);
      if (!res.ok) throw new Error(`Status: ${res.status}`);
      const data = await res.json();
      alert("Success: " + JSON.stringify(data));
    } catch (err: unknown) { // Explicitly marking err as unknown
      if (err instanceof Error) {
        alert("Error: " + err.message); // Safe to access err.message because err is confirmed as Error
      } else {
        // Handle cases where err is not an Error instance
        alert("Error: An unknown error occurred.");
      }
    }
  }

  async function pickPdfAndUploadBase64() {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      });

      if (result.canceled) return;

      if (result.assets && result.assets.length > 0) {
        const pickedFile = result.assets[0];
        let finalUri = pickedFile.uri;

        if (finalUri.startsWith("content://")) {
          const localPath = FileSystem.cacheDirectory + (pickedFile.name ?? "temp.pdf");
          await FileSystem.copyAsync({ from: finalUri, to: localPath });
          finalUri = localPath;
        }

        const base64Data = await FileSystem.readAsStringAsync(finalUri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        const uploadRes = await fetch(`${BACKEND_URL}/api/advising/upload-pdf-base64`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            base64Pdf: base64Data,
            fileName: pickedFile.name || "myFile.pdf",
          }),
        });

        const data = await uploadRes.json();
        if (data.success) {
          setPdfText(data.pdfText);
          setMessages((prev) => [...prev, { role: "assistant", content: data.summary }]);
        } else {
          alert("PDF upload failed: " + data.error);
        }
      } else {
        alert("No PDF file found. Please pick again.");
      }
    } catch (err) {
      alert("Error picking/uploading PDF: " + err);
    }
  }

  async function fetchAiAnswer(question: string, pdf: string): Promise<string> {
    try {
      const res = await fetch(`${BACKEND_URL}/api/advising/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userQuestion: question, pdfText: pdf }),
      });

      if (!res.ok) throw new Error(`Backend responded with status ${res.status}`);
      const data = await res.json();
      return data.success ? data.answer : Promise.reject(data.error);
    } catch (err) {
      return "Error contacting AI. Please try again.";
    }
  }

  async function sendMessage() {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");
    const aiReply = await fetchAiAnswer(input, pdfText);
    setMessages((prev) => [...prev, { role: "assistant", content: aiReply }]);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right", "bottom"]}>
        <KeyboardAvoidingView
          style={styles.keyboardContainer}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "android" ? 150 : 0}
        >
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Advising Chatbot</Text>
            <Button title="Upload PDF" onPress={pickPdfAndUploadBase64} />
          </View>

          <View style={styles.contentContainer}>
            <ScrollView style={styles.chatContainer} contentContainerStyle={styles.chatContent}>
              {messages.map((msg, index) => (
                <View key={index} style={[styles.messageBubble, msg.role === "user" ? styles.userBubble : styles.botBubble]}>
                  <Text style={styles.messageText}>{msg.content}</Text>
                </View>
              ))}
            </ScrollView>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={input}
                onChangeText={setInput}
                placeholder="Ask a question..."
                placeholderTextColor="#999"
              />
              <Button title="Send" onPress={sendMessage} />
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  keyboardContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  chatContainer: {
    flex: 1,
    paddingBottom: 100,  // Adjust this value if necessary to ensure it fits your screen
  },
  chatContent: {
    padding: 10,
  },
  messageBubble: {
    marginVertical: 4,
    padding: 8,
    borderRadius: 8,
    maxWidth: "75%",
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#ddd",
  },
  botBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#ADD8E6",
  },
  messageText: {
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    backgroundColor: "white",
    marginBottom: 50,  // Ensure this is sufficient to lift the input above any system navigation
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    fontSize: 14,
    marginRight: 10,
  },
});
