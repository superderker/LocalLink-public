import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const ChatScreen = ({ navigation }) => {
  const [contacts, setContacts] = React.useState([]);
  const [messages, setMessages] = React.useState([]);
  const [selectedContactIndex, setSelectedContactIndex] = React.useState(0);
  const [newMessage, setNewMessage] = React.useState("");

  const fetchActivities = async () => {
    try {
      const response = await fetch(
        "https://api-ovtmrhypiq-ew.a.run.app/allactivitid/1"
      );
      if (!response.ok) throw new Error("Failed to fetch activities");
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error("Error fetching activities:", error);
      setContacts([]); // Ensure state is set to empty array on error
    }
  };

  const fetchMessagesForActivity = async (activityId) => {
    try {
      const response = await fetch(
        `https://api-ovtmrhypiq-ew.a.run.app/messagehistory/${activityId}`
      );
      if (!response.ok) throw new Error("Failed to fetch messages");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching messages:", error);
      return [];
    }
  };

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;
  
    try {
      const activityId = contacts[selectedContactIndex];
  
      const response = await fetch("https://api-ovtmrhypiq-ew.a.run.app/sendmessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderid: 1, // Adjust this if you have dynamic user info
          activityid: parseInt(activityId, 10),
          messagecontent: newMessage,
        }),
      });
  
      if (!response.ok) throw new Error("Failed to send message");
  
      const data = await response.json();
      setMessages((prevMessages) => [...prevMessages, data]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  

  React.useEffect(() => {
    fetchActivities();
  }, []);

  React.useEffect(() => {
    if (contacts.length > 0) {
      fetchMessagesForActivity(contacts[selectedContactIndex]).then((data) => {
        setMessages(data);
      });
    } else {
      setMessages([]); // Reset messages when no contacts are available
    }
  }, [selectedContactIndex, contacts]);

  const handleContactPress = (index) => {
    setSelectedContactIndex(index);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={90}
    >
      <View style={styles.contactsList}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.closeButton}
        >
          <Ionicons name="arrow-undo-outline" size={40} color="white" />
        </TouchableOpacity>
        <ScrollView>
          {contacts.length > 0 ? (
            contacts.map((contact, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.contactItem,
                  selectedContactIndex === index && styles.activeContact,
                ]}
                onPress={() => handleContactPress(index)}
              >
                <Text style={styles.contactText}>Activity {contact}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.emptyText}>No contacts available.</Text>
          )}
        </ScrollView>
      </View>
      <View style={styles.chatArea}>
        <ScrollView>
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <View
                key={index}
                style={[
                  styles.message,
                  message.sendername === "johnsmith"
                    ? styles.myMessage
                    : styles.theirMessage,
                ]}
              >
                <Text style={styles.messageText}>{message.messagecontent}</Text>
                <Text style={styles.senderName}>{message.sendername}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>No messages.</Text>
          )}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Type your message"
            placeholderTextColor="#888888"
          />
          <Button title="Send" onPress={sendMessage} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginTop: 50,
    backgroundColor: "#121212",
  },
  contactsList: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#1e1e1e",
    padding: 10,
  },
  contactItem: {
    backgroundColor: "#2c2c2c",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  activeContact: {
    backgroundColor: "#3d3d3d",
  },
  contactText: {
    fontSize: 16,
    color: "#ffffff",
  },
  chatArea: {
    flex: 3,
    backgroundColor: "#121212",
    padding: 10,
  },
  message: {
    marginVertical: 4,
    padding: 10,
    borderRadius: 10,
    maxWidth: "70%",
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#1f1f1f",
  },
  theirMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#2c2c2c",
  },
  messageText: {
    fontSize: 16,
    color: "#ffffff",
  },
  senderName: {
    fontSize: 12,
    color: "#999999",
    marginTop: 4,
  },
  closeButton: {
    marginTop: 10,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#888888",
    alignSelf: "center",
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#1e1e1e",
  },
  input: {
    flex: 1,
    borderColor: "#444444",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    color: "#ffffff",
    backgroundColor: "#2c2c2c",
  },
});
