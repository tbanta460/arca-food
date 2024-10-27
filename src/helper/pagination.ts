import { InfiniteData } from "react-query";

export interface Paginated<T> {
  data?: T;
  links?: {
    first?: null | string;
    last?: null | string;
    prev?: null | string;
    next?: null | string;
  };
  meta?: {
    current_page?: number | null;
    from?: number | null;
    path?: string | null;
    per_page?: number | null;
    to?: number | null;
  };
}

export function dataFromPaginated<T extends Array<any>>(
  paginationData?: InfiniteData<Paginated<T>>
): T | null {
  if (!paginationData) return null;
  // @ts-ignore
  return paginationData?.pages.reduce(
    (acc, group) => [...acc, ...group.data!],
    [] as T[]
  );
}

export const handlePaginationFetch = (lastQuery: Paginated<any>) => {
   // Error
   if (lastQuery === undefined) {
    return false;
  }

  const currentPage = lastQuery.meta!.current_page;

  if (!lastQuery.links!.next) return false;
  return currentPage! + 1;
};

export const standardExtraQueryParam = {
  getNextPageParam: handlePaginationFetch,
};
