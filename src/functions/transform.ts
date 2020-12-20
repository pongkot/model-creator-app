export function toClassProperties(
  context: string
): Array<{ name: string; type: string }> {
  return encodeURI(context)
    .split("%0A")
    .map((i: string) => i.replace("%20", ""))
    .map((i: string) => i.split(":"))
    .map((i: Array<string>) => ({ name: i[0], type: i[1] }));
}

export function toClassName(context: string): string {
  const firstChar = context[0].toUpperCase();
  return `${firstChar}${context.substr(1)}`;
}
