import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
    INotificationCountResponse,
    INotificationResponseP,
} from "../core/models/notification.interface";
import {
    fetchNotificationCount,
    fetchNotifications,
} from "../core/api/notification.request";
import { PageableResponseModel } from "@app/core/models/app.interfaces";
import {
    Badge,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@nextui-org/react";
import NotificationPopupList from "@app/modules/notification/partials/NotificationPopupList";
const NotificationPopup = () => {
    const [notificationCountResponse, setNotificationCountResponse] = useState<
        INotificationCountResponse | undefined
    >();

    React.useEffect(() => {
        getNotificationCount();
    }, []);

    async function getNotificationCount() {
        fetchNotificationCount()
            .then((res) => {
                setNotificationCountResponse(res);
            })
            .catch(() => {
                console.log("Error");
            });
    }

    const [notificationsResponse, setNotificationsResponse] = React.useState<
        PageableResponseModel<INotificationResponseP> | undefined
    >();
    const [hasMore, setHasMore] = React.useState<boolean>(true);
    const [searchParams] = useSearchParams();

    const [skip, setSkip] = React.useState<number>(
        parseInt(searchParams.get("skip") ?? "1")
    );

    React.useEffect(() => {
        fetchMoreNotifications();
    }, []);

    async function fetchMoreNotifications() {
        fetchNotifications({
            skip: skip,
            take: 8,
            status: "is_not_readed",
        }).then((res) => {
            if (res.meta.currentPage < res.meta.totalPages) {
                setSkip(res.meta.currentPage + 1);
                setHasMore(res.meta.currentPage < res.meta.totalPages);
            } else {
                setHasMore(false);
            }
            const newItems = [
                ...(notificationsResponse?.items ?? []),
                ...res.items,
            ];
            setNotificationsResponse({ ...res, items: newItems });
        });
    }

    React.useEffect(() => {
        console.log(hasMore);
    }, [hasMore]);

    return (
        <Popover placement="bottom" backdrop="blur">
            <PopoverTrigger>
                <div>
                    <Badge
                        size="sm"
                        variant="solid"
                        color="danger"
                        content={notificationCountResponse?.data.not_read}
                        placement="top-left"
                        className="mr-2 cursor-pointer"
                    >
                        <Icon
                            icon="bi:bell-fill"
                            width="1.2rem"
                            height="1.2rem"
                            className="text-gray-400 cursor-pointer"
                        />
                    </Badge>
                </div>
            </PopoverTrigger>
            <PopoverContent className="max-w-[300px] min-w-[300px] p-0">
                <NotificationPopupList
                    getNotificationCount={getNotificationCount}
                ></NotificationPopupList>
            </PopoverContent>
        </Popover>
    );
};

export default NotificationPopup;
