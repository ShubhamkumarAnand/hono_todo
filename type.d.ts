// Types of the objects

export interface userType {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  username: string;
  image_url: string;
}

export interface userUpdateType {
  first_name?: string;
  last_name?: string;
  password?: string;
  image_url?: string;
}
