import styled from "styled-components/macro";
import { QUERIES } from "../constants";
import Logo from "./Logo";
import UnstyledButton from "./UnstyledButton";
import Icon from "./Icon";
import VisuallyHidden from "./VisuallyHidden";
import { useState } from "react";
import Cart from "./Cart";
import { AnimatePresence, motion } from "framer-motion";
import { useTotalQuantities } from "../hooks/useCart";

const Navbar = () => {
  const [modal, setShowModal] = useState(false);
  const totalQuantities = useTotalQuantities();
  return (
    <header>
      <NavWrapper>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
        <NavItems>
          <ShoppingBagButton onClick={() => setShowModal(true)}>
            {totalQuantities > 0 && (
              <CartBadge animate={{ scale: 1 }} initial={{ scale: 0 }}>
                {totalQuantities}
              </CartBadge>
            )}
            <Icon id="shopping-bag" />
            <VisuallyHidden>Open Cart</VisuallyHidden>
          </ShoppingBagButton>
        </NavItems>
        <AnimatePresence>
          {modal && <Cart showModal={setShowModal} />}
        </AnimatePresence>
      </NavWrapper>
    </header>
  );
};

export default Navbar;

const NavWrapper = styled.nav`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 18px 32px;
  border-bottom: 1px solid var(--color-gray-300);
  border-top: 4px solid var(--color-gray-900);
  overflow-y: auto;

  @media ${QUERIES.tabletAndSmaller} {
    justify-content: space-between;
    align-items: center;
  }

  @media ${QUERIES.phoneAndSmaller} {
    padding-inline: 16px;
  }
`;

const NavItems = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 3rem;
`;

const LogoWrapper = styled.div`
  flex: 1;

  @media ${QUERIES.tabletAndSmaller} {
    flex: revert;
  }
`;

const ShoppingBagButton = styled(UnstyledButton)`
  position: relative;
`;

const CartBadge = styled(motion.span)`
  background: var(--color-primary);
  color: var(--color-white);
  width: 1.2rem;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 0.75rem;
  position: absolute;
  right: -10%;
  top: -30%;
  font-weight: 700;
  pointer-events: none;
`;
