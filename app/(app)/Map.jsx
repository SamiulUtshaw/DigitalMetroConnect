import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Octicons from '@expo/vector-icons/Octicons';

function Map() {
  // Define the metro stations with their coordinates
  const metroStations = [
    { title: 'Uttara North', coordinate: { latitude: 23.86914945280282, longitude: 90.36748965887887 } },
    { title: 'Uttara Center', coordinate: { latitude: 23.859584081994814, longitude: 90.36506643631866 } },
    { title: 'Uttara South', coordinate: { latitude: 23.8457911771275, longitude: 90.36307630958538 } },
    { title: 'Pallabi', coordinate: { latitude: 23.82617458932545, longitude: 90.36416397347904 } },
    { title: 'Mirpur 11', coordinate: { latitude: 23.819186495940617, longitude: 90.36527977256492 } },
    { title: 'Mirpur 10', coordinate: { latitude: 23.808271755014005, longitude: 90.36811218513849 } },
    { title: 'Kazipara', coordinate: { latitude: 23.79931941210737, longitude: 90.37180290470647 } },
    { title: 'Shewrapara', coordinate: { latitude: 23.79107328738038, longitude: 90.37532196286095 } },
    { title: 'Agargaon', coordinate: { latitude: 23.77844065140093, longitude: 90.38004798767362 } },
    { title: 'Bijoy Sarani', coordinate: { latitude: 23.76680308493259, longitude: 90.3829608940258 } },
    { title: 'Farmgate', coordinate: { latitude: 23.758869124095604, longitude: 90.38708076697873 } },
    { title: 'Karwan Bazar', coordinate: { latitude: 23.751484607216618, longitude: 90.39265976151053 } },
    { title: 'Shahbag', coordinate: { latitude: 23.739228527308665, longitude: 90.39592132768834 } },
    { title: 'Dhaka University', coordinate: { latitude: 23.73176432374444, longitude: 90.39660797334234 } },
    { title: 'Bangladesh Secretariat', coordinate: { latitude: 23.73003571040293, longitude: 90.4077659624685 } },
    { title: 'Motijheel', coordinate: { latitude: 23.728071349193815, longitude: 90.41909561304472 } }
  ];

  // Define the metro line (array of coordinates to draw the line)
  const metroLineCoordinates = metroStations.map(station => station.coordinate);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 23.7910, // Center the map around Farmgate
          longitude: 90.3760,
          latitudeDelta: 0.1522,
          longitudeDelta: 0.1121,
        }}
      >
        {/* Render markers for each metro station */}
        {metroStations.map((station, index) => (
          <Marker
            key={index}
            coordinate={station.coordinate}
            title={station.title}
            description={`${station.title} Metro Station`}
          >
            <Octicons name="dot-fill" size={30} color="blue" />
          </Marker>
        ))}

        {/* Render the metro line */}
        <Polyline
          coordinates={metroLineCoordinates}
          strokeColor="blue" // Line color
          strokeWidth={4} // Line width
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    margin: 10,
    textAlign: 'center',
  },
  map: {
    flex: 1,
  },
});

export default Map;
