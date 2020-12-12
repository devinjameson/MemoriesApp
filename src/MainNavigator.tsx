import React, { FunctionComponent, useContext } from "react"
import { NavigationContainer } from "@react-navigation/native"
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack"

import Home from "./screens/Home"
import AddMemory from "./screens/AddMemory"
import RequestPin from "./screens/RequestPin"
import EnterPin from "./screens/EnterPin"
import { Screen, Screens } from "./navigation"
import { applyHeaderRightBack } from "./navigation/HeaderRightBack"

import { Colors } from "./styles"
import { useAuthenticationContext } from "./AuthenticationContext"

export type ScreenParams = {
  Home: undefined
  AddMemory: undefined
  RequestPin: undefined
  EnterPin: { phoneNumber: string }
}

const Stack = createStackNavigator<ScreenParams>()

const MainNavigator: FunctionComponent = () => {
  const { authenticationToken } = useAuthenticationContext()

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="screen">
        {authenticationToken ? (
          <>
            <Stack.Screen
              name={Screens.Home}
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={Screens.AddMemory}
              component={AddMemory}
              options={{
                ...TransitionPresets.ModalTransition,
                title: "",
                headerLeft: () => null,
                headerRight: applyHeaderRightBack(),
                headerStyle: {
                  shadowColor: Colors.utility.transparent,
                },
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name={Screens.RequestPin}
              component={RequestPin}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={Screens.EnterPin}
              component={EnterPin}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigator
