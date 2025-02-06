import { Stack } from "expo-router";
import { useTheme } from "tamagui";

export default function RootLayout() {
    const theme = useTheme();

    const backgroundColor = theme.$background?.val;
    const color = theme.$color?.val;

    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: backgroundColor,
                },
                headerTintColor: color,
                headerTitleStyle: {
                    fontWeight: "bold",
                },
                contentStyle: {
                    backgroundColor: backgroundColor,
                },
            }}
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
    );
}
