import { createBrowserRouter } from "react-router-dom";
import Root from "../Component/Root/Root";
import ErrorPage from "../Component/ErrorPage/ErrorPage";
import Home from "../Component/Home/Home";
import ProductDetails from "../Component/Product/ProductDetails";
import Product from "../Component/Product/Product";
import ProductEdit from "../Component/Product/ProductEdit";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/product/:id",
          element: <ProductDetails />,
        },
        {
          path: "/products",
          element: <Product />,
        },
        {
          path: "/edit/:id",
          element: <ProductEdit />,
        },
      ],
    },
  ]);