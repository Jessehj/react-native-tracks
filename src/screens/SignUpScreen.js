import React, { useContext, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";

const SignUpScreen = () => {
  const { state, signUp, clearErrorMessage, tryLocalSignIn } = useContext(
    AuthContext
  );

  useEffect(() => {
    tryLocalSignIn();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      return () => clearErrorMessage();
    }, [])
  );

  return (
    <View style={styles.container}>
      <AuthForm
        headerText="Sign Up for Tracker"
        errorMessage={state.errorMessage}
        submitButtonText="Sign Up"
        onSubmit={signUp}
      />
      <NavLink
        routeName="SignIn"
        text="Already have an account? Sign in instead."
      />
    </View>
  );
};

SignUpScreen.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 250,
  },
});

export default SignUpScreen;
