import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import React, { useState, useEffect, useRef } from "react";
import { View, Platform, TouchableOpacity, StyleSheet } from "react-native";
import { Container, Item, Text } from "native-base";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function PushNotification() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <Container>
      <View
        style={{
          flex: 1,
          padding: 25,
        }}
      >
        <View style={{ flex: 3 }}>
          <Item style={{ marginBottom: 15, justifyContent: "center" }}>
            <Text
              style={{
                marginVertical: 15,
                fontWeight: "bold",
                fontSize: 24,
                textAlign: "center",
              }}
            >
              Push notifications
            </Text>
          </Item>
          <Text style={{ textAlign: "left", color: "rgba(37, 23, 37, 0.5)" }}>
            Title: {notification && notification.request.content.title}{" "}
          </Text>
          <Text style={{ textAlign: "left", color: "rgba(37, 23, 37, 0.5)" }}>
            Body: {notification && notification.request.content.body}
          </Text>
          <Text style={{ textAlign: "left", color: "rgba(37, 23, 37, 0.5)" }}>
            Data:{" "}
            {notification &&
              JSON.stringify(notification.request.content.data.data)}
          </Text>
        </View>
        <View style={{ flex: 1, paddingTop: 20 }}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={async () => {
              await schedulePushNotification();
            }}
          >
            <Text uppercase style={styles.buttonTextStyle}>
              Press to schedule a notification
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: "Here is the notification body",
      data: { data: "goes here" },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

const styles = StyleSheet.create({
  buttonTextStyle: { alignSelf: "center", color: "#110415", fontSize: 14 },
  buttonStyle: {
    width: "100%",
    height: 40,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    flexDirection: "row",
    paddingHorizontal: 20,
    borderWidth: 1,
  },
});
