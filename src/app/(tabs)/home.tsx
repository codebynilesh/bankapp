import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useAccount } from "../../context/AccountContext";

export default function HomeScreen() {
  const { account } = useAccount();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardSub}>Total Available Balance</Text>
        <Text style={styles.balanceText}>
          ₹{account ? account.balance.toFixed(2) : "0.00"}
        </Text>
        <Text style={styles.accNum}>
          {account ? account.accountNumber : "No Active Account"}
        </Text>
      </View>

      <Text style={styles.sectionHeader}>Quick Insights</Text>
      <View style={styles.grid}>
        <View style={styles.gridBox}>
          <Ionicons name="wallet-outline" size={28} color="#007AFF" />
          <Text style={styles.gridTitle}>Account Type</Text>
          <Text style={styles.gridVal}>{account?.accountType || "N/A"}</Text>
        </View>
        <View style={styles.gridBox}>
          <Ionicons name="swap-horizontal-outline" size={28} color="#34C759" />
          <Text style={styles.gridTitle}>Transactions</Text>
          <Text style={styles.gridVal}>
            {account?.transactions.length || 0} Total
          </Text>
        </View>
      </View>

      <Text style={styles.sectionHeader}>Recent Activity</Text>
      {!account?.transactions.length && (
        <Text style={styles.emptyText}>
          {account ? "No transactions yet." : "Sign in to see activity."}
        </Text>
      )}
      {account?.transactions.map((tx) => {
        const isDebit = tx.type === "Transfer";
        const icon = isDebit
          ? "arrow-up-circle"
          : tx.type === "Initial"
            ? "checkmark-circle"
            : "arrow-down-circle";
        const iconColor = isDebit
          ? "#FF3B30"
          : tx.type === "Initial"
            ? "#007AFF"
            : "#34C759";

        return (
          <View key={tx.id} style={styles.txRow}>
            <Ionicons name={icon} size={24} color={iconColor} />
            <View style={styles.txMeta}>
              <Text style={styles.txType}>
                {isDebit ? `Transfer to ${tx.recipient}` : `${tx.type} Amount`}
              </Text>
              <Text style={styles.txDate}>{tx.date}</Text>
            </View>
            <Text style={[styles.txAmount, isDebit && styles.txAmountDebit]}>
              {isDebit ? "-" : "+"}₹{tx.amount.toFixed(2)}
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa", padding: 16 },
  card: {
    backgroundColor: "#007AFF",
    borderRadius: 16,
    padding: 22,
    marginBottom: 20,
  },
  cardSub: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 13,
    textTransform: "uppercase",
  },
  balanceText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginVertical: 8,
  },
  accNum: { color: "rgba(255,255,255,0.9)", fontSize: 14, fontWeight: "500" },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  emptyText: { color: "#888", fontSize: 14, marginBottom: 10 },
  grid: { flexDirection: "row", gap: 12, marginBottom: 20 },
  gridBox: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },
  gridTitle: { color: "#666", fontSize: 12, marginTop: 8 },
  gridVal: { fontSize: 15, fontWeight: "bold", color: "#222", marginTop: 2 },
  txRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  txMeta: { flex: 1, marginLeft: 12 },
  txType: { fontWeight: "600", color: "#333" },
  txDate: { fontSize: 12, color: "#888" },
  txAmount: { fontWeight: "bold", color: "#34C759", fontSize: 15 },
  txAmountDebit: { color: "#FF3B30" },
});
