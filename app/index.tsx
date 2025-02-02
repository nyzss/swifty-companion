import React, { useEffect } from "react";
import { Button, Text, View } from "tamagui";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { Appearance, useColorScheme } from "react-native";
import { IconMoon, IconSun } from "@tabler/icons-react-native";

WebBrowser.maybeCompleteAuthSession();

export default function Index() {
    const colorScheme = useColorScheme();

    const changeTheme = () =>
        Appearance.setColorScheme(colorScheme === "dark" ? "light" : "dark");

    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId: process.env.EXPO_PUBLIC_OAUTH2_CLIENT_ID || "",
            clientSecret: process.env.EXPO_PUBLIC_OAUTH2_CLIENT_SECRET || "",
            scopes: ["public"],
            redirectUri: makeRedirectUri(),
        },
        {
            authorizationEndpoint: "https://api.intra.42.fr/oauth/authorize",
            tokenEndpoint: "https://api.intra.42.fr/oauth/token",
        }
    );

    useEffect(() => {
        if (response?.type === "success") {
            const { code } = response.params;
            console.log("code", code);
        }
    }, [response]);

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
                    onPress={() => promptAsync()}
                >
                    Login with 42
                </Button>
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
