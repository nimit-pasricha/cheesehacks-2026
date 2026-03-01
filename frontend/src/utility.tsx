import type { GeoLocation } from "./types";

export function jcn(...classNames: (string | undefined)[]): string {
  return classNames.filter((x) => x).join(" ");
}

export function locationToUrl(loc: GeoLocation): string {
  return `https://www.google.com/maps/search/?api=1&query=${loc.latitude},${loc.longitude}`;
}

export function asCurrency(value: number): string {
  const currencyFormatter = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return currencyFormatter.format(value);
}
