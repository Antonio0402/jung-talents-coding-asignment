import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ErrorFallback";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={["layout"]}>
      <Navbar />
      <Outlet />
    </ErrorBoundary>
  );
};

export default Layout;
