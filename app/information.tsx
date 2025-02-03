import { logout } from "@/lib/auth";
import { getInformation } from "@/lib/utils";
import { IconLogout } from "@tabler/icons-react-native";
import { Link, router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import {
    Button,
    Card,
    Image,
    Spinner,
    Text,
    View,
    XStack,
    YStack,
} from "tamagui";

export default function Information() {
    const [user, setUser] = useState<User>();
    const theme = useColorScheme();

    useEffect(() => {
        const accessToken = SecureStore.getItem("access_token");

        if (!accessToken) {
            router.replace("/");
        } else {
            getInformation(accessToken).then((data) => {
                console.log("FETCHED_DATA", data);
                if (data) {
                    setUser(data);
                } else if (data === null) {
                    router.replace("/");
                }
            });
        }
    }, []);

    return (
        <View flex={1}>
            {(!user && (
                <View flex={1} justifyContent="center" alignItems="center">
                    <Text marginBottom={"$2"}>
                        Fetching your information...
                    </Text>
                    <Spinner size="large" />
                </View>
            )) ||
                (user && (
                    <View flex={1} paddingHorizontal={"$4"}>
                        <Card marginVertical={"$3"} bordered elevate>
                            <XStack
                                alignItems="center"
                                justifyContent="space-between"
                                padding={"$4"}
                            >
                                <YStack>
                                    <Text>
                                        {user.first_name} {user.last_name}
                                    </Text>
                                    <Text fontSize={"$11"} fontWeight={"bold"}>
                                        {user.login}
                                    </Text>
                                </YStack>
                                <Image
                                    source={{
                                        uri:
                                            user?.image.versions.small ||
                                            user?.image.link,
                                        width: 100,
                                        height: 100,
                                    }}
                                    borderRadius={12}
                                />
                            </XStack>
                        </Card>
                        <Card bordered elevate>
                            <Card.Header>
                                <Text fontWeight={"bold"} fontSize={"$4"}>
                                    Information
                                </Text>
                            </Card.Header>
                            <View paddingHorizontal={"$4"} paddingBottom={"$4"}>
                                <Text>test</Text>
                            </View>
                        </Card>
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
                ))}
        </View>
    );
}
