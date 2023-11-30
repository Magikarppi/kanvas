export interface INewUserBody {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
}

export interface ILoginBody {
    email: string;
    password: string;
}

export interface IUpdateUserBodyWithoutPassword {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string | null;
    country: string | null;
    city: string | null;
    picture: string | null;
    is_open_to_work: boolean;
    linkedin_username: string | null;
    job_pitch: string | null;
}

export interface IUpdatePasswordBody {
    id: string;
    oldPassword: string;
    newPassword: string;
    newPasswordConfirmation: string;
}
