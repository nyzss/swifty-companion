import { IconFlask, IconMoneybag } from "@tabler/icons-react-native";
import React, { useMemo } from "react";
import { useColorScheme } from "react-native";
import {
    Card,
    Image,
    Progress,
    Separator,
    Text,
    View,
    XStack,
    YStack,
} from "tamagui";

export default function UserCard({ user }: { user: User }) {
    const theme = useColorScheme();

    const mainCursus = useMemo(() => {
        const cursus = user.cursus_users.find((c) => {
            return c.cursus.kind === "main";
        });

        if (!cursus)
            return user.cursus_users.find((c) => c.cursus.kind === "piscine");
        return cursus;
    }, [user]);

    return (
        <View flex={1} paddingHorizontal={"$4"}>
            <Card marginVertical={"$3"} bordered elevate>
                <XStack
                    alignItems="center"
                    justifyContent="space-between"
                    padding={"$4"}
                >
                    <YStack>
                        <Text>{user.usual_full_name}</Text>
                        <Text fontSize={"$11"} fontWeight={"bold"}>
                            {user.login}
                        </Text>
                        <Text>{user.email} </Text>
                        {user.phone !== "hidden" && (
                            <Text textDecorationLine="underline">
                                {user.phone}
                            </Text>
                        )}
                    </YStack>
                    <Image
                        source={{
                            uri: user?.image.versions.small || user?.image.link,
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
                    <YStack
                        gap={"$2"}
                        //  marginBottom={"$4"}
                    >
                        <Text>Level {mainCursus?.level}</Text>
                        <Progress
                            size={"$6"}
                            value={mainCursus && (mainCursus.level % 1) * 100}
                            bordered
                        >
                            <Progress.Indicator animation={"bouncy"} />
                        </Progress>
                    </YStack>
                    <Separator marginVertical={"$4"} />

                    <XStack>
                        <View>
                            <Text
                                fontWeight={"bold"}
                                fontSize={"$3"}
                                color={"$color9"}
                            >
                                Correc. Points
                            </Text>
                            <Text fontSize={"$12"} fontWeight={"900"}>
                                {user.correction_point}{" "}
                                <IconFlask
                                    size={32}
                                    color={theme === "dark" ? "white" : "black"}
                                />
                            </Text>
                        </View>

                        <Separator vertical marginHorizontal={"$4"} />

                        <View>
                            <Text
                                fontWeight={"bold"}
                                fontSize={"$3"}
                                color={"$color9"}
                            >
                                Wallet
                            </Text>
                            <Text fontSize={"$12"} fontWeight={"900"}>
                                {user.wallet}{" "}
                                <IconMoneybag
                                    size={32}
                                    color={theme === "dark" ? "white" : "black"}
                                />
                            </Text>
                        </View>
                    </XStack>
                </View>
            </Card>
        </View>
    );
}
