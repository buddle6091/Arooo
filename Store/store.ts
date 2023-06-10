import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { InFiContent } from "@/Interface/content";

/* 백엔드에서 pagenation을 limit값을 증가시켜, 기존에 렌더링된 요소들을 요청하지 않음
즉, limit와 skip의 값의 증가 폭은 정비례 */
export const useGetContent = () => {
  const useData = async ({ limit = 10 }) => {
    const skip = limit - 10;
    const { data } = await axios.get<InFiContent>(
      `https://api.a.com/library/content?skip=${skip}&limit=${limit}`
    );

    console.log(data);

    return {
      lists: data,
      currentPage: limit + 10,
    };
  };

  const {
    data: listData,
    fetchNextPage,
    isSuccess,
    hasNextPage,
    refetch,
  } = useInfiniteQuery(["getList"], useData, {
    getNextPageParam: (lastPage) => {
      return lastPage.lists ? lastPage.currentPage + 1 : undefined;
    },
  });

  return { listData, fetchNextPage, isSuccess, hasNextPage, refetch };
};
