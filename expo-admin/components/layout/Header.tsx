import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../../lib/ThemeContext";

export default function Header() {
  const { theme, mode, toggleTheme } = useTheme();

  return (
    <View
      style={[
        styles.header,
        { backgroundColor: theme.surface, borderBottomColor: theme.border },
      ]}
    >
      <Text style={[styles.title, { color: theme.primary }]}>Flint Admin</Text>

      <TouchableOpacity
        onPress={toggleTheme}
        style={[styles.button, { backgroundColor: theme.primary }]}
      >
        <Text style={[styles.buttonText, { color: theme.primary50 }]}>
          {mode === "light" ? "🌙 Dark" : "☀️ Light"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "500",
  },
});
