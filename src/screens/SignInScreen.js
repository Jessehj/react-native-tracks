import React, { useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";

const SignInScreen = () => {
  const { state, signIn, clearErrorMessage } = useContext(AuthContext);

  useFocusEffect(
    React.useCallback(() => {
      return () => clearErrorMessage();
    }, [])
  );

  return (
    <View style={styles.container}>
      <AuthForm
        headerText="Sign In to your Account"
        errorMessage={state.errorMessage}
        submitButtonText="Sign In"
        onSubmit={signIn}
      />
      <NavLink
        text="Don't have an account? Sign up instead"
        routeName="SignUp"
      />
    </View>
  );
};

SignInScreen.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 250,
  },
});

export default SignInScreen;
