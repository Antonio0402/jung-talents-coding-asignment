import styled from "styled-components/macro";
import Input from "./Input";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren & {
  field: string;
  fieldName: string;
  type: string;
  labelText: string;
  checkboxValue?: string;
  display?: "flex" | "grid";
  placeholder?: string;
  pattern?: string;
  isRequired?: boolean;
};

const TextField = ({
  field,
  fieldName,
  type,
  labelText,
  checkboxValue,
  display,
  placeholder,
  pattern,
  isRequired,
  children,
}: Props) => {
  return (
    <Column display={display}>
      <label htmlFor={fieldName}>
        {labelText}
        {isRequired && <Required>*</Required>}
      </label>
      <Input
        id={fieldName}
        name={fieldName}
        type={type}
        initialValue={field}
        required={isRequired}
        placeholder={placeholder}
        pattern={pattern}
        checkboxValue={checkboxValue}
      />
      {children}
    </Column>
  );
};

export default TextField;

const Column = styled.div<{ display?: "flex" | "grid" }>`
  display: ${(props) => props.display || "grid"};
  align-items: center;
  gap: 0.5rem;

  & > label {
    order: ${(props) => props.display === "flex" && 1};
  }
`;

const Required = styled.small`
  color: var(--color-primary);
  font-size: 1rem;
`;
