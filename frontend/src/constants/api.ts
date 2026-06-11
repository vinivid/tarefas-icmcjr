import Constants from "expo-constants";

const apiUrlConfigurada = process.env.EXPO_PUBLIC_API_URL?.replace(/\/$/, "");
const expoHost = Constants.expoConfig?.hostUri?.split(":")[0];

export const API_URL =
  apiUrlConfigurada ?? `http://${expoHost ?? "localhost"}:8080/api/v1`;
