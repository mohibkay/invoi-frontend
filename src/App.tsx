import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WelfareExpense from "./pages/WelfareExpense";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <WelfareExpense />, // TODO: Change this to dashboard after fixing routing issue
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
