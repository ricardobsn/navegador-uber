import React, {Component, Fragment} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {View, Alert, Image} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {getPixelSize} from '../../utils';
import Geocoder from 'react-native-geocoding'; // passa a latitude e longitude e te retorna o local

import Search from '../Search';
import Directions from '../Directions';
import Details from '../Details';
import destinationImage from '../../../assets/imgs/marker.png';
import backImage from '../../../assets/imgs/back.png';
import {
  Back,
  LocationBox,
  LocationText,
  LocationTimeBox,
  LocationTimeTextSmall,
  LocationTimeText,
} from './styles';

Geocoder.init('AIzaSyBHeB_luBo2fSnu8MMcHhljv7YOhrzmlwY');

export default class Map extends Component {
  state = {
    region: null,
    destination: null,
    duration: null,
    location: null,
  };
  async componentDidMount() {
    Geolocation.getCurrentPosition(
      async ({coords: {latitude, longitude}}) => {
        const response = await Geocoder.from({latitude, longitude}); // retorna toda a informação do local baseado na localização
        const address = response.results[0].formatted_address;
        const location = address.substring(0, address.indexOf(','));

        this.setState({
          location,
          region: {
            latitude,
            longitude,
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134,
          },
        });
      }, //sucesso
      () => {
        // Alert.alert('sucess');
      }, //erro
      {
        timeout: 2000,
        enableHighAccuracy: true,
        maximumAge: 1000,
      },
    );
  }

  handleLocationSelected = (data, {geometry}) => {
    const {
      location: {lat: latitude, lng: longitude},
    } = geometry;

    this.setState({
      destination: {
        latitude,
        longitude,
        title: data.structured_formatting.main_text,
      },
    });
  };

  handleBack = () => {
    this.setState({destination: null});
  };

  render() {
    const {region, destination, duration, location} = this.state;
    return (
      <View style={{flex: 1, width: '100%'}}>
        <MapView
          style={{flex: 1}}
          region={region}
          showsUserLocation
          mapType="standard"
          loadingEnabled
          ref={el => (this.mapView = el)}>
          {destination && (
            <Fragment>
              <Directions
                origin={region}
                destination={destination}
                onReady={result => {
                  this.setState({duration: Math.floor(result.duration)});
                  this.mapView.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      right: getPixelSize(50),
                      left: getPixelSize(50),
                      top: getPixelSize(50),
                      bottom: getPixelSize(50),
                    },
                  });
                }}
              />
              <Marker
                coordinate={destination}
                anchor={{x: 0, y: 0}}
                image={destinationImage}>
                <LocationBox>
                  <LocationText>{destination.title}</LocationText>
                </LocationBox>
              </Marker>

              <Marker coordinate={region} anchor={{x: 0, y: 0}}>
                <LocationBox>
                  <LocationTimeBox>
                    <LocationTimeText>{duration}</LocationTimeText>
                    <LocationTimeTextSmall>MIN</LocationTimeTextSmall>
                  </LocationTimeBox>
                  <LocationText>{location}</LocationText>
                </LocationBox>
              </Marker>
            </Fragment>
          )}
        </MapView>

        {destination ? (
          <Fragment>
            <Back onPress={this.handleBack}>
              <Image source={backImage} />
            </Back>
            <Details origin={region} destination={destination} />
          </Fragment>
        ) : (
          <Search onLocationSelected={this.handleLocationSelected} />
        )}
      </View>
    );
  }
}
