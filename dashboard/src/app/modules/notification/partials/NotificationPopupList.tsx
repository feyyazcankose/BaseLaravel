import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { INotificationResponseP } from "../core/models/notification.interface";
import { fetchNotifications } from "../core/api/notification.request";
import InfiniteScroll from "react-infinite-scroll-component";
import NotificationPopupListItem from "./NotificationPopupListItem";
import { PageableResponseModel } from "@app/core/models/app.interfaces";
import { Spinner } from "@nextui-org/react";
const NotificationPopupList = ({
    getNotificationCount,
}: {
    getNotificationCount: () => Promise<void>;
}) => {
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
            take: 10,
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

    return (
        <div className="w-full">
            <div className="block px-4 py-2 font-medium text-center text-gray-700 dark:text-gray-400 dark:bg-content2 rounded-t-lg bg-gray-50 ">
                Okunmamış Bildirimler
            </div>
            <div
                id="notificationDropdown"
                className="divide-y dark:divide-y-0  divide-gray-100 bg-white dark:bg-content1 h-96 overflow-y-auto fancy-scrollbar"
            >
                <InfiniteScroll
                    scrollableTarget="notificationDropdown"
                    scrollThreshold={0.9}
                    dataLength={notificationsResponse?.items.length ?? 0}
                    next={fetchMoreNotifications}
                    hasMore={hasMore}
                    loader={<Spinner color="primary" size="sm" />}
                    endMessage={
                        <p className="text-center text-gray-500 bg-gray-50 dark:bg-content1 text-sm py-2">
                            {notificationsResponse?.items.length
                                ? "Başka okunmamış bildirimin yok"
                                : "Bildirim bulunamadı."}
                        </p>
                    }
                >
                    {notificationsResponse?.items?.map(
                        (notification, index) => (
                            <NotificationPopupListItem
                                key={index}
                                notification={notification}
                                callback={async () => {
                                    await getNotificationCount();
                                }}
                            />
                        )
                    )}
                </InfiniteScroll>
            </div>
            <Link
                to="/bildirimler"
                className="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg dark:bg-content2 dark:text-gray-400 bg-gray-50 hover:bg-gray-100  "
            >
                <div className="inline-flex items-center ">
                    <svg
                        className="w-4 h-4 me-2 text-gray-500  "
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 14"
                    >
                        <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                    </svg>
                    Tüm bildirimleri gör
                </div>
            </Link>
        </div>
    );
};

export default NotificationPopupList;
