import { router, Stack } from "expo-router";
import React, { useEffect } from "react";
import { createTamagui, TamaguiProvider, Theme } from "tamagui";

import { defaultConfig } from "@tamagui/config/v4";
import { makeRedirectUri } from "expo-auth-session";
import * as SecureStore from "expo-secure-store";
import { useColorScheme } from "react-native";

const config = createTamagui(defaultConfig);
export default function Layout() {
    const scheme = useColorScheme();

    useEffect(() => {
        console.log(
            "id",
            makeRedirectUri({
                path: "information",
            })
        );
        const accessToken = SecureStore.getItem("access_token");
        const refreshToken = SecureStore.getItem("refresh_token");

        console.log(accessToken);

        if (!accessToken || !refreshToken) {
            router.replace("/");
        } else {
            router.replace("/information");
        }
    }, []);

    return (
        <TamaguiProvider config={config} defaultTheme="dark">
            <Theme name={scheme}>
                <Stack
                    screenOptions={{
                        headerShown: false,
                    }}
                />
            </Theme>
        </TamaguiProvider>
    );
}
