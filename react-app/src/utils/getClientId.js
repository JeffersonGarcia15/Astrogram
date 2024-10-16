// src/utils/getClientId.js
export const getClientId = async () => {
  try {
    const response = await fetch("/api/auth/client-id");
    const data = await response.json();
    return data.clientId;
  } catch (error) {
    console.error("Error fetching client ID:", error);
    return null;
  }
};
