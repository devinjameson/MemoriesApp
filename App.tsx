import "react-native-gesture-handler"
import React, { FunctionComponent } from "react"

import MainNavigator from "./src/MainNavigator"
import { AuthenticationProvider } from "./src/AuthenticationContext"

const App: FunctionComponent = () => {
  return (
    <AuthenticationProvider>
      <MainNavigator />
    </AuthenticationProvider>
  )
}

export default App
