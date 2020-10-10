import {TextStyle} from 'react-native';
import {systemWeights} from 'react-native-typography';

export const fontSize: Record<string, TextStyle> = {
  xLarge: {
    fontSize: 32,
  },
};

export const fontWeight: Record<string, TextStyle> = {
  bold: {
    ...systemWeights.bold,
  },
};
