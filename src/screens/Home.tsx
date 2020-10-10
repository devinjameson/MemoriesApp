import React, { FunctionComponent, useState, useCallback } from "react"
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  Text,
  SafeAreaView,
} from "react-native"
import { useNavigation, useFocusEffect } from "@react-navigation/native"
import { SvgXml } from "react-native-svg"

import { fetchMemories, Memory } from "../api"
import { Screens } from "../navigation"

import { Icons } from "../assets/svg"
import { Colors, Sizing, Typography, Buttons } from "../styles"

const Home: FunctionComponent = () => {
  const [memories, setMemories] = useState<Memory[]>([])
  const navigation = useNavigation()

  const handleOnPressAddMemory = () => {
    navigation.navigate(Screens.AddMemory)
  }

  const getMemoriesList = () => {
    fetchMemories().then((response) => {
      if (response) {
        setMemories(response)
      }
    })
  }

  useFocusEffect(
    useCallback(() => {
      getMemoriesList()
    }, []),
  )

  const hasImages = (memory: Memory): boolean => {
    return memory.images.length > 0
  }

  return (
    <SafeAreaView style={style.outerContainer}>
      <View style={style.container}>
        <Text style={style.headerText}>Home</Text>
        {memories.map((memory, idx) => {
          return (
            <View key={idx}>
              <Text>{memory.description}</Text>
              {hasImages(memory) && (
                <Image source={{ uri: memory.images[0] }} style={style.image} />
              )}
            </View>
          )
        })}
      </View>
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

const style = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  container: {
    paddingVertical: Sizing.layout.large,
    paddingHorizontal: Sizing.layout.large,
  },
  headerText: {
    ...Typography.fontSize.xLarge,
    ...Typography.fontWeight.bold,
  },
  image: {
    width: "97%",
    height: 200,
    resizeMode: "contain",
  },
  addMemoryButton: {
    ...Buttons.floating.primary,
  },
})

export default Home
