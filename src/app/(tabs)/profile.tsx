import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useAccount } from "../../context/AccountContext";

export default function ProfileScreen() {
  const { account } = useAccount();

  if (!account) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Ionicons name="person-outline" size={40} color="#8E8E93" />
          </View>
          <Text style={styles.name}>Not Signed In</Text>
          <Text style={styles.email}>
            Create an account or sign in from Settings.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={40} color="#007AFF" />
        </View>
        <Text style={styles.name}>{account.name || "Guest User"}</Text>
        <Text style={styles.email}>
          {account.email || "No email provided"}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Details</Text>

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Full Name</Text>
          <Text style={styles.rowVal}>{account.name || "N/A"}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Account Number</Text>
          <Text style={styles.rowVal}>{account.accountNumber}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Account Type</Text>
          <Text style={styles.rowVal}>{account.accountType || "N/A"}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Email</Text>
          <Text style={styles.rowVal}>{account.email || "N/A"}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Phone Number</Text>
          <Text style={styles.rowVal}>{account.phone || "N/A"}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Account Status</Text>
          <Text
            style={[styles.rowVal, { color: "#34C759", fontWeight: "bold" }]}
          >
            Active
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa", padding: 16 },
  header: { alignItems: "center", marginVertical: 20 },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E5F1FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  name: { fontSize: 20, fontWeight: "bold", color: "#222" },
  email: { color: "#666", fontSize: 14, marginTop: 2 },
  section: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#eee",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 14,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  rowLabel: { color: "#666", fontSize: 14 },
  rowVal: { color: "#222", fontSize: 14, fontWeight: "500" },
});
