import { FetchListParams } from "@base/enums/api.interface";
import api from "@base/helpers/enhencers/Interceptor";
import {
    IUserCreateRequest,
    IUserDetail,
    IUserGetResponseP,
    IUserNotficationCreateRequest,
    IUserNotification,
    IUserProjectResponseP,
    IUserResponseP,
    IUserUpdateRequest,
} from "../models/user.interface";
import { PageableResponseModel } from "@app/core/models/app.interfaces";

const API_URL = import.meta.env.VITE_API_URL;
const PREFIX = "user";

// Get Pageable Users
export function fetchUsers({
    skip,
    take,
    sort,
    filter,
}: FetchListParams): Promise<PageableResponseModel<IUserResponseP>> {
    return api.get(`${API_URL}/api/backoffice/${PREFIX}`, {
        params: {
            skip,
            take,
            sort,
            filter,
        },
    });
}

// Add User
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function addUser(data: IUserCreateRequest): Promise<any> {
    return api.post(`${API_URL}/api/backoffice/${PREFIX}`, data);
}

// Get Single User
export function getUser(id: number): Promise<IUserGetResponseP> {
    return api.get(`${API_URL}/api/backoffice/${PREFIX}/${id}`);
}

// Get Detail Single User
export function getDetailUser(id: number): Promise<IUserDetail> {
    return api.get(`${API_URL}/api/backoffice/${PREFIX}/${id}/detail`);
}

// Get Detail Single User
export function changeStatus(id: number): Promise<IUserDetail> {
    return api.get(`${API_URL}/api/backoffice/${PREFIX}/${id}/status`);
}

// Update User
export function updateUser({
    id,
    data,
}: {
    id: number;
    data: IUserUpdateRequest;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
}): Promise<any> {
    return api.put(`${API_URL}/api/backoffice/${PREFIX}/${id}`, data);
}

// Delete User
export function deleteUser(
    id: number
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
    return api.delete(`${API_URL}/api/backoffice/${PREFIX}/${id}`);
}

// Get Pageable Projects
export function fetchUserProjects(
    { skip, take, sort, filter }: FetchListParams,
    id: number,
    type: "ongoing" | "completed"
): Promise<PageableResponseModel<IUserProjectResponseP>> {
    return api.get(`${API_URL}/api/backoffice/${PREFIX}/${id}/projects`, {
        params: {
            skip,
            take,
            sort,
            filter,
            type,
        },
    });
}

// Get Pageable Notifications
export function fetchUserNotifications(
    { skip, take, sort, filter }: FetchListParams,
    id: number
): Promise<PageableResponseModel<IUserNotification>> {
    return api.get(`${API_URL}/api/backoffice/${PREFIX}/${id}/notification`, {
        params: {
            skip,
            take,
            sort,
            filter,
        },
    });
}

// Add User
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function addNotification(
    data: IUserNotficationCreateRequest
): Promise<never> {
    return api.post(`${API_URL}/api/backoffice/notification`, data);
}
