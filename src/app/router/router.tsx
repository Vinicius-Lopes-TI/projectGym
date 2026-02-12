// Import Dependencies
import { createBrowserRouter, RouteObject } from "react-router";

// Local Imports
import Root from "@/app/layouts/Root";
import RootErrorBoundary from "@/app/pages/errors/RootErrorBoundary";
import { SplashScreen } from "@/components/template/SplashScreen";
import { protectedRoutes } from "./protected";
import { ghostRoutes } from "./ghost";
import { publicRoutes } from "./public";

/**
 * Main application router configuration
 * Combines protected, ghost, and public routes under a common root
 */
const router = createBrowserRouter([
  {
    id: "root",
    Component: Root,
    hydrateFallbackElement: <SplashScreen />,
    ErrorBoundary: RootErrorBoundary,
    children: [protectedRoutes, ghostRoutes, publicRoutes] as RouteObject[],
  },
]);

export default router;
