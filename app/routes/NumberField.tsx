import {
  Input,
  NumberField as AriaNumberField,
  type NumberFieldProps as AriaNumberFieldProps,
} from "react-aria-components/NumberField";

export interface NumberFieldProps extends AriaNumberFieldProps {
  placeholder?: string;
}

export function NumberField({ ...props }: NumberFieldProps) {
  return (
    <AriaNumberField {...props}>
      <Input className="react-aria-Input" />
    </AriaNumberField>
  );
}
