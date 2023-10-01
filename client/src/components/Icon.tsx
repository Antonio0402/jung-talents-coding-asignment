import styled from "styled-components/macro";
import {
  ArrowLeft,
  MinusCircle,
  PlusCircle,
  ShoppingBag,
  ShoppingCart,
} from "react-feather";
import { HTMLAttributes } from "react";

interface IconProps extends HTMLAttributes<HTMLDivElement> {
  id: keyof typeof icons;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

const icons = {
  "shopping-bag": ShoppingBag,
  "shoping-cart": ShoppingCart,
  "plus-circle": PlusCircle,
  "minus-circle": MinusCircle,
  "arrow-left": ArrowLeft,
};

const Icon = ({ id, color, size, strokeWidth, ...delegated }: IconProps) => {
  const Component = icons[id];

  if (!Component) {
    throw new Error(`No icon found for ID: ${id}`);
  }
  return (
    <Wrapper strokeWidth={strokeWidth} {...delegated}>
      <Component color={color} size={size} />
    </Wrapper>
  );
};

const Wrapper = styled.div<{ strokeWidth?: number }>`
  & > svg {
    display: block;
    stroke-width: ${(p) =>
      p.strokeWidth !== undefined ? p.strokeWidth + "px" : undefined};
  }
`;

export default Icon;
