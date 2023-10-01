import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ErrorFallback";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={["layout"]}>
      <Toaster />
      <Navbar />
      <Outlet />
    </ErrorBoundary>
  );
};

export default Layout;
