import { IconSettings, IconUser } from "@tabler/icons-react-native";
import { Tabs } from "expo-router";
import React from "react";
import { useColorScheme } from "react-native";
import { Theme } from "tamagui";

export default function Layout() {
    const theme = useColorScheme();
    return (
        <Theme name={theme}>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor:
                        theme === "dark" ? "#ffffff" : "#0f0f0f",
                    tabBarInactiveTintColor:
                        theme === "dark" ? "#d2d2d2" : "#6c6c6c",
                    headerShown: false,
                    sceneStyle: {
                        backgroundColor:
                            theme === "dark" ? "#222222" : "#f0f0f0",
                    },
                    tabBarStyle: {
                        backgroundColor:
                            theme === "dark" ? "#191919" : "#f0f0f0",
                    },
                    tabBarLabelStyle: {
                        fontSize: 12,
                        fontWeight: "bold",
                    },
                }}
            >
                <Tabs.Screen
                    name="information"
                    options={{
                        title: "Me",
                        tabBarIcon: (props) => <IconUser color={props.color} />,
                    }}
                />
                <Tabs.Screen
                    name="find"
                    options={{
                        title: "Find",
                        tabBarIcon: (props) => <IconUser color={props.color} />,
                    }}
                />
                <Tabs.Screen
                    name="settings"
                    options={{
                        title: "Settings",
                        tabBarIcon: (props) => (
                            <IconSettings color={props.color} />
                        ),
                    }}
                />
            </Tabs>
        </Theme>
    );
}
