import { ChangeEvent, useState } from "react";
import styled from "styled-components/macro";
import { handleChange, useFormActions } from "../hooks/useFormField";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  initialValue?: string;
  checkboxValue?: string;
}

const Input = ({
  title,
  children,
  checkboxValue,
  initialValue,
  ...rest
}: Props) => {
  const [inputValue, setInputValue] = useState(checkboxValue || initialValue);
  const { setFormItems } = useFormActions();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.type !== "checkbox") setInputValue(e.target.value);
    handleChange(e, setFormItems);
  };

  return (
    <InputStyled
      checked={initialValue === inputValue}
      value={inputValue}
      onChange={onChange}
      checkboxvalue={checkboxValue}
      {...rest}
    >
      {title ?? children}
    </InputStyled>
  );
};

export default Input;

const InputStyled = styled.input.withConfig({
  shouldForwardProp: (prop) => !["customColor"].includes(prop),
})<{ checkboxvalue?: string }>`
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  min-width: ${(props) => (props.checkboxvalue ? "auto" : "248px")};
  border: 1px solid var(--color-gray-300);

  &:invalid {
    outline: 2px solid red;
    border-color: transparent;
  }

  &[type="checkbox"] {
    width: 16px;
    height: 16px;
    margin-right: 0.5rem;
  }
`;
