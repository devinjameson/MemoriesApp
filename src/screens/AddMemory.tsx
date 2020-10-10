import React, { FunctionComponent, useState } from "react"
import {
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput,
  Button,
  Image,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import ImagePicker from "react-native-image-picker"
import { SvgXml } from "react-native-svg"

import { createMemory } from "../api"

import { Icons } from "../assets/svg"
import { Colors, Sizing, Buttons } from "../styles"

const AddMemory: FunctionComponent = () => {
  const navigation = useNavigation()
  const [description, setDescription] = useState<string>("")
  const [imagesData, setImagesData] = useState<string[]>([])

  const handleOnPressGetImage = () => {
    ImagePicker.showImagePicker(pickerOptions, (response) => {
      if (response.didCancel) {
        return
      }

      if (!response.error) {
        const base64Image = "data:image/jpeg;base64," + response.data
        setImagesData([...imagesData, base64Image])
      }
    })
  }

  const handleOnPressSubmit = () => {
    createMemory(description, imagesData).then(() => {
      navigation.goBack()
    })
  }

  const isDisabled = description === "" || imagesData.length === 0

  const submitButtonDisabledStyle = isDisabled
    ? { backgroundColor: Colors.neutral.s80 }
    : {}

  const submitButtonStyle = {
    ...style.submitButton,
    ...submitButtonDisabledStyle,
  }

  return (
    <View style={style.container}>
      <TextInput
        placeholder="Add a description"
        value={description}
        onChangeText={setDescription}
      />
      {imagesData.map((image, index) => {
        return <Image source={{ uri: image }} key={index} style={style.image} />
      })}
      <Button title="Add an image" onPress={handleOnPressGetImage} />
      <TouchableOpacity
        style={submitButtonStyle}
        onPress={handleOnPressSubmit}
        accessibilityLabel="Add a memory"
        disabled={isDisabled}
      >
        <SvgXml
          xml={Icons.Check}
          fill={Colors.neutral.white}
          width={Sizing.icons.medium}
          height={Sizing.icons.medium}
        />
      </TouchableOpacity>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexGrow: 1,
  },
  image: {
    width: "97%",
    height: 200,
    resizeMode: "contain",
  },
  submitButton: {
    ...Buttons.floating.primary,
  },
})

const pickerOptions = {
  title: "add a photo",
  storageoptions: {
    skipbackup: true,
  },
  maxwidth: 1000,
  maxheight: 1000,
  quality: 0.7,
}

export default AddMemory
