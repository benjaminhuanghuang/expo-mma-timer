import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { ThemeMode } from "../style/theme";

export default function ThemeSwitcher() {
  const { colors, themeMode, setThemeMode } = useTheme();

  const options: { label: string; value: ThemeMode }[] = [
    { label: "System", value: "system" },
    { label: "Light", value: "light" },
    { label: "Dark", value: "dark" },
  ];

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>Theme</Text>

      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.option,
              {
                backgroundColor: colors.surface,
                borderColor:
                  themeMode === option.value ? colors.primary : colors.border,
                borderWidth: 2,
              },
            ]}
            onPress={() => setThemeMode(option.value)}
          >
            <Text
              style={[
                styles.optionText,
                {
                  color:
                    themeMode === option.value ? colors.primary : colors.text,
                },
              ]}
            >
              {option.label}
            </Text>
            {themeMode === option.value && (
              <View
                style={[styles.checkmark, { backgroundColor: colors.primary }]}
              >
                <Text style={styles.checkmarkText}>✓</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 15,
  },
  optionsContainer: {
    gap: 12,
    flexDirection: "row",
    width: "100%",
  },
  option: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 12,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "500",
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  checkmarkText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});
