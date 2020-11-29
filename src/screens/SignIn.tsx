import React, { useState, FunctionComponent } from "react"
import { SafeAreaView, Text, TextInput, Button } from "react-native"

import { useAuthenticationContext } from "../AuthenticationContext"

const SignIn: FunctionComponent = () => {
  const { signIn } = useAuthenticationContext()
  const [phoneNumber, setPhoneNumber] = useState<string>("")

  const handleOnPress = async () => {
    signIn(phoneNumber)
  }

  return (
    <SafeAreaView>
      <Text>Sign In </Text>
      <TextInput
        placeholder="15551234567"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <Button title="Sign In" onPress={handleOnPress} />
    </SafeAreaView>
  )
}

export default SignIn
