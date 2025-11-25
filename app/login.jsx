import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // expo icons
import Toast from "react-native-toast-message";
import { router } from "expo-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [secure, setSecure] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch(
          "https://attendance-system-backend-n5c2.onrender.com/api/attendance/checkToken",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const data = await res.json();

        if (await handleTokenExpiry(data.message)) return;

        if (res.ok) router.replace("/(tabs)/home");
      } catch {
        await AsyncStorage.removeItem("token");
      }
    };

    checkToken();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({ type: "error", text1: "Missing Fields" });
      return;
    }

    try {
      const res = await fetch(
        "https://attendance-system-backend-n5c2.onrender.com/api/attendance/loginOnly",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, empPassword: password }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        await AsyncStorage.setItem("token", data.token);
        Toast.show({ type: "success", text1: "Login Successful" });
        router.replace("/(tabs)/home");
      } else {
        Toast.show({ type: "error", text1: data.message });
      }
    } catch (e) {
      Toast.show({ type: "error", text1: "Network Error" });
    }
  };

  return (
    <View style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo */}
        <Image
          source={require("../assets/crystal-cube.png")}
          style={styles.logo}
        />

        {/* Title */}
        <Text style={styles.title}>
          Welcome Back to{"\n"}
          <Text style={styles.titleBlue}>HR Attendee</Text>
        </Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Hello there, login to mark attendance
        </Text>

        {/* Inputs */}
        <TextInput
          style={styles.input}
          placeholder="Email or Username"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
        />

        {/* Password with show/hide */}
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            secureTextEntry={secure}
            placeholderTextColor="#888"
            onChangeText={setPassword}
            style={[styles.input, { flex: 1, marginBottom: 0, borderWidth: 0 }]}
          />
          <TouchableOpacity onPress={() => setSecure(!secure)}>
            <Ionicons
              name={secure ? "eye-off" : "eye"}
              size={22}
              color="#3b82f6"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginBottom: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    lineHeight: 32,
    color: "#111827", // dark gray
    marginBottom: 8,
  },
  titleBlue: {
    color: "#3b82f6", // blue
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280", // gray
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#3b82f6",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 16,
    fontSize: 14,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#3b82f6",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#3b82f6",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
