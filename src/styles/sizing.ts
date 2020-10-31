import { Dimensions } from "react-native"

const { height: screenHeight, width: screenWidth } = Dimensions.get("screen")
type Screen = "width" | "height"
export const screen: Record<Screen, number> = {
  width: screenWidth,
  height: screenHeight,
}

type Layout = "medium" | "large" | "xLarge" | "xxLarge" | "xxxLarge"
export const layout: Record<Layout, number> = {
  medium: 20,
  large: 30,
  xLarge: 40,
  xxLarge: 50,
  xxxLarge: 60,
}

type Icons = "medium" | "large" | "xLarge"
export const icons: Record<Icons, number> = {
  medium: 20,
  large: 30,
  xLarge: 40,
}
