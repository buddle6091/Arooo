export interface InContent {
  id: string;
  title: string;
  likes: number;
}

export interface InDetail extends InContent {
  content: string;
}

export interface InRouter {
  detail: string | null;
}
