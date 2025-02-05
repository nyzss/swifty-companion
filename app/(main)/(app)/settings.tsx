import { logout } from "@/lib/auth";
import { IconLogout, IconMoon, IconSun } from "@tabler/icons-react-native";
import { Link } from "expo-router";
import { Appearance, useColorScheme } from "react-native";
import { Button, Text, Theme, View } from "tamagui";

export default function Index() {
    const theme = useColorScheme();

    const changeTheme = () =>
        Appearance.setColorScheme(theme === "dark" ? "light" : "dark");

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
            padding={"$5"}
        >
            <Button
                onPress={changeTheme}
                icon={
                    theme === "dark" ? (
                        <IconMoon size={22} />
                    ) : (
                        <IconSun size={22} />
                    )
                }
                fontWeight={"bold"}
            >
                Change Theme
            </Button>
            <Link asChild href={"../../"} replace>
                <Button
                    onPress={logout}
                    marginTop={"auto"}
                    marginBottom={"$7"}
                    themeInverse
                    alignSelf="center"
                    icon={
                        <IconLogout
                            color={theme === "dark" ? "black" : "white"}
                            size={22}
                        />
                    }
                >
                    <Text fontWeight={"bold"}>Logout</Text>
                </Button>
            </Link>
        </View>
    );
}
