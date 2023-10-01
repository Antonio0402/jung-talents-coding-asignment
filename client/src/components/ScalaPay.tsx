declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace React.JSX {
    interface IntrinsicElements {
      "scalapay-widget": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

type Props = {
  theme: "primary" | "variant";
  installments?: 3 | 4;
  type?: "product" | "checkout";
  paylater?: boolean;
};

const ScalaPay = ({
  theme,
  type = "product",
  installments = 3,
  paylater,
}: Props) => {
  if (paylater) {
    return (
      <scalapay-widget
        frequency-number="14"
        number-of-installments="1"
        hide="false"
        min="5"
        max="1500"
        amount-selectors='["#price-container"]'
        theme={theme}
        locale="en"
      ></scalapay-widget>
    );
  }
  return (
    <scalapay-widget
      type={type}
      show-title="true"
      frequency-number="30"
      number-of-installments={installments}
      hide="false"
      hide-price="false"
      min="5"
      max="1500"
      amount-selectors='["#price-container"]'
      currency-position="before"
      currency-display="symbol"
      logo-size="100"
      theme={theme}
      locale="en"
    ></scalapay-widget>
  );
};

export default ScalaPay;
