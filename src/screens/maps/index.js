import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, TextInput } from "react-native";

export default function Maps(props) {
  const { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const initialPosition = {
    latitude: 21.84,
    longitude: -78.76194,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };
  const [coordenadas, setCoordenadas] = useState({
    latitude: 23.1136,
    longitude: -82.3666,
  });
  const refMapa = useRef(null);

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
            10000
          );
      }
    };
    props.currentPlace?.coordenadas && goToMaps();
    return () => (isSubcribe = false);
  }, [props.currentPlace]);

  return (
    <View style={styles.container}>
      <MapView
        ref={refMapa}
        style={{ ...StyleSheet.absoluteFillObject }}
        showsUserLocation={false}
        zoomEnabled={true}
        zoomControlEnabled={true}
        initialRegion={initialPosition}
        onPress={(e) => {
          setCoordenadas(e.nativeEvent.coordinate);
        }}
        initialRegion={{
          latitude: 23.1136,
          longitude: -82.3666,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          draggable
          coordinate={coordenadas}
          onDragEnd={(e) => {
            setCoordenadas(e.nativeEvent.coordinate);
          }}
        ></Marker>
      </MapView>
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
});
