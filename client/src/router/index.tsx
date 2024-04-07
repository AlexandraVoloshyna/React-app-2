import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages/home";
import { paths } from "./path.const";
import { Layout } from "../components/layout";
import { BoardPage } from "../pages/board";

const routes = [
  { path: paths.HOME, element: <HomePage />},
  { path: paths.BOARD, element: <BoardPage />}
];
export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: routes,
  },
]);
