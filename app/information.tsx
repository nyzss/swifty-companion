import { Card, Image, Spinner, Text, View, XStack, YStack } from "tamagui";
import * as SecureStore from "expo-secure-store";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { getInformation } from "@/lib/utils";

export default function Information() {
    const [user, setUser] = useState<User>();

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
                    <View flex={1}>
                        <Card marginVertical={"$3"}>
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
                        <Text>hello world hahaha</Text>
                        <Text>
                            {SecureStore.getItem("access_token") || "none"}
                        </Text>

                        <Link
                            href={"/"}
                            replace
                            onPress={() =>
                                SecureStore.deleteItemAsync("access_token")
                            }
                        >
                            <Text color={"azure"}>Logout</Text>
                        </Link>
                    </View>
                ))}
        </View>
    );
}
