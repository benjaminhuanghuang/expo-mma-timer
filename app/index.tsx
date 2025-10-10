import {
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { getTimerButtons, TimerButton } from "../services/firebase";

export default function HomeScreen() {
  const router = useRouter();

  const {
    data: buttons,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["timerButtons"],
    queryFn: getTimerButtons,
  });

  const renderItem = ({ item }: { item: TimerButton }) => (
    <Pressable
      style={styles.button}
      onPress={() => router.push(item.path as any)}
    >
      <FontAwesome5
        name={item.icon as any}
        size={28}
        color="#fff"
        style={styles.buttonIcon}
      />
      <Text style={styles.buttonText}>{item.title}</Text>
    </Pressable>
  );

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error fetching data</Text>
        <Text>{error.message}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={buttons}
      numColumns={2}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    flex: 1,
    margin: 8,
    backgroundColor: "#3498db",
    paddingVertical: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonIcon: {
    color: "#fff",
    marginBottom: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 18,
    marginBottom: 8,
  },
});
