import "react-native-gesture-handler"
import React, { FunctionComponent, useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import SplashScreen from "react-native-splash-screen"

import MainNavigator from "./src/MainNavigator"
import { AuthenticationProvider } from "./src/AuthenticationContext"

const App: FunctionComponent = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [authenticationToken, setAuthenticationToken] = useState<string | null>(
    null,
  )

  useEffect(() => {
    AsyncStorage.getItem("authenticationToken")
      .then(setAuthenticationToken)
      .finally(() => {
        setIsLoading(false)
        SplashScreen.hide()
      })
  }, [])

  return isLoading ? null : (
    <AuthenticationProvider storedToken={authenticationToken}>
      <MainNavigator />
    </AuthenticationProvider>
  )
}

export default App
