import React from "react";
import { fetchUsers } from "../../../user/core/api/user.request";
import { IUserResponseP } from "../../../user/core/models/user.interface";
export type User = {
    name: string;
    url: string;
};

export type UseUserListProps = {
    /** Delay to wait before fetching more items */
    fetchDelay?: number;
};

export function useUserList({ fetchDelay = 0 }: UseUserListProps = {}) {
    const [items, setItems] = React.useState<IUserResponseP[]>([]);
    const [hasMore, setHasMore] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);
    const [offset, setOffset] = React.useState(1);
    const limit = 10; // Number of items per page, adjust as necessary

    const loadUser = async (currentOffset: number) => {
        try {
            setIsLoading(true);

            if (offset > 0) {
                // Delay to simulate network latency
                await new Promise((resolve) => setTimeout(resolve, fetchDelay));
            }

            const res = await fetchUsers({
                skip: currentOffset,
                take: limit,
            });

            if (!res.items.length) {
                throw new Error("Network response was not ok");
            }

            setHasMore(res.meta.totalPages !== currentOffset);
            // Append new results to existing ones
            setItems((prevItems) => [...prevItems, ...res.items]);
        } catch (error) {
            console.log(JSON.stringify(error));
        } finally {
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        loadUser(offset);
    }, []);

    const onLoadMore = () => {
        const newOffset = offset + 1;

        setOffset(newOffset);
        loadUser(newOffset);
    };

    return {
        items,
        hasMore,
        isLoading,
        onLoadMore,
    };
}
