import { Stack } from "expo-router";
import React from "react";
import { useTheme } from "tamagui";

export default function Layout() {
    const theme = useTheme();

    const backgroundColor = theme.$background?.val;
    const color = theme.$color?.val;
    const secondary = theme.$color10?.val;

    return (
        <Stack
            screenOptions={{
                contentStyle: {
                    backgroundColor: backgroundColor,
                },
                headerStyle: {
                    backgroundColor: backgroundColor,
                },
                headerTintColor: color,
            }}
        >
            <Stack.Screen
                options={{
                    title: "Find",
                }}
                name="find"
            />
            <Stack.Screen
                name="user/[id]"
                options={{
                    title: "User",
                }}
            />
        </Stack>
    );
}
