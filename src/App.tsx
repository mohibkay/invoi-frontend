import "./App.css";
import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Spinner from "./components/utils/spinner";
import Login from "./pages/Login";
const Dashboard = lazy(() => import("./pages/Dashboard"));
const WelfareExpense = lazy(() => import("./pages/WelfareExpense"));

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<Spinner />}>
          <Dashboard />
        </Suspense>
      ),
    },
    {
      path: "/welfare",
      element: (
        <Suspense fallback={<Spinner />}>
          <WelfareExpense />
        </Suspense>
      ),
    },
    {
      path: "/login",
      element: (
        <Suspense fallback={<Spinner />}>
          <Login />
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
