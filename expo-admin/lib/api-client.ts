import axios from "axios";
import Constants from "expo-constants";

const apiClient = axios.create({
  baseURL:
    Constants.expoConfig?.extra?.apiUrl ||
    process.env.EXPO_PUBLIC_API_URL ||
    "http://192.168.1.4:3001",
});

export default apiClient;
