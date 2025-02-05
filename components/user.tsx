import { FlashList } from "@shopify/flash-list";
import { IconFlask, IconWallet } from "@tabler/icons-react-native";
import React, { useMemo } from "react";
import { useColorScheme } from "react-native";
import {
    Card,
    Image,
    Progress,
    ScrollView,
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

    const sortedProjects = useMemo(() => {
        const id = mainCursus ? mainCursus.cursus_id : 0;
        const c = user.projects_users.filter((p) => p.cursus_ids.includes(id));
        return [
            ...c.filter((p) => p.status === "in_progress"),
            ...c.filter((p) => p.status === "finished"),
        ];
    }, [user]);

    return (
        <View flex={1} padding={"$4"}>
            <YStack gap={"$3"}>
                <Card bordered elevate>
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
                        {(mainCursus && mainCursus.level && (
                            <YStack gap={"$2"}>
                                <Text>Level {mainCursus?.level}</Text>
                                <Progress
                                    size={"$6"}
                                    value={
                                        mainCursus
                                            ? Math.floor(
                                                  (mainCursus.level % 1) * 100
                                              )
                                            : 0
                                    }
                                    bordered
                                >
                                    <Progress.Indicator animation={"bouncy"} />
                                </Progress>
                            </YStack>
                        )) || (
                            <Text fontWeight={"bold"} fontSize={"$5"}>
                                No level
                            </Text>
                        )}

                        <Separator marginVertical={"$4"} />

                        <XStack>
                            <View>
                                <Text
                                    fontWeight={"600"}
                                    fontSize={"$3"}
                                    color={"$color11"}
                                >
                                    Correc. Points
                                </Text>
                                <Text fontSize={"$12"} fontWeight={"900"}>
                                    {user.correction_point}{" "}
                                    <IconFlask
                                        size={32}
                                        color={
                                            theme === "dark" ? "white" : "black"
                                        }
                                    />
                                </Text>
                            </View>

                            <Separator vertical marginHorizontal={"$4"} />

                            <View>
                                <Text
                                    fontWeight={"600"}
                                    fontSize={"$3"}
                                    color={"$color11"}
                                >
                                    Wallet
                                </Text>
                                <XStack alignItems="flex-end">
                                    <Text fontSize={"$12"} fontWeight={"900"}>
                                        {user.wallet}{" "}
                                        <IconWallet
                                            size={32}
                                            color={
                                                theme === "dark"
                                                    ? "white"
                                                    : "black"
                                            }
                                        />
                                    </Text>
                                </XStack>
                            </View>
                        </XStack>
                    </View>
                </Card>

                <Card bordered elevate>
                    <Card.Header>
                        <Text fontWeight={"bold"} fontSize={"$4"}>
                            Projects
                        </Text>
                    </Card.Header>

                    <View paddingHorizontal={"$4"}>
                        <ScrollView height={"175"}>
                            <FlashList
                                data={sortedProjects}
                                estimatedItemSize={17}
                                renderItem={({ item }) => (
                                    <XStack
                                        justifyContent="space-between"
                                        paddingVertical={4}
                                    >
                                        <Text
                                            fontWeight={"bold"}
                                            fontSize={"$4"}
                                            color={
                                                item.final_mark === 0
                                                    ? "$red9"
                                                    : "$color"
                                            }
                                        >
                                            {item.project.name.slice(0, 30)}
                                            {item.project.name.length > 30 &&
                                                "..."}
                                        </Text>
                                        <Text
                                            fontWeight={"bold"}
                                            fontSize={"$3"}
                                            color={
                                                item.final_mark === 0
                                                    ? "$red9"
                                                    : "$color"
                                            }
                                        >
                                            {item.marked
                                                ? item.final_mark
                                                : "In Progress"}
                                        </Text>
                                    </XStack>
                                )}
                            />
                        </ScrollView>
                    </View>
                </Card>
            </YStack>
        </View>
    );
}
