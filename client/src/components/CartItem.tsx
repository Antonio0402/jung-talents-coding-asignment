import { Variants, motion } from "framer-motion";
import styled from "styled-components/macro";
import formatMoney from "../lib/formatMoney";
import { PropsWithChildren } from "react";
import { CartReview } from "../pages/Checkout";

type Props = PropsWithChildren & {
  item: Cart;
};

const CartItem = ({ children, item }: Props) => {
  return (
    <CartItemWrapper layout variants={CartItemVariants}>
      <ImageWrapper>
        <Image
          src={`/assets/${item.product.img}.webp`}
          alt={item.product.title}
        />
      </ImageWrapper>
      <CartInfo className="CartInfo">
        <Title>{item.product.title}</Title>
        <span>{formatMoney(Number(item.product.price.slice(1)))}</span>
        {children}
      </CartInfo>
    </CartItemWrapper>
  );
};

export default CartItem;

const CartItemWrapper = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  border-radius: 1rem;
  background: var(--color-white);
  padding: 2rem;
  margin-block: 2rem;

  ${CartReview} > & {
    margin-block: 0;
    padding: 0.5rem 0;
  }

  @container card (width < 350px) {
    flex-direction: column;
    padding: 1rem;
  }
`;

const CartInfo = styled(motion.div)`
  width: 50%;
`;

const Title = styled.h4`
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: var(--number, 2);

  ${CartReview} & {
    font-size: 0.75rem;
  }
`;

const ImageWrapper = styled.div`
  border-radius: 0.5rem;
`;

const Image = styled.img`
  object-fit: contain;
  width: 128px;
  height: auto;
`;

const CartItemVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { delay: 0.4 },
  },
};
