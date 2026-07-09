import { flagNames } from "./utils.tsx";
const baseUrl = import.meta.env.BASE_URL;

export default function FlagIcon({ code }: { code: string }) {
  const icon = flagNames.includes(code.slice(0, 2)) ? (
    <img
      src={`${baseUrl}flags/${code.slice(0, 2)}.webp`}
      alt=""
      className="currency-icon"
    />
  ) : (
    <span className="currency-icon globe-icon">&#127760;</span>
  );
  return icon;
}
