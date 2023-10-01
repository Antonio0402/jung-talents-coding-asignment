import styled from "styled-components/macro";
import { QUERIES } from "../constants";
import SHOES from "../data";
import Product from "../components/Product";

const Home = () => {
  return (
    <Main>
      <Gallery>
        {SHOES.map((shoe) => (
          <Product key={shoe.name} shoe={shoe} />
        ))}
      </Gallery>
    </Main>
  );
};

export default Home;

export const Main = styled.div`
  padding: 64px 32px;

  @media ${QUERIES.tabletAndSmaller} {
    padding-block: 48px;
  }

  @media ${QUERIES.phoneAndSmaller} {
    padding-inline: 16px;
  }
`;

const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(275px, 1fr));
  grid-gap: 2rem;
`;
