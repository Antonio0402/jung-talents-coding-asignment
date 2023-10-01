export function pluralize(string: string, num: number) {
  return num === 1 ? `1 ${string}` : `${num} ${string}s`;
}