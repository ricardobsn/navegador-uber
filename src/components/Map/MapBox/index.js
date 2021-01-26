import Mapbox from './MapboxLib.js';

Mapbox.initMapbox(
  'pk.eyJ1IjoicmljYXJkb2JzbiIsImEiOiJjazVpNW9rb28wYjQ2M2tsaWhkOGRkdHBkIn0.UlKKkdTVFq9bWfkX8BdFDg',
  () => {
    //Callback de sucesso
  },
);

//Caso o callback tenha sido executado com sucesso
Mapbox.navigateFromTo(
  {lat: -22.4238269, lon: -45.45368},
  {lat: -22.4138284, lon: -45.4496699},
);
