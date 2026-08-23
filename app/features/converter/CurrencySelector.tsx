import { Autocomplete, useFilter } from "react-aria-components/Autocomplete";
import { Select, SelectValue } from "react-aria-components/Select";
import { Popover } from "react-aria-components/Popover";
import { Button } from "react-aria-components/Button";
import {
  Header,
  ListBoxSection,
  ListBoxItem as SelectItem,
  ListBox as SelectListBox,
} from "react-aria-components/ListBox";
import { type Key } from "react-aria-components";
import { type RefObject } from "react";
import { useLoaderData } from "react-router";

import type { dataItem } from "../../lib/api/api.ts";
import { SearchField } from "../../components/SearchField.tsx";
import { ChevronDown, Check } from "../../components/icons.tsx";
import FlagIcon from "../../components/FlagIcon.tsx";
import "./CurrencySelector.css";

const POPULAR = ["usd", "eur", "gbp"];

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
  const currencies = Object.values(data.currencies) as dataItem[];
  const codeString = String(value);
  const popularItems = [];
  const otherItems = [];
  for (let i = 0; i < currencies!.length; i++) {
    const code = currencies![i].iso_code.toLowerCase();
    const isSelected = code === codeString;
    if (disabled.includes(code)) continue;
    const item = (
      <CurrencyOption
        key={code}
        code={code}
        name={currencies![i].name}
        isSelected={isSelected}
      />
    );
    if (POPULAR.includes(code)) {
      popularItems.push(item);
    } else {
      otherItems.push(item);
    }
  }

  return (
    <Select
      aria-label="Select currency"
      value={value}
      onChange={onChange}
      className="currency-selector"
    >
      <Button>
        <SelectValue className="currency-selector__select-value">
          <FlagIcon code={codeString} />
          <span className="currency-selector__currency-symbol">
            {codeString}
          </span>
        </SelectValue>
        <ChevronDown />
      </Button>
      <Popover
        triggerRef={triggerRef}
        className="currency-selector__popover"
        placement="bottom right"
      >
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

function CurrencyOption({
  code,
  name,
  isSelected = false,
}: {
  code: string;
  name: string;
  isSelected?: boolean;
}) {
  const textValue = `${code.toUpperCase()}: ${name}`;

  return (
    <SelectItem
      id={code}
      textValue={textValue}
      className="currency-selector__currency-item"
    >
      <FlagIcon code={code} />
      <span className="currency-selector__currency-symbol ">{code}</span>
      <span className="currency-selector__currency-name">{name}</span>
      {isSelected && <Check />}
    </SelectItem>
  );
}
