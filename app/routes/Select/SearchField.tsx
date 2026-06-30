"use client";
import {
  Input,
  SearchField as AriaSearchField,
  type SearchFieldProps as AriaSearchFieldProps,
} from "react-aria-components/SearchField";
import { Search } from "./icons.tsx";
import "./SearchField.css";

export interface SearchFieldProps extends AriaSearchFieldProps {
  placeholder?: string;
}

export function SearchField({ placeholder, ...props }: SearchFieldProps) {
  return (
    <AriaSearchField {...props}>
      <Search />
      <Input placeholder={placeholder} className="react-aria-Input" />
    </AriaSearchField>
  );
}
