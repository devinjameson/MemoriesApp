import "react-native-gesture-handler"
import React, { FunctionComponent, useEffect, useState } from "react"

import MainNavigator from "./src/MainNavigator"
import { AuthenticationProvider } from "./src/AuthenticationContext"
import AsyncStorage from "@react-native-async-storage/async-storage"

const App: FunctionComponent = () => {
  const [authenticationToken, setAuthenticationToken] = useState<string | null>(
    null,
  )

  useEffect(() => {
    AsyncStorage.getItem("authenticationToken").then(setAuthenticationToken)
  }, [])

  return (
    <AuthenticationProvider storedToken={authenticationToken}>
      <MainNavigator />
    </AuthenticationProvider>
  )
}

export default App
