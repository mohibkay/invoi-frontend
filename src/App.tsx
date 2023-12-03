import "./App.css";
import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Spinner from "./components/utils/spinner";
import Login from "./pages/Login";
import { ROUTES } from "./lib/routes";
import RequireAuth from "./components/utils/RequireAuth";
import AuthGuard from "./components/utils/AuthGuard";
const Dashboard = lazy(() => import("./pages/Dashboard"));

function App() {
  const router = createBrowserRouter([
    {
      path: ROUTES.DASHBOARD,
      element: (
        <Suspense fallback={<Spinner />}>
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        </Suspense>
      ),
    },
    {
      path: ROUTES.WELFARE,
      element: (
        <Suspense fallback={<Spinner />}>
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        </Suspense>
      ),
    },
    {
      path: ROUTES.LOGIN,
      element: (
        <Suspense fallback={<Spinner />}>
          <AuthGuard>
            <Login />
          </AuthGuard>
        </Suspense>
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
