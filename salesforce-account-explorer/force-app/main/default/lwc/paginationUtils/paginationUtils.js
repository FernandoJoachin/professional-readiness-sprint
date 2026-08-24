/**
 * Pagination helpers shared by components that page over in-memory lists.
 */

export function getTotalPages(totalItems, pageSize) {
    if (!pageSize || pageSize <= 0) {
        return 1;
    }
    return Math.max(1, Math.ceil(totalItems / pageSize));
}

export function getPageSlice(items, currentPage, pageSize) {
    const list = items || [];
    const start = (currentPage - 1) * pageSize;
    return list.slice(start, start + pageSize);
}
