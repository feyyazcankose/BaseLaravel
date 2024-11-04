import React, { useEffect } from "react";
import { INotificationResponseP } from "../../core/models/notification.interface";
import clsx from "clsx";
import { Icon } from "@iconify/react/dist/iconify.js";
import moment from "@base/helpers/enhencers/Moment";
import { readSingleNotification } from "../../core/api/notification.request";

const NotificationItem = ({
    notification,
}: {
    notification: INotificationResponseP;
}) => {
    const [collapsed, setCollapsed] = React.useState<boolean>(true);
    const [isReadCalled, setIsReadCalled] = React.useState<boolean>(false);
    useEffect(() => {
        if (!isReadCalled && !collapsed && notification.is_readed === false) {
            readSingleNotification(notification.id).then(() => {
                setIsReadCalled(true);
            });
        }
    }, [collapsed, notification.id]);

    return (
        <div className="mt-2 px-6 py-4 dark:bg-content2 bg-gray-50 rounded-lg shadow w-full">
            <div className="inline-flex items-center justify-between w-full">
                <h3 className="font-bold text-base text-gray-800 dark:text-gray-100">
                    {notification?.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-50">
                    {moment(notification?.created_at).fromNow()}
                </p>
            </div>
            <div>
                <div
                    onClick={() => setCollapsed((prev) => !prev)}
                    className={clsx(
                        "flex justify-between items-center text-sm text-gray-600 dark:text-gray-300 mt-2 bg-white p-2 rounded-lg shadow-sm dark:bg-content3",
                        {
                            "h-8 w-8 cursor-pointer": collapsed,
                            "h-auto w-full": !collapsed,
                        }
                    )}
                >
                    {collapsed ? null : (
                        <p className="text-sm text-gray-600 dark:text-gray-300 w-[95%] dark:text-gray-50">
                            {notification.content}
                        </p>
                    )}
                    <Icon
                        icon="mingcute:down-fill"
                        className={clsx(
                            "text-gray-600 dark:text-gray-300 cursor-pointer",
                            {
                                "rotate-90 w-[5%]": !collapsed,
                                "-rotate-90": collapsed,
                            }
                        )}
                    />
                </div>
            </div>
        </div>
    );
};

export default NotificationItem;
