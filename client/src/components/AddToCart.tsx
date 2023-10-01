import { useCartAction } from "../hooks/useCart";
import { useReducer } from "react";
import toast from "react-hot-toast";
import styled from "styled-components/macro";
import UnstyledButton from "./UnstyledButton";
import Quantity from "./Quantity";
import { WEIGHTS } from "../constants";

export type ActionState = { type: "inc" } | { type: "dec" };

type Props = {
  product: Product;
};

const AddToCart = ({ product }: Props) => {
  const { setCartData: addToCart } = useCartAction();
  const [quantity, setQuantity] = useReducer(
    (state: number, action: ActionState) => {
      switch (action.type) {
        case "inc":
          return state + 1;
        case "dec":
          return state > 1 ? state - 1 : state;
        default:
          return state;
      }
    },
    1
  );

  //Create Toast
  const notify = () => {
    toast.success(`${product.title} added to your cart.`, {
      duration: 1500,
    });
  };
  return (
    <>
      <Quantity quantity={quantity} setQuantity={setQuantity} spacing={0} />
      <BuyButton
        onClick={() => {
          addToCart(product, quantity);
          notify();
        }}
      >
        Add To Cart
      </BuyButton>
    </>
  );
};

export default AddToCart;

export const BuyButton = styled(UnstyledButton)`
  width: 100%;
  background: var(--color-primary);
  color: var(--color-white);
  padding: 1rem 2rem;
  border-radius: 2px;
  text-align: center;
  font-weight: ${WEIGHTS.bold};

  &:hover {
    filter: brightness(110%);
  }
`;
