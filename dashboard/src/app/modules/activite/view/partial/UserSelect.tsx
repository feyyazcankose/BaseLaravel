import React from "react";
import { Chip, Select, Selection, SelectItem } from "@nextui-org/react";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { useUserList } from "./UserList";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSearchParams } from "react-router-dom";
import { ISelectedUser } from "../../core/models/activite.interface";

export default function UserSelect() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedUsers, setSelectedUsers] = React.useState<ISelectedUser[]>(
        []
    );
    const [searchParams, setSearchParams] = useSearchParams();

    const { items, hasMore, isLoading, onLoadMore } = useUserList({
        fetchDelay: 1500,
    });

    const [, scrollerRef] = useInfiniteScroll({
        hasMore,
        isEnabled: isOpen,
        shouldUseLoader: false,
        onLoadMore,
    });

    // Update selectedUsers based on URL query params
    React.useEffect(() => {
        const userParam = searchParams.get("users");
        if (userParam) {
            try {
                const userArray = JSON.parse(userParam) as ISelectedUser[];
                setSelectedUsers(userArray);
            } catch (error) {
                console.error("Failed to parse users from query params", error);
            }
        }
    }, [searchParams, items]);

    // Update URL query params
    const updateQueryParams = (users: ISelectedUser[]) => {
        const userString = JSON.stringify(users);
        setSearchParams({
            users: userString,
            types: searchParams?.get("types") ?? "",
        });
    };

    // Handle selection change
    const handleSelectionChange = (selection: Selection) => {
        const selectedKeys = Array.isArray(selection)
            ? selection
            : Array.from(selection);

        const updatedSelectedUsers = items
            .filter((item) => selectedKeys.includes(String(item.id)))
            .map((item) => ({
                id: item.id,
                name: item.name,
                surname: item.surname,
            }));

        setSelectedUsers(updatedSelectedUsers);
        updateQueryParams(updatedSelectedUsers); // Update URL query params here
    };

    // Handle chip close
    const handleChipClose = (id: number) => {
        setSelectedUsers((prev) => {
            const updated = prev.filter((user) => user.id !== id);
            updateQueryParams(updated); // Update URL query params here
            return updated;
        });
    };

    return (
        <Select
            isLoading={isLoading}
            isMultiline
            items={items}
            scrollRef={scrollerRef}
            onOpenChange={setIsOpen}
            selectedKeys={selectedUsers.map((item) => String(item.id))}
            variant="bordered"
            selectionMode="multiple"
            label="Kullanıcılar"
            labelPlacement="outside-left"
            placeholder=""
            className="w-full"
            color="primary"
            size="md"
            fullWidth
            classNames={{
                base: "w-full flex-col gap-2",
                label: "text-gray-500",
                innerWrapper: "p-2",
            }}
            onSelectionChange={handleSelectionChange} // Update selection here
            renderValue={() => {
                return (
                    <div className="flex flex-wrap gap-2">
                        {selectedUsers.map((item) => {
                            return (
                                <Chip
                                    size="sm"
                                    color="primary"
                                    className="bg-green-100 text-black border border-primary-500"
                                    key={item.id}
                                    onClose={() => handleChipClose(item.id)}
                                    endContent={
                                        <Icon
                                            className="cursor-pointer"
                                            icon="eva:close-fill"
                                        />
                                    }
                                    radius="sm"
                                    classNames={{
                                        closeButton: " ",
                                    }}
                                >
                                    {item?.name} {item?.surname}
                                </Chip>
                            );
                        })}
                    </div>
                );
            }}
        >
            {(item) => (
                <SelectItem
                    key={item.id}
                    className="capitalize "
                    isSelected={selectedUsers.some(({ id }) => id === item.id)}
                >
                    {item.name} {item?.surname}
                </SelectItem>
            )}
        </Select>
    );
}
