import "./App.css";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import WellFareExpenses from "./pages/WellFareExpenses";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<Dashboard />} />
      <Route path='/welfare-expense' element={<WellFareExpenses />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
