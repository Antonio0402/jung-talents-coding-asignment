import { useLocation } from "react-router-dom";
import styled from "styled-components/macro";
import AddToCart from "../components/AddToCart";
import { WEIGHTS } from "../constants";
import { pluralize } from "../lib/pluralize";
import formatMoney from "../lib/formatMoney";
import { Main } from "./Home";
import ScalaPay from "../components/ScalaPay";

const ProductDetail = () => {
  const location = useLocation();
  const shoe = location.state?.shoe;

  const { imageSrc, name, numOfColors } = shoe;

  return (
    <Main>
      <Wrapper>
        <ImageWrapper>
          <Image src={imageSrc} alt={name} />
        </ImageWrapper>
        <ProductInfo>
          <Title>{name}</Title>
          <Row>
            <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
            <NewFlag>Just-released</NewFlag>
          </Row>
          <Price id="price-container">{formatMoney(shoe.price)}</Price>
          <ScalaWrapper>
            <ScalaPay theme="primary" paylater />
          </ScalaWrapper>
          <AddToCart product={shoe} />
        </ProductInfo>
      </Wrapper>
    </Main>
  );
};

export default ProductDetail;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5rem;
`;

const ImageWrapper = styled.div`
  border-radius: 16px;
  width: 40%;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: ${WEIGHTS.bold};
  color: var(--color-gray-900);
`;

const Image = styled.img`
  object-fit: cover;
`;

const ProductInfo = styled.div`
  width: 40%;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const ColorInfo = styled.p`
  color: var(--color-gray-700);
`;

const NewFlag = styled.div`
  background-color: red;
  height: 2rem;
  padding-inline: 0.625rem;
  line-height: 2rem;
  font-size: 0.825rem;
  font-weight: ${WEIGHTS.bold};
  color: var(--color-white);
  border-radius: 0.25rem;
  background-color: var(--color-secondary);
`;

const Price = styled.p`
  font-weight: ${WEIGHTS.medium};
  color: var(--color-primary);
  font-size: 2rem;
`;

const ScalaWrapper = styled.div`
  margin-block: 2rem;
`;
