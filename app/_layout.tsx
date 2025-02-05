import { router, Stack } from "expo-router";
import { createTamagui, TamaguiProvider, Theme } from "tamagui";
import { defaultConfig } from "@tamagui/config/v4";
import { useColorScheme } from "react-native";
import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { makeRedirectUri } from "expo-auth-session";

const config = createTamagui(defaultConfig);

export default function RootLayout() {
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
                // screenOptions={{
                //     headerStyle: {
                //         backgroundColor:
                //             scheme === "dark" ? "#191919" : "#f0f0f0",
                //     },
                //     headerTintColor: "$color1",
                //     headerTitleStyle: {
                //         fontWeight: "bold",
                //     },
                // }}
                // screenOptions={{
                //     headerShown: false,
                // }}
                >
                    <Stack.Screen
                        name="index"
                        options={{
                            title: "Auth",
                        }}
                    />
                    <Stack.Screen
                        name="(app)"
                        options={{
                            title: "Companion",
                            headerShown: false,
                        }}
                    />
                </Stack>
            </Theme>
        </TamaguiProvider>
    );
}
