import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTheme } from "../../lib/ThemeContext";

export default function ThemeToggle() {
  const { theme, mode, toggleTheme } = useTheme();

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      style={[
        styles.button,
        {
          backgroundColor: theme.primary,
          shadowColor: "#000",
        },
      ]}
      activeOpacity={0.8}
    >
      <Text style={[styles.icon, { color: theme.primary50 }]}>
        {mode === "light" ? "🌙" : "☀️"}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 32,
    right: 32,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 1000,
  },
  icon: {
    fontSize: 24,
  },
});
