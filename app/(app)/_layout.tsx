import { IconSettings, IconUser } from "@tabler/icons-react-native";
import { Tabs } from "expo-router";
import React from "react";
import { useColorScheme } from "react-native";

export default function Layout() {
    const theme = useColorScheme();
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: theme === "dark" ? "#D8BFD8" : "#0f0f0f",
                tabBarInactiveTintColor:
                    theme === "dark" ? "#434343" : "#6c6c6c",
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="information"
                options={{
                    title: "Info",
                    tabBarIcon: (props) => <IconUser color={props.color} />,
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: "Settings",
                    tabBarIcon: (props) => <IconSettings color={props.color} />,
                }}
            />
        </Tabs>
    );
}
