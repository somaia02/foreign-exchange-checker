"use client";
import {
  Select as AriaSelect,
  type SelectProps as AriaSelectProps,
  SelectValue,
} from "react-aria-components/Select";
import { Button } from "react-aria-components/Button";
import {
  ListBoxItem as SelectItem,
  ListBox as SelectListBox,
} from "react-aria-components/ListBox";
import { DownArrow } from "./icons.tsx";
import { Popover } from "react-aria-components/Popover";
export interface SelectProps<T, M extends "single" | "multiple"> extends Omit<
  AriaSelectProps<T, M>,
  "children"
> {
  items?: Iterable<T>;
  children: React.ReactNode | ((item: T) => React.ReactNode);
}

export function Select<T, M extends "single" | "multiple" = "single">({
  children,
  items,
  ...props
}: SelectProps<T, M>) {
  return (
    <AriaSelect {...props}>
      <Button>
        <SelectValue />
        <DownArrow />
      </Button>
      <Popover className={`${props.className}-popover`}>
        <SelectListBox items={items}>{children}</SelectListBox>
      </Popover>
    </AriaSelect>
  );
}

export { SelectItem };
