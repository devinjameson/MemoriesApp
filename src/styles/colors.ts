import { iOSColors } from "react-native-typography"

type Primary = "blue"
export const primary: Record<Primary, string> = {
  blue: iOSColors.blue,
}

type Neutral = "white" | "s80" | "black"
export const neutral: Record<Neutral, string> = {
  white: iOSColors.white,
  s80: iOSColors.lightGray2,
  black: iOSColors.black,
}

type Utility = "transparent"
export const utility: Record<Utility, string> = {
  transparent: "transparent",
}
