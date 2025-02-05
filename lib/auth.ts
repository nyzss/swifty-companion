// import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

export const logout = async () => {
    await SecureStore.deleteItemAsync("access_token");
    await SecureStore.deleteItemAsync("refresh_token");
    await SecureStore.deleteItemAsync("raw");
    // router.replace("../");
};
