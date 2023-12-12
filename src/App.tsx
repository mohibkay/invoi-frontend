import "./App.css";
import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PageSpinner } from "./components/utils/spinner";
import Login from "./pages/Login";
import { ROUTES } from "./lib/routes";
import RequireAuth from "./components/utils/RequireAuth";
import AuthGuard from "./components/utils/AuthGuard";
import Support from "./pages/Support";
import Layout from "./components/layout";
import TermsOfServicePage from "./pages/TermsOfService";
import PrivacyPolicyPage from "./pages/PrivacyPolicy";
import CancellationPolicyPage from "./pages/Cancellation";
const Dashboard = lazy(() => import("./pages/Dashboard"));

function App() {
  const router = createBrowserRouter([
    {
      path: ROUTES.DASHBOARD,
      element: (
        <Suspense fallback={<PageSpinner />}>
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        </Suspense>
      ),
    },
    {
      path: ROUTES.WELFARE,
      element: (
        <Suspense fallback={<PageSpinner />}>
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        </Suspense>
      ),
    },
    {
      path: ROUTES.LOGIN,
      element: (
        <Layout>
          <Suspense fallback={<PageSpinner />}>
            <AuthGuard>
              <Login />
            </AuthGuard>
          </Suspense>
        </Layout>
      ),
    },
    {
      path: ROUTES.SUPPORT,
      element: (
        <Layout>
          <Suspense fallback={<PageSpinner />}>
            <Support />
          </Suspense>
        </Layout>
      ),
    },
    {
      path: ROUTES.TERMS,
      element: (
        <Layout>
          <Suspense fallback={<PageSpinner />}>
            <TermsOfServicePage />
          </Suspense>
        </Layout>
      ),
    },
    {
      path: ROUTES.PRIVACY,
      element: (
        <Layout>
          <Suspense fallback={<PageSpinner />}>
            <PrivacyPolicyPage />
          </Suspense>
        </Layout>
      ),
    },
    {
      path: ROUTES.CANCELLATION,
      element: (
        <Layout>
          <Suspense fallback={<PageSpinner />}>
            <CancellationPolicyPage />
          </Suspense>
        </Layout>
      ),
    },
    {
      path: "*",
      element: <h1>Page Not Found</h1>,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
