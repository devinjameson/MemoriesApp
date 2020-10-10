import React, { FunctionComponent, ReactNode } from "react"
import { useNavigation } from "@react-navigation/native"
import { TouchableOpacity, StyleSheet } from "react-native"
import { SvgXml } from "react-native-svg"

import { Icons } from "../assets/svg"
import { Colors, Sizing } from "../styles"

export const applyHeaderRightBack = () => {
  return function headerRightBack(): ReactNode {
    return <HeaderRightBack />
  }
}

const HeaderRightBack: FunctionComponent = () => {
  const navigation = useNavigation()

  const handleOnPressGoBack = () => {
    navigation.goBack()
  }

  return (
    <TouchableOpacity onPress={handleOnPressGoBack} style={style.container}>
      <SvgXml
        xml={Icons.X}
        fill={Colors.neutral.black}
        width={Sizing.icons.medium}
        height={Sizing.icons.medium}
      />
    </TouchableOpacity>
  )
}

const style = StyleSheet.create({
  container: {
    padding: Sizing.layout.large,
  },
})
