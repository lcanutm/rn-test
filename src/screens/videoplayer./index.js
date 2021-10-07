import { Container } from "native-base";
import React, { useRef, View } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Video } from "expo-av";

const { width } = Dimensions.get("window");

const VideoPlayer = (props) => {
  let videoPlayer = useRef();

  const goFullScreen = () => {
    if (videoPlayer.current) {
      videoPlayer.current.presentFullscreenPlayer();
    }
  };

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
            style={{ width: width - 40, height: 300 }}
          />
        </View>
      </View>
    </Container>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 25,
  },
});
