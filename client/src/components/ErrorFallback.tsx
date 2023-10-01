import styled from "styled-components/macro";
import UnstyledButton from "./UnstyledButton";
import { WEIGHTS } from "../constants";
import { FallbackProps } from "react-error-boundary";

const getText = (html: string) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent;
};

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.
  return (
    <Box>
      <Typography>Something went wrong: {error.status}</Typography>
      <ErrorMessage>
        {error.response ? error.response.data : getText(error.message)}
      </ErrorMessage>
      <ResetButton onClick={resetErrorBoundary}>Try again</ResetButton>
    </Box>
  );
};

const Box = styled.div`
  margin: 1.5rem;
  padding: 0.75rem;
  font-weight: ${WEIGHTS.normal};
  border-radius: 0.5rem;
  color: var(--color-gray-700);
`;

const Typography = styled.h5`
  font-size: 1.25rem;
`;

const ErrorMessage = styled.pre`
  font-size: 0.75rem;
`;

const ResetButton = styled(UnstyledButton)`
  padding: 0.5rem;
  margin-top: 0, 5rem;
  background-color: var(--color-secondary);
  color: var(--color-white);
`;

export default ErrorFallback;
