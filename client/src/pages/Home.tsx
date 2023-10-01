import styled from "styled-components/macro";
import { QUERIES } from "../constants";
import SHOES from "../data";
import Product from "../components/Product";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../components/ErrorFallback";
import { useQueryClient } from "@tanstack/react-query";
import { useProducts } from "../hooks/useProducts";
import { Suspense } from "react";

const GalleryProducts = () => {
  const { data: products } = useProducts();
  return (
    <Gallery>
      {products?.length &&
        products.map((shoe) => <Product key={shoe.title} shoe={shoe} />)}
    </Gallery>
  );
};

const Home = () => {
  const queryClient = useQueryClient();
  return (
    <Main>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onError={() => {
          queryClient.setQueriesData(["products"], SHOES);
        }}
        resetKeys={["products"]}
      >
        <Suspense fallback={<p>Loading...</p>}>
          <GalleryProducts />
        </Suspense>
      </ErrorBoundary>
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
