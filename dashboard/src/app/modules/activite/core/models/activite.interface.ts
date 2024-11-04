export interface IActiviteResponseP {
    id: number;
    type: string;
    user: IActiviteResponseUser;
    project_id: null;
    description: null;
    created_at: string;
    updated_at: string;
}

export interface IActiviteResponseUser {
    id: number;
    name: string;
    image: string;
    role: number;
    surname: string;
}

export interface ISelectedUser {
    id: number;
    name: string;
    surname: string;
}
