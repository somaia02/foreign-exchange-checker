import { type Key } from "react-aria-components";
import { createContext } from "react";

interface Currencies {
  sendCurrency: Key | null;
  receiveCurrency: Key | null;
  setSendCurrency: (c: Key | null) => void;
  setReceiveCurrency: (c: Key | null) => void;
  sendValue: number;
  setSendValue: (v: number) => void;
}
export const CurrencyContext = createContext<Currencies | null>(null);
