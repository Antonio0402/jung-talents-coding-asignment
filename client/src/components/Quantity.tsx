import React, { HTMLAttributes } from "react";
import styled from "styled-components/macro";
import Icon from "./Icon";
import VisuallyHidden from "./VisuallyHidden";
import UnstyledButton from "./UnstyledButton";
import { ActionState } from "./AddToCart";
import { WEIGHTS } from "../constants";

interface Props extends HTMLAttributes<HTMLDivElement> {
  quantity: number;
  spacing: number;
  setQuantity?: React.Dispatch<ActionState>;
  addToCart?: () => void;
  removeFromCart?: () => void;
}

const Quantity = ({
  quantity,
  spacing,
  setQuantity,
  addToCart,
  removeFromCart,
  ...delegate
}: Props) => {
  return (
    <QuantityWrapper spacing={spacing} {...delegate}>
      <span>Quantity</span>
      <QuantityIcon
        onClick={() => {
          removeFromCart !== undefined
            ? removeFromCart()
            : setQuantity && setQuantity({ type: "dec" });
        }}
      >
        <Icon id="minus-circle" color="var(--color-gray-900)" />
        <VisuallyHidden>Decrease the quantity</VisuallyHidden>
      </QuantityIcon>
      <span>{quantity}</span>
      <QuantityIcon
        onClick={() => {
          addToCart !== undefined
            ? addToCart()
            : setQuantity && setQuantity({ type: "inc" });
        }}
      >
        <Icon id="plus-circle" color="var(--color-gray-900)" />
        <VisuallyHidden>Increase the quantity</VisuallyHidden>
      </QuantityIcon>
    </QuantityWrapper>
  );
};

export default Quantity;

export const QuantityWrapper = styled.div<{ spacing: number }>`
  display: flex;
  align-items: center;
  gap: ${(props) => props.spacing / 16 || 32}px;
  margin-block: 1rem;
  text-align: center;

  & > span {
    font-weight: ${WEIGHTS.bold};
    max-width: 35ch;
  }

  .CartInfo > & {
    justify-content: space-between;
  }
`;

export const QuantityIcon = styled(UnstyledButton)`
  font-size: 1.5rem;
  padding-inline: 0.5rem;
  min-width: 2rem;
  color: var(--color-gray-700);
`;
