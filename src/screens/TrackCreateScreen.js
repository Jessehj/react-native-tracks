// import "../_mockLocation";
import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { Text } from "react-native-elements";
import Map from "../components/Map";
import { Context as LocationContext } from "../context/LocationContext";
import useLocation from "../hooks/useLocation";
import TrackForm from "../components/TrackForm";

const TrackCreateScreen = () => {
  const { state, addLocation } = useContext(LocationContext);
  const [err] = useLocation(useIsFocused(), (location) => {
    addLocation(location, state.recording);
  });

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text h3>TrackCreateScreen</Text>
      <Map />
      {err ? <Text>Please enable location services</Text> : null}
      <TrackForm />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default TrackCreateScreen;
