import { RouteProp, useRoute } from "@react-navigation/native"
import React, { useState, FunctionComponent } from "react"
import { SafeAreaView, Text, TextInput, Button } from "react-native"
import { ScreenParams } from "src/MainNavigator"

import { useAuthenticationContext } from "../AuthenticationContext"

type EnterPinRouteProp = RouteProp<ScreenParams, "EnterPin">

const EnterPin: FunctionComponent = () => {
  const { params } = useRoute<EnterPinRouteProp>()
  const { phoneNumber } = params
  const { authenticate } = useAuthenticationContext()
  const [pin, setPin] = useState<string>("")

  const handleOnPress = async () => {
    authenticate(phoneNumber, pin)
  }

  return (
    <SafeAreaView>
      <Text>{`A PIN was sent to ${phoneNumber}`}</Text>
      <TextInput placeholder="0000" value={pin} onChangeText={setPin} />
      <Button title="Sign In" onPress={handleOnPress} />
    </SafeAreaView>
  )
}

export default EnterPin
