/*
Home Screen

- List the available timer options
- Navigates to respective screens on button press
*/
import { Text, Pressable, StyleSheet, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import { TimerButton } from "@/types/timerButton";
import { useTheme } from "@/context/ThemeContext";
import ScreenView from "@/components/ScreenView";

export default function HomeScreen() {
  const { colors } = useTheme();
  const buttons: TimerButton[] = [
    { id: "1", icon: "stopwatch-20", title: "HIIT Timer", path: "/hiit/list" },
    {
      id: "2",
      icon: "hourglass",
      title: "Countdown Timer",
      path: "/countdown/list",
    },
  ];
  const router = useRouter();

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

  return (
    <ScreenView>
      <FlatList
        data={buttons}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={[
          styles.container,
          { backgroundColor: colors.background },
        ]}
      />
    </ScreenView>
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
