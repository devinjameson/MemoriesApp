import React, {
  createContext,
  useState,
  useContext,
  FunctionComponent,
  useEffect,
} from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

import * as Api from "./api"

export const AuthenticationContext = createContext<
  AuthenticationContextState | undefined
>(undefined)

export interface AuthenticationProviderProps {
  storedToken: string | null
}

export interface AuthenticationContextState {
  authenticationToken: string | null
  authenticate: (phoneNumber: string, pin: string) => void
  createMemory: (
    description: string,
    imagesData: Api.ImageData[],
  ) => Promise<Api.Memory[] | void>
  fetchMemories: () => Promise<Api.Memory[] | void>
}

export const AuthenticationProvider: FunctionComponent<AuthenticationProviderProps> = ({
  storedToken,
  children,
}) => {
  const [authenticationToken, setAuthenticationToken] = useState<string | null>(
    storedToken,
  )

  useEffect(() => {
    setAuthenticationToken(storedToken)
  }, [storedToken])

  const authenticate = async (phoneNumber: string, pin: string) => {
    const result = await Api.authenticate(phoneNumber, pin)
    if (result.kind === "success") {
      await AsyncStorage.setItem(
        "authenticationToken",
        result.authenticationToken,
      )
      setAuthenticationToken(result.authenticationToken)
    }
  }

  const fetchMemories = async () => {
    if (authenticationToken) {
      Api.fetchMemories(authenticationToken)
    }
  }

  const createMemory = async (
    description: string,
    imagesData: Api.ImageData[],
  ) => {
    if (authenticationToken) {
      Api.createMemory(description, imagesData, authenticationToken)
    }
  }

  return (
    <AuthenticationContext.Provider
      value={{
        authenticationToken,
        authenticate,
        createMemory,
        fetchMemories,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  )
}

export const useAuthenticationContext = (): AuthenticationContextState => {
  const context = useContext(AuthenticationContext)
  if (context === undefined) {
    throw new Error("AuthenticationContext must be used with a provider")
  }
  return context
}
