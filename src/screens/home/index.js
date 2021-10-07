import React, { useEffect, useState } from "react";
import {
  Container,
  View,
  Text,
  Tab,
  Tabs,
  TabHeading,
  DefaultTabBar,
} from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Keyboard, Platform } from "react-native";
import Maps from "../maps";
import SearchPlaces from "../maps/components/search";
import Profile from "../profile";
import PushNotification from "../notification";
import ImageVisor from "../image";
import PlayVideo from "../videoplayer";

const isIOs = Platform.OS === "ios";
const toolbarHeight = isIOs ? 64 : 56;

const renderTabBar = (props) => {
  props.tabStyle = Object.create(props.tabStyle);
  return <DefaultTabBar {...props} />;
};

const Home = (props) => {
  let tab =
    props.navigation.params?.initialPage !== undefined
      ? props.navigation.state.params.initialPage
      : 0;
  const [currentTab, setCurrentTab] = useState(tab);

  const [currentPlace, setCurrentPlace] = useState(null);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    // const handler = BackHandler.addEventListener(
    //   'hardwareBackPress',
    //   backPressed,
    // );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
      //   handler.remove();
    };
  }, []);

  return (
    <Container>
      <Tabs
        renderTabBar={renderTabBar}
        initialPage={tab}
        locked={true}
        page={currentTab}
        tabBarPosition="bottom"
        tabBarUnderlineStyle={{ height: 0 }}
        onChangeTab={({ i }) => setCurrentTab(i)}
        tabContainerStyle={{
          height: toolbarHeight,
          backgroundColor: "#f3aa21",
          paddingHorizontal: 10,
          display: isKeyboardVisible ? "none" : "flex",
        }}
      >
        <Tab
          heading={
            <TabHeading
              style={{
                backgroundColor: currentTab !== 0 ? "#f3aa21" : "white",
                paddingTop: 3,
                paddingBottom: 3,
                borderBottomLeftRadius: 35,
                borderBottomRightRadius: 35,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  flex: 1,
                  height: "80%",
                  justifyContent: "center",
                }}
              >
                <MaterialIcons
                  name="home"
                  style={{
                    color: currentTab === 0 ? "black" : "white",
                    fontSize: 30,
                  }}
                />
                <Text
                  uppercase
                  style={{
                    color: currentTab === 0 ? "black" : "white",
                    marginTop: 2,
                    fontSize: 11,
                  }}
                >
                  Maps
                </Text>
              </View>
            </TabHeading>
          }
        >
          <Maps navigation={props.navigation} currentPlace={currentPlace} />
        </Tab>
        <Tab
          heading={
            <TabHeading
              style={{
                backgroundColor: currentTab !== 1 ? "#f3aa21" : "white",
                paddingTop: 3,
                paddingBottom: 3,
                borderBottomLeftRadius: 35,
                borderBottomRightRadius: 35,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  flex: 1,
                  height: "80%",
                  justifyContent: "center",
                }}
              >
                <MaterialIcons
                  name="search"
                  style={{
                    color: currentTab === 1 ? "black" : "white",
                    fontSize: 30,
                  }}
                />
                <Text
                  uppercase
                  style={{
                    color: currentTab === 1 ? "black" : "white",
                    marginTop: 2,
                    fontSize: 11,
                  }}
                >
                  Search
                </Text>
              </View>
            </TabHeading>
          }
        >
          <SearchPlaces
            navigation={props.navigation}
            goTab={(place) => {
              setCurrentTab(0);
              setCurrentPlace(place);
            }}
          />
        </Tab>

        <Tab
          heading={
            <TabHeading
              style={{
                backgroundColor: currentTab !== 2 ? "#f3aa21" : "white",
                paddingTop: 3,
                paddingBottom: 3,
                borderBottomLeftRadius: 35,
                borderBottomRightRadius: 35,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  flex: 1,
                  height: "80%",
                  justifyContent: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="bell"
                  style={{
                    color: currentTab === 2 ? "black" : "white",
                    fontSize: 30,
                  }}
                />
                <Text
                  uppercase
                  style={{
                    color: currentTab === 2 ? "black" : "white",
                    marginTop: 2,
                    fontSize: 11,
                  }}
                >
                  Push
                </Text>
              </View>
            </TabHeading>
          }
        >
          <PushNotification navigation={props.navigation} />
        </Tab>
        <Tab
          heading={
            <TabHeading
              style={{
                backgroundColor: currentTab !== 3 ? "#f3aa21" : "white",
                paddingTop: 3,
                paddingBottom: 3,
                borderBottomLeftRadius: 35,
                borderBottomRightRadius: 35,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  flex: 1,
                  height: "80%",
                  justifyContent: "center",
                }}
              >
                <MaterialIcons
                  name="image"
                  style={{
                    color: currentTab === 3 ? "black" : "white",
                    fontSize: 30,
                  }}
                />
                <Text
                  uppercase
                  style={{
                    color: currentTab === 3 ? "black" : "white",
                    marginTop: 2,
                    fontSize: 11,
                  }}
                >
                  Image
                </Text>
              </View>
            </TabHeading>
          }
        >
          <ImageVisor navigation={props.navigation} />
        </Tab>
        <Tab
          heading={
            <TabHeading
              style={{
                backgroundColor: currentTab !== 4 ? "#f3aa21" : "white",
                paddingTop: 3,
                paddingBottom: 3,
                borderBottomLeftRadius: 35,
                borderBottomRightRadius: 35,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  flex: 1,
                  height: "80%",
                  justifyContent: "center",
                }}
              >
                <MaterialIcons
                  name="play-arrow"
                  style={{
                    color: currentTab === 4 ? "black" : "white",
                    fontSize: 30,
                  }}
                />
                <Text
                  uppercase
                  style={{
                    color: currentTab === 4 ? "black" : "white",
                    marginTop: 2,
                    fontSize: 11,
                  }}
                >
                  Video
                </Text>
              </View>
            </TabHeading>
          }
        >
          <PlayVideo navigation={props.navigation} />
        </Tab>
        <Tab
          heading={
            <TabHeading
              style={{
                backgroundColor: currentTab !== 5 ? "#f3aa21" : "white",
                paddingTop: 3,
                paddingBottom: 3,
                borderBottomLeftRadius: 35,
                borderBottomRightRadius: 35,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  flex: 1,
                  height: "80%",
                  justifyContent: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="account"
                  style={{
                    color: currentTab === 5 ? "black" : "white",
                    fontSize: 30,
                  }}
                />
                <Text
                  uppercase
                  style={{
                    color: currentTab === 5 ? "black" : "white",
                    marginTop: 2,
                    fontSize: 11,
                  }}
                >
                  Profile
                </Text>
              </View>
            </TabHeading>
          }
        >
          <Profile navigation={props.navigation} />
        </Tab>
      </Tabs>
    </Container>
  );
};
export default Home;
