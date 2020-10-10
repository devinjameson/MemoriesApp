export type Memory = {
  id: number
  description: string | null
  images: string[]
  created_at: string
  updated_at: string
}

const fetchMemories = async (): Promise<Memory[] | void> => {
  return fetch("http://localhost:3000/api/memories")
    .then((response) => response.json())
    .then((data) => data)
}

const createMemory = async (
  description: string,
  images: string[],
): Promise<Memory[] | void> => {
  const imageData = images.map((image) => {
    return { data: image }
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
