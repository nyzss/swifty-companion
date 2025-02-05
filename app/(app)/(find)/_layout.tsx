import { Stack } from "expo-router";
import React from "react";

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: "Find",
                }}
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
