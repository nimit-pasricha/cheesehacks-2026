export function jcn(...classNames: (string | undefined)[]) {
  return classNames.filter((x) => x).join(" ");
}
