/* eslint-disable @typescript-eslint/no-explicit-any */
import { FetchListParams } from "@base/enums/api.interface";
import api from "@base/helpers/enhencers/Interceptor";
import {
    INotificationCountResponse,
    INotificationResponseP,
} from "../models/notification.interface";
import { PageableResponseModel } from "@app/core/models/app.interfaces";
import { IFilterChain } from "@base/components/common/dynamo-table/types/dynamo-table.types";

const API_URL = import.meta.env.VITE_API_URL;
const PREFIX = "notification";

// Get Pageable Users
export function fetchNotifications({
    skip,
    take,
    sort,
    filter,
    status,
}: FetchListParams & { status: string }): Promise<
    PageableResponseModel<INotificationResponseP>
> {
    if (status === "is_not_readed") {
        const filterModel: IFilterChain = [
            {
                id: "is_readed",
                type: "SELECT",
                selecteds: [0],
                operation: "EQUAL",
            },
        ];

        filter = JSON.stringify(filterModel);
    } else if (status === "readed") {
        const filterModel: IFilterChain = [
            {
                id: "is_readed",
                type: "SELECT",
                selecteds: [1],
                operation: "EQUAL",
            },
        ];

        filter = JSON.stringify(filterModel);
    }

    return api.get(`${API_URL}/api/backoffice/${PREFIX}`, {
        params: {
            skip,
            take,
            sort,
            filter,
        },
    });
}

// Get Notification Count
export function fetchNotificationCount(): Promise<INotificationCountResponse> {
    return api.get(`${API_URL}/api/backoffice/${PREFIX}/count`);
}

// Get Single Notification
export function readSingleNotification(
    id: number
): Promise<INotificationResponseP> {
    return api.get(`${API_URL}/api/backoffice/${PREFIX}/${id}`);
}
