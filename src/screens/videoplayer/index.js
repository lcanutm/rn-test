import React from "react";
import { Container, View } from "native-base";
import { Dimensions, StyleSheet } from "react-native";
import { Video } from "expo-av";

const { width } = Dimensions.get("window");

const PlayVideo = (props) => {
  const videoError = (e) => {
    console.log(e);
  };
  return (
    <Container>
      <View style={styles.container}>
        <View>
          <Video
            // source={require("../../assets/video.mp4")}
            source={{
              uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
            }}
            resizeMode="cover"
            useNativeControls
            rate={1.0}
            style={styles.backgroundVideo}
            onError={videoError}
          />
        </View>
      </View>
    </Container>
  );
};

export default PlayVideo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 25,
  },
  backgroundVideo: {
    width: width - 40,
    height: 300,
  },
});
