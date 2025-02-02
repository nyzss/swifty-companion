import { Stack } from "expo-router";
import { createTamagui, TamaguiProvider, Theme } from "tamagui";
import { defaultConfig } from "@tamagui/config/v4";
import { useColorScheme } from "react-native";

const config = createTamagui(defaultConfig);

export default function RootLayout() {
    const scheme = useColorScheme();
    return (
        <TamaguiProvider config={config} defaultTheme="dark">
            <Theme name={scheme}>
                <Stack
                    screenOptions={{
                        headerStyle: {
                            backgroundColor:
                                scheme === "dark" ? "#191919" : "#f0f0f0",
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                        contentStyle: {
                            backgroundColor:
                                scheme === "dark" ? "#191919" : "#f0f0f0",
                        },
                    }}
                >
                    <Stack.Screen
                        name="index"
                        options={{
                            title: "Auth",
                            // headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="information"
                        options={{
                            title: "Information",
                        }}
                    />
                    <Stack.Screen
                        name="settings"
                        options={{
                            title: "Settings",
                        }}
                    />
                </Stack>
            </Theme>
        </TamaguiProvider>
    );
}
