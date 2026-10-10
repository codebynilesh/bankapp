import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useAccount } from "../../context/AccountContext";

export default function SettingsScreen() {
  const { account, signIn, signOut } = useAccount();
  const [notifications, setNotifications] = useState(true);
  const [biometrics, setBiometrics] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = () => {
    const signInError = signIn(identifier);
    if (signInError) {
      setError(signInError);
      return;
    }
    setIdentifier("");
    setError("");
    Alert.alert("Signed In", "Welcome back!");
  };

  const handleSignOut = () => {
    signOut();
    Alert.alert("Signed Out", "You have been signed out.");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.box}>
        <Text style={styles.boxTitle}>Account</Text>

        {account ? (
          <View>
            <Text style={styles.signedInAs}>Signed in as {account.name}</Text>
            <Text style={styles.accountMeta}>
              {account.email} · {account.phone}
            </Text>
            <TouchableOpacity style={styles.signOutBtn} onPress={handleSignOut}>
              <Text style={styles.signOutText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Text style={styles.signedInAs}>Not signed in</Text>
            <TextInput
              style={styles.input}
              placeholder="Phone number or email"
              value={identifier}
              onChangeText={(text) => {
                setIdentifier(text);
                if (error) setError("");
              }}
              autoCapitalize="none"
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TouchableOpacity style={styles.signInBtn} onPress={handleSignIn}>
              <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>
            <Text style={styles.hint}>Demo account: 9876543210</Text>
          </View>
        )}
      </View>

      <View style={styles.box}>
        <View style={styles.row}>
          <Ionicons name="notifications-outline" size={22} color="#333" />
          <Text style={styles.label}>Push Notifications</Text>
          <Switch value={notifications} onValueChange={setNotifications} />
        </View>

        <View style={styles.row}>
          <Ionicons name="finger-print-outline" size={22} color="#333" />
          <Text style={styles.label}>Biometric Login</Text>
          <Switch value={biometrics} onValueChange={setBiometrics} />
        </View>
      </View>

      <TouchableOpacity
        style={styles.btn}
        onPress={() =>
          Alert.alert("BankApp v1.0.0", "Hosted on apps.codebynilesh.com")
        }
      >
        <Text style={styles.btnText}>About App</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: "#f8f9fa", padding: 16 },
  box: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#eee",
    marginBottom: 20,
  },
  boxTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 12,
  },
  signedInAs: { fontSize: 15, fontWeight: "600", color: "#222" },
  accountMeta: { fontSize: 13, color: "#666", marginTop: 2 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
    marginTop: 12,
    marginBottom: 10,
  },
  error: { color: "#FF3B30", fontSize: 13, marginBottom: 10 },
  hint: { color: "#8E8E93", fontSize: 12, marginTop: 10 },
  signInBtn: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  signInText: { color: "#fff", fontWeight: "bold" },
  signOutBtn: {
    marginTop: 14,
    borderWidth: 1,
    borderColor: "#FF3B30",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  signOutText: { color: "#FF3B30", fontWeight: "bold" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  label: { flex: 1, marginLeft: 12, fontSize: 15, color: "#333" },
  btn: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  btnText: { color: "#333", fontWeight: "600" },
});
