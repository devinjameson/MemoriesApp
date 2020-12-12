export type Memory = {
  id: number
  description: string | null
  images: string[]
  created_at: string
  updated_at: string
}

export type ImageData = {
  image: string
  id: number
}

export type RequestPinResponse = RequestPinSuccess | RequestPinFailure

export type RequestPinSuccess = {
  kind: "success"
}

export type RequestPinFailure = {
  kind: "failure"
  error: string
}

export type AuthenticationResponse =
  | AuthenticationSuccess
  | AuthenticationFailure

export type AuthenticationSuccess = {
  kind: "success"
  authenticationToken: string
}

export type AuthenticationFailure = {
  kind: "failure"
  error: string
}

const authenticate = async (
  phoneNumber: string,
  pin: string,
): Promise<AuthenticationResponse> => {
  const body = JSON.stringify({ phone_number: phoneNumber, pin: pin })

  return fetch("http://localhost:3000/api/session", {
    method: "POST",
    body,
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      return {
        authenticationToken: data.authentication_token,
        kind: "success" as const,
      }
    })
    .catch(() => {
      return { kind: "failure" as const, error: "Something went wrong" }
    })
}

const requestPin = async (phoneNumber: string): Promise<RequestPinResponse> => {
  const body = JSON.stringify({ user: { phone_number: phoneNumber } })

  return fetch("http://localhost:3000/api/users", {
    method: "POST",
    body,
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      if (response.ok) {
        return { kind: "success" as const }
      } else {
        return { kind: "failure" as const, error: "Something went wrong" }
      }
    })
    .catch(() => {
      return { kind: "failure" as const, error: "Something went wrong" }
    })
}

const fetchMemories = async (
  authenticationToken: string,
): Promise<Memory[] | void> => {
  const authHeader = { Authorization: authenticationToken }

  return fetch("http://localhost:3000/api/memories", { headers: authHeader })
    .then((response) => response.json())
    .then((data) => data)
}

const createMemory = async (
  description: string,
  imagesData: ImageData[],
  authenticationToken: string,
): Promise<Memory[] | void> => {
  const imageData = imagesData.map((imageData) => {
    return { data: imageData.image }
  })
  const body = JSON.stringify({ memory: { description, images: imageData } })

  const headers = {
    "Content-Type": "application/json",
    Authorization: authenticationToken,
  }

  return fetch("http://localhost:3000/api/memories", {
    method: "POST",
    body,
    headers,
  })
    .then((response) => response.json())
    .then((data) => data)
}

export { authenticate, requestPin, fetchMemories, createMemory }
