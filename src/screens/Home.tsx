import React, {
  FunctionComponent,
  useState,
  useCallback,
  ReactNode,
} from "react"
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  Text,
  SafeAreaView,
  ScrollView,
} from "react-native"
import { useNavigation, useFocusEffect } from "@react-navigation/native"
import { SvgXml } from "react-native-svg"

import { Memory } from "../api"
import { Screens } from "../navigation"

import { Icons } from "../assets/svg"
import { Colors, Sizing, Typography, Buttons, Outlines } from "../styles"
import { useAuthenticationContext } from "../AuthenticationContext"

const Home: FunctionComponent = () => {
  const [memories, setMemories] = useState<Memory[]>([])
  const { fetchMemories } = useAuthenticationContext()
  const navigation = useNavigation()

  const handleOnPressAddMemory = () => {
    navigation.navigate(Screens.AddMemory)
  }

  const getMemoriesList = () => {
    fetchMemories().then((response) => {
      if (response) {
        setMemories(response.reverse())
      }
    })
  }

  useFocusEffect(
    useCallback(() => {
      getMemoriesList()
    }, []),
  )

  const toMemoryView = (memory: Memory, index: number): ReactNode => {
    const hasImages = (memory: Memory): boolean => {
      return memory.images.length > 0
    }

    return (
      <View key={index}>
        {hasImages(memory) && (
          <Image source={{ uri: memory.images[0] }} style={style.image} />
        )}
        <Text style={style.descriptionText}>{memory.description}</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={style.outerContainer}>
      <ScrollView contentContainerStyle={style.contentContainer}>
        <Text style={style.headerText}>Home</Text>
        {memories.map(toMemoryView)}
      </ScrollView>
      <TouchableOpacity
        style={style.addMemoryButton}
        onPress={handleOnPressAddMemory}
        accessibilityLabel="Add a memory"
      >
        <SvgXml
          xml={Icons.Plus}
          fill={Colors.neutral.white}
          width={Sizing.icons.medium}
          height={Sizing.icons.medium}
        />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const outerMargin = Sizing.layout.medium
const outerMarginsWidth = outerMargin * 2
const imageWidth = Sizing.screen.width - outerMarginsWidth

const style = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: Sizing.layout.large,
    paddingHorizontal: Sizing.layout.medium,
  },
  headerText: {
    ...Typography.fontSize.xLarge,
    ...Typography.fontWeight.bold,
    marginBottom: Sizing.layout.medium,
    color: Colors.neutral.black,
  },
  image: {
    width: imageWidth,
    height: imageWidth,
    resizeMode: "cover",
    borderRadius: Outlines.borderRadius.base,
    marginBottom: Sizing.layout.medium,
  },
  descriptionText: {
    ...Typography.fontSize.medium,
    color: Colors.neutral.black,
    marginBottom: Sizing.layout.medium,
  },
  addMemoryButton: {
    ...Buttons.floating.primary,
  },
})

export default Home
