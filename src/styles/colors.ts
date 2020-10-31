import { iOSColors } from "react-native-typography"

type Primary = "blue"
export const primary: Record<Primary, string> = {
  blue: iOSColors.blue,
}

type Neutral = "white" | "s60" | "s80" | "s200" | "black"
export const neutral: Record<Neutral, string> = {
  white: iOSColors.white,
  s60: iOSColors.customGray,
  s80: iOSColors.lightGray2,
  s200: iOSColors.gray,
  black: iOSColors.black,
}

type Utility = "transparent"
export const utility: Record<Utility, string> = {
  transparent: "transparent",
}
