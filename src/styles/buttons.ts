import { ViewStyle } from "react-native"

import * as Colors from "./colors"
import * as Outlines from "./outlines"
import * as Sizing from "./sizing"

type Floating = "primary"
export const floating: Record<Floating, ViewStyle> = {
  primary: {
    height: Sizing.layout.xxxLarge,
    width: Sizing.layout.xxxLarge,
    position: "absolute",
    bottom: Sizing.layout.xxLarge,
    right: Sizing.layout.large,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary.blue,
    borderRadius: Outlines.borderRadius.max,
  },
}
