import api from "@base/helpers/enhencers/Interceptor";
import {
    IDashboardCardResponse,
    // IDashobardSummaryCardsResponse,
} from "../models/dashboard.interfaces";
import { SUMMARY_METHOD } from "../models/dashboard.enum";

const API_URL = import.meta.env.VITE_API_URL;
const PREFIX = "summary";

// Get Dashboard Summary Cards
export function getDashboardSummaryCards(
    method: SUMMARY_METHOD
): Promise<IDashboardCardResponse> {
    return api.get(
        `${API_URL}/api/backoffice/${PREFIX}/cards?method=${method}`
    );
}

// Get Dashboard Summary
export function getDashboardSummary(
    method: SUMMARY_METHOD
): Promise<IDashboardCardResponse> {
    return api.get(`${API_URL}/api/backoffice/${PREFIX}?method=${method}`);
}
