import { InputHTMLAttributes } from "react";
import { FormInputLabel, Input, Group } from "./form-input.styles";

export type FormInputProps = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

function FormInput({ label, ...inputOptions }: FormInputProps) {
  return (
    <Group>
      <Input {...inputOptions} />
      <FormInputLabel
        shrink={Boolean(
          inputOptions.value &&
            typeof inputOptions.value === "string" &&
            inputOptions.value.length
        )}
      >
        {label}
      </FormInputLabel>
    </Group>
  );
}

export default FormInput;
