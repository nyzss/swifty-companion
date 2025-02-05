import { listUsers } from "@/lib/utils";
import { FlashList } from "@shopify/flash-list";
import { IconSearch, IconUser } from "@tabler/icons-react-native";
import { Link } from "expo-router";
import React, { useState } from "react";
import { useColorScheme } from "react-native";
import {
    Button,
    Card,
    Image,
    Input,
    Label,
    Spinner,
    Text,
    View,
    XStack,
    YStack,
} from "tamagui";

export default function Find() {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState<BaseUser[] | null>(null);
    const [loading, setLoading] = useState(false);
    const theme = useColorScheme();

    const handleSubmit = async () => {
        setLoading(true);
        const users = await listUsers(search);
        console.log(users);

        if (users) {
            setUsers(users);
        }
        setLoading(false);
    };

    return (
        <View flex={1} padding={"$4"}>
            <Label htmlFor="search" fontWeight={"bold"} fontSize={"$5"}>
                Search user{" "}
            </Label>
            <XStack>
                <Input
                    id="search"
                    onChangeText={setSearch}
                    value={search}
                    flex={1}
                    placeholder="okoca"
                    size={"$5"}
                    onSubmitEditing={handleSubmit}
                />
                <Button marginLeft={"$3"} onPress={handleSubmit}>
                    <IconSearch color={theme === "dark" ? "white" : "black"} />
                </Button>
            </XStack>
            {(loading && (
                <YStack padding={"$8"} alignItems="center" gap={"$3"}>
                    <Text fontWeight={"bold"} fontSize={"$5"}>
                        Fetching users...
                    </Text>
                    <Spinner size="large" />
                </YStack>
            )) || (
                <FlashList
                    data={users}
                    ListEmptyComponent={() => (
                        <View marginVertical={"$4"}>
                            <Text>
                                {users?.length === 0 && search
                                    ? "No user found"
                                    : ""}
                            </Text>
                        </View>
                    )}
                    renderItem={({ item }) => (
                        <Link href={`/user/${item.id}`} asChild>
                            <Card padded elevate bordered marginVertical={"$3"}>
                                <XStack
                                    alignItems="center"
                                    justifyContent="space-between"
                                >
                                    <Text fontWeight={"bold"} fontSize={"$6"}>
                                        {item.login}
                                    </Text>
                                    {(item.image.link && (
                                        <Image
                                            borderRadius={8}
                                            source={{
                                                uri:
                                                    item.image.versions.small ||
                                                    item.image.link ||
                                                    "",
                                                width: 70,
                                                height: 70,
                                            }}
                                        />
                                    )) || (
                                        <IconUser
                                            size={70}
                                            color={
                                                theme === "dark"
                                                    ? "white"
                                                    : "black"
                                            }
                                        />
                                    )}
                                </XStack>
                            </Card>
                        </Link>
                    )}
                    estimatedItemSize={125}
                />
            )}
        </View>
    );
}
