import styled from "styled-components/macro";
import { ShoppingCart } from "react-feather";
import { Variants, motion } from "framer-motion";
import { useCartAction, useCartData, useTotalPrice } from "../hooks/useCart";
import Quantity from "./Quantity";
import { BuyButton } from "./AddToCart";
import formatMoney from "../lib/formatMoney";
import { QUERIES } from "../constants";
import ScalaPay from "./ScalaPay";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";

type Props = {
  showModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const Cart = ({ showModal }: Props) => {
  const cartItems = useCartData();
  const totalPrice = useTotalPrice();
  const navigate = useNavigate();
  const { setCartData: addToCart, removeCartData: removeFromCart } =
    useCartAction();

  const handleRemove = (item: Cart) => {
    removeFromCart(item.product);
  };

  const handleAdd = (item: Cart) => {
    addToCart(item.product, 1);
  };
  return (
    <CartWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => showModal(false)}
    >
      <CartContent
        layout
        initial={{ x: "50%" }}
        animate={{ x: 0 }}
        exit={{ x: "50%" }}
        transition={{ type: "tween" }}
        onClick={(e) => e.stopPropagation()}
      >
        {cartItems.length < 1 ? (
          <EmptyCart
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h1>You have more shopping to do 🤩</h1>
            <ShoppingCart />
          </EmptyCart>
        ) : (
          <CartItems
            variants={CartItemsMotion}
            initial="hidden"
            animate="visible"
            layout
          >
            {cartItems.map((item) => (
              <CartItem item={item} key={item.product.slug}>
                <Quantity
                  quantity={item.quantity}
                  spacing={4}
                  addToCart={() => handleAdd(item)}
                  removeFromCart={() => handleRemove(item)}
                />
              </CartItem>
            ))}
          </CartItems>
        )}
        <Checkout layout>
          {cartItems.length >= 1 && (
            <div>
              <h3 id="price-container">Subtotal: {formatMoney(totalPrice)}</h3>
              <ScalaPay type="checkout" theme="primary" installments={3} />
              <PurchaseButton
                onClick={() => {
                  navigate("/checkout");
                  showModal(false);
                }}
              >
                Purchase
              </PurchaseButton>
            </div>
          )}
        </Checkout>
      </CartContent>
    </CartWrapper>
  );
};

export default Cart;

const CartWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  isolation: isolate;
  z-index: 9999;
  display: flex;
  justify-content: flex-end;
`;

const CartContent = styled(motion.div)`
  width: 40%;
  background: var(--color-gray-100);
  padding: 2rem 5rem;
  overflow-y: auto;
  position: relative;

  @media ${QUERIES.tabletAndSmaller} {
    width: 60%;
  }

  @media ${QUERIES.phoneAndSmaller} {
    width: 80%;
  }
`;

export const EmptyCart = styled(motion.div)`
  /* For the empty cart */
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
  place-content: center;
  justify-items: center;
  text-align: center;
  height: 100%;
  width: 100%;
  & > svg {
    font-size: 8rem;
    color: var(--secondary);
  }
`;

const Checkout = styled(motion.div)`
  & div > * + * {
    margin-top: 2rem;
  }
`;

const PurchaseButton = styled(BuyButton)`
  padding: 0.75rem 1.25rem;
`;

const CartItems = styled(motion.div)`
  container-type: inline-size;
  container-name: card;
`;

const CartItemsMotion: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.2,
    },
  },
};
