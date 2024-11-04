export interface IFeedbackResponseP {
    id: number;
    message: string;
    star: number;
    user: User;
    created_at: string;
    updated_at: Date;
}

export interface User {
    id: number;
    name: string;
    image: string;
    surname: string;
    phone: string;
    phone_code: string;
    email: string;
    role: number;
    is_blocked: boolean;
    birthday: null;
    created_at: Date;
}
