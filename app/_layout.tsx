import { Stack } from "expo-router";

export default function RootLayout() {
    return (
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
                    backgroundColor: "#232323",
                },
            }}
        >
            <Stack.Screen name="index" />
            <Stack.Screen name="information" />
        </Stack>
    );
}
