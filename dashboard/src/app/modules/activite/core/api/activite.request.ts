import { FetchListParams } from "@base/enums/api.interface";
import api from "@base/helpers/enhencers/Interceptor";
import { IActiviteResponseP } from "../models/activite.interface";
import { PageableResponseModel } from "@app/core/models/app.interfaces";

const API_URL = import.meta.env.VITE_API_URL;
const PREFIX = "activite";

// Get Pageable Activities
export function fetchActivities(
    { skip, take, sort }: FetchListParams,
    userIds: number[],
    types: string[]
): Promise<PageableResponseModel<IActiviteResponseP>> {
    return api.get(`${API_URL}/api/backoffice/${PREFIX}`, {
        params: {
            skip,
            take,
            sort,
            user_ids: JSON.stringify(userIds),
            types: JSON.stringify(types),
        },
    });
}
