export interface ProfileRes {
  username: string;
  first_name?: string;
  last_name?: string;
  avatar?: string;
}

export interface AuthRes {
  token: string;
}
