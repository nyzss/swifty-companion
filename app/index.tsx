import React, { useEffect } from "react";
import { Button, Text, View } from "tamagui";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();

export default function Index() {
    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId: process.env.EXPO_OAUTH2_CLIENT_ID || "",
            clientSecret: process.env.EXPO_OAUTH2_CLIENT_SECRET || "",
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
            <Text marginTop={"$4"}>{makeRedirectUri()}</Text>
        </View>
    );
}
