/*
Settings Screen
<<<<<<< HEAD
- Loads settings from Firestore using React Query
- Render the settings on the screen
- Edit the setting and save it back to Firestore
*/
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { Settings } from "../types/settings";
import { loadSettings, updateSettings } from "@/services/settings";

export default function SettingsScreen() {
  const queryClient = useQueryClient();
  const [selectedTheme, setSelectedTheme] = useState<
    "light" | "dark" | "system"
  >("system");

  const {
    data: settings,
    isLoading,
    error,
  } = useQuery<Settings | null>({
    queryKey: ["settings"],
    queryFn: loadSettings,
  });

  const mutation = useMutation({
    mutationFn: ({
      id,
      theme,
    }: {
      id: string;
      theme: "light" | "dark" | "system";
    }) => updateSettings(id, { theme }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      Alert.alert("Success", "Settings have been updated.");
    },
    onError: (err: any) => {
      Alert.alert("Error", `Failed to update settings: ${err.message}`);
    },
  });

  const handleThemeChange = (theme: "light" | "dark" | "system") => {
    if (!settings?.id) return;
    if (theme === selectedTheme) return;
    setSelectedTheme(theme);
    mutation.mutate({ id: settings.id, theme });
  };

  useEffect(() => {
    if (settings?.theme) {
      setSelectedTheme(settings.theme);
    }
  }, [settings]);
  // Remove duplicate/merged code block above

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Loading settings...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error loading settings</Text>
        <Text style={styles.errorSubText}>Please try again later</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.settingSection}>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Theme</Text>
          <View style={styles.themeOptions}>
            <Pressable
              style={[
                styles.themeOption,
                selectedTheme === "light" && styles.themeOptionActive,
              ]}
              onPress={() => handleThemeChange("light")}
              disabled={mutation.isPending}
            >
              <Text
                style={[
                  styles.themeOptionText,
                  selectedTheme === "light" && styles.themeOptionTextActive,
                ]}
              >
                Light
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.themeOption,
                selectedTheme === "dark" && styles.themeOptionActive,
              ]}
              onPress={() => handleThemeChange("dark")}
              disabled={mutation.isPending}
            >
              <Text
                style={[
                  styles.themeOptionText,
                  selectedTheme === "dark" && styles.themeOptionTextActive,
                ]}
              >
                Dark
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.themeOption,
                selectedTheme === "system" && styles.themeOptionActive,
              ]}
              onPress={() => handleThemeChange("system")}
              disabled={mutation.isPending}
            >
              <Text
                style={[
                  styles.themeOptionText,
                  selectedTheme === "system" && styles.themeOptionTextActive,
                ]}
              >
                System
              </Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* Updating indicator for settings */}
      {mutation.isPending && (
        <View style={styles.savingContainer}>
          <ActivityIndicator size="small" color="#3498db" />
          <Text style={styles.savingText}>Saving...</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  contentContainer: {
    padding: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "#2c3e50",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#7f8c8d",
  },
  errorText: {
    color: "#e74c3c",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  errorSubText: {
    color: "#95a5a6",
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
  },
  settingSection: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 16,
  },
  settingItem: {
    marginBottom: 12,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#34495e",
    marginBottom: 12,
  },
  themeOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  themeOption: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#e1e8ed",
    backgroundColor: "#f8f9fa",
    alignItems: "center",
  },
  themeOptionActive: {
    borderColor: "#3498db",
    backgroundColor: "#3498db",
  },
  themeOptionText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#34495e",
  },
  themeOptionTextActive: {
    color: "#ffffff",
  },
  savingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    padding: 12,
    backgroundColor: "#ecf0f1",
    borderRadius: 8,
  },
  savingText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#7f8c8d",
  },
  infoSection: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    color: "#7f8c8d",
    marginBottom: 4,
  },
});
=======
- Render the settings on the screen
- Edit the setting and save it back to Firestore
*/
import React from "react";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import ScreenView from "@/components/ScreenView";

export default function SettingsScreen() {
  return (
    <ScreenView>
      <ThemeSwitcher />
    </ScreenView>
  );
}
>>>>>>> 9b9232a (theme)
