import MapView, {
  Callout,
  Geojson,
  Marker,
  Polygon,
  PROVIDER_GOOGLE,
} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {View} from 'react-native';
import styles from '../Styling';

export default function Map(props) {
  const {longitude,latitude}=props
  return (
    <>
      <View style={[styles.my2, styles.border2]}>
        <MapView
          mapType="standard"
          userInterfaceStyle="light"
          showsUserLocation={true}
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: latitude || 24.9140917,
            longitude: longitude || 67.0583194,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          <Marker
            draggable={true}
            coordinate={{
              latitude: latitude || 24.9140917,
              longitude: latitude || 67.0583194,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
          />
        </MapView>
      </View>
    </>
  );
}
