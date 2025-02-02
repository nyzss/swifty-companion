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
