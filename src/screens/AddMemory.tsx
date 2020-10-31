import React, { FunctionComponent, ReactNode, useState } from "react"
import {
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput,
  Image,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import ImagePicker from "react-native-image-picker"
import { SvgXml } from "react-native-svg"

import { createMemory, ImageData } from "../api"

import { Icons } from "../assets/svg"
import { Colors, Sizing, Buttons, Typography, Outlines } from "../styles"

const pickerOptions = {
  title: "add a photo",
  storageoptions: {
    skipbackup: true,
  },
  maxwidth: 1000,
  maxheight: 1000,
  quality: 0.7,
}

const AddMemory: FunctionComponent = () => {
  const navigation = useNavigation()
  const [description, setDescription] = useState<string>("")
  const [imagesData, setImagesData] = useState<ImageData[]>([])

  const imageMarginLeft = Sizing.layout.medium
  const imagesPerRow = 3
  const imageWidth =
    (Sizing.screen.width - imageMarginLeft * (imagesPerRow + 1)) / imagesPerRow

  const style = createStyle(imageWidth)

  const handleOnPressGetImage = () => {
    ImagePicker.showImagePicker(pickerOptions, (response) => {
      if (response.didCancel) {
        return
      } else if (!response.error) {
        const base64Image = "data:image/jpeg;base64," + response.data
        const newImageData = {
          image: base64Image,
          id: Math.floor(Math.random() * 1000000),
        }
        setImagesData([...imagesData, newImageData])
      }
    })
  }

  const handleOnPressSubmit = () => {
    createMemory(description, imagesData).then(() => {
      navigation.goBack()
    })
  }

  const toImageView = (imageData: ImageData): ReactNode => {
    const handleOnPressImage = (imageToRemoveId: number) => {
      const nextImagesData = imagesData.filter(
        (imageData) => imageData.id !== imageToRemoveId,
      )
      setImagesData(nextImagesData)
    }

    return (
      <TouchableOpacity onPress={() => handleOnPressImage(imageData.id)}>
        <Image
          source={{ uri: imageData.image }}
          key={imageData.id}
          style={style.image}
        />
      </TouchableOpacity>
    )
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
      <View style={style.textInputContainer}>
        <TextInput
          placeholder="Add a description…"
          value={description}
          onChangeText={setDescription}
          style={style.textInput}
        />
      </View>
      <View style={style.imagesAndAddButton}>
        <TouchableOpacity
          onPress={handleOnPressGetImage}
          style={style.addImageButton}
        >
          <SvgXml
            xml={Icons.Camera}
            fill={Colors.neutral.s200}
            width={Sizing.icons.xLarge}
            height={Sizing.icons.xLarge}
          />
        </TouchableOpacity>
        {imagesData.map(toImageView)}
      </View>
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

const createStyle = (imageWidth: number) => {
  /* eslint-disable react-native/no-unused-styles */
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.neutral.white,
    },
    textInputContainer: {
      padding: Sizing.layout.medium,
      borderBottomWidth: Outlines.borderWidth.thin,
      borderBottomColor: Colors.neutral.s60,
    },
    textInput: {
      ...Typography.fontSize.medium,
    },
    imagesAndAddButton: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: Sizing.layout.medium,
    },
    addImageButton: {
      width: imageWidth,
      height: imageWidth,
      alignItems: "center",
      justifyContent: "center",
      marginLeft: Sizing.layout.medium,
      marginBottom: Sizing.layout.medium,
      backgroundColor: Colors.neutral.s60,
      borderRadius: Outlines.borderRadius.base,
    },
    image: {
      resizeMode: "cover",
      width: imageWidth,
      height: imageWidth,
      marginLeft: Sizing.layout.medium,
      marginBottom: Sizing.layout.medium,
      borderRadius: Outlines.borderRadius.base,
    },
    submitButton: {
      ...Buttons.floating.primary,
    },
  })
}

export default AddMemory
