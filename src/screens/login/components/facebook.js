import React from "react";
import * as Facebook from "expo-facebook";
const firebase = require("firebase");

import { FACEBOOK_APP_ID } from "../../../config/constants";
import { Icon, View, Text } from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";
import { HOME_SCREEN } from "../../../utils/screenName";
import { useDispatch } from "react-redux";
import { setProfile } from "../../../redux/actions/actionCreators";

const LoginWithFacebook = (props) => {
  const dispatch = useDispatch();
  const handleAuth = async () => {
    props.setCargando(true);
    try {
      let options = {
        appId: FACEBOOK_APP_ID,
        appName: "rn-test",
      };
      await Facebook.initializeAsync(options); // enter your Facebook App Id
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile"],
      });
      if (type === "success") {
        // SENDING THE TOKEN TO FIREBASE TO HANDLE AUTH
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        firebase
          .auth()
          .signInWithCredential(credential)
          .then((user) => {
            console.log(user.user.displayName);
            let perfil = {
              name: user.user.displayName,
              photoUrl: user.user.photoURL,
            };
            dispatch(setProfile(perfil));

            props.navigation.navigate(HOME_SCREEN, {
              online: true,
              initialPage: 0,
            });

            props.setCargando(false);

            // All the details about user are in here returned from firebase
          })
          .catch((error) => {
            props.setCargando(false);
          })
          .catch((e) => {
            console.log(JSON.stringify(e));
          });
      } else {
        // type === 'cancel'
        console.log(`no susses`);
        props.setCargando(false);
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
      props.setCargando(false);
    }
  };

  return (
    <TouchableOpacity style={styles.buttonStyle} onPress={handleAuth}>
      <View style={{ flex: 1 }}>
        <Icon
          style={{ margin: 0, color: "#4ba3ff" }}
          name="facebook"
          type="MaterialCommunityIcons"
        ></Icon>
      </View>
      <View style={{ alignItems: "center", width: "90%", paddingRight: "10%" }}>
        <Text uppercase style={styles.buttonTextStyle}>
          Inicia con Facebook
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default LoginWithFacebook;

const styles = StyleSheet.create({
  contentStyle: { paddingHorizontal: 20, paddingVertical: 25, flex: 1 },
  viewStyle: { width: "100%", alignItems: "center" },
  mainText: { color: "white", marginBottom: 10 },
  buttonTextStyle: { color: "#110415", alignSelf: "center", fontSize: 14 },
  buttonStyle: {
    width: "100%",
    height: 40,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "white",
    marginVertical: 10,
    flexDirection: "row",
    paddingHorizontal: 20,
    borderWidth: 0.8,
  },
});
