import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect } from "react";
import moment from "@base/helpers/enhencers/Moment";
import { INotificationResponseP } from "../core/models/notification.interface";
import { readSingleNotification } from "../core/api/notification.request";
import clsx from "clsx";

type NotificationPopupItemProps = {
    notification: INotificationResponseP;
    callback: () => void;
};
const NotificationPopupListItem: React.FC<NotificationPopupItemProps> = ({
    notification,
    callback,
}) => {
    const [collapsed, setCollapsed] = React.useState<boolean>(true);
    const [isReadCalled, setIsReadCalled] = React.useState<boolean>(false);
    useEffect(() => {
        if (!isReadCalled && !collapsed && notification.is_readed === false) {
            readSingleNotification(notification.id).then(() => {
                setIsReadCalled(true);
                callback();
            });
        }
    }, [collapsed, notification.id]);

    return (
        <div>
            <div
                className={clsx(
                    "flex px-4 py-3 bg-gray-50 dark:bg-content1 hover:bg-gray-50 relative cursor-pointer",
                    {
                        "bg-white hover:bg-white": isReadCalled,
                    }
                )}
                onClick={() => setCollapsed((prev) => !prev)}
            >
                <div className="flex-shrink-0">
                    <span className="w-8 h-8 flex items-center justify-center bg-primary-100 text-primary-500 rounded-full">
                        <Icon icon="iconamoon:notification" />
                    </span>
                </div>
                <div className="w-full ps-3">
                    <div className="text-gray-500 text-sm mb-1.5 ">
                        <span className="font-semibold text-gray-900 dark:text-gray-400 ">
                            {notification.title}
                        </span>
                    </div>
                    <div className="text-xs text-primary-600 dark:text-gray-500 ">
                        {moment(notification.created_at).fromNow()}
                    </div>
                </div>
            </div>
            <div
                className={clsx(
                    " bg-white dark:bg-content1 transition-all duration-300"
                )}
            >
                {collapsed ? null : (
                    <p className="mx-4 my-2.5 text-sm text-gray-600 dark:text-gray-300 ">
                        {notification.content}
                    </p>
                )}
            </div>
        </div>
    );
};

export default NotificationPopupListItem;
