export interface InContent {
  id: string;
  title: string;
  likes: number;
}

export interface InFiContent extends InContent {
  lists: InFiContent[];
  currentPage: number;
  limit: number;
  nextPage?: number;
  lastPage?: boolean;
  isLast?: boolean;
  fetchNextPage: boolean;
  isSuccess: boolean;
  hasNextPage: boolean;
  refetch: boolean;
}

export interface InDetail extends InContent {
  content: string;
}

export interface InRouter {
  detail: string | null;
}
