import { Stack, router } from "expo-router";
import { SafeAreaView, Pressable } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FontAwesome } from "@expo/vector-icons";
import { ThemeProvider } from "@/context/ThemeContext";

// Create a client
const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
          <Stack
            screenOptions={{
              headerStyle: { backgroundColor: "#3498db" },
              headerTintColor: "#fff",
              headerTitleAlign: "center",
              headerRight: () => (
                <Pressable onPress={() => router.push("/settings")}>
                  <FontAwesome
                    name="cog"
                    size={24}
                    color="white"
                    style={{ marginRight: 15 }}
                  />
                </Pressable>
              ),
            }}
          >
            <Stack.Screen name="index" options={{ title: "Home" }} />
            <Stack.Screen
              name="hiit"
              options={{ headerShown: true, title: "" }}
            />
            <Stack.Screen
              name="countdown"
              options={{ title: "", headerShown: true }}
            />
            <Stack.Screen name="settings" options={{ title: "Settings" }} />
          </Stack>
        </SafeAreaView>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
