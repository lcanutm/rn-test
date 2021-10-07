import React, { useState } from "react";

import { Container, Spinner, View, Text } from "native-base";
import { Modal, StyleSheet, Image } from "react-native";
import { LoginWithGoogle } from "./components/google";
import LoginWithFacebook from "./components/facebook";

const Login = (props) => {
  const [cargando, setCargando] = useState(false);
  return (
    <Container>
      {cargando && (
        <Modal visible transparent>
          <View style={styles.container}>
            <Spinner style={{ marginTop: "45%" }} />
          </View>
        </Modal>
      )}
      <View style={styles.contentStyle}>
        <View
          style={{
            height: "70%",
            backgroundColor: "#f3aa21",
            zIndex: -1,
            padding: 25,
          }}
        >
          <Image
            style={{
              flex: 1,
              width: "100%",
              resizeMode: "contain",
              tintColor: "white",
            }}
            source={require("../../../assets/expo_reactnative_logo.png")}
          />
          <Text
            uppercase
            style={{
              fontSize: 40,
              flex: 1,
              textAlign: "center",
              color: "#525252",
            }}
          >
            Bienvenido!!!
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            height: "30%",
            justifyContent: "space-around",
            alignItems: "center",
            marginTop: -25,
            backgroundColor: "white",
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          }}
        >
          <View style={styles.viewStyle}>
            <LoginWithGoogle
              navigation={props.navigation}
              setCargando={(value) => setCargando(value)}
            />
          </View>
          <View style={styles.viewStyle}>
            <LoginWithFacebook
              navigation={props.navigation}
              setCargando={(value) => setCargando(value)}
            />
          </View>
        </View>
      </View>
    </Container>
  );
};

export default Login;

const styles = StyleSheet.create({
  contentStyle: { flex: 1 },
  viewStyle: {
    width: "100%",
    alignItems: "center",
    padding: 25,
    marginTop: 20,
  },
  mainText: { color: "#808080", marginBottom: 5 },
  buttonTextStyle: { color: "rgb(255,255,255)" },
  buttonStyle: { padding: 20, alignSelf: "center" },
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
