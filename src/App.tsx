import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WelfareExpense from "./pages/WelfareExpense";
import Dashboard from "./pages/Dashboard";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/welfare",
      element: <WelfareExpense />,
    },
    {
      path: "*",
      element: <h1>Page Not Found</h1>,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
