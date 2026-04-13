export const extractCity = (input: string): string | null => {
  if (!input) return null

  const firstWord = input.trim().split(" ")[0]

  if (firstWord.length < 3) return null

  return firstWord
}

// подправить