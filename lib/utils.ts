import { makeRedirectUri } from "expo-auth-session";
import { BASE_URL } from "./constants";
import * as SecureStore from "expo-secure-store";

export const fetcher = async (url: string, options: RequestInit = {}) => {
    const headers = new Headers(options.headers);

    const accessToken = await SecureStore.getItemAsync("access_token");
    headers.append("Authorization", `Bearer ${accessToken}`);

    const res = await fetch(`${BASE_URL}/${url}`, {
        ...options,
        headers,
    });

    return res;
};

export const getInformation = async (token: string) => {
    try {
        const res = await fetcher("/me");

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

export const listUsers = async (login: string) => {
    try {
        const res = await fetcher(`/users?range[login]=${login},${login}z`);

        const data: BaseUser[] = await res.json();

        if (!res.ok) {
            console.error("LIST USERS", data);
            throw new Error("Failed to fetch users");
        }

        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getUserById = async (id: number) => {
    try {
        const res = await fetcher(`/users/${id}`);

        const data: User = await res.json();
        console.log("DATA", data);

        if (!res.ok) {
            console.error("GET_USER_BY_ID", data);
            throw new Error(`Failed to fetch user ${id}`);
        }

        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
};
