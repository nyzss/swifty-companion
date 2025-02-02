import { View, Text, Button } from "tamagui";
import { Appearance, useColorScheme } from "react-native";
import { Link } from "expo-router";
import { IconMoon, IconSun } from "@tabler/icons-react-native";

export default function Index() {
    const colorScheme = useColorScheme();

    const changeTheme = () =>
        Appearance.setColorScheme(colorScheme === "dark" ? "light" : "dark");

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
            <Link href={"/information"}>
                <Text color={"azure"}>Go to information</Text>
            </Link>
            <Text>{colorScheme}</Text>
            <Button
                onPress={changeTheme}
                icon={
                    colorScheme === "dark" ? (
                        <IconMoon size={22} />
                    ) : (
                        <IconSun size={22} />
                    )
                }
            >
                Change Theme
            </Button>
        </View>
    );
}
