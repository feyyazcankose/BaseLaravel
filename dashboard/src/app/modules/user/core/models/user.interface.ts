export interface IUserResponseP {
    id: number;
    name: string;
    image: string;
    surname: string;
    phone: string;
    phone_code: string;
    email: string;
    role: number;
    is_blocked: boolean;
    birthday: Date;
    created_at: Date;
}

export interface IUserGetResponseP {
    data: {
        id: number;
        name: string;
        image: string;
        surname: string;
        phone: string;
        phone_code: string;
        email: string;
        role: number;
        is_blocked: boolean;
        birthday: Date;
        created_at: Date;
    };
}

export interface IUserCreateRequest {
    name: string;
    image: string;
    surname: string;
    phone: string;
    phone_code: string;
    email: string;
    role: number;
    birthday: string;
}

export interface IUserUpdateRequest {
    name: string;
    image: string;
    surname: string;
    phone: string;
    phone_code: string;
    email: string;
    role: number;
    is_blocked: boolean;
    birthday: string;
}

export interface IUserProjectResponseP {
    id: number;
    title: string;
    questions_count: number;
    questions_answer_count: number;
    conditions: string;
    description: string;
    cover: string;
    start_date: Date;
    end_date: Date;
    is_completed: boolean;
    created_at: Date;
    updated_at: Date;
    company: Company;
}

export interface Company {
    id: number;
    name: string;
}

export interface IUserDevice {
    id?: string;
    device_id?: string;
    device_token?: string;
    device_model?: string;
    os_type?: string;
    os_version?: string;
    app_version?: string;
    updated_at?: Date;
}

export interface IUserDetail {
    total_hours: number;
    total_projects: number;
    total_answer: number;
    total_completed_projects: number;
    rank: number;
    user: IUserGet;
}

export interface IUserGet {
    id: number;
    name: string;
    image: string;
    surname: string;
    phone: string;
    phone_code: string;
    email: string;
    role: number;
    is_blocked: boolean;
    is_notification: boolean;
    birthday: null;
    created_at: Date;
    devices?: Array<IUserDevice>;
}

export interface IUserNotification {
    id: number;
    title: string;
    content: string;
    is_readed: boolean;
    created_at: Date;
}

export interface IUserNotficationCreateRequest {
    user_id: number;
    title: string;
    content: string;
}
