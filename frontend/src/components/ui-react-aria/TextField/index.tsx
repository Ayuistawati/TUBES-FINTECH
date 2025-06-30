import { forwardRef } from "react";
// 1. Import 'Input' directly from the 'react-aria-components' library
import {
  TextField as AriaTextField,
  Input,
  type TextFieldProps as AriaTextFieldProps,
  type ValidationResult,
} from "react-aria-components";
import { tv } from "tailwind-variants";

// We can still use your other custom components like Label and FieldError
import { Description, FieldError, Label, fieldBorderStyles } from "../Field";
import { ctrp, focusRing } from "../utils";

const inputStyles = tv({
  extend: focusRing,
  base: "w-full border-2 rounded-md px-2 py-1.5 text-base", // Added padding/sizing for usability
  variants: {
    isFocused: fieldBorderStyles.variants.isFocusWithin,
    ...fieldBorderStyles.variants,
  },
});

export interface TextFieldProps extends AriaTextFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, description, errorMessage, ...props }, ref) => {
    return (
      // The Controller's props (value, onChange, etc.) are passed to this component
      <AriaTextField {...props} className={ctrp(props.className, "flex flex-col gap-1")}>
        {label && <Label>{label}</Label>}

        {/* 2. This is the official Input from react-aria-components. */}
        {/* It will now correctly receive the value and onChange events. */}
        <Input ref={ref} className={inputStyles} />

        {description && <Description>{description}</Description>}
        {errorMessage && <FieldError>{errorMessage}</FieldError>}
      </AriaTextField>
    );
  }
);