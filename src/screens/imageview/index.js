import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import ImageView from "react-native-image-view";

const { width } = Dimensions.get("window");
const keyGenerator = () => "_" + Math.random().toString(36).substr(2, 9);
const cities = [
  {
    key: keyGenerator(),
    source: {
      uri: "https://avatars.mds.yandex.net/get-pdb/49816/d9152cc6-bf48-4e44-b2d5-de73b2e94454/s800",
    },
    title: "London",
  },
  {
    key: keyGenerator(),
    source: {
      uri: "https://cdn.pixabay.com/photo/2017/08/17/10/47/paris-2650808_960_720.jpg",
    },
    title: "Paris",
    width: 806,
    height: 720,
  },
];

const nature = [
  {
    key: keyGenerator(),
    source: {
      uri: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/1-forest-in-fog-russian-nature-forest-mist-dmitry-ilyshev.jpg",
    },
    title: "Switzerland",
  },

  {
    key: keyGenerator(),
    source: {
      uri: "https://i.pinimg.com/564x/a5/1b/63/a51b63c13c7c41fa333b302fc7938f06.jpg",
    },
    title: "USA",
    width: 400,
    height: 800,
  },
  {
    key: keyGenerator(),
    source: {
      uri: "https://guidetoiceland.imgix.net/4935/x/0/top-10-beautiful-waterfalls-of-iceland-8?auto=compress%2Cformat&ch=Width%2CDPR&dpr=1&ixlib=php-2.1.1&w=883&s=1fb8e5e1906e1d18fc6b08108a9dde8d",
    },
    title: "Iceland",
    width: 880,
    height: 590,
  },
];

const tabs = [
  { title: "Cities", images: cities },
  { title: "Nature", images: nature },
];

export default function ImageVisor({ navigation }) {
  const [activeTab, setactiveTab] = useState(0);
  const [imageIndex, setimageIndex] = useState(0);
  const [isImageViewVisible, setisImageViewVisible] = useState(true);

  const images = [
    {
      key: keyGenerator(),
      source: {
        uri: "https://cdn.pixabay.com/photo/2017/08/17/10/47/paris-2650808_960_720.jpg",
      },
      title: "Paris",
      width: 806,
      height: 720,
    },
  ];

  return (
    <View style={styles.container}>
      {/* <View style={styles.tabs}>
        {!isImageViewVisible &&
          tabs.map(({ title }, index) => (
            <TouchableOpacity
              style={styles.tab}
              key={keyGenerator()}
              onPress={() => {
                setactiveTab(index);
              }}
            >
              <Text
                style={[
                  styles.tabTitle,
                  index === activeTab && styles.tabTitleActive,
                ]}
              >
                {title}
              </Text>
            </TouchableOpacity>
          ))}
      </View>
      <View>
        {!isImageViewVisible &&
          images.map((image, index) => (
            <TouchableOpacity
              key={keyGenerator()}
              onPress={() => {
                setimageIndex(index);
                setisImageViewVisible(true);
              }}
            >
              <Image
                style={{ width, height: 200 }}
                source={image.source}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
      </View> */}

      {isImageViewVisible && (
        <ImageView
          glideAlways
          images={images}
          imageIndex={imageIndex}
          animationType="fade"
          isVisible={isImageViewVisible}
          onClose={() => setisImageViewVisible(false)}
          onImageChange={(index) => {
            console.log(index);
          }}
        >
          <Text style={{ fontSize: 15, color: "red" }} AAAA></Text>
        </ImageView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
    // paddingTop: Platform.select({ ios: 0, android: 10 }),
  },
  tabs: {
    flexDirection: "row",
  },
  tab: {
    flex: 1,
    height: 30,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  tabTitle: {
    color: "#EEE",
  },
  tabTitleActive: {
    fontWeight: "700",
    color: "#FFF",
  },
  footer: {
    width,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  footerButton: {
    flexDirection: "row",
    marginLeft: 15,
  },
  footerText: {
    fontSize: 16,
    color: "#FFF",
    textAlign: "center",
  },
});
