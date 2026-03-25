import { useEffect, useState } from "react"
import type { Branch } from "../types/branch"

export const useOrganizationSearch = (branches: Branch[]) => {
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [suggestions, setSuggestions] = useState<Branch[]>([])
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null)

  // debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
    }, 250)

    return () => clearTimeout(timer)
  }, [search])

  // фильтр
  useEffect(() => {
    if (!debouncedSearch) {
      setSuggestions([])
      return
    }

    const filtered = branches.filter((b) =>
      b.address.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      b.org_short_name.toLowerCase().includes(debouncedSearch.toLowerCase())
    )

    setSuggestions(filtered)
  }, [debouncedSearch, branches])

  const selectBranch = (branch: Branch) => {
    setSelectedBranch(branch)
    setSearch(branch.address)
    setSuggestions([])
  }

  return {
    search,
    setSearch,
    suggestions,
    selectedBranch,
    setSelectedBranch,
    selectBranch,
  }
}