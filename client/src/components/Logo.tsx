import styled from "styled-components/macro";

import { WEIGHTS } from "../constants";
import { HTMLAttributes } from "react";
import { Link } from "react-router-dom";

type LogoProp = HTMLAttributes<HTMLHeadingElement>;

const Logo = (props: LogoProp) => {
  return (
    <Link to="/">
      <Wrapper {...props}>Jung Shoes</Wrapper>
    </Link>
  );
};

const Wrapper = styled.h1`
  font-size: 1.5rem;
  font-weight: ${WEIGHTS.bold};
`;

export default Logo;
