import { logout } from "@/lib/auth";
import { IconLogout } from "@tabler/icons-react-native";
import { Link } from "expo-router";
import { useColorScheme } from "react-native";
import { Button, Text, View } from "tamagui";

export default function Index() {
    const theme = useColorScheme();

    // const changeTheme = () =>
    //     Appearance.setColorScheme(theme === "dark" ? "light" : "dark");

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
            padding={"$5"}
        >
            <Text paddingBottom={"$7"} fontSize={"$5"} fontWeight={"bold"}>
                Settings
            </Text>
            {/* <Button
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
            </Button> */}
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
