export interface PaginationRes<T> {
  count: number;
  total_pages: number;
  next: null | string;
  previous: null | string;
  current_page: number;
  results: T[];
}

export interface ProfileRes {
  username: string;
  first_name?: string;
  last_name?: string;
  avatar?: string;
}

export interface AuthRes {
  token: string;
}

interface TweetRes {
  id: number;
  has_edit_permission: boolean;
  created_at: string;
  text: string;
  author: {
    username: string;
    first_name: string;
    last_name: string;
    avatar: string;
  };
}

export type TweetsRes = PaginationRes<TweetRes>;
