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

export type SignInResponse = SignInSuccess | SignInFailure

export type SignInSuccess = {
  kind: "success"
  authentication_token: string
}

export type SignInFailure = {
  kind: "failure"
  error: string
}

const signIn = async (phoneNumber: string): Promise<SignInResponse> => {
  const body = JSON.stringify({ user: { phone_number: phoneNumber } })

  return fetch("http://localhost:3000/api/users", {
    method: "POST",
    body,
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      return {
        kind: "success" as const,
        authentication_token: data.authentication_token,
      }
    })
    .catch(() => {
      return { kind: "failure" as const, error: "Something went wrong" }
    })
}

const fetchMemories = async (): Promise<Memory[] | void> => {
  return fetch("http://localhost:3000/api/memories")
    .then((response) => response.json())
    .then((data) => data)
}

const createMemory = async (
  description: string,
  imagesData: ImageData[],
): Promise<Memory[] | void> => {
  const imageData = imagesData.map((imageData) => {
    return { data: imageData.image }
  })
  const body = JSON.stringify({ memory: { description, images: imageData } })

  return fetch("http://localhost:3000/api/memories", {
    method: "POST",
    body,
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => data)
}

export { signIn, fetchMemories, createMemory }
