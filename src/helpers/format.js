export function firstLetterToUppercase(string) {
  return string.replace(/\b\w/g, (c) => c.toUpperCase())
}
