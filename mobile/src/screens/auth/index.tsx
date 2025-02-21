import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { styles } from "./styles";
import { THEME } from "../../constants/theme";
import { useAuth } from "../../contexts/auth";
import { UserAuthRequest, UserRegisterRequest } from "../../core/domain/user";
import { Role } from "../../@types/role";
import { HttpRequestError } from "../../core/errors/http.error";
import { Ionicons } from "@expo/vector-icons";

export function LoginScreen() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isRegister, setIsRegister] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const ROLE: Role = "USER";
  const { login, register } = useAuth();

  const handleSubmit = async () => {
    try {
      setError("");
      setLoading(true);

      if (!email || !password) {
        throw new Error("Please fill in all fields");
      }

      if (isRegister) {
        const data: UserRegisterRequest = {
          email,
          password,
          role: ROLE,
        };
        const success = await register(data);
        if (success) {
          setIsRegister(false);
        }
      } else {
        const data: UserAuthRequest = {
          email,
          password,
        };
        await login(data);
      }
    } catch (err) {
      if (err instanceof HttpRequestError) {
        setError(err.message || "An error occurred");
      } else {
        setError("An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Ionicons
              name="person-circle"
              size={80}
              color={THEME.colors.primary}
            />
            <Text style={styles.title}>
              {isRegister ? "Create Account" : "Welcome Back"}
            </Text>
            <Text style={styles.subtitle}>
              {isRegister ? "Sign up to get started" : "Sign in to continue"}
            </Text>
          </View>

          {error ? (
            <View style={styles.errorContainer}>
              <Ionicons
                name="alert-circle"
                size={20}
                color={THEME.colors.destructive}
              />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Ionicons
                name="mail"
                size={20}
                color={THEME.colors.mutedForeground}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={THEME.colors.mutedForeground}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed"
                size={20}
                color={THEME.colors.mutedForeground}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={THEME.colors.mutedForeground}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoComplete="password"
              />
              <TouchableOpacity
                style={styles.passwordToggle}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={20}
                  color={THEME.colors.mutedForeground}
                />
              </TouchableOpacity>
            </View>

            {!isRegister && (
              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={THEME.colors.primaryForeground} />
              ) : (
                <Text style={styles.buttonText}>
                  {isRegister ? "Create Account" : "Sign In"}
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.switchAuth}
            onPress={() => setIsRegister(!isRegister)}
          >
            <Text style={styles.switchAuthText}>
              {isRegister
                ? "Already have an account? "
                : "Don't have an account? "}
              <Text style={styles.switchAuthTextHighlight}>
                {isRegister ? "Sign In" : "Sign Up"}
              </Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
