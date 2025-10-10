import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  TextInput,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTimerButtons,
  updateTimerButtonTitle,
  TimerButton,
} from "../services/firebase";

export default function SettingsScreen() {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<TimerButton | null>(null);
  const [newTitle, setNewTitle] = useState("");

  const {
    data: buttons,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["timerButtons"],
    queryFn: getTimerButtons,
  });

  const mutation = useMutation({
    mutationFn: updateTimerButtonTitle,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["timerButtons"] });
      setEditing(null);
      setNewTitle("");
      Alert.alert("Success", "The button title has been updated.");
    },
    onError: (err) => {
      Alert.alert("Error", `Failed to update: ${err.message}`);
    },
  });

  const handleEdit = (button: TimerButton) => {
    setEditing(button);
    setNewTitle(button.title);
  };

  const handleSave = () => {
    if (editing && newTitle.trim() !== "") {
      mutation.mutate({ id: editing.id, newTitle });
    }
  };

  const renderItem = ({ item }: { item: TimerButton }) => (
    <Pressable style={styles.item} onPress={() => handleEdit(item)}>
      <Text style={styles.itemText}>{item.title}</Text>
    </Pressable>
  );

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error fetching data</Text>
      </View>
    );
  }

  if (editing) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Edit Button Title</Text>
        <TextInput
          style={styles.input}
          value={newTitle}
          onChangeText={setNewTitle}
          placeholder="Enter new title"
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Cancel"
            onPress={() => setEditing(null)}
            color="#e74c3c"
          />
          <Button
            title={mutation.isPending ? "Saving..." : "Save"}
            onPress={handleSave}
            disabled={mutation.isPending}
          />
        </View>
      </View>
    );
  }

  return (
    <FlatList
      data={buttons}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
      ListHeaderComponent={
        <Text style={styles.title}>Tap a button to edit its title</Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  item: {
    backgroundColor: "#f0f0f0",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  itemText: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  errorText: {
    color: "red",
    fontSize: 18,
  },
});
