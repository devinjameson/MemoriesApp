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

export { fetchMemories, createMemory }
