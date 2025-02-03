import { listUsers } from "@/lib/utils";
import { FlashList } from "@shopify/flash-list";
import { IconSearch } from "@tabler/icons-react-native";
import React, { useState } from "react";
import { useColorScheme } from "react-native";
import { Button, Card, Image, Input, Label, Text, View, XStack } from "tamagui";

export default function Find() {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState<BaseUser[]>([]);
    const theme = useColorScheme();

    const handleSubmit = async () => {
        const users = await listUsers(search);
        console.log(users);

        if (users) {
            setUsers(users);
        }
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
                />
                <Button marginLeft={"$3"} onPress={handleSubmit}>
                    <IconSearch color={theme === "dark" ? "white" : "black"} />
                </Button>
            </XStack>
            <Text>{search}</Text>
            <FlashList
                data={users}
                renderItem={({ item }) => (
                    <Card>
                        <XStack alignItems="center">
                            <Text>{item.login}</Text>
                            <Image
                                source={{
                                    uri:
                                        item.image.versions.small ||
                                        item.image.link,
                                    width: 100,
                                    height: 100,
                                }}
                            />
                        </XStack>
                    </Card>
                )}
                estimatedItemSize={20}
            />
        </View>
    );
}
