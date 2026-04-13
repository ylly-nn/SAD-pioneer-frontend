import { useMemo } from "react";

export const useSearch = <T>(
  items: T[],
  query: string,
  mapFields: (item: T) => string[]
) => {
  return useMemo(() => {
    if (!query.trim()) return items;

    const lowerQuery = query.toLowerCase();

    return items.filter((item) =>
      mapFields(item).some((field) =>
        field.toLowerCase().includes(lowerQuery)
      )
    );
  }, [items, query]);
};