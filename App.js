import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AccountScreen from "./src/screens/AccountScreen";
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import TrackDetailScreen from "./src/screens/TrackDetailScreen";
import TrackListScreen from "./src/screens/TrackListScreen";
import {
  Provider as AuthProvider,
  Context as AuthContext,
} from "./src/context/AuthContext";
import {
  Provider as LocationProvider,
  Context as LocationContext,
} from "./src/context/LocationContext";

const AuthStack = createStackNavigator();
const TrackListStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

const AuthFlow = () => (
  <AuthStack.Navigator initialRouteName="SignUp">
    <AuthStack.Screen
      name="SignUp"
      component={SignUpScreen}
      options={SignUpScreen.navigationOptions}
    />
    <AuthStack.Screen
      name="SignIn"
      component={SignInScreen}
      options={SignInScreen.navigationOptions}
    />
  </AuthStack.Navigator>
);

const TrackListFlow = () => (
  <TrackListStack.Navigator initialRouteName="TrackList">
    <TrackListStack.Screen name="TrackList" component={TrackListScreen} />
    <TrackListStack.Screen name="TrackDetail" component={TrackDetailScreen} />
  </TrackListStack.Navigator>
);

const MainFlow = () => (
  <MainTab.Navigator initialRouteName="TrackListFlow">
    <MainTab.Screen name="TrackListFlow" component={TrackListFlow} />
    <MainTab.Screen name="TrackCreate" component={TrackCreateScreen} />
    <MainTab.Screen name="Account" component={AccountScreen} />
  </MainTab.Navigator>
);

const App = () => {
  const { state } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {state.token ? <MainFlow /> : <AuthFlow />}
    </NavigationContainer>
  );
};

export default () => {
  return (
    <LocationProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </LocationProvider>
  );
};
