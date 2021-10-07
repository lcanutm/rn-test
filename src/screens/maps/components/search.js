import {
  Button,
  Card,
  Container,
  DefaultTabBar,
  Icon,
  Input,
  Text,
  Tab,
  Tabs,
  TabHeading,
  CardItem,
} from "native-base";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
// import Placesearch from 'react-native-placesearch';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import Autocomplete from 'react-native-autocomplete-input';
import { API_KEY } from "../../../config/constants";
import { places } from "./places";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const renderTabBar = (props) => {
  props.tabStyle = Object.create(props.tabStyle);
  return <DefaultTabBar {...props} />;
};

export default function SearchPlaces(props) {
  const [elementsFiltrados, setElementsFiltrados] = useState([]);
  const [filtrando, setFiltrando] = useState(false);
  const [texto, setTexto] = useState("");
  const [historial, setHistorial] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);
  const [xCategoria, setXCategoria] = useState(false);

  const chngText = (text) => {
    let filtrados = [];
    setTexto(text);
    setXCategoria(false);

    if (text) {
      setFiltrando(true);
      let lugares = places[0].categoria.places;
      lugares.forEach((element) => {
        if (element.name.toLowerCase().includes(text.toLocaleLowerCase())) {
          filtrados.push(element);
        }
      });
    } else {
      setFiltrando(false);
    }
    setElementsFiltrados(filtrados);
  };

  return (
    <Container>
      <View style={styles.searchContainer}>
        <View style={styles.contentInput}>
          <Input
            maxLength={25}
            style={styles.placeholderStart}
            keyboardType="default"
            value={texto}
            autoCapitalize="none"
            placeholder="Buscar..."
            placeholderTextColor="#dcdcdc"
            onChangeText={chngText}
          />
        </View>
      </View>
      <View style={styles.contentStyle}>
        {filtrando && elementsFiltrados.length === 0 && (
          <View style={{ height: SCREEN_HEIGHT }}>
            <Text style={{ fontSize: 18, textAlign: "center" }}>
              No hay resultados que mostrar.
            </Text>
          </View>
        )}
        {filtrando && elementsFiltrados.length > 0 && (
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 15,
              }}
            >
              <Text
                uppercase
                style={{ flex: 4, marginHorizontal: 25, fontWeight: "bold" }}
              >
                Ver en el mapa
              </Text>
              {xCategoria && (
                <Icon
                  onPress={() => {
                    setFiltrando(false);
                    setTexto("");
                  }}
                  type="MaterialCommunityIcons"
                  name="close"
                  style={{ flex: 1 }}
                ></Icon>
              )}
            </View>
            <FlatList
              contentContainerStyle={{
                paddingHorizontal: 25,
                paddingTop: 20,
                paddingBottom: 100,
                marginBottom: 25,
              }}
              data={elementsFiltrados}
              keyExtractor={(item) =>
                `${item.coordenadas.latitude}${item.coordenadas.longitude}`
              }
              initialNumToRender={7}
              removeClippedSubviews
              renderItem={({ item }) => (
                <CardPlace
                  place={item}
                  goToMaps={() => {
                    setHistorial([texto, ...historial]);
                    props.goTab(item);
                  }}
                ></CardPlace>
              )}
            />
          </View>
        )}
        {!filtrando && (
          <View style={{ height: SCREEN_HEIGHT, backgroundColor: "red" }}>
            <Tabs
              renderTabBar={renderTabBar}
              initialPage={0}
              locked={true}
              tabBarUnderlineStyle={{
                backgroundColor: "black",
                width: SCREEN_WIDTH / 2 - 20,
                marginLeft: 10,
                marginBottom: -4,
                height: 4,
              }}
              onChangeTab={({ i }) => setCurrentTab(i)}
              tabContainerStyle={{
                height: 40,
                backgroundColor: "white",
                paddingHorizontal: 10,
              }}
            >
              <Tab
                heading={
                  <TabHeading
                    style={{
                      backgroundColor: "white",
                      paddingTop: 3,
                      paddingBottom: 3,
                      elevation: 0,
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
                      <Text
                        uppercase
                        style={{
                          color: currentTab === 0 ? "black" : "#bbbbbb",
                          marginTop: 2,
                          fontSize: 14,
                        }}
                      >
                        Categorías
                      </Text>
                    </View>
                  </TabHeading>
                }
              >
                {places.map((categoria) => {
                  return (
                    <TouchableOpacity
                      key={categoria.categoria.name}
                      onPress={() => {
                        setFiltrando(true);
                        setTexto(categoria.categoria.name);
                        setElementsFiltrados(categoria.categoria.places);
                        setXCategoria(true);
                      }}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginHorizontal: 25,
                        marginVertical: 20,
                      }}
                    >
                      <Icon
                        name="food"
                        type="MaterialCommunityIcons"
                        style={{
                          fontSize: 40,
                          color: "white",
                          backgroundColor: "#a7ce36",
                          borderRadius: 20,
                        }}
                      ></Icon>
                      <Text
                        style={{
                          fontSize: 16,
                          marginLeft: 15,
                          color: "#a1a595",
                        }}
                      >
                        {categoria.categoria.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </Tab>
              <Tab
                heading={
                  <TabHeading
                    style={{
                      backgroundColor: "white",
                      paddingTop: 3,
                      paddingBottom: 3,
                      elevation: 0,
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
                      <Text
                        uppercase
                        style={{
                          color: currentTab === 1 ? "black" : "#bbbbbb",
                          marginTop: 2,
                          fontSize: 14,
                        }}
                      >
                        Historial
                      </Text>
                    </View>
                  </TabHeading>
                }
              >
                {historial.map((text) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        chngText(text);
                      }}
                      style={{
                        alignItems: "flex-start",
                        marginHorizontal: 25,
                        marginTop: 20,
                        width: SCREEN_WIDTH,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          marginLeft: 15,
                          color: "#615529",
                        }}
                      >
                        {text}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
                {historial.length > 0 ? (
                  <TouchableOpacity
                    onPress={() => {
                      setHistorial([]);
                    }}
                    style={{
                      alignItems: "flex-start",
                      marginHorizontal: 25,
                      marginTop: 20,
                      width: SCREEN_WIDTH,
                    }}
                  >
                    <Text
                      style={{ fontSize: 16, marginLeft: 15, color: "#615529" }}
                    >
                      Eliminar el historial
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 20,
                      marginLeft: 15,
                      color: "#615529",
                      marginTop: 25,
                    }}
                  >
                    Historial de búsquedas
                  </Text>
                )}
              </Tab>
            </Tabs>
          </View>
        )}
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    position: "absolute",
    top: 10,
    width: "100%",
    height: 45,
    paddingHorizontal: 25,
  },
  contentStyle: {
    marginTop: 100,
  },
  contentInput: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 45,
    width: "100%",
    marginTop: 25,
    borderWidth: 1,
    borderRadius: 25,
  },
  placeholderStart: {
    fontSize: 12,
    color: "rgba(37, 23, 37, 0.5)",
    fontWeight: "normal",
    textAlign: "center",
  },
});

const CardPlace = (props) => {
  let { place } = props;
  return (
    <TouchableOpacity
      onPress={() => {
        props.goToMaps();
      }}
    >
      <Card>
        <CardItem>
          <Text style={{ flex: 4, fontSize: 18, color: "#615529" }}>
            {place.name}
          </Text>
          <Text style={{ flex: 1, fontSize: 14, color: "#f3aa21" }}>
            Popular
          </Text>
        </CardItem>
        <CardItem style={{ flexDirection: "column", alignItems: "flex-start" }}>
          <Text style={{ fontSize: 14, color: "rgba(37, 23, 37, 0.5)" }}>
            {place.type}
          </Text>
          <Text style={{ fontSize: 14, color: "#1d9400" }}>
            Valoración: {place.valoracion}
          </Text>
          <Text style={{ fontSize: 14, color: "rgba(37, 23, 37, 0.5)" }}>
            La Habana, Cuba
          </Text>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
};
