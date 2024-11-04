import { FetchListParams } from "@base/enums/api.interface";
import api from "@base/helpers/enhencers/Interceptor";
import { IFeedbackResponseP } from "../models/feedback.interface";
import { PageableResponseModel } from "@app/core/models/app.interfaces";

const API_URL = import.meta.env.VITE_API_URL;
const PREFIX = "feedback";

// Get Pageable Feedbacks
export function fetchFeedbacks({
    skip,
    take,
    sort,
    filter,
}: FetchListParams): Promise<PageableResponseModel<IFeedbackResponseP>> {
    return api.get(`${API_URL}/api/backoffice/${PREFIX}`, {
        params: {
            skip,
            take,
            sort,
            filter,
        },
    });
}

// Get Single Feedback
export function getFeedback(id: number): Promise<{ data: IFeedbackResponseP }> {
    return api.get(`${API_URL}/api/backoffice/${PREFIX}/${id}`);
}

// Delete Feedback
export function deleteFeedback(
    id: number
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
    return api.delete(`${API_URL}/api/backoffice/${PREFIX}/${id}`);
}
