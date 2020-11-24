import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";
import trackerApi from "../api/trackerApi";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return {
        ...state,
        errorMessage: action.payload,
      };
    case "sign_out":
      return {
        token: null,
        errorMessage: "",
      };
    case "sign_in":
      return {
        errorMessage: "",
        token: action.payload,
      };
    case "clear_error_message":
      return {
        ...state,
        errorMessage: "",
      };
    default:
      return state;
  }
};

const tryLocalSignIn = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({
      type: "sign_in",
      payload: token,
    });
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};

const signUp = (dispatch) => async ({ email, password }) => {
  try {
    const response = await trackerApi.post("/signUp", {
      email,
      password,
    });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({
      type: "sign_in",
      payload: response.data.token,
    });
  } catch (e) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign up",
    });
  }
};

const signIn = (dispatch) => async ({ email, password }) => {
  try {
    const response = await trackerApi.post("/signIn", {
      email,
      password,
    });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({
      type: "sign_in",
      payload: response.data.token,
    });
  } catch (e) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign in",
    });
  }
};

const signOut = (dispatch) => async () => {
  await AsyncStorage.removeItem("token");
  dispatch({ type: "sign_out" });
};

export const { Context, Provider } = createDataContext(
  authReducer,
  {
    signUp,
    signIn,
    signOut,
    clearErrorMessage,
    tryLocalSignIn,
  },
  {
    isSignedIn: false,
    errorMessage: "",
  }
);
