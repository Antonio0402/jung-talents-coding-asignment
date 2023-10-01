import styled from "styled-components/macro";
import { Main } from "./Home";
import { QUERIES, WEIGHTS } from "../constants";
import { useCartData, useTotalPrice } from "../hooks/useCart";
import Form from "../components/Form";
import { EmptyCart } from "../components/Cart";
import { ShoppingCart } from "react-feather";
import UnstyledButton from "../components/UnstyledButton";
import { useNavigate } from "react-router-dom";
import Icon from "../components/Icon";
import CartItem from "../components/CartItem";
import formatMoney from "../lib/formatMoney";
import ScalaPay from "../components/ScalaPay";
import { BuyButton } from "../components/AddToCart";
import { MouseEvent, Suspense } from "react";
import { getRequiredInput, useFormData } from "../hooks/useFormField";
import { useCheckout } from "../hooks/useCheckout";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../components/ErrorFallback";

const Checkout = () => {
  const totalPrice = useTotalPrice();
  const cartItems = useCartData();
  const formData = useFormData();
  const navigate = useNavigate();
  const createOrder = useCheckout();

  const requiredInput = getRequiredInput(formData);
  const canCheckout = [...Object.values(requiredInput)].every(Boolean);

  function handleCheckout(
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) {
    e.preventDefault();

    const orderObject: OrderObject = {
      totalAmount: totalPrice.toString(),
      firstName: formData.firstName,
      lastName: formData.lastName,
      suburb: formData.city,
      line1: formData.streetAddress1.concat(" ", formData.streetAddress2),
      phone: formData.phone,
      countryCode: formData.countryCode,
      postcode: formData.postCode,
      product: formData.payment,
      items: cartItems.map((item) => ({
        amount: item.product.price.toString(),
        quantity: item.quantity,
        name: item.product.title,
        category: item.product.category,
        sku: item.product.sku.toString(),
      })),
    };

    createOrder.mutate(orderObject, {
      onSuccess: (data) => {
        if (data.checkoutUrl) {
          let timer: ReturnType<typeof setTimeout> | null = null;
          const newWindow = window.open(data.checkoutUrl, "_blank");

          if (newWindow) {
            timer = setInterval(() => {
              if (newWindow.closed) {
                console.log("Yay you're in process orders successfully!");
                if (timer) clearInterval(timer);
              }
            });
          }
        }
      },
    });
  }

  return cartItems.length < 1 ? (
    <EmptyCart
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4 }}
    >
      <h1>You have more shopping to do 🤩</h1>
      <ShoppingCart />
      <BackToHome onClick={() => navigate("/")} display="flex">
        <Icon id="arrow-left" /> Back to Home
      </BackToHome>
    </EmptyCart>
  ) : (
    <Main>
      <Wrapper>
        <MainColumn>
          <Title>Billing Information</Title>
          <Form />
        </MainColumn>
        <CartReview>
          {cartItems.map((item) => (
            <CartItem item={item} key={item.product.slug}>
              <QuantityReview>x {item.quantity}</QuantityReview>
            </CartItem>
          ))}
          <Total>
            <Price>
              Subtotal: <span>{formatMoney(totalPrice)}</span>
            </Price>
            <Price>
              Shipping: <span>Free shipping</span>
            </Price>
            <Price id="price-container">
              Total: <span>{formatMoney(totalPrice)}</span>
            </Price>
          </Total>

          {/* <PaymentMethod>
            <TextField
              type="radio"
              field={formData.payment}
              fieldName="payment"
              labelText="Buy now Pay Later"
              display="flex"
              checkboxValue="later"
            />
            <TextField
              type="radio"
              field={formData.payment}
              fieldName="payment"
              labelText="Pay in 3 installment"
              display="flex"
              checkboxValue="pay-in-3"
            />
          </PaymentMethod> */}

          <ScalaWrapper>
            <ScalaPay type="checkout" theme="primary" installments={3} />
          </ScalaWrapper>

          <CheckoutButton
            disabled={canCheckout ? false : true}
            type="button"
            onClick={handleCheckout}
            form="billing"
          >
            Pay in 3 installment with ScalaPay
          </CheckoutButton>
        </CartReview>
      </Wrapper>
    </Main>
  );
};

const CheckoutPage = () => {
  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={["upload"]}>
        <Suspense fallback={<p>Loading...</p>}>
          <Checkout />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default CheckoutPage;

const Wrapper = styled.div`
  display: flex;
  gap: 32px;

  @media ${QUERIES.tabletAndSmaller} {
    flex-direction: column;
  }
`;

export const CartReview = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-basis: 400px;
  background-color: var(--color-white);
  border-radius: 0.25rem;
  padding: 1rem 2rem;
  gap: 2rem;
`;

const QuantityReview = styled.p`
  font-weight: ${WEIGHTS.bold};
`;

const MainColumn = styled.div`
  flex: 1;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: ${WEIGHTS.medium};
  margin-bottom: 1rem;
`;

const BackToHome = styled(UnstyledButton)`
  background-color: var(--color-secondary);
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  color: var(--color-white);
  border-radius: 0.5rem;
`;

const Total = styled.div`
  margin-block: 1rem;
  display: grid;
  gap: 0.5rem;
`;

// const PaymentMethod = styled.div`
//   display: grid;
//   gap: 1rem;
// `;

const Price = styled.p`
  display: flex;
  justify-content: space-between;
`;

const ScalaWrapper = styled.div`
  background-color: var(--color-gray-100);
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
`;

const CheckoutButton = styled(BuyButton)`
  border-radius: 0.25rem;
  &:disabled {
    background-color: var(--color-gray-500);
    cursor: not-allowed;
  }
`;
