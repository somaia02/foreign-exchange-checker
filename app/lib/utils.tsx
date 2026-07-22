export function getError(error: unknown, key: "message" | "name") {
  if (error instanceof Error) return error[key];
  return String(error);
}
export function getErrorName(error: unknown) {
  if (error instanceof Error) return error.name;
  return "";
}

export function displayFormat(val: string | number) {
  if (val == "") return val;
  else {
    const dot = typeof val === "string" && val.at(-1) == "." ? "." : "";
    return (
      Intl.NumberFormat("en-US", { maximumFractionDigits: 3 }).format(
        Number(val),
      ) + dot
    );
  }
}

export const flagNames = [
  "ae",
  "ar",
  "au",
  "bd",
  "bg",
  "bh",
  "br",
  "ca",
  "ch",
  "cl",
  "cn",
  "co",
  "cy",
  "cz",
  "dk",
  "eg",
  "eu",
  "gb",
  "hk",
  "hm",
  "hn",
  "hr",
  "ht",
  "hu",
  "id",
  "in",
  "is",
  "jo",
  "jp",
  "ke",
  "kr",
  "kw",
  "lb",
  "lc",
  "lk",
  "ma",
  "mx",
  "my",
  "ng",
  "no",
  "np",
  "nz",
  "om",
  "pe",
  "ph",
  "pk",
  "pl",
  "qa",
  "ro",
  "ru",
  "sa",
  "se",
  "sg",
  "th",
  "tr",
  "tw",
  "ua",
  "us",
  "vn",
  "za",
];
