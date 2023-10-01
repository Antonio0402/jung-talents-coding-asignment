import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import { WEIGHTS } from "../constants";
import formatMoney from "../lib/formatMoney";

type Props = {
  shoe: Product;
};

const Product = ({ shoe }: Props) => {
  return (
    <Link to={`/product/${shoe.slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image src={`/assets/${shoe.img}.webp`} alt={shoe.title} />
        </ImageWrapper>
        <Title>{shoe.title}</Title>
        <Price>{formatMoney(Number(shoe.price))}</Price>
      </Wrapper>
    </Link>
  );
};

export default Product;

export const Wrapper = styled.div`
  border-radius: 16px;
  background: var(--color-white);
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  border-radius: 16px 16px 4px 4px;
  /*
    Image zooms in on hover/focus,
    truncate the spillover
  */
  overflow: hidden;
`;

export const Image = styled.img`
  width: 100%;
  display: block;
  border-radius: 16px 16px 4px 4px;
  filter: brightness(90%);
  transition: transform 600ms, filter 1000ms;
  will-change: transform;
  transform-origin: 50% 75%;

  @media (hover: hover) and (prefers-reduced-motion: no-preference) {
    ${ImageWrapper}:hover &,
    ${ImageWrapper}:focus  & {
      transform: scale(1.1);
      filter: brightness(100%);
      transition: transform 200ms, filter 200ms;
    }
  }
`;

export const Title = styled.h3`
  padding-block: 0.5rem;
  font-weight: ${WEIGHTS.medium};
  color: var(--color-gray-900);
`;

const Price = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: var(--color-primary);
`;
