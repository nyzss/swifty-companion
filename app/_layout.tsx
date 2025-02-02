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
                            backgroundColor: "#232323",
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
                    <Stack.Screen name="index" />
                    <Stack.Screen name="information" />
                </Stack>
            </Theme>
        </TamaguiProvider>
    );
}
