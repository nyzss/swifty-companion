import { IconSettings, IconUser } from "@tabler/icons-react-native";
import { Tabs } from "expo-router";
import React, { useEffect } from "react";
import { useTheme } from "tamagui";

export default function Layout() {
    const theme = useTheme();

    const backgroundColor = theme.$background?.val;
    const color = theme.$color?.val;
    const secondary = theme.$color10?.val;

    useEffect(() => {
        console.log(theme);
    }, []);
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: color,
                tabBarInactiveTintColor: secondary,
                sceneStyle: {
                    backgroundColor: backgroundColor,
                },
                tabBarStyle: {
                    backgroundColor: backgroundColor,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: "bold",
                },
                headerTintColor: color,
                headerStyle: {
                    backgroundColor: backgroundColor,
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
                name="(find)"
                options={{
                    title: "Find",
                    tabBarIcon: (props) => <IconUser color={props.color} />,
                    headerShown: false,
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
