import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import React, { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Supabase config
const SUPABASE_URL = "https://ajnrpplvtzdfddybzaas.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqbnJwcGx2dHpkZmRkeWJ6YWFzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzI3ODY2MywiZXhwIjoyMDU4ODU0NjYzfQ.8yKzJNEA3DW-AAwkh95G-emKTJ-rLKFHerh9f64xzHc";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Converts year to ordinal string
const getOrdinalYear = (year: string | number): string => {
  const y = parseInt(year.toString());
  const suffix = ["th", "st", "nd", "rd"];
  const v = y % 100;
  return y + (suffix[(v - 20) % 10] || suffix[v] || suffix[0]);
};

interface Message {
  id: number;
  senderid: number;
  sendername: string;
  senderyear: string;
  senderprogram: string;
  content: string;
  timestamp: string;
  group_id: number;
}

interface ChatGroup {
  id: number;
  yearofstudy: number;
  course_code: string;
  course_name: string;
}

export default function GroupChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [groups, setGroups] = useState<ChatGroup[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<ChatGroup | null>(null);
  const [user, setUser] = useState<any>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    loadUser();
    fetchGroups();

    const showSub = Keyboard.addListener("keyboardDidShow", () => {
      setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
    });
    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  useEffect(() => {
    if (!selectedGroup) return;

    fetchMessages();

    const channel = supabase
      .channel("realtime:groupchat")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "supabase_messages",
          filter: `group_id=eq.${selectedGroup.id}`,
        },
        (payload) => {
          const newMsg = payload.new as Message;
          setMessages((prev) => [...prev, newMsg]);
          setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedGroup]);

  const loadUser = async () => {
    const u = await AsyncStorage.getItem("currentUser");
    if (u) setUser(JSON.parse(u));
  };

  const fetchGroups = async () => {
    const { data, error } = await supabase.from("chat_groups").select("*").order("created_at");
    if (error) console.error("Error fetching groups", error);
    else setGroups(data || []);
  };

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from("supabase_messages")
      .select("*")
      .eq("group_id", selectedGroup?.id)
      .order("timestamp", { ascending: true });

    if (error) console.error("Error fetching messages:", error);
    else setMessages(data || []);
  };

  const sendMessage = async () => {
    if (!message.trim() || !user || !selectedGroup) return;

    const payload = {
      senderid: user.id,
      sendername: user.name,
      senderyear: user.yearofstudy.toString(),
      senderprogram: user.program,
      content: message,
      timestamp: new Date().toISOString(),
      group_id: selectedGroup.id,
    };

    const { error } = await supabase.from("supabase_messages").insert([payload]);
    if (error) console.error("Error sending message:", error);
    else setMessage("");
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.loginPromptText}>Please log in to access group chat.</Text>
      </SafeAreaView>
    );
  }

  if (!selectedGroup) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.header}>Select a Group</Text>
        {groups.map((g) => (
          <TouchableOpacity
            key={g.id}
            style={styles.groupCard}
            onPress={() => setSelectedGroup(g)}
          >
            <Text style={styles.groupTitle}>{g.course_name}</Text>
            <Text style={styles.groupSubtitle}>
              {g.course_code} • {getOrdinalYear(g.yearofstudy)} year
            </Text>
          </TouchableOpacity>
        ))}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 120 : 0}
        >
          {/* ✅ iMessage-style header */}
          <View style={styles.headerBar}>
            <TouchableOpacity onPress={() => setSelectedGroup(null)} style={styles.backButton}>
              <Text style={styles.backText}>‹ Back</Text>
            </TouchableOpacity>
            <Text style={styles.header}>{selectedGroup.course_name} Chat</Text>
          </View>
  
          <ScrollView
            ref={scrollViewRef}
            style={styles.chatContainer}
            contentContainerStyle={{ paddingBottom: 100 }}
            keyboardShouldPersistTaps="handled"
          >
            {messages.map((msg) => (
              <View
                key={msg.id}
                style={
                  msg.senderid === user.id ? styles.userMessage : styles.otherMessage
                }
              >
                <Text style={styles.senderName}>
                  {msg.sendername} ({getOrdinalYear(msg.senderyear)} year,{" "}
                  {msg.senderprogram})
                </Text>
                <Text style={styles.messageText}>{msg.content}</Text>
                <Text style={styles.timestamp}>
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </Text>
              </View>
            ))}
          </ScrollView>
  
          {/* ✅ Input bar inside a padding-safe wrapper */}
          <View style={styles.inputWrapper}>
            <View style={styles.inputContainer}>
              <TextInput
                ref={inputRef}
                style={styles.input}
                value={message}
                onChangeText={setMessage}
                placeholder="Type your message..."
                returnKeyType="send"
                onSubmitEditing={sendMessage}
                blurOnSubmit={false}
                placeholderTextColor="#888"
              />
              <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "web" ? 80 : 0,
  },
  container: { flex: 1 },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#F9F9F9", // 🔷 iMessage-style light bg
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  backButton: {
    marginRight: 12,
  },
  backText: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "500",
  },
  header: {
    fontSize: 17,
    fontWeight: "600",
    color: "#000",
  },
  groupCard: {
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 10,
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
  },
  groupTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  groupSubtitle: {
    color: "#555",
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: Platform.OS === "web" ? 10 : 0,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
    padding: 10,
    margin: 5,
    borderRadius: 8,
    maxWidth: "80%",
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#F0F0F0",
    padding: 10,
    margin: 5,
    borderRadius: 8,
    maxWidth: "80%",
  },
  senderName: {
    fontWeight: "bold",
    fontSize: 12,
  },
  messageText: {
    fontSize: 14,
  },
  timestamp: {
    fontSize: 10,
    color: "gray",
    alignSelf: "flex-end",
  },
  inputWrapper: {
    paddingBottom: Platform.OS === "ios" ? 40 : 10,
    backgroundColor: "white",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === "ios" ? 10 : 6,
    fontSize: 14,
  },
  sendButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginLeft: 8,
    borderRadius: 10,
  },
  sendButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loginPromptText: {
    fontSize: 16,
    color: "red",
  },
});