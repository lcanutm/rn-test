import React from "react";
import { Container, Text } from "native-base";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import { LOGIN_SCREEN } from "../../utils/screenName";
const Start = (props) => {
  return (
    <Container>
      <View style={styles.viewStyle}>
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
          <Text style={styles.mainText}>
            Esta es una aplicación de prueba. La aplicación combina diferentes
            tecnologías de desarrollo entre las que se encuantran Expo, React
            Native, etc. NativeBase is a free and open source framework that
            enable developers to build high-quality mobile apps using React
            Native iOS and Android apps with a fusion of ES6.
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            height: "30%",
            alignItems: "center",
            marginTop: -25,
            backgroundColor: "white",
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            padding: 25,
          }}
        >
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              props.navigation.navigate(LOGIN_SCREEN);
            }}
          >
            <Text uppercase style={styles.buttonTextStyle}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};
export default Start;

const styles = StyleSheet.create({
  viewStyle: { flex: 1 },
  mainText: {
    lineHeight: 20,
    fontSize: 14,
    textAlign: "center",
    color: "#525252",
    marginBottom: 20,
    flex: 1,
  },
  buttonTextStyle: { alignSelf: "center", color: "#110415" },
  buttonStyle: {
    width: "100%",
    height: 40,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    flexDirection: "row",
    borderWidth: 1,
    marginTop: 15,
  },
});
