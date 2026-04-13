import { useMemo } from "react";
import { useSearch } from "./useSearch";

type SortDirection = "asc" | "desc";

interface UseOrderFiltersProps<T> {
  orders: T[];
  searchQuery: string;
  selectedStatus: string;
  selectedBranch?: string;

  mapOrderToSearchStrings: (order: T) => string[];
  getStatus: (order: T) => string;
  getBranchKey?: (order: T) => string;

  getDate: (order: T) => string | Date;
  sortDirection?: SortDirection;
}

export const useOrderFilters = <T>({
  orders,
  searchQuery,
  selectedStatus,
  selectedBranch,
  mapOrderToSearchStrings,
  getStatus,
  getBranchKey,
  getDate,
  sortDirection = "desc",
}: UseOrderFiltersProps<T>) => {
  const searchedOrders = useSearch(
    orders,
    searchQuery,
    mapOrderToSearchStrings
  );

  return useMemo(() => {
    const filtered = searchedOrders.filter((order) => {
      const matchesStatus =
        selectedStatus === "all" || getStatus(order) === selectedStatus;

      const matchesBranch =
        !getBranchKey ||
        selectedBranch === "all" ||
        getBranchKey(order) === selectedBranch;

      return matchesStatus && matchesBranch;
    });

    const sorted = [...filtered].sort((a, b) => {
      const dateA = new Date(getDate(a)).getTime();
      const dateB = new Date(getDate(b)).getTime();

      return sortDirection === "asc"
        ? dateA - dateB
        : dateB - dateA;
    });

    return sorted;
  }, [
    searchedOrders,
    selectedStatus,
    selectedBranch,
    sortDirection,
  ]);
};