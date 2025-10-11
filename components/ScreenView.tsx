import { SafeAreaView, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";

type ScreenViewProps = {
  children: React.ReactNode;
};

export default function ScreenView({ children }: ScreenViewProps) {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={[styles.centerContainer, { backgroundColor: colors.background }]}
    >
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
