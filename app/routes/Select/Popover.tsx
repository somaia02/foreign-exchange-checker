"use client";
import {
  Popover as AriaPopover,
  type PopoverProps as AriaPopoverProps,
} from "react-aria-components/Popover";
import clsx from "clsx";
import "./Popover.css";

export interface PopoverProps extends Omit<AriaPopoverProps, "children"> {
  children: React.ReactNode;
}

export function Popover({ children, ...props }: PopoverProps) {
  return (
    <AriaPopover
      {...props}
      className={clsx("react-aria-Popover", props.className)}
      placement="bottom right"
      maxHeight={500}
    >
      {children}
    </AriaPopover>
  );
}
