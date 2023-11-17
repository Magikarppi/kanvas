export type IUser = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password_hash: string;
  phone_number: string | null;
  country: string | null;
  city: string | null;
  picture: string | null;
  account_creation_date: Date | null;
  is_online: boolean | null;
  last_online: Date | null;
  is_open_to_work: boolean | null;
  linkedin_username: string | null;
  job_pitch: string | null;
};

export type ITeam = {
  id: string;
  name: string;
  admin: string;
  is_public: string;
}