import styled from "styled-components/macro";
import AddToCart from "../components/AddToCart";
import ScalaPay from "../components/ScalaPay";
import { Main } from "./Home";

import { Suspense, useMemo } from "react";

import { WEIGHTS } from "../constants";
import { pluralize } from "../lib/pluralize";
import formatMoney from "../lib/formatMoney";

import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { Params, useLoaderData, useParams } from "react-router-dom";
import { ErrorBoundary, useErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../components/ErrorFallback";

import { productQuery } from "../hooks/useProducts";

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: { params: Params }) => {
    const query = productQuery(params.productId || "");
    return (
      queryClient.getQueryData<Product>(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };

const ProductDetail = ({
  productId,
  initialData,
}: {
  productId: string;
  initialData?: Product;
}) => {
  const { showBoundary } = useErrorBoundary();
  const queryClient = useQueryClient();

  const query = useMemo(() => productQuery(productId), [productId]);

  if (!initialData) {
    initialData = queryClient.getQueryData(query.queryKey);
    queryClient.setQueryDefaults(query.queryKey, {
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    });
  }

  const { data: product, error } = useQuery({
    ...productQuery(productId || ""),
    initialData,
  });

  if (error) {
    showBoundary(error);
  }

  const shoe = product || initialData;

  return (
    <Wrapper>
      <ImageWrapper>
        <Image src={`/assets/${shoe?.img}.webp`} alt={shoe?.title} />
      </ImageWrapper>
      <ProductInfo>
        <Title>{shoe?.title}</Title>
        <Row>
          <ColorInfo>{pluralize("Color", shoe?.numOfColors || 0)}</ColorInfo>
          <NewFlag>Just-released</NewFlag>
        </Row>
        <Price id="price-container">
          {formatMoney(Number(shoe?.price.slice(1)))}
        </Price>
        <ScalaWrapper>
          <ScalaPay theme="primary" paylater />
        </ScalaWrapper>
        <AddToCart product={shoe!} />
      </ProductInfo>
    </Wrapper>
  );
};

const ProductDetailPage = () => {
  const { productId } = useParams();
  const queryClient = useQueryClient();

  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >;

  return (
    <Main>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        resetKeys={["product"]}
        onError={() => {
          const products = queryClient.getQueryData<SHOE[]>(["products"]);
          if (productId) {
            const product = products?.find((p) => p.slug === productId);
            queryClient.setQueryData(["product", productId], product);
          }
        }}
      >
        <Suspense fallback={<p>Loading...</p>}>
          <ProductDetail
            productId={productId || ""}
            initialData={initialData}
          />
        </Suspense>
      </ErrorBoundary>
    </Main>
  );
};

export default ProductDetailPage;

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
