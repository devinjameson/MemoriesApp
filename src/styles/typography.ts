import { TextStyle } from "react-native"
import { systemWeights } from "react-native-typography"

type FontSize = "xLarge"
export const fontSize: Record<FontSize, TextStyle> = {
  xLarge: {
    fontSize: 32,
  },
}

type FontWeight = "bold"
export const fontWeight: Record<FontWeight, TextStyle> = {
  bold: {
    ...systemWeights.bold,
  },
}
