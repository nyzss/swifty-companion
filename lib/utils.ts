import { makeRedirectUri } from "expo-auth-session";
import { BASE_URL } from "./constants";

export const getInformation = async (token: string) => {
    try {
        const res = await fetch(`${BASE_URL}/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            throw new Error("Failed to fetch information");
        }

        const data: User = await res.json();
        return data;
    } catch (error) {
        console.error(error);
    }
    return null;
};

export const getAccessToken = async (code: string): Promise<Token | null> => {
    try {
        const formData = new FormData();
        const params = {
            grant_type: "authorization_code",
            code: code,
            client_id: process.env.EXPO_PUBLIC_OAUTH2_CLIENT_ID || "",
            client_secret: process.env.EXPO_PUBLIC_OAUTH2_CLIENT_SECRET || "",
            redirect_uri: makeRedirectUri({
                path: "information",
            }),
        };

        Object.entries(params).forEach(([key, value]) => {
            formData.append(key, value);
        });

        const res = await fetch(`https://api.intra.42.fr/oauth/token`, {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        if (!res.ok) {
            console.error(data);
            throw new Error(data.error_description);
        }

        return data;
    } catch (error) {
        return null;
    }
};
