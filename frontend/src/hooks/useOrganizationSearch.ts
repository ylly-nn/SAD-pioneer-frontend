import { useEffect, useState } from "react";
import type { Branch } from "../types/branch";

export const useOrganizationSearch = (branches: Branch[], search: string) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const normalize = (s: string) => s.toLowerCase().replace(/\s+/g, "");

  useEffect(() => {
    const value = normalize(search);

    if (!value) {
      setSuggestions([]);
      return;
    }

    const starts: string[] = [];
    const includes: string[] = [];

    for (const b of branches) {
      const addr = normalize(b.address);

      if (addr.startsWith(value)) {
        starts.push(b.address);
      } else if (addr.includes(value)) {
        includes.push(b.address);
      }
    }

    const unique = Array.from(new Set([...starts, ...includes]));
    setSuggestions(unique);
  }, [search, branches]);

  return suggestions;
};
