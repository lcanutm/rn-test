import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Autocomplete from "react-native-autocomplete-input";
import { places } from "./components/places";

export default function Maps(props) {
  const { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.1;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const initialPosition = {
    latitude: 23.135305,
    longitude: -82.358962,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };
  const [coordenadas, setCoordenadas] = useState({
    latitude: 23.1136,
    longitude: -82.3666,
  });

  const films = places[0].categoria.places;
  const names = films.map((place) => place.name);
  const [filteredFilms, setFilteredFilms] = useState([]);
  const [selectedName, setSelectedName] = useState("");

  const refMapa = useRef();

  useEffect(() => {
    let isSubcribe = true;
    const goToMaps = () => {
      let coordenadas = props.currentPlace.coordenadas;
      isSubcribe && setCoordenadas(coordenadas);
      if (refMapa) {
        isSubcribe &&
          refMapa.current.animateCamera(
            {
              center: coordenadas,
              zoom: 10,
            },
            2000
          );
      }
    };
    props.currentPlace?.coordenadas && goToMaps();
    return () => (isSubcribe = false);
  }, [props.currentPlace]);

  const findFilm = (query) => {
    if (query) {
      let placesName = names.filter((place) => {
        return place.toUpperCase().includes(query.toUpperCase());
      });
      setFilteredFilms(placesName);
    } else {
      setFilteredFilms([]);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={refMapa}
        provider={PROVIDER_GOOGLE}
        style={{ ...StyleSheet.absoluteFillObject }}
        // showsUserLocation={false}
        zoomEnabled={true}
        zoomControlEnabled={true}
        loadingEnabled={true}
        initialRegion={initialPosition}
        // onPress={(e) => {
        //   setCoordenadas(e.nativeEvent.coordinate);
        //   console.log(
        //     `coordinate: ${JSON.stringify(e.nativeEvent.coordinate)}`
        //   );
        // }}
      >
        <Marker
          tracksViewChanges={false}
          coordinate={coordenadas}
          // onDragEnd={(e) => {
          //   // setCoordenadas(.coordinate);
          //   console.log(JSON.stringify(e.nativeEvent));
          // }}
          title="Posicion actual"
        />
        {films.map((marker, i) => {
          return (
            <Marker
              tracksViewChanges={false}
              coordinate={marker.coordenadas}
              title={marker.name}
              key={i}
            />
          );
        })}
      </MapView>
      <View style={styles.contentInput}>
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.autocompleteContainer}
          data={filteredFilms}
          defaultValue={selectedName ? selectedName : ""}
          onChangeText={(text) => findFilm(text)}
          placeholder="Buscar restauranes..."
          flatListProps={{
            keyExtractor: (_item, i) => films[i].key,
            renderItem: ({ item }) => (
              <TouchableOpacity
                style={{
                  height: 30,
                  paddingLeft: 5,
                  backgroundColor: "rgba(0,0,0,0.05)",
                  borderBottomColor: "white",
                  borderBottomWidth: 0.5,
                  justifyContent: "center",
                }}
                onPress={() => {
                  let pos = films.findIndex((place) => place.name === item);
                  let latitude = films[pos].coordenadas.latitude;
                  let longitude = films[pos].coordenadas.longitude;
                  if (refMapa) {
                    refMapa.current.animateCamera(
                      {
                        center: {
                          latitude,
                          longitude,
                        },
                        heading: 20,
                        pitch: 2,
                        zoom: 100,
                        altitude: 200,
                      },
                      { duration: 1000 }
                    );
                  }
                  setFilteredFilms([]);
                  setSelectedName(item);
                }}
              >
                <Text style={styles.itemText}>{item}</Text>
              </TouchableOpacity>
            ),
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  contentInput: {
    position: "absolute",
    top: 10,
    width: "90%",
  },
  autocompleteContainer: {
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: "center",
  },
  itemText: {
    fontSize: 15,
    color: "black",
  },
  infoText: {
    textAlign: "center",
    fontSize: 16,
  },
});
