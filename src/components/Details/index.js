import React, {Component} from 'react';
import {
  NavigationApps,
  actions,
  googleMapsTravelModes,
} from 'react-native-navigation-apps';

import {
  Container,
  TypeTitle,
  TypeDescription,
  TypeImage,
  RequestButton,
  RequestButtonText,
} from './styles';
import Mapabox from '../Map/MapBox';
import uberx from '../../../assets/imgs/uberx.png';

export default class Details extends Component {
  state = {
    openNavigate: false,
  };

  render() {
    const {openNavigate} = this.state;

    return (
      <Container>
        {openNavigate ? (
          <Mapabox />
        ) : (
          <>
            <TypeTitle>City Tour</TypeTitle>
            <TypeDescription>Bom Passeio :)</TypeDescription>

            <TypeImage source={uberx} />
            <TypeTitle>UberX</TypeTitle>
            <TypeDescription>R$6,00</TypeDescription>

            <RequestButton onPress={() => this.setState({openNavigate: true})}>
              <RequestButtonText>FAZER CITY TOUR!</RequestButtonText>
            </RequestButton>
          </>
        )}
      </Container>
    );
  }
}
