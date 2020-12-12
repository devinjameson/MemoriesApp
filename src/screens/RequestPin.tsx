import React, { useState, FunctionComponent } from "react"
import { SafeAreaView, Text, TextInput, Button } from "react-native"
import { useNavigation } from "@react-navigation/native"

import * as Api from "../api"
import { Screens } from "../navigation"

const RequestPin: FunctionComponent = () => {
  const navigation = useNavigation()
  const [phoneNumber, setPhoneNumber] = useState<string>("")

  const handleOnPress = async () => {
    Api.requestPin(phoneNumber).then((result) => {
      if (result.kind === "success") {
        navigation.navigate(Screens.EnterPin, { phoneNumber })
      }
    })
  }

  return (
    <SafeAreaView>
      <Text>Enter Your Phone Number</Text>
      <TextInput
        placeholder="15551234567"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <Button title="Request PIN" onPress={handleOnPress} />
    </SafeAreaView>
  )
}

export default RequestPin
