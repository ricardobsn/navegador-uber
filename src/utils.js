// Faz o ajuste de pixels da tela do Android
import {Platform, PixelRatio} from 'react-native';

export function getPixelSize(pixels) {
  return Platform.select({
    ios: pixels,
    android: PixelRatio.getPixelSizeForLayoutSize(pixels),
  });
}
