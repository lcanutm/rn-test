import React from "react";
import { LogBox, StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
const firebase = require("firebase");

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Start from "./src/screens/start";
import Login from "./src/screens/login";
import Home from "./src/screens/home";

import {
  START_SCREEN,
  LOGIN_SCREEN,
  HOME_SCREEN,
} from "./src/utils/screenName";
import { firebaseConfig } from "./src/config/firebase";

// Initialize Firebase
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const Stack = createNativeStackNavigator();

const TestRNApp = () => {
  let initialSceen = store.getState().profile?.name
    ? HOME_SCREEN
    : START_SCREEN;

  LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
  LogBox.ignoreAllLogs(); //Ignore all log notifications
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialSceen}>
          <Stack.Screen
            name={HOME_SCREEN}
            component={Home}
            options={{
              title: "Home",
              headerTitleAlign: "center",
              headerStyle: styles.headerStyle,
              headerLeft: () => {
                return <></>;
              },
            }}
          />
          <Stack.Screen
            name={START_SCREEN}
            component={Start}
            options={{
              title: "Inicio",
              headerStyle: styles.headerStyle,
              headerTitleAlign: "center",
              headerLeft: () => {
                return <></>;
              },
            }}
          />
          <Stack.Screen
            name={LOGIN_SCREEN}
            component={Login}
            options={{
              title: "Login",
              headerStyle: styles.headerStyle,
              headerTitleAlign: "center",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default TestRNApp;

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: "#f3aa21",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
});
