export interface INotificationResponseP {
    id: number;
    title: string;
    content: string;
    is_readed: boolean;
    created_at: string;
    updated_at: string;
}

export interface INotificationCountResponse {
    data: INotificationCountResponseData;
}

export interface INotificationCountResponseData {
    all: number;
    not_read: number;
    read: number;
}
