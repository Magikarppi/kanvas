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

export type DAO<T> = {
  createNewUser(item: T): void;
  getUserById(id: string): Promise<T | null>;
  getUserByEmail(email: string): Promise<T | null>;
  update(id: string, user: T): void;
  delete(id: string): void;
}
