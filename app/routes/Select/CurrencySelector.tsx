import { Autocomplete, useFilter } from "react-aria-components/Autocomplete";
import { Select, SelectValue } from "react-aria-components/Select";
import { type Key } from "react-aria-components";
import { Header, ListBoxSection } from "./ListBox.tsx";
import { Button } from "./Button";
import { SelectListBox, SelectItem } from "./Select";
import { Popover } from "./Popover";
import { SearchField } from "./SearchField";
import { ChevronDown } from "./icons.tsx";
import { type RefObject } from "react";
import { flagNames } from "../utils.tsx";
import { useLoaderData } from "react-router";
import "./CurrencySelector.css";

const baseUrl = import.meta.env.BASE_URL;
const POPULAR = ["USD", "EUR", "GBP"];

interface CurrencySelectorProps {
  triggerRef: RefObject<Element | null>;
  value: Key | null;
  onChange: (c: Key | null) => void;
  disabled?: string[];
}

export default function CurrencySelector({
  triggerRef,
  value,
  onChange,
  disabled = [],
}: CurrencySelectorProps) {
  const { contains } = useFilter({ sensitivity: "base" });
  const data = useLoaderData();
  const currencies = data.currencies;
  const codeString = String(value);
  const popularItems = [];
  const otherItems = [];
  for (let i = 0; i < currencies!.length; i++) {
    const code = currencies![i].iso_code;
    if (disabled.includes(code.toLowerCase())) continue;
    const item = (
      <CurrencyOption key={code} code={code} name={currencies![i].name} />
    );
    if (POPULAR.includes(code)) {
      popularItems.push(item);
    } else {
      otherItems.push(item);
    }
  }

  return (
    <Select aria-label="Select currency" value={value} onChange={onChange}>
      <Button>
        <SelectValue className="currency-selector__select-value">
          <FlagIcon code={codeString} />
          <span className="currency-selector__currency-symbol">
            {codeString}
          </span>
        </SelectValue>
        <ChevronDown />
      </Button>
      <Popover hideArrow triggerRef={triggerRef}>
        <Autocomplete filter={contains}>
          <SearchField
            aria-label="Search currencies"
            placeholder="Search currencies..."
            autoFocus
          />
          <SelectListBox>
            <ListBoxSection>
              <Header className="currency-selector__section-header">
                <span>Popular</span>
                <span>{popularItems.length}</span>
              </Header>
              {popularItems}
            </ListBoxSection>

            <ListBoxSection>
              <Header className="currency-selector__section-header">
                <span>Other Currencies</span>
                <span>{otherItems.length}</span>
              </Header>
              {otherItems}
            </ListBoxSection>
          </SelectListBox>
        </Autocomplete>
      </Popover>
    </Select>
  );
}

function CurrencyOption({ code, name }: { code: string; name: string }) {
  const textValue = `${code}: ${name}`;

  return (
    <SelectItem id={code.toLocaleLowerCase()} textValue={textValue}>
      <FlagIcon code={code} />
      <span className="currency-selector__currency-symbol ">{code}</span>
      <span className="currency-selector__currency-name">{name}</span>
    </SelectItem>
  );
}

function FlagIcon({ code }: { code: string }) {
  const icon = flagNames.includes(code.toLowerCase().slice(0, 2)) ? (
    <img
      src={`${baseUrl}flags/${code.toLowerCase().slice(0, 2)}.webp`}
      alt=""
      width="20"
      height="20"
      className="currency-icon"
    />
  ) : (
    <span className="currency-icon globe-icon">&#127760;</span>
  );
  return icon;
}
