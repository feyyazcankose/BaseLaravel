import React from "react";
import { INotificationResponseP } from "../core/models/notification.interface";
import { useSearchParams } from "react-router-dom";
import { fetchNotifications } from "../core/api/notification.request";
import InfiniteScroll from "react-infinite-scroll-component";
import NotificationItem from "./partials/NotificationItem";
import clsx from "clsx";
import { PageableResponseModel } from "@app/core/models/app.interfaces";
import { Button, Card, CardBody, CardHeader, Spinner } from "@nextui-org/react";

const NotificationList = () => {
    const [notificationsResponse, setNotificationsResponse] = React.useState<
        PageableResponseModel<INotificationResponseP> | undefined
    >();
    const [hasMore, setHasMore] = React.useState<boolean>(true);
    const [searchParams, setSearchParams] = useSearchParams();

    const [skip, setSkip] = React.useState<number>(
        parseInt(searchParams.get("skip") ?? "1")
    );

    const status = searchParams.get("status") ?? "is_not_readed";

    React.useEffect(() => {
        fetchMoreNotifications();
    }, [status]);

    function fetchMoreNotifications() {
        fetchNotifications({
            skip: skip,
            take: 10,
            status: status,
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

    const handleStatusChange = (newStatus: string) => {
        setSearchParams({ status: newStatus });
        setNotificationsResponse(undefined);
        setSkip(1);
        setHasMore(true);
    };

    return (
        <Card>
            <CardHeader className="flex flex-col items-center sm:items-start gap-5 w-full">
                <h3 className="font-bold text-lg sm:text-xl text-gray-800 dark:text-gray-200">
                    Bildirimler
                </h3>
                <div className="inline-flex items-center justify-center rounded-lg gap-3 sm:gap-0 flex-wrap shadow-none sm:shadow-sm mb-2">
                    <Button
                        onClick={() => {
                            handleStatusChange("is_not_readed");
                        }}
                        type="button"
                        className={clsx(
                            "py-2 min-w-[180px] px-3 inline-flex rounded-r-lg sm:rounded-r-none justify-center items-center gap-2 -ms-px first:rounded-s-lg  first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border disabled:opacity-50 disabled:pointer-events-none",
                            {
                                "border-primary-200 bg-white dark:bg-content2 dark:border-gray-800 text-primary-800 shadow-sm hover:bg-primary-50":
                                    status === "readed",
                                "border-primary-700 bg-primary-700 text-white":
                                    status === "is_not_readed",
                            }
                        )}
                    >
                        Okunmamış Bildirimler
                    </Button>
                    <Button
                        onClick={() => {
                            handleStatusChange("readed");
                        }}
                        type="button"
                        className={clsx(
                            "py-2 min-w-[180px] px-3 inline-flex rounded-l-lg  sm:rounded-l-none justify-center items-center gap-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border disabled:opacity-50 disabled:pointer-events-none",
                            {
                                "border-primary-200 bg-white dark:bg-content2 dark:border-gray-800 text-primary-800 shadow-sm hover:bg-primary-50":
                                    status === "is_not_readed",
                                "border-primary-700 bg-primary-700 text-white":
                                    status === "readed",
                            }
                        )}
                    >
                        Okunmuş Bildirimler
                    </Button>
                </div>
            </CardHeader>
            <CardBody>
                <InfiniteScroll
                    scrollThreshold={0.9}
                    dataLength={notificationsResponse?.items.length ?? 0}
                    next={fetchMoreNotifications}
                    hasMore={hasMore}
                    loader={<Spinner color="primary" />}
                    endMessage={
                        <p className="text-center text-gray-500 text-sm my-1">
                            {notificationsResponse?.items.length
                                ? "Tüm bildirimler yüklendi."
                                : "Bildirim bulunamadı."}
                        </p>
                    }
                >
                    {notificationsResponse?.items.map((notification, index) => (
                        <NotificationItem
                            key={index}
                            notification={notification}
                        />
                    ))}
                </InfiniteScroll>
            </CardBody>
        </Card>
    );
};

export default NotificationList;
