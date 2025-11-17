import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigation";
import { setStoredUserName } from "../storage/userStorage";

type LoginNavProp = StackNavigationProp<RootStackParamList, "Login">;

interface Props {
  navigation: LoginNavProp;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Missing Info", "Please enter email and password.");
      return;
    }

    try {
      setLoading(true);
      await setStoredUserName(email.trim());
      navigation.reset({
        index: 0,
        routes: [{ name: "SongList" }],
      });
    } catch (error) {
      Alert.alert("Error", "Unable to sign in right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoIcon}>🎧</Text>
        </View>
        <Text style={styles.logoText}>Music Songs</Text>
      </View>
      <Text style={styles.subtitle}>Enjoy Listening To Music</Text>

      <View style={styles.form}>
        <TextInput
          placeholder="Username"
          placeholderTextColor="#9aa0a6"
          style={styles.input}
          value={email}
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#9aa0a6"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.checkbox, rememberMe && styles.checkboxActive]}
            onPress={() => setRememberMe((prev) => !prev)}
          >
            {rememberMe && <Text style={styles.checkboxTick}>✓</Text>}
          </TouchableOpacity>
          <Text style={styles.rememberText}>Remember me</Text>


        </View>

        <TouchableOpacity
          style={styles.signButton}
          onPress={handleSignIn}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.signText}>Sign</Text>
          )}
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>
        Don't have an account?{" "}
        <Text style={styles.linkText}>Sign up</Text> for free!
      </Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  logoWrapper: {
    alignItems: "center",
    gap: 10,
  },
  logoCircle: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  logoIcon: {
    fontSize: 30,
  },
  logoText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
  },
  subtitle: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "600",
    color: "#5f6368",
  },
  form: {
    width: "100%",
    marginTop: 32,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d5d5d5",
    borderRadius: 25,
    paddingHorizontal: 18,
    paddingVertical: 12,
    marginBottom: 16,
    fontSize: 15,
    color: "#fff",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#b1b1b1",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  checkboxActive: {
    backgroundColor: "#fff",
    borderColor: "#fff",
  },
  checkboxTick: {
    color: "#000",
    fontSize: 12,
    fontWeight: "700",
  },
  rememberText: {
    color: "#5f6368",
    fontSize: 14,
  },
  forgotContainer: {
    marginLeft: "auto",
  },
  forgotText: {
    color: "#5f6368",
    fontSize: 13,
  },
  forgotLink: {
    color: "#1db954",
    fontWeight: "600",
  },
  signButton: {
    backgroundColor: "#fff",
    borderRadius: 28,
    paddingVertical: 14,
    alignItems: "center",
  },
  signText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "700",
  },
  footer: {
    marginTop: 30,
    color: "#5f6368",
    fontSize: 13,
    textAlign: "center",
  },
  linkText: {
    color: "#fff",
    fontWeight: "600",
  },
});

