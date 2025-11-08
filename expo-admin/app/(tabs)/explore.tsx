import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../lib/ThemeContext";
import ThemeToggle from "../../components/ui/ThemeToggle";

export default function ExploreScreen() {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>Explore</Text>
      </View>
      <ThemeToggle />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
  },
});
