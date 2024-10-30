import axios from "axios";

// Get profile info

export const fetchDocumnts = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/documents`
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log("Error fetching documents: ", error);
  }
};

export const deleteDocument = async (id) => {
  try {
    const response = axios.delete(
      `${import.meta.env.VITE_SERVER_URL}/api/${id}`
    );
    return response;
  } catch (error) {
    console.log("Error deleting document: ", error);
  }
};
