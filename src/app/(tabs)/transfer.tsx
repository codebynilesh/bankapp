import { useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useAccount } from "../../context/AccountContext";

type Mode = "deposit" | "transfer";

export default function TransferScreen() {
  const { account, depositMoney, transferMoney } = useAccount();
  const [mode, setMode] = useState<Mode>("deposit");
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [error, setError] = useState("");

  const reset = () => {
    setAmount("");
    setRecipient("");
    setError("");
  };

  const handleSubmit = () => {
    if (!account) return;

    const value = parseFloat(amount);
    if (isNaN(value) || value <= 0) {
      setError("Enter an amount greater than 0.");
      return;
    }

    if (mode === "deposit") {
      depositMoney(value);
      reset();
      Alert.alert("Deposit Successful", `₹${value.toFixed(2)} added to your account.`);
      return;
    }

    if (!recipient.trim()) {
      setError("Enter the recipient's phone or email.");
      return;
    }
    if (value > account.balance) {
      setError("Insufficient balance for this transfer.");
      return;
    }

    transferMoney(value, recipient);
    reset();
    Alert.alert(
      "Transfer Successful",
      `₹${value.toFixed(2)} sent to ${recipient.trim()}.`,
    );
  };

  if (!account) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Transfer</Text>
        <Text style={styles.signedOut}>
          Sign in from Settings, or create an account, to deposit or transfer
          money.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transfer</Text>
      <Text style={styles.balance}>
        Current Balance: ₹{account.balance.toFixed(2)}
      </Text>

      <View style={styles.segment}>
        {(["deposit", "transfer"] as Mode[]).map((m) => (
          <TouchableOpacity
            key={m}
            style={[styles.segmentBtn, mode === m && styles.segmentActive]}
            onPress={() => {
              setMode(m);
              setError("");
            }}
          >
            <Text
              style={[
                styles.segmentText,
                mode === m && styles.segmentTextActive,
              ]}
            >
              {m === "deposit" ? "Deposit" : "Transfer to Others"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {mode === "transfer" && (
        <>
          <Text style={styles.label}>Recipient (phone or email)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 9876543210"
            value={recipient}
            onChangeText={(text) => {
              setRecipient(text);
              if (error) setError("");
            }}
            autoCapitalize="none"
          />
        </>
      )}

      <Text style={styles.label}>Amount (₹)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={(text) => {
          setAmount(text);
          if (error) setError("");
        }}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>
          {mode === "deposit" ? "Deposit" : "Transfer"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  balance: {
    fontSize: 18,
    marginBottom: 20,
  },
  signedOut: {
    fontSize: 15,
    color: "#666",
    lineHeight: 22,
  },
  segment: {
    flexDirection: "row",
    backgroundColor: "#E9E9EB",
    borderRadius: 10,
    padding: 4,
    marginBottom: 20,
    gap: 4,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  segmentActive: {
    backgroundColor: "#007AFF",
  },
  segmentText: {
    color: "#333",
    fontWeight: "600",
    fontSize: 13,
  },
  segmentTextActive: {
    color: "#fff",
  },
  label: {
    fontSize: 13,
    color: "#666",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  error: {
    color: "#FF3B30",
    marginBottom: 15,
    fontSize: 13,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
