export type Memory = {
  id: number;
  description: string | null;
  images: string[];
  created_at: string;
  updated_at: string;
};

const fetchMemories = async (): Promise<Memory[] | void> => {
  return fetch('http://localhost:3000/api/memories')
    .then((response) => response.json())
    .then((data) => data);
};

export {fetchMemories};
