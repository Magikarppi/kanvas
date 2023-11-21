export interface NewUserBody {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
}

export interface LoginBody {
    email: string;
    password: string;
}

export interface UpdateUserBodyWithOutPassword {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    country: string;
    city: string;
    picture: string;
    is_open_to_work: boolean;
    linkedin_username: string;
    job_pitch: string;
}

export interface UpdatePassWordBody {
    id: string;
    password: string;
}
