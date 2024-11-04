export interface IDashboardCardResponse {
    data: IDashboardCardResponseData;
}

export interface IDashboardCardResponseData {
    total_projects: number;
    total_ongoing_projects: number;
    total_completed_projects: number;
    total_users: number;
    total_blocked_users: number;
    total_active_users: number;
    total_comapanies: number;
    total_feedbacks: number;
    total_tasks: number;
    total_questions: number;
    top_users: TopUser[];
}

export interface TopUser {
    id: number;
    name: string;
    email: string;
    image: string;
    surname: string;
    user_question_answers_count: number;
}

export interface IDashboarGraphResponse {
    uv: string;
    pv: string;
    uv_range?: string;
    pv_range?: string;
    items: IDashboarGraphItems[];
}
export interface IDashboarGraphItems {
    name: string;
    uv: number;
    pv: number;
}
