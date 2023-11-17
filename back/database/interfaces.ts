export type IUser = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password_hash: string;
  phone_number: string;
  country: string;
  city: string;
  picture: string;
  account_creation_date: Date;
  is_online: boolean;
  last_online: Date;
  is_open_to_work: boolean;
  linkedin_username: string;
  job_pitch: string;
};