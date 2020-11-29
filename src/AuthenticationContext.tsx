import React, {
  createContext,
  useState,
  useContext,
  FunctionComponent,
} from "react"

import * as Api from "./api"

export const AuthenticationContext = createContext<
  AuthenticationContextState | undefined
>(undefined)

export interface AuthenticationContextState {
  authenticationToken: string
  signIn: (phoneNumber: string) => void
}

export const AuthenticationProvider: FunctionComponent = ({ children }) => {
  const [authenticationToken, setAuthenticationToken] = useState<string>("")

  const signIn = async (phoneNumber: string) => {
    const result = await Api.signIn(phoneNumber)
    if (result.kind === "success") {
      setAuthenticationToken(result.authentication_token)
    }
  }

  return (
    <AuthenticationContext.Provider
      value={{
        authenticationToken,
        signIn,
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
