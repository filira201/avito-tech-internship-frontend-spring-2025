import { Navigate } from "react-router";
import AppLayout from "./AppLayout/AppLayout";
import BoardPage from "./BoardPage/BoardPage";
import BoardsPage from "./BoardsPage/BoardsPage";
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";
import NotFoundPage from "./NotFoundPage/NotFoundPage";
import TasksPage from "./TasksPage/TasksPage";

const RouterBuilder = () => {
  const generalRoutes = [
    {
      path: "/",
      element: <Navigate to="/boards" replace />,
    },
    {
      path: "/boards",
      element: <BoardsPage />,
    },
    {
      path: "/board/:id",
      element: <BoardPage />,
    },
    {
      path: "/issues",
      element: <TasksPage />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ];

  const routes = [
    {
      element: <AppLayout />,
      children: generalRoutes,
      errorElement: <ErrorBoundary />,
    },
  ];

  return routes;
};

export default RouterBuilder;
