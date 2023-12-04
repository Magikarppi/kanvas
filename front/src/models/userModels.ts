export interface INewUserBody {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface ILoginBody {
    email: string;
    password: string;
}

export interface IUpdateUserBodyWithoutPassword {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string | null;
    country: string | null;
    city: string | null;
    picture: string | null;
    isOpenToWork: boolean;
    linkedinUsername: string | null;
    jobPitch: string | null;
}

export interface IUpdatePasswordBody {
    id: string;
    oldPassword: string;
    newPassword: string;
    newPasswordConfirmation: string;
}
