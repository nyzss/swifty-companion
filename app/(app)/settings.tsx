import { View, Text, Button } from "tamagui";
import { Appearance, useColorScheme } from "react-native";
import { Link } from "expo-router";
import { IconLogout, IconMoon, IconSun } from "@tabler/icons-react-native";
import * as SecureStore from "expo-secure-store";
import { logout } from "@/lib/auth";

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
        >
            <Text fontWeight={"bold"} fontSize={80}>
                title
            </Text>
            <Link href={"/information"} replace>
                <Text color={"azure"}>Go to information</Text>
            </Link>
            <Text>{theme}</Text>
            <Button
                onPress={changeTheme}
                icon={
                    theme === "dark" ? (
                        <IconMoon size={22} />
                    ) : (
                        <IconSun size={22} />
                    )
                }
            >
                Change Theme
            </Button>
            <Button
                onPress={() => {
                    SecureStore.setItemAsync(
                        "access_token",
                        "test_access_token" + new Date().toString()
                    ).then(() => {
                        console.log("Secure store changed");
                    });
                }}
            >
                Change secure store
            </Button>
            <Button
                onPress={logout}
                marginTop={"auto"}
                marginBottom={"$7"}
                themeInverse
                alignSelf="center"
                icon={
                    <IconLogout
                        color={theme === "dark" ? "dark" : "white"}
                        size={22}
                    />
                }
            >
                <Text fontWeight={"bold"}>Logout</Text>
            </Button>
        </View>
    );
}
