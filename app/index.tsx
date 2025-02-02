import { IconMoon, IconSun } from "@tabler/icons-react-native";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useState } from "react";
import { Appearance, useColorScheme } from "react-native";
import { Button, Text, View } from "tamagui";

WebBrowser.maybeCompleteAuthSession();

export default function Index() {
    const colorScheme = useColorScheme();
    const [error, setError] = useState<boolean>(false);

    const changeTheme = () =>
        Appearance.setColorScheme(colorScheme === "dark" ? "light" : "dark");

    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId: process.env.EXPO_PUBLIC_OAUTH2_CLIENT_ID || "",
            scopes: ["public"],
            redirectUri: makeRedirectUri(),
        },
        {
            authorizationEndpoint: "https://api.intra.42.fr/oauth/authorize",
        }
    );

    const getAccessToken = async (code: string): Promise<Token | null> => {
        setError(false);
        try {
            const formData = new FormData();
            const params = {
                grant_type: "authorization_code",
                code: code,
                client_id: process.env.EXPO_PUBLIC_OAUTH2_CLIENT_ID || "",
                client_secret:
                    process.env.EXPO_PUBLIC_OAUTH2_CLIENT_SECRET || "",
                redirect_uri: makeRedirectUri(),
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
                throw new Error(data.error_description);
            }

            setError(false);
            return data;
        } catch (error) {
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 5000);
        }
        return null;
    };

    const OAuthLogin = async () => {
        if (request) {
            const res = await promptAsync();

            if (res.type === "success") {
                const { code } = res.params;

                getAccessToken(code).then((res) => {
                    if (res) {
                        console.log("TOKEN", res);
                    }
                });
            }
        }
    };

    return (
        <View
            flex={1}
            justifyContent="center"
            marginBottom={"$12"}
            marginHorizontal={"$9"}
        >
            <View marginVertical={"auto"}>
                <Text marginBottom={"$4"} fontSize={"$6"} fontWeight={"bold"}>
                    Welcome to your <Text color="thistle">42 companion</Text>!
                </Text>
                <Button
                    size={"$5"}
                    fontWeight={"500"}
                    disabled={!request}
                    onPress={OAuthLogin}
                >
                    Login with 42
                </Button>
                {error && (
                    <View>
                        <Text
                            color="tomato"
                            marginTop={"$4"}
                            marginHorizontal={"auto"}
                            fontSize={"$5"}
                        >
                            Failed to get access token
                        </Text>
                        <Text
                            marginHorizontal={"auto"}
                            color="$color10"
                            marginTop={"$1"}
                            fontSize={"$2"}
                        >
                            Please try again later or contact the developer if
                            the issue persists.
                        </Text>
                    </View>
                )}
            </View>
            <Button onPress={changeTheme} marginTop={"auto"}>
                {colorScheme === "dark" ? (
                    <IconMoon size={22} color="white" />
                ) : (
                    <IconSun size={22} color="black" />
                )}
            </Button>
        </View>
    );
}
