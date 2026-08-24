import { useMemo, useState } from 'react';

interface UsePaginationResult<T> {
  currentPage: number;
  totalPages: number;
  pagedItems: T[];
  setCurrentPage: (page: number) => void;
  resetPage: () => void;
}

// Reusable pagination logic: clamps the current page and slices the items for any list.
export function usePagination<T>(items: T[], pageSize: number): UsePaginationResult<T> {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);

  const pagedItems = useMemo(
    () => items.slice((safePage - 1) * pageSize, safePage * pageSize),
    [items, safePage, pageSize],
  );

  return {
    currentPage: safePage,
    totalPages,
    pagedItems,
    setCurrentPage,
    resetPage: () => setCurrentPage(1),
  };
}
