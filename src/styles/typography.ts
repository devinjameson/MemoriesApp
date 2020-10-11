import { TextStyle } from "react-native"
import { systemWeights } from "react-native-typography"

type FontSize = "medium" | "large" | "xLarge"
export const fontSize: Record<FontSize, TextStyle> = {
  medium: {
    fontSize: 18,
  },
  large: {
    fontSize: 24,
  },
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
